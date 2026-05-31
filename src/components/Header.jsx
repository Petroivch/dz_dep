import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

function Header() {
  const { cartCount, favouriteCount } = useShop();

  return (
    <header className="site-header">
      <NavLink to="/" className="logo" aria-label="На главную">
        Домашний магазин
      </NavLink>
      <nav className="main-nav" aria-label="Основная навигация">
        <NavLink to="/">Каталог</NavLink>
        <NavLink to="/favourites">Избранное ({favouriteCount})</NavLink>
        <NavLink to="/cart">Корзина ({cartCount})</NavLink>
      </nav>
    </header>
  );
}

export default memo(Header);
