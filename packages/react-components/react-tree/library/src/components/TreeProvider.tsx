import * as React from 'react';
import { SubtreeContext, SubtreeContextValue, TreeContextValue, TreeContext } from '../contexts';
import type { JSXElement } from '@fluentui/react-utilities';

/**
 * @internal
 */
const rootSubtreeContextValue: SubtreeContextValue = {
  level: 1,
  contextType: 'subtree',
};
export const TreeProvider = (props: React.ProviderProps<TreeContextValue | SubtreeContextValue>): JSXElement => {
  if (props.value.contextType === 'subtree') {
    return <SubtreeContext.Provider value={props.value}>{props.children}</SubtreeContext.Provider>;
  }
  return (
    <TreeContext.Provider value={props.value}>
      <SubtreeContext.Provider value={rootSubtreeContextValue}>{props.children}</SubtreeContext.Provider>
    </TreeContext.Provider>
  );
};

TreeProvider.displayName = 'TreeProvider';

export type TreeRootResetProps = {
  children?: React.ReactNode;
};
export const TreeRootReset = (props: TreeRootResetProps): JSXElement => (
  <SubtreeContext.Provider value={undefined as unknown as SubtreeContextValue}>
    {props.children}
  </SubtreeContext.Provider>
);
