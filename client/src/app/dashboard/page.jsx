import ProtectedRoute from '@/hooks/protected-route';
import Dashboard from '@/sections/dashboard/dashboard';

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard page',
};

const dashboardPage = () => {
  return <Dashboard />;
};
export default dashboardPage;
