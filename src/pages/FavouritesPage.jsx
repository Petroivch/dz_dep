import { useCallback } from 'react';
import QuantityControl from '../components/QuantityControl';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/formatters';

function FavouritesPage() {
  const { favouriteItems, removeFavourite, updateFavouriteQuantity } = useShop();

  const handleRemove = useCallback(
    (productId) => {
      removeFavourite(productId);
    },
    [removeFavourite],
  );

  return (
    <section className="page-section">
      <div className="page-heading">
        <p>Сохраненные товары</p>
        <h1>Избранное</h1>
      </div>

      {favouriteItems.length === 0 ? (
        <div className="empty-state">
          <h2>В избранном пока пусто</h2>
          <p>Добавьте товары из каталога, чтобы вернуться к ним позже.</p>
        </div>
      ) : (
        <div className="list-panel">
          {favouriteItems.map((item) => (
            <article className="list-item" key={item.id}>
              <div>
                <p className="product-meta">
                  {item.category}, в наличии {item.stock} шт., рейтинг {item.rating}
                </p>
                <h2>{item.name}</h2>
                <p>{formatPrice(item.price)}</p>
              </div>
              <div className="list-actions">
                <QuantityControl
                  label={`Количество товара ${item.name}`}
                  quantity={item.quantity}
                  onDecrease={() => updateFavouriteQuantity(item.id, -1)}
                  onIncrease={() => updateFavouriteQuantity(item.id, 1)}
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
      )}
    </section>
  );
}

export default FavouritesPage;
