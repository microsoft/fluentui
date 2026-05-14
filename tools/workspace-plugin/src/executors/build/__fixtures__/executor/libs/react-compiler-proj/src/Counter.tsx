import * as React from 'react';

export function Counter({ initialCount = 0 }: { initialCount?: number }) {
  const [count, setCount] = React.useState(initialCount);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
