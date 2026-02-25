import * as React from 'react';
import * as ReactIs from 'react-is';
import * as ReactDOM from 'react-dom';

import { handleRef } from './utils';

export interface RefProps {
  children: React.ReactElement;

  /**
   * Called when a child component will be mounted or updated.
   *
   * @param node - Referred node.
   */
  innerRef: React.Ref<HTMLElement>;
}

export interface RefState {
  kind: 'self' | 'direct' | 'find' | null;
}

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

export class Ref extends React.Component<RefProps, RefState> {
  nodeForFind?: Node | null;
  nodeForDirect?: Node | null;

  state = { kind: null };

  static getDerivedStateFromProps(props: RefProps): RefState {
    const child = React.Children.only(props.children);

    if (child.type === Ref) {
      return { kind: 'self' };
    }

    if (typeof child.type === 'string' || ReactIs.isForwardRef(child)) {
      return { kind: 'direct' };
    }

    return { kind: 'find' };
  }

  handleRefOverride = (node: HTMLElement) => {
    const { children, innerRef } = this.props;

    handleRef((children as React.ReactElement & { ref: React.Ref<any> }).ref, node);
    handleRef(innerRef, node);

    this.nodeForDirect = node;
  };

  handleSelfOverride = (node: HTMLElement) => {
    const { children, innerRef } = this.props;

    handleRef((children as React.ReactElement<RefProps>).props.innerRef, node);
    handleRef(innerRef, node);
  };

  componentDidMount() {
    if (this.state.kind === 'find') {
      let currentNode = ReactDOM.findDOMNode(this);

      if (process.env.NODE_ENV !== 'production') {
        if (isFiberRef(currentNode)) {
          currentNode = null;
        }
      }

      this.nodeForFind = currentNode;
      handleRef(this.props.innerRef, currentNode);
    }
  }

  componentDidUpdate(prevProps: RefProps) {
    if (this.state.kind === 'direct') {
      if (prevProps.innerRef !== this.props.innerRef) {
        handleRef(this.props.innerRef, this.nodeForDirect);
      }
    } else if (this.state.kind === 'find') {
      let currentNode = ReactDOM.findDOMNode(this);

      if (process.env.NODE_ENV !== 'production') {
        if (isFiberRef(currentNode)) {
          currentNode = null;
        }
      }

      const isNodeChanged = this.nodeForFind !== currentNode;
      const isRefChanged = prevProps.innerRef !== this.props.innerRef;

      if (isNodeChanged) {
        this.nodeForFind = currentNode;
      }

      if (isNodeChanged || isRefChanged) {
        handleRef(this.props.innerRef, currentNode);
      }
    }
  }

  componentWillUnmount() {
    if (this.state.kind === 'find') {
      handleRef(this.props.innerRef, null);
      this.nodeForFind = null;
    }
  }

  render() {
    const { children, innerRef, ...rest } = this.props;
    const childWithProps = rest && Object.keys(rest).length > 0 ? React.cloneElement(children, rest) : children;

    if (this.state.kind === 'find') {
      return childWithProps;
    }

    if (this.state.kind === 'direct') {
      return React.cloneElement(childWithProps, {
        ref: this.handleRefOverride,
      });
    }

    if (this.state.kind === 'self') {
      return React.cloneElement(childWithProps, {
        innerRef: this.handleSelfOverride,
      });
    }

    return null;
  }
}
