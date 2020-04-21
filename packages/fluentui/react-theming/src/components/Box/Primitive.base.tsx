import * as React from 'react';
import cx from 'classnames';

export interface IPrimitiveProps extends React.AllHTMLAttributes<any> {
  as?: any;
  classes?: { root?: string };
  slots?: {};
}

export const PrimitiveBase = (props: React.PropsWithChildren<IPrimitiveProps>) => {
  const { as: Root = 'div', className, classes = {}, slots, ...rest } = props;

  return <Root {...rest} className={cx(className, classes.root)} />;
};
