import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from './services/api';
import logo from './img/logo.png';
import './styles/login.css';

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();

    setHasError(false);

    await api
      .post('/auth', {
        email,
        password,
      })
      .then(({ data }) => {
        const token = data.data.token;
        localStorage.setItem('@easyCarros', token);
        history.push('/vehicles');
      })
      .catch(() => {
        setHasError(true);
      });
  }

  return (
    <div className='container'>
      <img src={logo} alt='logo' className='logo'></img>
      <div className='login-form'>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            name='email'
            placeholder='Email'
            autoComplete='off'
            required
            id='inputEmail'
            className={hasError ? 'error' : ''}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type='password'
            name='password'
            placeholder='Senha'
            id='inputPassword'
            className={hasError ? 'error' : ''}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {hasError ? <span id='warning'>Email ou senha incorreta</span> : null}
          <br />
          <br />
          <button type='submit' className='submit-button'>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
