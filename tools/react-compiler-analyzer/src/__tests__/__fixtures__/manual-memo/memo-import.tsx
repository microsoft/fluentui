import { memo } from 'react';

function InnerComponent({ value }: { value: number }) {
  return <span>{value}</span>;
}

export const MemoizedComponent = memo(InnerComponent);
