import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { handleRef } from './handleRef';
import { RefProps, refPropType } from './types';

export class RefFindNode extends React.Component<RefProps> {
  static displayName = 'RefFindNode';

  // TODO: use Babel plugin for this
  static propTypes =
    process.env.NODE_ENV !== 'production'
      ? {
          children: PropTypes.element.isRequired,
          innerRef: refPropType.isRequired,
        }
      : {};

  prevNode: Node | null = null;

  componentDidMount() {
    this.prevNode = ReactDOM.findDOMNode(this);

    handleRef(this.props.innerRef, this.prevNode);
  }

  componentDidUpdate(prevProps: RefProps) {
    const currentNode = ReactDOM.findDOMNode(this);

    if (this.prevNode !== currentNode) {
      this.prevNode = currentNode;
      handleRef(this.props.innerRef, currentNode);
    }

    if (prevProps.innerRef !== this.props.innerRef) {
      handleRef(this.props.innerRef, currentNode);
    }
  }

  componentWillUnmount() {
    handleRef(this.props.innerRef, null);

    delete this.prevNode;
  }

  render() {
    const { children } = this.props;

    return children;
  }
}
