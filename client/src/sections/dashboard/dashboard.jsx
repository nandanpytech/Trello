'use client';
import { setUser } from '@/redux/slices/userSlice';
import { getUserInfo } from '@/service/request/authRequest';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        const response = await getUserInfo({ payload: null }); // user email & token attached to axios-intercepter
        if (response?.status !== 200) return router.push('auth/login');
        const userInfo = response.data.data.userData;
        dispatch(setUser(userInfo));
      } catch (error) {
        if (error.status === 'FAILURE' || error.status === 'UNAUTHORIZED') {
          localStorage.removeItem('userInfo');
          router.push('auth/login');
        }
        console.log('error: ', error);
      }
    })();
  }, []);
  return <div>dashboard</div>;
}

export default Dashboard;
