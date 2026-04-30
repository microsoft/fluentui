import { useCallback, useState } from 'react';

export function MyComponent() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  return <button onClick={handleClick}>{count}</button>;
}
