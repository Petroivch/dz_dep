import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section className="page-section">
      <div className="empty-state">
        <h1>Страница не найдена</h1>
        <p>Проверьте адрес или вернитесь в каталог.</p>
        <Link className="primary-link" to="/">
          Перейти в каталог
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
