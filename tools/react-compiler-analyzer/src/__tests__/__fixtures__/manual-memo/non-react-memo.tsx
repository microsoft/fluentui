// Local useMemo function — NOT from react
function useMemo(fn: () => number) {
  return fn();
}

export function MyComponent({ value }: { value: number }) {
  const computed = useMemo(() => value * 2);
  return <div>{computed}</div>;
}
