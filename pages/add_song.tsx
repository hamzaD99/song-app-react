import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddSongForm from '../components/AddSongForm'


const Songs = () => {
  const router = useRouter();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user'))
    if ((!authToken || !user || (user.roleId !== 2 && user.roleId !== 3)) && typeof window !== 'undefined') {
      router.push('/');
    }
  }, [])
  return (
    <div style={{margin:'60px 0px'}}>
      <AddSongForm />
    </div>
  );
};
export default Songs;
