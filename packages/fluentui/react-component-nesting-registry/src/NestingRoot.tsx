import * as React from 'react';

import { RefStack } from './utils/RefStack';
import { NestingContext } from './NestingContext';
import { NestingProps, NodeRef } from './types';

export class NestingRoot<T extends Node> extends React.Component<NestingProps> {
  registry = new RefStack();
  parentRef = React.createRef<T>();

  componentDidMount() {
    this.registry.register(this.parentRef as any);
  }

  componentWillUnmount() {
    this.registry.unregister(this.parentRef as any);
  }

  getRefs = (): NodeRef[] => this.registry.getContextRefs(this.parentRef as any);

  render() {
    return (
      <NestingContext.Provider value={this.registry}>
        {this.props.children(this.getRefs, this.parentRef as any)}
      </NestingContext.Provider>
    );
  }
}
