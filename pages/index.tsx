import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken && typeof window !== 'undefined') {
      router.push('/login');
    }
    else router.push('/songs')
  }, [])
  return
  
}