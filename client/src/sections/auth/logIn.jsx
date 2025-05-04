'use client';
import AuthForm from '@/components/reusable/auth/AuthForm';
import { logInSchema } from '../../../validation/yup';
import { logInUser } from '@/service/request/authRequest';
import { toast } from 'sonner';
import CheckAunthenticate from '@/hooks/check-authenticate';
import { useRouter } from 'next/navigation';

function LogIn() {
  const router = useRouter();

  //redirect to home page if user authenticated.
  CheckAunthenticate();

  const logInSubmit = async (data) => {
    try {
      const response = await logInUser({ payload: data });
      if (response.status !== 200) toast.error(response.message, { position: 'top-right' });

      const { token, email } = response.data.data;
      localStorage.setItem('userInfo', JSON.stringify({ token, email }));
      toast.success(response.data.message, { position: 'top-right' });
      router.push('/dashboard');
    } catch (error) {
      toast.error(error.message, {
        position: 'top-right',
      });
    }
  };

  const formData = Object.freeze({
    mode: 'login',
    title: 'Hi, Welcome Back',
    desc: 'Manage your work flow',
    accountQuestion: "Don't have an account?",
    buttonText: 'Sign In',
    callback: logInSubmit,
  });

  return (
    <>
      <AuthForm formData={formData} schema={logInSchema} />{' '}
    </>
  );
}
export default LogIn;
