import * as React from 'react';
import cx from 'classnames';

export interface IPrimitiveProps extends React.AllHTMLAttributes<any> {
  as?: any;
  classes?: { root?: string };
  slots?: {};
}

export const PrimitiveBase = (props: React.PropsWithChildren<IPrimitiveProps>) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as: Root = 'div', className, classes = {}, slots, ...rest } = props;

  return <Root {...rest} className={cx(className, classes.root)} />;
};
