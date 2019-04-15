import * as React from 'react';

export const Overflow = (props: React.HTMLAttributes<HTMLDivElement>): JSX.Element => {
  const { children } = props;

  return <div style={{ overflowY: 'scroll', overflowX: 'hidden', height: 300 }}>{children}</div>;
};
