import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithProviders } from '../test/renderWithProviders';

beforeEach(() => {
  window.localStorage.clear();
});

test('отображает каталог товаров на главной странице', async () => {
  renderWithProviders(<App />);

  expect(
    await screen.findByRole('heading', { name: 'Каталог товаров' }),
  ).toBeInTheDocument();
  expect(screen.getByText('Настольная лампа')).toBeInTheDocument();
  expect(screen.getByText('Городской рюкзак')).toBeInTheDocument();
});

test('открывает маршрут избранного и показывает сохраненный товар', async () => {
  window.localStorage.setItem(
    'shop:favourites',
    JSON.stringify([{ id: 'lamp', quantity: 2 }]),
  );

  renderWithProviders(<App />, { route: '/favourites' });

  expect(await screen.findByRole('heading', { name: 'Избранное' })).toBeInTheDocument();
  expect(screen.getByText('Настольная лампа')).toBeInTheDocument();
  expect(
    screen.getByLabelText('Количество товара Настольная лампа'),
  ).toHaveTextContent('2');
});

test('удаляет товар из избранного и обновляет localStorage', async () => {
  window.localStorage.setItem(
    'shop:favourites',
    JSON.stringify([{ id: 'lamp', quantity: 1 }]),
  );

  renderWithProviders(<App />, { route: '/favourites' });

  expect(await screen.findByText('Настольная лампа')).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: 'Удалить' }));

  expect(screen.getByText('В избранном пока пусто')).toBeInTheDocument();
  await waitFor(() => {
    expect(window.localStorage.getItem('shop:favourites')).toBe('[]');
  });
});

test('добавляет товар в корзину и показывает его на маршруте корзины', async () => {
  renderWithProviders(<App />);

  expect(await screen.findByText('Портативная колонка')).toBeInTheDocument();
  const addButtons = screen.getAllByRole('button', { name: 'В корзину' });
  await userEvent.click(addButtons[0]);
  await userEvent.click(screen.getByRole('link', { name: 'Корзина (1)' }));

  expect(await screen.findByRole('heading', { name: 'Корзина' })).toBeInTheDocument();
  expect(screen.getByText('Настольная лампа')).toBeInTheDocument();
  expect(screen.getByText('2 490 ₽')).toBeInTheDocument();
});

test('показывает страницу 404 для неизвестного маршрута', async () => {
  renderWithProviders(<App />, { route: '/missing-page' });

  expect(
    await screen.findByRole('heading', { name: 'Страница не найдена' }),
  ).toBeInTheDocument();
});
