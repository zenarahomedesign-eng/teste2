import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import { AuthProvider as SupabaseAuthProvider, useAuth } from '@/contexts/SupabaseAuthContext';
import { TenantProvider } from '@/contexts/TenantContext';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import SignUpPage from '@/pages/SignUpPage';
import SuperAdminDashboard from '@/pages/SuperAdminDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import CollaboratorDashboard from '@/pages/CollaboratorDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const userRole = user?.user_metadata?.role;
  const getHomeRoute = () => {
    if (!user) return "/";
    switch (userRole) {
      case 'super_admin': return "/super-admin";
      case 'admin': return "/admin";
      case 'collaborator': return "/colaborador";
      default: return "/";
    }
  };

  return (
    <Routes>
      <Route path="/" element={!user ? <LandingPage /> : <Navigate to={getHomeRoute()} replace />} />
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={getHomeRoute()} replace />} />
      <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={getHomeRoute()} replace />} />

      <Route
        path="/super-admin/*"
        element={
          <ProtectedRoute requiredRole="super_admin">
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/colaborador/*"
        element={
          <ProtectedRoute requiredRole="collaborator">
            <CollaboratorDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <>
      <Helmet>
        <title>Gestão Móveis - Plataforma SaaS para Lojas de Móveis Planejados</title>
        <meta name="description" content="Plataforma completa de gestão para lojas de móveis planejados com CRM, ERP, orçamentos e muito mais." />
        <meta property="og:title" content="Gestão Móveis - Plataforma SaaS para Lojas de Móveis Planejados" />
        <meta property="og:description" content="Plataforma completa de gestão para lojas de móveis planejados com CRM, ERP, orçamentos e muito mais." />
      </Helmet>

      <Router>
        <SupabaseAuthProvider>
          <TenantProvider>
            <AppRoutes />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </TenantProvider>
        </SupabaseAuthProvider>
      </Router>
    </>
  );
}

export default App;