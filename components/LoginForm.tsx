import { useState } from 'react';
import axios from '../axiosConfig';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log(email)
    console.log(password)
    axios.post('/user/signin',{
      params:{
        email: email,
        password: password
      }
    }).then((res)=>{
      console.log(res)
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header" style={{ backgroundColor: '#749BC2', color: 'white', fontFamily: 'Arial, sans-serif' }}>
              <h3 style={{ margin: '0', padding: '1rem' }}>Login</h3>
            </div>
            <div className="card-body" style={{ backgroundColor: 'white', fontFamily: 'Arial, sans-serif', padding: '2rem' }}>
              <form>
                <div className="form-group">
                  <label htmlFor="email" style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.2rem' }}>Email</label>
                  <input type="text" className="form-control" id="email" style={{ backgroundColor: '#F6F4EB', color: '#4682A9', fontFamily: 'Arial, sans-serif', fontSize: '1rem', padding: '0.5rem', margin: '0.5rem 0rem 1.5rem 0rem' }} placeholder="Enter your email" onChange={handleEmailChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="password" style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.2rem' }}>Password</label>
                  <input type="password" className="form-control" id="password" style={{ backgroundColor: '#F6F4EB', color: '#4682A9', fontFamily: 'Arial, sans-serif', fontSize: '1rem', padding: '0.5rem', margin: '0.5rem 0rem 1.5rem 0rem' }} placeholder="Enter your password" onChange={handlePasswordChange} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#749BC2', border: 'none', fontFamily: 'Arial, sans-serif', fontSize: '1rem', padding: '0.5rem 1rem', marginTop: '1rem', margin: '15px 0px' }} onClick={handleSubmit}>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
