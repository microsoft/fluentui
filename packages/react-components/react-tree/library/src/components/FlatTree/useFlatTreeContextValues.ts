'use client';

import * as React from 'react';
import type { TreeContextValue } from '../../contexts';
import type { FlatTreeContextValues, FlatTreeState } from './FlatTree.types';

export const useFlatTreeContextValues_unstable = (state: FlatTreeState): FlatTreeContextValues => {
  const {
    openItems,
    level,
    contextType,
    treeType,
    checkedItems,
    selectionMode,
    navigationMode,
    appearance,
    size,
    requestTreeResponse,
    forceUpdateRovingTabIndex,
  } = state;

  const tree = React.useMemo<TreeContextValue>(
    () => ({
      treeType,
      size,
      openItems,
      appearance,
      checkedItems,
      selectionMode,
      navigationMode,
      contextType,
      level,
      requestTreeResponse,
      forceUpdateRovingTabIndex,
    }),
    [
      treeType,
      size,
      openItems,
      appearance,
      checkedItems,
      selectionMode,
      navigationMode,
      contextType,
      level,
      requestTreeResponse,
      forceUpdateRovingTabIndex,
    ],
  );

  return { tree };
};
