// Local implementations — NOT from react
function useMemo(fn: () => number) {
  return fn();
}
function useCallback<T>(fn: T) {
  return fn;
}
function memo(component: Function) {
  return component;
}

function InnerComponent({ value }: { value: number }) {
  return <span>{value}</span>;
}

export const MemoComponent = memo(InnerComponent);

export function MyComponent({ value }: { value: number }) {
  const computed = useMemo(() => value * 2);
  const handleClick = useCallback(() => void 0);
  return <div onClick={handleClick}>{computed}</div>;
}
