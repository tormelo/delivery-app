import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryAppContext from '../context/DeliveryAppContext';

function NavBar() {
  const { user, logout } = useContext(DeliveryAppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const onOrdersBtnClick = () => {
    const { role } = user;
    if (role === 'seller') navigate('/seller/orders');
    if (role === 'customer') navigate('/customer/orders');
    if (role === 'administrator') navigate('/admin/manage');
  };

  return (
    <section>
      {user && (
        <nav
          className="d-flex align-items-stretch"
          style={ { height: '50px' } }
        >
          {user.role === 'customer' && (
            <button
              className="nav-btn nav-btn-products"
              type="button"
              data-testid="customer_products__element-navbar-link-products"
              onClick={ () => navigate('/customer/products') }
            >
              PRODUTOS
            </button>
          )}
          <button
            className="nav-btn nav-btn-orders"
            type="button"
            data-testid="customer_products__element-navbar-link-orders"
            onClick={ onOrdersBtnClick }
          >
            {user.role === 'customer' && 'MEUS PEDIDOS'}
            {user.role === 'seller' && 'PEDIDOS'}
            {user.role === 'administrator' && 'GERENCIAR USUÁRIOS'}
          </button>
          <div className="d-flex align-items-center nav-user-name">
            <span
              data-testid="customer_products__element-navbar-user-full-name"
            >
              {user.name}
            </span>

          </div>
          <button
            className="nav-btn nav-btn-logout"
            data-testid="customer_products__element-navbar-link-logout"
            type="button"
            onClick={ handleLogout }
          >
            Sair
          </button>
        </nav>
      )}
    </section>
  );
}

export default NavBar;
