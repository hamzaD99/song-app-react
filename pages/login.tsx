import LoginForm from '../components/LoginForm';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const router = useRouter();
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      router.push('/');
    }
  })
  return (
    <div>
      TEST GIT
      <LoginForm />
    </div>
  );
};

export default LoginPage;
