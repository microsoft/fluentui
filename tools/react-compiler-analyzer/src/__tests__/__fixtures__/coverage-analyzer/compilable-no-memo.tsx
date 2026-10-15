import { useState } from 'react';

export function CompilableNoMemo() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
