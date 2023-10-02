import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import SongsTable from '../components/SongsTable'

const Songs = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [user, setUser] = useState();
  const [pageNumber, setPage] = useState(1);

  useEffect(() => {
    if(router.isReady){
      const { page } = router.query;
      const authToken = localStorage.getItem('authToken');
      const user = localStorage.getItem('user');
      if (!authToken && typeof window !== 'undefined') {
        router.push('/login');
      }
      else{
        if(user !== null){
          setUser(JSON.parse(user))
        }
        axios.get(`/song?page=${page ? page : 1}`)
        .then((response) =>{
          console.log(response)
          setData(response.data)
        })
        .catch((error) => {
          console.error(error);
          if(error.response && error.response.data && error.response.data.statusCode == 401){
            localStorage.removeItem('authToken');
            router.push('/login')
          }
        });
      }
    }
  }, [router.isReady, router.query])
  return (
    <div style={{margin:'60px 0px'}}>
      <SongsTable songsData={data} user={user} pageNumber={pageNumber}/>
    </div>
  );
};
export default Songs;
