import { useState } from 'react';
import axios from '../axiosConfig';

const LoginForm = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUserNameChange = (e:any) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setError('')
    if(userName && password){
      axios.post('/user/signin',{
        userName: userName,
        password: password
      }).then((res)=>{
        if(res.data && res.data.status && res.data.status == 401 && res.data.message){
          setError(res.data.message)
        }
        else{
          localStorage.setItem('authToken', res.data.token)
          localStorage.setItem('user', JSON.stringify(res.data.user))
          window.location.href = '/'
        }
      })
      .catch((error) => {
        console.error(error);
        setError('Something went wrong!')
      });
    }
    else{
      setError('Dude! fill the form :)')
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header" style={{ backgroundColor: '#749BC2', color: 'white', fontFamily: 'Arial, sans-serif' }}>
              <h3 style={{ margin: '0', padding: '1rem' }}>Login</h3>
            </div>
            {error && <div className="alert alert-danger mt-2" role="alert">{error}</div>}
            <div className="card-body" style={{ backgroundColor: 'white', fontFamily: 'Arial, sans-serif', padding: '2rem' }}>
              <form>
                <div className="form-group">
                  <label htmlFor="userName" style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.2rem' }}>User Name</label>
                  <input type="text" className="form-control" id="userName" style={{ backgroundColor: '#F6F4EB', color: '#4682A9', fontFamily: 'Arial, sans-serif', fontSize: '1rem', padding: '0.5rem', margin: '0.5rem 0rem 1.5rem 0rem' }} placeholder="Enter your User Name" onChange={handleUserNameChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="password" style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.2rem' }}>Password</label>
                  <input type="password" className="form-control" id="password" style={{ backgroundColor: '#F6F4EB', color: '#4682A9', fontFamily: 'Arial, sans-serif', fontSize: '1rem', padding: '0.5rem', margin: '0.5rem 0rem 1.5rem 0rem' }} placeholder="Enter your password" onChange={handlePasswordChange} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#749BC2', border: 'none', fontFamily: 'Arial, sans-serif', fontSize: '1rem', padding: '0.5rem 1rem', marginTop: '1rem', margin: '15px 0px' }} onClick={handleSubmit}>Login</button>
              </form>
              <a href='/register'>Don't have an account?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
