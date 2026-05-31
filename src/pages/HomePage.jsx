import { useCallback } from 'react';
import ProductCard from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';

function HomePage() {
  const { addToCart, favouriteIds, toggleFavourite } = useShop();

  const handleAddToCart = useCallback(
    (productId) => {
      addToCart(productId);
    },
    [addToCart],
  );

  const handleToggleFavourite = useCallback(
    (productId) => {
      toggleFavourite(productId);
    },
    [toggleFavourite],
  );

  return (
    <section className="page-section">
      <div className="page-heading">
        <p>Интернет-магазин</p>
        <h1>Каталог товаров</h1>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavourite={favouriteIds.has(product.id)}
            onAddToCart={handleAddToCart}
            onToggleFavourite={handleToggleFavourite}
          />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
