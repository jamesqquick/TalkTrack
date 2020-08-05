import React from 'react';
import { navigate } from 'gatsby';
import { useAuth0 } from '@auth0/auth0-react';

export default function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth0();

  if (loading) return <p>Loading...</p>;
  const isBrowser = typeof window !== 'undefined';

  if (!isAuthenticated && isBrowser) {
    navigate('/');
  }
  return { ...children };
}
