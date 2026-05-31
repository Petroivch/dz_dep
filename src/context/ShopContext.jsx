import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getProductById } from '../data/products';

const FAVOURITES_KEY = 'shop:favourites';
const CART_KEY = 'shop:cart';

const ShopContext = createContext(null);

const readStorage = (key, fallback) => {
  try {
    const savedValue = window.localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : fallback;
  } catch {
    return fallback;
  }
};

const saveStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return undefined;
  }
};

const attachProducts = (items) =>
  items
    .map((item) => {
      const product = getProductById(item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

export function ShopProvider({ children }) {
  const [favourites, setFavourites] = useState(() =>
    readStorage(FAVOURITES_KEY, []),
  );
  const [cart, setCart] = useState(() => readStorage(CART_KEY, []));

  useEffect(() => {
    saveStorage(FAVOURITES_KEY, favourites);
  }, [favourites]);

  useEffect(() => {
    saveStorage(CART_KEY, cart);
  }, [cart]);

  const favouriteItems = useMemo(() => attachProducts(favourites), [favourites]);
  const cartItems = useMemo(() => attachProducts(cart), [cart]);

  const favouriteIds = useMemo(
    () => new Set(favourites.map((item) => item.id)),
    [favourites],
  );

  const favouriteCount = useMemo(
    () => favourites.reduce((sum, item) => sum + item.quantity, 0),
    [favourites],
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems],
  );

  const toggleFavourite = useCallback((productId) => {
    setFavourites((currentItems) => {
      const isAdded = currentItems.some((item) => item.id === productId);

      if (isAdded) {
        return currentItems.filter((item) => item.id !== productId);
      }

      return [...currentItems, { id: productId, quantity: 1 }];
    });
  }, []);

  const removeFavourite = useCallback((productId) => {
    setFavourites((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }, []);

  const updateFavouriteQuantity = useCallback((productId, change) => {
    setFavourites((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    );
  }, []);

  const addToCart = useCallback((productId) => {
    setCart((currentItems) => {
      const currentItem = currentItems.find((item) => item.id === productId);

      if (currentItem) {
        return currentItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { id: productId, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }, []);

  const updateCartQuantity = useCallback((productId, change) => {
    setCart((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const value = useMemo(
    () => ({
      cartCount,
      cartItems,
      cartTotal,
      favouriteCount,
      favouriteIds,
      favouriteItems,
      addToCart,
      removeFavourite,
      removeFromCart,
      toggleFavourite,
      updateCartQuantity,
      updateFavouriteQuantity,
    }),
    [
      cartCount,
      cartItems,
      cartTotal,
      favouriteCount,
      favouriteIds,
      favouriteItems,
      addToCart,
      removeFavourite,
      removeFromCart,
      toggleFavourite,
      updateCartQuantity,
      updateFavouriteQuantity,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export const useShop = () => {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error('useShop должен использоваться внутри ShopProvider');
  }

  return context;
};
