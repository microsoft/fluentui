import * as React from 'react';
import { SubtreeContext, SubtreeContextValue, TreeContextValue, TreeContext } from '../contexts';

/**
 * @internal
 */
const rootSubtreeContextValue: SubtreeContextValue = {
  level: 1,
  contextType: 'subtree',
};

// eslint-disable-next-line @typescript-eslint/no-deprecated
export const TreeProvider = (props: React.ProviderProps<TreeContextValue | SubtreeContextValue>): JSX.Element => {
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

// eslint-disable-next-line @typescript-eslint/no-deprecated
export const TreeRootReset = (props: TreeRootResetProps): JSX.Element => (
  <SubtreeContext.Provider value={undefined as unknown as SubtreeContextValue}>
    {props.children}
  </SubtreeContext.Provider>
);
