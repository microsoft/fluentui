'use client';

import * as React from 'react';
import { useButton_unstable } from '@fluentui/react-button';
import type {
  ToolbarButtonBaseProps,
  ToolbarButtonBaseState,
  ToolbarButtonProps,
  ToolbarButtonState,
} from './ToolbarButton.types';

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
  const state = useToolbarButtonBase_unstable(props, ref);

  return {
    appearance: 'subtle',
    size: 'medium',
    shape: 'rounded',
    ...state,
  };
};

/**
 * Base hook that builds Toolbar Button state for behavior and structure only.
 * It does not provide any design-related defaults.
 *
 * @internal
 * @param props - User provided props to the Button component.
 * @param ref - User provided ref to be passed to the Button component.
 */
export const useToolbarButtonBase_unstable = (
  props: ToolbarButtonBaseProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToolbarButtonBaseState => {
  const { vertical = false, ...buttonProps } = props;
  const state = useButton_unstable(
    {
      appearance: 'subtle',
      ...buttonProps,
      size: 'medium',
    },
    ref,
  );

  return {
    vertical,
    ...state,
  };
};
