import React from 'react';

function InnerComponent({ name }: { name: string }) {
  return <div>{name}</div>;
}

export const MemoizedComponent = React.memo(InnerComponent);
