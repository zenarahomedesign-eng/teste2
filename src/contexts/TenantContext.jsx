import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';

const TenantContext = createContext();

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant deve ser usado dentro de um TenantProvider');
  }
  return context;
};

export const TenantProvider = ({ children }) => {
  const { user } = useAuth();
  const [currentTenant, setCurrentTenant] = useState(null);
  const [tenants, setTenants] = useState([]);

  const fetchTenantData = useCallback(async () => {
    if (user) {
      const userRole = user.user_metadata?.role;
      const userTenantId = user.user_metadata?.tenant_id;

      if (userRole === 'super_admin') {
        const { data, error } = await supabase.from('tenants').select('*');
        if (error) {
          console.error("Error fetching tenants:", error);
        } else {
          setTenants(data);
          setCurrentTenant(null); 
        }
      } else if (userTenantId) {
        const { data, error } = await supabase
          .from('tenants')
          .select('id, name')
          .eq('id', userTenantId)
          .single();
        
        if (error) {
          console.error("Error fetching current tenant:", error);
          setCurrentTenant(null);
        } else {
          setCurrentTenant(data);
        }
      }
    } else {
      setCurrentTenant(null);
      setTenants([]);
    }
  }, [user]);

  useEffect(() => {
    fetchTenantData();
  }, [user, fetchTenantData]);

  const switchTenant = (tenantId) => {
    if (user?.user_metadata?.role === 'super_admin') {
      const tenant = tenants.find(t => t.id === tenantId);
      if (tenant) {
        setCurrentTenant(tenant);
      }
    }
  };

  const value = {
    currentTenant,
    tenants,
    switchTenant
  };

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  );
};
