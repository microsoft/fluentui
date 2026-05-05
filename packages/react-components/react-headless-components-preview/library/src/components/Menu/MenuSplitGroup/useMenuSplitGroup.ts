'use client';

import type * as React from 'react';
import { useMenuSplitGroup_unstable } from '@fluentui/react-menu';
import type { MenuSplitGroupProps, MenuSplitGroupState } from './MenuSplitGroup.types';

/**
 * Returns the state for a MenuSplitGroup.
 *
 * Delegates to v9's `useMenuSplitGroup_unstable`. **Note:** v9's hook
 * imports `useFocusFinders` from `@fluentui/react-tabster` for arrow-key
 * navigation between the two items in the group. There is no Base variant
 * yet, so consumers of MenuSplitGroup will pull tabster transitively. This
 * is consistent with the existing tabster transitive dep already accepted
 * elsewhere in the headless Menu surface.
 */
export const useMenuSplitGroup = (props: MenuSplitGroupProps, ref: React.Ref<HTMLElement>): MenuSplitGroupState => {
  return useMenuSplitGroup_unstable(props, ref);
};
