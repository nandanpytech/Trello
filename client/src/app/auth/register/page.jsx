import Register from '@/sections/auth/register';
import { projectName } from '@/utils/constant';

export const metadata = {
  title: `${projectName} - Register`,
};

const RegisterPage = () => {
  return <Register />;
};

export default RegisterPage;
