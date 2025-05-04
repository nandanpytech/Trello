import { projectName } from '@/utils/constant';
import LogIn from '@/sections/auth/logIn';

export const metadata = {
  title: `${projectName} - LogIn`,
  description: 'Log in to your account',
};
const LogInPage = () => {
  return <LogIn />;
};

export default LogInPage;
