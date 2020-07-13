import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as ReactIs from 'react-is';

import { RefFindNode } from './RefFindNode';
import { RefForward } from './RefForward';
import { RefProps, refPropType } from './types';

export const Ref: React.FunctionComponent<RefProps> = props => {
  const { children, innerRef, ...rest } = props;

  const child = React.Children.only(children);
  const ElementType = ReactIs.isForwardRef(child) ? RefForward : RefFindNode;
  const childWithProps = child && rest && Object.keys(rest).length > 0 ? React.cloneElement(child, rest) : child;

  return <ElementType innerRef={innerRef}>{childWithProps}</ElementType>;
};

Ref.displayName = 'Ref';
// TODO: use Babel plugin for this
if (process.env.NODE_ENV !== 'production') {
  Ref.propTypes = {
    children: PropTypes.element.isRequired,
    innerRef: refPropType.isRequired,
  };
}
