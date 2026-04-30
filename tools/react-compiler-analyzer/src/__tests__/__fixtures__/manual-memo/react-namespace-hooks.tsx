import * as React from 'react';

const CountDisplay = React.memo(function CountDisplay(props: { count: number; label: string }) {
  return (
    <span>
      {props.label}: {props.count}
    </span>
  );
});

export function TestButton(props: { onClick?: () => void; label?: string; multiplier?: number }) {
  const [count, setCount] = React.useState(0);

  const handleClick = React.useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  const displayCount = React.useMemo(() => count * (props.multiplier ?? 1), [count, props.multiplier]);

  const displayLabel = props.label ?? 'Test Button';

  return (
    <button onClick={handleClick}>
      <CountDisplay count={displayCount} label={displayLabel} />
    </button>
  );
}
