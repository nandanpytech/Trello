'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function ProtectedRoute({ children, redirect = '/auth/login' }) {
  const router = useRouter();

  const isAuthenticated = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return Boolean(userInfo?.token && userInfo?.email);
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push(redirect);
    }
  }, []);

  return <> {children} </>;
}

export default ProtectedRoute;
