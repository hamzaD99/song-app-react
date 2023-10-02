import React, { use } from 'react';

const SongsTable = ({ songsData, user, pageNumber }) => {
  const signOut = ()=>{
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/'
  }
  return (
    <div className="container">
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 col-12'>
            <h1>Songs List</h1>
          </div>
          <div className='col-md-6 col-12' style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            padding: 0}}>
              {pageNumber}
              {user && (user.roleId == 2 || user.roleId == 3) && <a href="/add_song"><button type="submit" className="btn btn-primary" style={{ backgroundColor: '#3874cc', border: 'none', fontFamily: 'Arial, sans-serif', fontSize: '1rem', padding: '0.5rem 1rem', marginRight:'0.5rem' }}>Add Songs</button></a>}
              <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#dc3545', border: 'none', fontFamily: 'Arial, sans-serif', fontSize: '1rem', padding: '0.5rem 1rem' }} onClick={signOut}>Logout</button>
          </div>
        </div>
      </div>
      {songsData
        ? songsData.map((song, index) => (
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
                  <div className='col-md-4 col-12' style={{
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
                </div>
              </div>
            </div>
          ))
        : ''}
    </div>
  );
};

export default SongsTable;
