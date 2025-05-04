import VerifyEmail from '@/sections/auth/verify';
import { projectName } from '@/utils/constant';

export const metadata = {
  title: `${projectName} - VerifyEmail`,
};

const VerifyPage = () => {
  return <VerifyEmail />;
};

export default VerifyPage;
