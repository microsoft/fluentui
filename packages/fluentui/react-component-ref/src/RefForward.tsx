import * as PropTypes from 'prop-types';
import * as React from 'react';

import handleRef from './handleRef';
import { RefProps, refPropType } from './types';

export default class RefForward extends React.Component<RefProps> {
  static displayName = 'RefForward';

  // TODO: use Babel plugin for this
  static propTypes =
    process.env.NODE_ENV !== 'production'
      ? {
          children: PropTypes.element.isRequired,
          innerRef: refPropType.isRequired,
        }
      : {};

  handleRefOverride = (node: HTMLElement) => {
    const { children, innerRef } = this.props;

    handleRef((children as React.ReactElement<any> & { ref: React.Ref<any> }).ref, node);
    handleRef(innerRef, node);
  };

  render() {
    const { children } = this.props;

    return React.cloneElement(children, {
      ref: this.handleRefOverride,
    });
  }
}
