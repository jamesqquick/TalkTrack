import React from 'react';
import { useAuth0 } from '../utils/auth';
import { navigate } from 'gatsby';

export default function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth0();

  if (loading) return <p>Loading...</p>;
  if (!isAuthenticated) {
    navigate('/');
  }
  return { ...children };
}
