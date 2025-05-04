'use client';

import AuthForm from '@/components/reusable/auth/AuthForm';
import { registerSchema } from '../../../validation/yup';
import { registerUser } from '@/service/request/authRequest';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CheckAunthenticate from '@/hooks/check-authenticate';

const Register = () => {
  const router = useRouter();

  //redirect to home page if user authenticated.
  CheckAunthenticate();

  const registerSubmit = async (data) => {
    try {
      const response = await registerUser({ payload: data });
      if (response.status === 200) router.push(`/auth/verify?email=${response.data.data.email}`);
    } catch (error) {
      if (error.status === 'FAILURE') toast.error(error.message, { position: 'top-right' });
      console.log(error);
    }
  };

  const formData = Object.freeze({
    mode: 'register',
    title: 'Welcome To Trello',
    desc: 'Manage your work flow',
    accountQuestion: 'Already have an account?',
    buttonText: 'Create Account',
    callback: registerSubmit,
  });

  return <AuthForm schema={registerSchema} formData={formData} />;
};

export default Register;
