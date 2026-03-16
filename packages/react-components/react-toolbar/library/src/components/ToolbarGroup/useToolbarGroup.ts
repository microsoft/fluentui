'use client';

import * as React from 'react';

import type { ToolbarGroupProps, ToolbarGroupState } from './ToolbarGroup.types';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { useToolbarContext_unstable } from '../Toolbar/ToolbarContext';

/**
 * Given user props, defines default props for the Group
 * @param props - User provided props to the Group component.
 * @param ref - User provided ref to be passed to the Group component.
 */
export const useToolbarGroup_unstable = (
  props: ToolbarGroupProps,
  ref: React.Ref<HTMLDivElement>,
): ToolbarGroupState => {
  return useToolbarGroupBase_unstable(props, ref);
};

/**
 * Base hook that builds Toolbar Group state for behavior and structure only.
 * It does not provide any design-related defaults.
 *
 * @internal
 * @param props - User provided props to the Group component.
 * @param ref - User provided ref to be passed to the Group component.
 */
export const useToolbarGroupBase_unstable = (
  props: ToolbarGroupProps,
  ref: React.Ref<HTMLDivElement>,
): ToolbarGroupState => {
  const vertical = useToolbarContext_unstable(ctx => ctx.vertical);

  return {
    components: {
      root: 'div',
    },
    root: slot.always(
      getIntrinsicElementProps<React.HTMLAttributes<HTMLDivElement>>('div', {
        ref,
        role: 'presentation',
        ...props,
      }),
      { elementType: 'div' },
    ),
    vertical,
  };
};
