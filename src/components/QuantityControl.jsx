import { memo, useCallback } from 'react';

function QuantityControl({ label, onDecrease, onIncrease, quantity }) {
  const handleDecrease = useCallback(() => {
    onDecrease();
  }, [onDecrease]);

  const handleIncrease = useCallback(() => {
    onIncrease();
  }, [onIncrease]);

  return (
    <div className="quantity-control" aria-label={label}>
      <button type="button" onClick={handleDecrease} aria-label="Уменьшить количество">
        -
      </button>
      <span>{quantity}</span>
      <button type="button" onClick={handleIncrease} aria-label="Увеличить количество">
        +
      </button>
    </div>
  );
}

export default memo(QuantityControl);
