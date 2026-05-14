import { useState } from 'react';

export function SingleQuoteAnnotated() {
  'use memo';
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

export const DoubleQuoteAnnotated = ({ label }: { label: string }) => {
  'use memo';
  const [active, setActive] = useState(false);
  return (
    <span onClick={() => setActive(a => !a)}>
      {label}: {active ? 'on' : 'off'}
    </span>
  );
};
