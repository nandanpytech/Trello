import ProtectedRoute from '@/hooks/protected-route';

const Layout = ({ children }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default Layout;
