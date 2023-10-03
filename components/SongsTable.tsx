import { useState } from 'react';
import Link from 'next/link'
import React, { use } from 'react';
import { useRouter } from 'next/router';
import { ImBin } from 'react-icons/im'
import axios from '../axiosConfig';

const SongsTable = ({ songsData, user, pageNumber, pagesCount }:{songsData:any,user:any,pageNumber:any,pagesCount:any}) => {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
  };
  const handleSearch = (e: any) => {
    e.preventDefault();
    if (search.length) router.push(`/songs?name=${search}`)
    else router.push('/songs')
  }
  const signOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/'
  }
  const deleteSong = (e: any, song:any) => {
    e.preventDefault();
    console.log(e)
    axios.delete('/song',{
      data:{
        id: song._id
      }
    })
    .then((response) => {
      console.log(response)
      router.push('/songs')
    })
    .catch((error) => {
      console.error(error);
    })
  }
  return (
    <div className="container">
      <div className='container'>
        <div className='row'>
          <div className='col-md-2 col-12'>
            <h1>Songs List</h1>
          </div>
          <div className='col-md-6 col-12' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <form className="form-inline">
              <div className="input-group">
                <input onChange={handleSearchChange} type="text" className="form-control" style={{ borderRadius: '5px' }} placeholder="Search By Name..." />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" onClick={handleSearch}>Search</button>
                </div>
              </div>
            </form>
          </div>
          <div className='col-md-4 col-12' style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            padding: 0
          }}>
            <div style={{ marginRight: '15px' }}>
              <Link href={`/songs?page=${pageNumber - 1}`} style={pageNumber == 1 ? { pointerEvents: 'none', color: 'gray', marginRight: '8px' } : { marginRight: '8px' }}>Prev</Link>
              {pageNumber} Out Of {pagesCount}
              <Link href={`/songs?page=${pageNumber + 1}`} style={pageNumber == pagesCount ? { pointerEvents: 'none', color: 'gray', marginLeft: '8px' } : { marginLeft: '8px' }}>Next</Link>
            </div>
            {user && (user.roleId == 2 || user.roleId == 3) && <Link href="/add_song"><button type="submit" className="btn btn-primary" style={{ backgroundColor: '#3874cc', border: 'none', fontFamily: 'Arial, sans-serif', fontSize: '1rem', padding: '0.5rem 1rem', marginRight: '0.5rem' }}>Add Songs</button></Link>}
            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#dc3545', border: 'none', fontFamily: 'Arial, sans-serif', fontSize: '1rem', padding: '0.5rem 1rem' }} onClick={signOut}>Logout</button>
          </div>
        </div>
      </div>
      {songsData
        ? songsData.map((song:any, index:any) => (
          <div key={index} className="my-3 card">
            <div className="card-body">
              <div className="row justify-content-between">
                <img
                  className="col-md-6 col-12 card-img-top"
                  src={song.coverImage ? song.coverImage : 'https://btlbeats.com/wp-content/themes/uithemebeatstore/assets/images/default-cover-art.png'}
                  alt={`${song.name} Cover`}
                  style={{ width: '120px', height: '100px' }}
                />
                <div className="col-md-2 col-12" style={{
                  display: 'flex',

                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <h5 className="card-title">{song.name}</h5>
                  <p className="card-text">By {song.singer}</p>

                </div>
                <div className="col-md-4 col-12" style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <audio controls>
                    <source src={song.link} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                <div className={user && (user.roleId == 2 || user.roleId == 3) ? 'col-md-3 col-12' : 'col-md-4 col-12'} style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <p className="card-text">
                    Uploaded on {new Date(song.uploadDate).toLocaleDateString()}
                  </p>
                  <p className="card-text">Uploaded by {song.createdBy.name}</p>
                </div>
                {user && (user.roleId == 2 || user.roleId == 3) && <div className='col-md-1 col-12' style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#dc3545', border: 'none', fontFamily: 'Arial, sans-serif', fontSize: '1rem', padding: '0.5rem 1rem' }} onClick={(e)=>{deleteSong(e,song)}}><ImBin /></button>
                </div>}
                
              </div>
            </div>
          </div>
        ))
        : ''}
    </div>
  );
};

export default SongsTable;
