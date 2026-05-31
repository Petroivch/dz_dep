export const products = [
  {
    id: 'lamp',
    name: 'Настольная лампа',
    category: 'Дом',
    price: 2490,
    stock: 12,
    rating: 4.8,
    color: '#f2b84b',
    description: 'Мягкий свет для рабочего стола и вечернего чтения.',
  },
  {
    id: 'backpack',
    name: 'Городской рюкзак',
    category: 'Аксессуары',
    price: 3890,
    stock: 8,
    rating: 4.7,
    color: '#3b82f6',
    description: 'Плотная ткань, отделение для ноутбука и два боковых кармана.',
  },
  {
    id: 'kettle',
    name: 'Электрический чайник',
    category: 'Кухня',
    price: 3190,
    stock: 15,
    rating: 4.6,
    color: '#16a34a',
    description: 'Корпус из нержавеющей стали и автоматическое отключение.',
  },
  {
    id: 'speaker',
    name: 'Портативная колонка',
    category: 'Техника',
    price: 4590,
    stock: 6,
    rating: 4.9,
    color: '#e11d48',
    description: 'Чистый звук, влагозащита и до 12 часов работы.',
  },
];

export const getProductById = (productId) =>
  products.find((product) => product.id === productId);
