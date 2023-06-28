import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { requestData } from '../services/requests';

const REMOVE_AMOUNT = -1;
const ADD_AMOUNT = 1;

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await requestData('/products');
      setProducts(productsData.map((product) => ({
        ...product,
        quantity: 0,
      })));
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(products));
    const total = products.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    setTotalPrice(total);
  }, [products]);

  const handleClick = (id, amount) => {
    setProducts((p) => p.map((item) => {
      const value = item.quantity + amount;
      if (item.id === id) {
        return { ...item, quantity: value < 0 ? 0 : value };
      }
      return item;
    }));
  };

  const handleChange = (event) => {
    const { target } = event;
    const { id, value } = target;
    setProducts((p) => p.map((item) => {
      if (item.id === Number(id)) {
        return {
          ...item,
          quantity: Number(value),
        };
      }
      return item;
    }));
  };

  const changeRouteClick = () => {
    navigate('/customer/checkout');
  };

  return (
    <section>
      <NavBar />
      <div className="d-flex flex-column align-items-center">
        <div
          className="d-flex flex-wrap justify-content-center my-4"
          style={ { maxWidth: '1400px' } }
        >
          {products.map((product, index) => (
            <div
              key={ `product-${product.id}` }
              className="card-product d-flex flex-column align-items-center my-4"
            >
              <div className="card-product-price align-self-baseline">
                <h4 style={ { marginRight: '0.4em' } }>R$</h4>
                <h4
                  data-testid={ `customer_products__element-card-price-${product.id}` }
                >
                  {product.price.replace('.', ',')}
                </h4>

              </div>
              <img
                data-testid={ `customer_products__img-card-bg-image-${product.id}` }
                src={ product.url_image }
                alt={ product.name }
              />
              <div className="card-product-bottom d-flex flex-column align-items-center">
                <h3
                  data-testid={ `customer_products__element-card-title-${product.id}` }
                >
                  {product.name}
                </h3>
                <div className="card-product-btns">
                  <button
                    className="btn btn-primary td-start"
                    data-testid={ `customer_products__button-card-rm-item-${product.id}` }
                    type="button"
                    onClick={ () => handleClick(product.id, REMOVE_AMOUNT) }
                  >
                    -
                  </button>
                  <input
                    className="form-control"
                    data-testid={ `customer_products__input-card-quantity-${product.id}` }
                    id={ product.id }
                    type="number"
                    value={ products[index].quantity }
                    onChange={ handleChange }
                    min="0"
                  />
                  <button
                    className="btn btn-primary td-end"
                    data-testid={
                      `customer_products__button-card-add-item-${product.id}`
                    }
                    type="button"
                    onClick={ () => handleClick(product.id, ADD_AMOUNT) }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          className="btn btn-primary btn-checkout"
          data-testid="customer_products__button-cart"
          type="button"
          onClick={ changeRouteClick }
          disabled={ totalPrice === 0 }
        >
          <span style={ { marginRight: '0.2em' } }>
            Ver Carrinho: R$
          </span>
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            { totalPrice.toFixed(2).toString().replace('.', ',') }
          </span>
        </button>
      </div>
    </section>
  );
}

export default Products;
