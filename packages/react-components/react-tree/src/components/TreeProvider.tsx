import * as React from 'react';
import {
  SubtreeContext,
  SubtreeContextValue,
  TreeContextValue,
  TreeContext,
  defaultRootTreeContextValue,
} from '../contexts';

export const TreeProvider = React.memo((props: React.ProviderProps<TreeContextValue | SubtreeContextValue>) => {
  if (props.value.contextType === 'subtree') {
    return <SubtreeContext.Provider value={props.value}>{props.children}</SubtreeContext.Provider>;
  }
  return (
    <TreeContext.Provider value={props.value}>
      <SubtreeContext.Provider value={defaultRootTreeContextValue}>{props.children}</SubtreeContext.Provider>
    </TreeContext.Provider>
  );
});

TreeProvider.displayName = 'TreeProvider';
