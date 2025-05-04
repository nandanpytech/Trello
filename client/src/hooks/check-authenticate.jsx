import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function CheckAunthenticate() {
  const router = useRouter();
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) router.push('/');
  });

  return null;
}

export default CheckAunthenticate;
