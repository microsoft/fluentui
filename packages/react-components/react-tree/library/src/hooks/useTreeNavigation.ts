'use client';

import type * as React from 'react';
import { useFocusFinders, useFocusedElementChange } from '@fluentui/react-tabster';
import type { TreeNavigationData_unstable, TreeNavigationMode } from '../components/Tree/Tree.types';
import { useTreeNavigationBase } from './useTreeNavigationBase';

/***
 * Hook used to manage navigation in the tree.
 *
 * @param navigationMode - the navigation mode of the tree, 'tree' (default) or 'treegrid'
 */
export function useTreeNavigation(navigationMode: TreeNavigationMode = 'tree'): {
  navigate: (data: TreeNavigationData_unstable, focusOptions?: FocusOptions) => HTMLElement | null;
  treeRef: React.RefCallback<HTMLElement>;
  forceUpdateRovingTabIndex: () => void;
} {
  const { findFirstFocusable } = useFocusFinders();

  return useTreeNavigationBase(navigationMode, { findFirstFocusable, useFocusedElementChange });
}
