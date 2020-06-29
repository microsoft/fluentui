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

  currentNode: Node | null = null;

  handleRefOverride = (node: HTMLElement) => {
    const { children, innerRef } = this.props;

    handleRef((children as React.ReactElement & { ref: React.Ref<any> }).ref, node);
    handleRef(innerRef, node);

    this.currentNode = node;
  };

  componentDidUpdate(prevProps: RefProps) {
    if (prevProps.innerRef !== this.props.innerRef) {
      handleRef(this.props.innerRef, this.currentNode);
    }
  }

  componentWillUnmount() {
    delete this.currentNode;
  }

  render() {
    const { children } = this.props;

    return React.cloneElement(children, {
      ref: this.handleRefOverride,
    });
  }
}
