import * as React from 'react';
import type { ToolbarButtonProps, ToolbarButtonState } from './ToolbarButton.types';
import { useButton_unstable } from '@fluentui/react-button';
import { useContextSelector } from '@fluentui/react-context-selector';
import { ToolbarContext } from '../Toolbar/ToolbarContext';

/**
 * Create the state required to render ToolbarButton.
 *
 * The returned state can be modified with hooks such as useToolbarButtonStyles_unstable,
 * before being passed to renderToolbarButton_unstable.
 *
 * @param props - props from this instance of ToolbarButton
 * @param ref - reference to root HTMLElement of ToolbarButton
 */
export const useToolbarButton_unstable = (
  props: ToolbarButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToolbarButtonState => {
  const size = useContextSelector(ToolbarContext, ctx => ctx.size);
  return useButton_unstable({ size, ...props }, ref);
};
