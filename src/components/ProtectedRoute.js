import React from 'react';
import { useAuth0 } from '../utils/auth';
import { navigate } from 'gatsby';

export default function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth0();

  if (loading) return <p>Loading...</p>;
  const isBrowser = typeof window !== 'undefined';

  if (!isAuthenticated && isBrowser) {
    navigate('/');
  }
  return { ...children };
}
