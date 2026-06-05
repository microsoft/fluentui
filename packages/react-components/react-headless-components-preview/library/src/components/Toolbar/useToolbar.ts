'use client';

import type * as React from 'react';
import {
  useToolbarBase_unstable,
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
  const state: ToolbarState = useToolbarBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root.focusgroup = `toolbar ${state.vertical ? 'block' : 'inline'} wrap`;
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-vertical'] = stringifyDataAttribute(state.vertical);

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
