import { useCallback } from 'react';
import QuantityControl from '../components/QuantityControl';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/formatters';

function CartPage() {
  const { cartItems, cartTotal, removeFromCart, updateCartQuantity } = useShop();

  const handleRemove = useCallback(
    (productId) => {
      removeFromCart(productId);
    },
    [removeFromCart],
  );

  return (
    <section className="page-section">
      <div className="page-heading">
        <p>Покупки</p>
        <h1>Корзина</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-state">
          <h2>Корзина пуста</h2>
          <p>Добавьте товары из каталога, чтобы оформить заказ.</p>
        </div>
      ) : (
        <>
          <div className="list-panel">
            {cartItems.map((item) => (
              <article className="list-item" key={item.id}>
                <div>
                  <p className="product-meta">{item.category}</p>
                  <h2>{item.name}</h2>
                  <p>{formatPrice(item.price)} за штуку</p>
                </div>
                <div className="list-actions">
                  <QuantityControl
                    label={`Количество товара ${item.name} в корзине`}
                    quantity={item.quantity}
                    onDecrease={() => updateCartQuantity(item.id, -1)}
                    onIncrease={() => updateCartQuantity(item.id, 1)}
                  />
                  <button
                    className="secondary-button"
                    type="button"
                    onClick={() => handleRemove(item.id)}
                  >
                    Удалить
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className="cart-summary">
            <span>Итого</span>
            <strong>{formatPrice(cartTotal)}</strong>
          </div>
        </>
      )}
    </section>
  );
}

export default CartPage;
