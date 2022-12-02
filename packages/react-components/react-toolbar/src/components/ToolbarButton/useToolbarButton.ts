import * as React from 'react';
import { useButton_unstable } from '@fluentui/react-button';
import { useToolbarContext_unstable } from '../Toolbar/ToolbarContext';
import { ToolbarButtonProps, ToolbarButtonState } from './ToolbarButton.types';

/**
 * Given user props, defines default props for the Button, calls useButtonState and useChecked, and returns
 * processed state.
 * @param props - User provided props to the Button component.
 * @param ref - User provided ref to be passed to the Button component.
 */
export const useToolbarButton_unstable = (
  props: ToolbarButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToolbarButtonState => {
  const size = useToolbarContext_unstable(ctx => ctx.size);
  const { vertical = false, ...buttonProps } = props;
  const state = useButton_unstable({ size, appearance: 'subtle', ...buttonProps }, ref);
  return {
    vertical,
    ...state,
  };
};
