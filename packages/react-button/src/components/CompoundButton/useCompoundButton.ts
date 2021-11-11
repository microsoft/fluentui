import * as React from 'react';
import type { CompoundButtonProps, CompoundButtonState, RenderCompoundButton } from './CompoundButton.types';
import { useCompoundButtonState } from './useCompoundButtonState';
import { useCompoundButtonStyles } from './useCompoundButtonStyles';
import { renderCompoundButton } from './renderCompoundButton';
import { useCompoundButtonARIA } from './useCompoundButtonARIA';

/**
 * Given user props, defines default props for the CompoundButton, calls useButtonState, and returns processed state.
 * @param props - User provided props to the CompoundButton component.
 * @param ref - User provided ref to be passed to the CompoundButton component.
 */
export const useCompoundButton = (
  props: CompoundButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): { state: CompoundButtonState; render: RenderCompoundButton } => {
  const state: CompoundButtonState = useCompoundButtonState(props);
  useCompoundButtonARIA(state, props, ref);
  useCompoundButtonStyles(state);

  return { state, render: renderCompoundButton };
};
