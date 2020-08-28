import * as React from 'react';

import { NestingContext } from './NestingContext';
import { NestingContextValue, NestingProps, NodeRef } from './types';

type NestingChildInnerProps = NestingContextValue & NestingProps;

class NestingChildInner<T extends Node> extends React.Component<NestingChildInnerProps> {
  childRef = React.createRef<T>();

  componentDidMount() {
    this.props.register(this.childRef as any);
  }

  componentWillUnmount() {
    this.props.unregister(this.childRef as any);
  }

  getRefs = (): NodeRef[] => this.props.getContextRefs(this.childRef as any);

  render() {
    return this.props.children(this.getRefs, this.childRef as any);
  }
}

export const NestingChild: React.FunctionComponent<NestingProps> = ({ children }) => (
  <NestingContext.Consumer>
    {(contextValue: NestingContextValue) => <NestingChildInner {...contextValue}>{children}</NestingChildInner>}
  </NestingContext.Consumer>
);
