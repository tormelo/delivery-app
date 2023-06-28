import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryAppContext from '../context/DeliveryAppContext';
import { requestPost } from '../services/requests';

export default function Register() {
  const { login } = useContext(DeliveryAppContext);

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [failedRegister, setFailedRegister] = useState(false);

  const navigate = useNavigate();

  const isDisabled = () => {
    const { name, email, password } = registerForm;
    const validateEmail = /\S+@\S+\.\S+/;
    const minNameLength = 12;
    const minPasswordLength = 6;
    return !(name.length >= minNameLength
       && password.length >= minPasswordLength
       && validateEmail.test(email));
  };

  const handleChange = (event) => {
    const { target } = event;
    setRegisterForm({ ...registerForm, [target.name]: target.value });
  };

  const onRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await requestPost('/users/register', registerForm);
      login(user);
      navigate('/customer/products');
    } catch (error) {
      setFailedRegister(true);
    }
  };

  return (
    <section
      className="d-flex flex-column justify-content-center align-items-center"
      style={ { height: '100vh' } }
    >
      <h2 className="mb-4">Cadastro</h2>
      <form
        onSubmit={ onRegisterSubmit }
        className="card-login d-flex flex-column justify-content-evenly px-4"
      >
        <label
          htmlFor="input-name"
          className="form-label"
        >
          Nome
          <input
            className="form-control"
            type="text"
            name="name"
            id="input-name"
            data-testid="common_register__input-name"
            placeholder="Seu nome"
            value={ registerForm.name }
            onChange={ handleChange }
          />
        </label>
        <label
          htmlFor="input-email"
          className="form-label"
        >
          Email
          <input
            className="form-control"
            type="email"
            name="email"
            id="input-email"
            data-testid="common_register__input-email"
            placeholder="seu-email@site.com"
            value={ registerForm.email }
            onChange={ handleChange }
          />
        </label>
        <label
          htmlFor="input-password"
          className="form-label"
        >
          Senha
          <input
            className="form-control"
            type="password"
            name="password"
            id="input-password"
            data-testid="common_register__input-password"
            placeholder="********"
            value={ registerForm.password }
            onChange={ handleChange }
          />
        </label>
        <button
          className="btn btn-primary"
          data-testid="common_register__button-register"
          type="submit"
          disabled={ isDisabled() }
        >
          CADASTRAR
        </button>
      </form>
      {
        failedRegister && (
          <span
            className="mt-4"
            data-testid="common_register__element-invalid_register"
          >
            E-mail já cadastrado
          </span>
        )
      }
    </section>
  );
}
