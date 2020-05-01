import * as React from 'react';

export type GetContextRefs = (needleRef: NodeRef) => NodeRef[];
export type GetRefs = () => NodeRef[];
export type NodeRef<T extends Node = Node> = React.MutableRefObject<T>;

export type NestingContextValue = {
  getContextRefs: GetContextRefs;
  register: (ref: NodeRef) => void;
  unregister: (ref: NodeRef) => void;
};

export interface NestedContextProps {
  value: NestingContextValue;
}

export interface NestingProps {
  children: (getRefs: GetRefs, ref: NodeRef) => React.ReactElement<any>;
}
