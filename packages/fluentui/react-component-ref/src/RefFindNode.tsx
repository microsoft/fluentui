import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { handleRef, RefProps } from './utils';

// ========================================================
// react/packages/react-reconciler/src/ReactFiber.js
// ========================================================

type Fiber = {
  // Tag identifying the type of fiber.
  tag: string;
  // The resolved function/class/ associated with this fiber.
  type: any;
};

/**
 * Detects if a passed element is a Fiber object instead of an element. Is needed as `ReactDOM.findDOMNode()` returns
 * a Fiber in `react-test-renderer` that can cause issues with tests. Is used only in non-production env.
 *
 * @see https://github.com/facebook/react/issues/7371#issuecomment-317396864
 * @see https://github.com/Semantic-Org/Semantic-UI-React/issues/4061#issuecomment-694895617
 */
function isFiberRef(node: Element | Fiber | Text | null): boolean {
  if (node === null) {
    return false;
  }

  if (node instanceof Element || node instanceof Text) {
    return false;
  }

  return !!(node.type && node.tag);
}

export class RefFindNode extends React.Component<RefProps> {
  prevNode: Node | null = null;

  componentDidMount() {
    let currentNode = ReactDOM.findDOMNode(this);

    if (process.env.NODE_ENV !== 'production') {
      if (isFiberRef(currentNode)) {
        currentNode = null;
      }
    }

    this.prevNode = currentNode;
    handleRef(this.props.innerRef, currentNode);
  }

  componentDidUpdate(prevProps: RefProps) {
    let currentNode = ReactDOM.findDOMNode(this);

    if (process.env.NODE_ENV !== 'production') {
      if (isFiberRef(currentNode)) {
        currentNode = null;
      }
    }

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
