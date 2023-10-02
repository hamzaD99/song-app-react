import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../axiosConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import SongsTable from '../components/SongsTable'

const Songs = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [user, setUser] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [pagesCount, setPagesCount] = useState(null);

  const getSongs = (page:number, name:string) => {
    axios.get(`/song?page=${page ? page : 1}&name=${name ? name : ''}`)
    .then((response) =>{
      console.log(response)
      setData(response.data.data)
      setPagesCount(response.data.pagesCount)
    })
    .catch((error) => {
      console.error(error);
      if(error.response && error.response.data && error.response.data.statusCode == 401){
        localStorage.removeItem('authToken');
        router.push('/login')
      }
    });
  }
  useEffect(() => {
    if(router.isReady){
      const { page, name } = router.query;
      const authToken = localStorage.getItem('authToken');
      const user = localStorage.getItem('user');
      if (!authToken && typeof window !== 'undefined') {
        router.push('/login');
      }
      else{
        if(user !== null){
          setUser(JSON.parse(user))
        }
        setPageNumber(page ? parseInt(page) : 1)
        
        getSongs(page, name)
      }
    }
  }, [router.isReady, router.query])
  return (
    <div style={{margin:'60px 0px'}}>
      <SongsTable songsData={data} user={user} pageNumber={pageNumber} pagesCount={pagesCount} />
    </div>
  );
};
export default Songs;
