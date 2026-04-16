'use client';

import type * as React from 'react';
import {
  useToolbar_unstable,
  useToolbarContext_unstable,
  useToolbarContextValues_unstable,
} from '@fluentui/react-toolbar';

import type { ToolbarProps, ToolbarState, ToolbarContextValues } from './Toolbar.types';
import { stringifyDataAttribute } from '../../utils';

/**
 * Returns the state for a Toolbar component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderToolbar`.
 */
export const useToolbar = (props: ToolbarProps, ref: React.Ref<HTMLElement>): ToolbarState => {
  'use no memo';

  const state: ToolbarState = useToolbar_unstable(props, ref);

  // Set data attributes for vertical and size states to simplify styling of these states.
  state.root['data-vertical'] = stringifyDataAttribute(state.vertical);
  state.root['data-size'] = state.size;

  return state;
};

/**
 * Returns the context of the toolbar, which is used to pass information about the toolbar to its children.
 */
export const useToolbarContext = useToolbarContext_unstable;

/**
 * Maps the state of the toolbar to the values that are passed through context to its children.
 */
export const useToolbarContextValues = useToolbarContextValues_unstable as (
  state: ToolbarState,
) => ToolbarContextValues;
