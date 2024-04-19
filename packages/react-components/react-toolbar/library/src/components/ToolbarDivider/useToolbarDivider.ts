import * as React from 'react';
import { ToolbarDividerProps, ToolbarDividerState } from './ToolbarDivider.types';
import { useDivider_unstable } from '@fluentui/react-divider';
import { useToolbarContext_unstable } from '../Toolbar/ToolbarContext';

/**
 * Create the state required to render ToolbarDivider.
 *
 * The returned state can be modified with hooks such as useToolbarDividerStyles_unstable,
 * before being passed to renderToolbar_unstable.
 *
 * @param props - props from this instance of ToolbarDivider
 * @param ref - reference to root HTMLElement of ToolbarDivider
 */
export const useToolbarDivider_unstable = (
  props: ToolbarDividerProps,
  ref: React.Ref<HTMLElement>,
): ToolbarDividerState => {
  const vertical = useToolbarContext_unstable(ctx => ctx.vertical);
  return useDivider_unstable({ vertical: !vertical, ...props }, ref);
};
