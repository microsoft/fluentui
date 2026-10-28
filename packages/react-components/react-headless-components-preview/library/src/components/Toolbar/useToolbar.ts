'use client';

import type * as React from 'react';
import { useMergedRefs } from '@fluentui/react-utilities';
import { useToolbarBase_unstable, useToolbarContextValues_unstable } from '@fluentui/react-toolbar';

import type { ToolbarProps, ToolbarState, ToolbarContextValues } from './Toolbar.types';
import { toDataAttributeValue } from '../../utils';
import { useArrowNavigationGroup } from '../../hooks/focusgroup';

/**
 * Returns the state for a Toolbar component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderToolbar`.
 */
export const useToolbar = (props: ToolbarProps, ref: React.Ref<HTMLElement>): ToolbarState => {
  const state: ToolbarState = useToolbarBase_unstable(props, ref);

  const { ref: focusgroupRef, ...arrowNavigationAttributes } = useArrowNavigationGroup({
    axis: state.vertical ? 'vertical' : 'horizontal',
    circular: true,
  });

  Object.assign(state.root, arrowNavigationAttributes);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-vertical'] = toDataAttributeValue(state.vertical);

  // eslint-disable-next-line react-hooks/immutability
  state.root.ref = useMergedRefs(state.root.ref, focusgroupRef);

  return state;
};

/**
 * Returns the context of the toolbar, which is used to pass information about the toolbar to its children.
 */
export { useToolbarContext_unstable as useToolbarContext } from '@fluentui/react-toolbar';

/**
 * Maps the state of the toolbar to the values that are passed through context to its children.
 */
export const useToolbarContextValues = useToolbarContextValues_unstable as (
  state: ToolbarState,
) => ToolbarContextValues;
