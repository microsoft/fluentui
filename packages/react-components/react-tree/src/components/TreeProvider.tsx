import * as React from 'react';
import { SubtreeContext, SubtreeContextValue, TreeContextValue, TreeContext } from '../contexts';

/**
 * @internal
 */
const rootSubtreeContextValue: SubtreeContextValue = {
  level: 1,
  contextType: 'subtree',
};

export const TreeProvider = (props: React.ProviderProps<TreeContextValue | SubtreeContextValue>) => {
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
