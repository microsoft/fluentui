import * as React from 'react';
import type { ButtonProps, ButtonState, RenderButton } from './Button.types';
import { useButtonState } from './useButtonState';
import { useButtonARIA } from './useButtonAria';
import { useButtonStyles } from './useButtonStyles';
import { renderButton } from './renderButton';

/**
 * Given user props, defines default props for the Button, calls useButtonState, and returns processed state.
 * @param props - User provided props to the Button component.
 * @param ref - User provided ref to be passed to the Button component.
 */

export const useButton = (
  props: ButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): { state: ButtonState; render: RenderButton } => {
  const state = useButtonState(props);
  useButtonARIA(state, props, ref);
  useButtonStyles(state);

  return { state, render: renderButton };
};
