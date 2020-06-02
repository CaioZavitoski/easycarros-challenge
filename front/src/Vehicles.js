import React, { useState, useEffect } from 'react';
import api from './services/api';
import Logo from './img/logo2.png';
import btnDelete from './img/x.jpg';
import './styles/vehicles.css';

function Vehicle() {
  const [plate, setPlate] = useState([]);
  const [inputValue, setValue] = useState('');
  const [hasError, setHasError] = useState(false);

  async function getPlates() {
    const { data } = await api.get('/vehicle');
    setPlate(data.data);
  }

  useEffect(() => {
    getPlates();
  }, []);

  async function onAddPlate(e) {
    e.preventDefault();

    setHasError(false);

    if (inputValue.length !== 7) {
      setHasError(true);
    } else {
      setHasError(false);
    }

    await api.post('/vehicle', {
      plate: inputValue,
    });
    getPlates();
  }

  async function onDeletePlate(id) {
    await api.delete(`/vehicle/${id}`);
    getPlates();
  }

  return (
    <div className='content'>
      <img src={Logo} alt='logoEasy' className='navbar-logo' />
      <ul className='navbar'>
        <span className>Veículos</span>
      </ul>
      <div className='container'>
        <h1>Adicionar novo veículo</h1>
        <form onSubmit={onAddPlate}>
          <input
            type='text'
            placeholder='Placa'
            className={hasError ? 'input-error' : 'plate-input'}
            onChange={(e) => setValue(e.target.value)}
            required
          />
          <button type='submit' className='btn-submit'>
            +
          </button>
        </form>
        {hasError ? (
          <span id='warning'>
            Placa inválida. <br /> Digite uma placa válida.
          </span>
        ) : null}
        <hr />
      </div>
      <div className='plates-list'>
        <h1>Veículos</h1>
        <ul>
          {plate.map((data) => (
            <li className='plate'>
              <span>{data.plate}</span>
              <span>
                <img
                  src={btnDelete}
                  alt='delete'
                  className='btn-delete'
                  onClick={() => onDeletePlate(data.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Vehicle;
