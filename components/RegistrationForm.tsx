import { useState } from 'react';
import axios from '../axiosConfig';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dataError, setDataError] = useState('');

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e:any) => {
    setConfirmPassword(e.target.value);
  };
  const handleNameChange = (e:any) => {
    setName(e.target.value);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setDataError('')
    if(name && email && password && confirmPassword){
      if(password == confirmPassword){
        axios.post('/user/signup',{
          name: name,
          email: email,
          password: password
        }).then((res)=>{
          console.log(res)
          router.push('/login');
        })
        .catch((error) => {
          console.error(error);
          setDataError('Something Went wrong!')
        });
      }
      else{
        setDataError('Password and Confirm Password are not the same!')
        setConfirmPassword('')
        setPassword('')
      }
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
              <h3 style={{ margin: '0', padding: '1rem' }}>Registration</h3>
            </div>
            <div className="card-body" style={{ backgroundColor: 'white', fontFamily: 'Arial, sans-serif', padding: '2rem' }}>
              {dataError && <div className="alert alert-danger mt-2" role="alert">{dataError}</div>}
              <form>
              <div className="form-group">
                  <label htmlFor="name" style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.2rem' }}>Name</label>
                  <input type="text" className="form-control" id="name" style={{ backgroundColor: '#F6F4EB', color: '#4682A9', fontFamily: 'Arial, sans-serif', fontSize: '1rem', padding: '0.5rem', margin: '0.5rem 0rem 1.5rem 0rem' }} placeholder="Enter your name" onChange={handleNameChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="email" style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.2rem' }}>Email</label>
                  <input type="text" className="form-control" id="email" style={{ backgroundColor: '#F6F4EB', color: '#4682A9', fontFamily: 'Arial, sans-serif', fontSize: '1rem', padding: '0.5rem', margin: '0.5rem 0rem 1.5rem 0rem' }} placeholder="Enter your email" onChange={handleEmailChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="password" style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.2rem' }}>Password</label>
                  <input type="password" className="form-control" id="password" style={{ backgroundColor: '#F6F4EB', color: '#4682A9', fontFamily: 'Arial, sans-serif', fontSize: '1rem', padding: '0.5rem', margin: '0.5rem 0rem 1.5rem 0rem' }} placeholder="Enter your password" onChange={handlePasswordChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword" style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.2rem' }}>Confirm Password</label>
                  <input type="password" className="form-control" id="confirmPassword" style={{ backgroundColor: '#F6F4EB', color: '#4682A9', fontFamily: 'Arial, sans-serif', fontSize: '1rem', padding: '0.5rem', margin: '0.5rem 0rem 1.5rem 0rem' }} placeholder="Confirm your password" onChange={handleConfirmPasswordChange} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#749BC2', border: 'none', fontFamily: 'Arial, sans-serif', fontSize: '1rem', padding: '0.5rem 1rem', marginTop: '1rem', margin: '15px 0px' }} onClick={handleSubmit}>Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
