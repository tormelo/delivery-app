import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryAppContext from '../context/DeliveryAppContext';
import { requestPost } from '../services/requests';

export default function Login() {
  const { user, login } = useContext(DeliveryAppContext);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const [failedLogin, setFailedLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const { role } = user;
    if (role === 'administrator') navigate('/admin/manage');
    if (role === 'seller') navigate('/seller/orders');
    if (role === 'customer') navigate('/customer/products');
  }, [user, navigate]);

  const isDisabled = () => {
    const { email, password } = loginForm;
    const validateEmail = /\S+@\S+\.\S+/;
    const validatePassword = 6;
    return !(password.length >= validatePassword && validateEmail.test(email));
  };

  const handleChange = (event) => {
    const { target } = event;
    setLoginForm({ ...loginForm, [target.name]: target.value });
  };

  const onLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const userInfo = await requestPost('/login', loginForm);
      login(userInfo);
    } catch (error) {
      setFailedLogin(true);
    }
  };

  return (
    <section
      className="d-flex flex-column justify-content-center align-items-center"
      style={ { height: '100vh' } }
    >
      <h2 className="mb-4">Delivery App</h2>
      <form
        onSubmit={ onLoginSubmit }
        className="card-login d-flex flex-column justify-content-evenly px-4"
      >
        <label
          htmlFor="input-email"
          className="form-label"
        >
          Login
          <input
            className="form-control"
            type="email"
            name="email"
            id="input-email"
            data-testid="common_login__input-email"
            placeholder="seu-email@site.com"
            value={ loginForm.email }
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
            data-testid="common_login__input-password"
            placeholder="********"
            value={ loginForm.password }
            onChange={ handleChange }
          />
        </label>
        <button
          className="btn btn-primary"
          data-testid="common_login__button-login"
          type="submit"
          disabled={ isDisabled() }
        >
          LOGIN
        </button>
        <button
          className="btn btn-outline-primary"
          data-testid="common_login__button-register"
          type="button"
          onClick={ () => navigate('/register') }
        >
          Ainda não tenho conta
        </button>
      </form>
      {
        failedLogin && (
          <span
            className="mt-4"
            data-testid="common_login__element-invalid-email"
          >
            Usuário inválido
          </span>
        )
      }
    </section>
  );
}
