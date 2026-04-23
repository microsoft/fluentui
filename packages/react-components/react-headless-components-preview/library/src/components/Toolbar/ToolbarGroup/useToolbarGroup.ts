'use client';

import type * as React from 'react';
import { useToolbarGroup_unstable } from '@fluentui/react-toolbar';

import type { ToolbarGroupProps, ToolbarGroupState } from './ToolbarGroup.types';
import { stringifyDataAttribute } from '../../../utils';

/**
 * Returns the state for a ToolbarGroup component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderToolbarGroup`.
 */
export const useToolbarGroup = (props: ToolbarGroupProps, ref: React.Ref<HTMLDivElement>): ToolbarGroupState => {
  'use no memo';

  const state: ToolbarGroupState = useToolbarGroup_unstable(props, ref);

  // Set data-vertical based on the toolbar context orientation.
  state.root['data-vertical'] = stringifyDataAttribute(state.vertical);

  return state;
};
