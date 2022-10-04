import * as React from 'react';
import { ToolbarDividerProps, ToolbarDividerState } from './ToolbarDivider.types';
import { useDivider_unstable } from '@fluentui/react-divider';
import { useToolbarContext } from '../Toolbar/ToolbarContext';

/**
 * Create the state required to render Toolbar.
 *
 * The returned state can be modified with hooks such as useToolbarStyles_unstable,
 * before being passed to renderToolbar_unstable.
 *
 * @param props - props from this instance of Toolbar
 * @param ref - reference to root HTMLElement of Toolbar
 */
export const useToolbarDivider_unstable = (
  props: ToolbarDividerProps,
  ref: React.Ref<HTMLElement>,
): ToolbarDividerState => {
  const { vertical } = useToolbarContext();
  return useDivider_unstable({ vertical: !vertical, ...props }, ref);
};
