import { memo } from 'react';

function InnerComponent({ value }: { value: number }) {
  return <span>{value}</span>;
}

export const MemoWithComparator = memo(InnerComponent, (prev, next) => prev.value === next.value);
