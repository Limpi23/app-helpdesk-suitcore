import image from '$assets/technical.png';
import suit from '$assets/favicon.ico';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { createTicket } from '../../api/ticket.services';

const App = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    switch (name) {
      case 'email':
        setErrors({
          ...errors,
          email: /^\S+@\S+\.\S+$/.test(value) ? '' : 'El email no es válido.',
        });
        break;
      case 'phone':
        setErrors({
          ...errors,
          phone: /^\d{8}$/.test(value)
            ? ''
            : 'El teléfono debe tener 8 dígitos numéricos.',
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!errors.email && !errors.phone && formData.message) {
    try {
      //TODO: ver que hacer con el ticket 
      const { data, status, message } = await createTicket(formData);

      if (status === 200 || status === 201) {
        Swal.fire({
          icon: 'success',
          title: '¡Enviado!',
          text: 'Formulario enviado con éxito. Nos comunicaremos con usted en breve.',
          confirmButtonText: 'Ok',
        });
        setFormData({ email: '', phone: '', message: '' });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Información',
          text: message || 'Tu ticket fue enviado, pero revisa más detalles en tu bandeja de entrada.',
          confirmButtonText: 'Ok',
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Hubo un problema al enviar el formulario.',
        confirmButtonText: 'Ok',
      });
      console.error('Error:', error);
    }
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Campos inválidos',
      text: 'Por favor, corrige los errores antes de enviar.',
      confirmButtonText: 'Ok',
    });
  }
};
 

  return (
    <div className='app-container'>
      <div className='image-container'>
        <img src={image} alt='Technical Support' className='centered-image' />
      </div>
      <form onSubmit={handleSubmit} className='form'>
        <div className={`form-group base ${errors.email ? 'error' : ''}`}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Email'
            required
          />
          {errors.email && <p className='error-message'>{errors.email}</p>}
        </div>

        <div className={`form-group base ${errors.phone ? 'error' : ''}`}>
          <label htmlFor='phone'>Teléfono</label>
          <input
            type='text'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            placeholder='Teléfono'
            required
          />
          {errors.phone && <p className='error-message'>{errors.phone}</p>}
        </div>

        <div className='form-group'>
          <label htmlFor='message'>Describe tu problema:</label>
          <textarea
            id='message'
            name='message'
            value={formData.message}
            onChange={handleChange}
            placeholder='Escribe tu problema aquí...'
            rows={6}
            className='form-control textarea-large'
            required
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Enviar
        </button>
      </form>
      <footer className='footer'>
        <img
          src={suit}
          alt='suit'
          width={20}
          height={20}
          className='footer-icon'
        />
        <p className='footer-text'>Versión 1.2.0</p>
      </footer>
    </div>
  );
};

export default App;
