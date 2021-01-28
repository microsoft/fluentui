import * as React from 'react';

export const FakeProvider = ({ theme, children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};
