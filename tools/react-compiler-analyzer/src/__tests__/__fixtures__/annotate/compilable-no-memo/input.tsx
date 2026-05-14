import { useState, useEffect, useRef } from 'react';

// Regular function component
export function RegularComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}

// Arrow function component
export const ArrowComponent = ({ label }: { label: string }) => {
  const [active, setActive] = useState(false);
  return (
    <span onClick={() => setActive(a => !a)}>
      {label}: {active ? 'on' : 'off'}
    </span>
  );
};

// Custom hook
export function useCounter(initial: number) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount(c => c + 1);
  return { count, increment };
}

// Component with multiple hooks but no memo
export function MultiHookComponent({ id }: { id: string }) {
  const [value, setValue] = useState('');
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, [id]);
  return <input ref={ref} value={value} onChange={e => setValue(e.target.value)} />;
}
