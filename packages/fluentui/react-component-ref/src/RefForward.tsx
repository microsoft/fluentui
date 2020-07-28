import * as React from 'react';
import { handleRef, RefProps } from './utils';

export class RefForward extends React.Component<RefProps> {
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
