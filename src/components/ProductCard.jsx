import { memo, useCallback, useMemo } from 'react';
import { formatPrice } from '../utils/formatters';

function ProductCard({ product, isFavourite, onAddToCart, onToggleFavourite }) {
  const metaInfo = useMemo(
    () => `${product.category}, в наличии ${product.stock} шт., рейтинг ${product.rating}`,
    [product.category, product.rating, product.stock],
  );

  const handleAddToCart = useCallback(() => {
    onAddToCart(product.id);
  }, [onAddToCart, product.id]);

  const handleToggleFavourite = useCallback(() => {
    onToggleFavourite(product.id);
  }, [onToggleFavourite, product.id]);

  return (
    <article className="product-card">
      <div
        className="product-image"
        style={{ '--product-color': product.color }}
        aria-hidden="true"
      />
      <div className="product-content">
        <p className="product-meta">{metaInfo}</p>
        <h2>{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <strong>{formatPrice(product.price)}</strong>
          <div className="product-actions">
            <button
              className="secondary-button"
              type="button"
              onClick={handleToggleFavourite}
            >
              {isFavourite ? 'Убрать' : 'В избранное'}
            </button>
            <button className="primary-button" type="button" onClick={handleAddToCart}>
              В корзину
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
