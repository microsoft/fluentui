import * as React from 'react';
import * as ReactIs from 'react-is';

import { RefFindNode } from './RefFindNode';
import { RefForward } from './RefForward';
import { RefProps } from './utils';

export const Ref: React.FunctionComponent<RefProps> = props => {
  const { children, innerRef, ...rest } = props;

  const child = React.Children.only(children);
  const ElementType = ReactIs.isForwardRef(child) ? RefForward : RefFindNode;
  const childWithProps = child && rest && Object.keys(rest).length > 0 ? React.cloneElement(child, rest) : child;

  return <ElementType innerRef={innerRef}>{childWithProps}</ElementType>;
};
