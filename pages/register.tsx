import RegistrationForm from '../components/RegistrationForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
const RegistrationPage = () => {
  const router = useRouter();
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      router.push('/');
    }
  })
  return (
    <div>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
