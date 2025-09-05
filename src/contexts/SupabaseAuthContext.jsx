import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/customSupabaseClient';
import { toast } from 'react-toastify';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSession = useCallback(async (session) => {
    setSession(session);
    if (session?.user) {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role, tenant_id')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error("Error fetching profile on auth change:", error);
        setUser(session.user);
      } else {
        const updatedUser = {
          ...session.user,
          user_metadata: {
            ...session.user.user_metadata,
            role: profile.role,
            tenant_id: profile.tenant_id,
          },
        };
        setUser(updatedUser);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      await handleSession(session);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        await handleSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, [handleSession]);

  const signUpAdmin = useCallback(async (email, password, fullName, storeName) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: 'admin',
        },
      },
    });

    if (authError) {
      toast.error(authError.message || "Erro ao cadastrar usuário.");
      return { error: authError };
    }
    
    if (!authData.user) {
        const errorMessage = "Não foi possível criar o usuário.";
        toast.error(errorMessage);
        return { error: { message: errorMessage } };
    }

    const { data: tenantData, error: tenantError } = await supabase
      .from('tenants')
      .insert({ name: storeName, id: authData.user.id }) // Use user ID as tenant ID
      .select()
      .single();

    if (tenantError) {
      toast.error(tenantError.message || "Erro ao criar a loja.");
      await supabase.auth.admin.deleteUser(authData.user.id);
      return { error: tenantError };
    }

    const tenantId = tenantData.id;

    const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        full_name: fullName,
        role: 'admin',
        tenant_id: tenantId,
        email: email,
    });

    if (profileError) {
        toast.error(profileError.message || "Erro ao criar perfil do usuário.");
        await supabase.auth.admin.deleteUser(authData.user.id);
        await supabase.from('tenants').delete().eq('id', tenantId);
        return { error: profileError };
    }
    
    // Manually update user metadata after profile is created
    const { error: userUpdateError } = await supabase.auth.updateUser({
        data: { ...authData.user.user_metadata, tenant_id: tenantId }
    });

    if (userUpdateError) {
        toast.error(userUpdateError.message || "Erro ao atualizar metadados do usuário.");
        // rollback...
        return { error: userUpdateError };
    }

    toast.success("Cadastro realizado com sucesso! Verifique seu e-mail para confirmação.");
    return { user: authData.user, error: null };
  }, []);

  const signIn = useCallback(async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message || "Algo deu errado no login.");
    }

    return { error };
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error(error.message || "Algo deu errado ao sair.");
    }

    return { error };
  }, []);

  const value = useMemo(() => ({
    user,
    session,
    loading,
    signUpAdmin,
    signIn,
    signOut,
  }), [user, session, loading, signUpAdmin, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
