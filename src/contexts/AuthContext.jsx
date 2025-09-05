import React from 'react';
// This file is intentionally left blank to avoid conflicts.
// The main authentication logic is in SupabaseAuthContext.jsx
// We keep this file to prevent import errors in components that might still reference it,
// although they should be updated to use SupabaseAuthContext.
const AuthContext = React.createContext(undefined);
export const AuthProvider = ({ children }) => <>{children}</>;
export const useAuth = () => {
  // This hook should not be used. It throws an error to guide developers
  // to the correct hook in SupabaseAuthContext.
  throw new Error("useAuth from AuthContext is deprecated. Use useAuth from SupabaseAuthContext instead.");
};