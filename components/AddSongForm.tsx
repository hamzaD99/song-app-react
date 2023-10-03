import { useState } from 'react';
import axios from '../axiosConfig';
import { useRouter } from 'next/router';
import Link from 'next/link'

const AddSongForm = () => {
  const router = useRouter();
  const [songName, setSongName] = useState('');
  const [singer, setSinger] = useState('');
  const [song, setSong] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [dataError, setDataError] = useState('');

  const handleSongNameChange = (e:any) => {
    setSongName(e.target.value);
  };

  const handleSingerChange = (e:any) => {
    setSinger(e.target.value);
  };
  const handleSongChange = (e:any) => {
    setSong(e.target.value);
  };
  const handleCoverImageChange = (e:any) => {
    setCoverImage(e.target.value);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setDataError('')
    if(songName && singer && song){
      axios.post('/song/',{
        name: songName,
        singer: singer,
        link: song,
        coverImage: coverImage
      }).then((res)=>{
        console.log(res)
        if(res.data && res.data.status && res.data.status == 401 && res.data.message){
          setDataError(res.data.message)
          setTimeout(() => {
            router.push('/songs');
          }, 1500);
        }
        else
        router.push('/songs');
      })
      .catch((error) => {
        console.error(error);
        setDataError('Something Went wrong!')
      });
    }
    else {
      setDataError('Fill The Whole Form!')
    }
    
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header" style={{ backgroundColor: '#749BC2', color: 'white', fontFamily: 'Arial, sans-serif' }}>
              <h3 style={{ margin: '0', padding: '1rem' }}>Add Song</h3>
            </div>
            <div className="card-body" style={{ backgroundColor: 'white', fontFamily: 'Arial, sans-serif', padding: '2rem' }}>
              {dataError && <div className="alert alert-danger mt-2" role="alert">{dataError}</div>}
              <form>
              <div className="form-group">
                  <label htmlFor="songName" style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.2rem' }}>Song Name *</label>
                  <input required type="text" className="form-control" id="songName" style={{ backgroundColor: '#F6F4EB', color: '#4682A9', fontFamily: 'Arial, sans-serif', fontSize: '1rem', padding: '0.5rem', margin: '0.5rem 0rem 1.5rem 0rem' }} placeholder="Enter song's name" onChange={handleSongNameChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="singer" style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.2rem' }}>Singer *</label>
                  <input required type="text" className="form-control" id="singer" style={{ backgroundColor: '#F6F4EB', color: '#4682A9', fontFamily: 'Arial, sans-serif', fontSize: '1rem', padding: '0.5rem', margin: '0.5rem 0rem 1.5rem 0rem' }} placeholder="Enter singer's Name" onChange={handleSingerChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="songLink" style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.2rem' }}>Song Link *</label>
                  <input required type="url" className="form-control" id="songLink" style={{ backgroundColor: '#F6F4EB', color: '#4682A9', fontFamily: 'Arial, sans-serif', fontSize: '1rem', padding: '0.5rem', margin: '0.5rem 0rem 1.5rem 0rem' }} placeholder="Enter song's link" onChange={handleSongChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="coverImageLink" style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.2rem' }}>Cover Image Link</label>
                  <input type="url" className="form-control" id="coverImageLink" style={{ backgroundColor: '#F6F4EB', color: '#4682A9', fontFamily: 'Arial, sans-serif', fontSize: '1rem', padding: '0.5rem', margin: '0.5rem 0rem 1.5rem 0rem' }} placeholder="Enter cover image link" onChange={handleCoverImageChange} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#749BC2', border: 'none', fontFamily: 'Arial, sans-serif', fontSize: '1rem', padding: '0.5rem 1rem', marginTop: '1rem', margin: '15px 0px' }} onClick={handleSubmit}>Add</button>
              </form>
              <Link href='/songs'>Back To Songs</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSongForm;
