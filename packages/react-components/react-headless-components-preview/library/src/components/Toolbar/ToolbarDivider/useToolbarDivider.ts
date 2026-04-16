'use client';

import type * as React from 'react';
import { useToolbarDivider_unstable } from '@fluentui/react-toolbar';

import type { ToolbarDividerProps, ToolbarDividerState } from './ToolbarDivider.types';
import { stringifyDataAttribute } from '../../../utils';

/**
 * Returns the state for a ToolbarDivider component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderToolbarDivider`.
 */
export const useToolbarDivider = (props: ToolbarDividerProps, ref: React.Ref<HTMLElement>): ToolbarDividerState => {
  'use no memo';

  const state: ToolbarDividerState = useToolbarDivider_unstable(props, ref);

  // Set data-vertical based on the resolved orientation of the divider (already inverted relative to the toolbar).
  state.root['data-vertical'] = stringifyDataAttribute(state.vertical);

  return state;
};
