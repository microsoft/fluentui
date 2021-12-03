import * as React from 'react';
import { useSplitButtonState } from './useSplitButtonState';
import { useSplitButtonARIA } from './useSplitButtonARIA';
import { useSplitButtonStyles } from './useSplitButtonStyles';
import { renderSplitButton } from './renderSplitButton';
import type { SplitButtonState, SplitButtonProps, RenderSplitButton } from './SplitButton.types';

/**
 * Given user props, defines default props for the SplitButton and returns processed state.
 * @param props - User provided props to the SplitButton component.
 * @param ref - User provided ref to be passed to the SplitButton component.
 */
export const useSplitButton = (
  props: SplitButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): [SplitButtonState, RenderSplitButton] => {
  const state: SplitButtonState = useSplitButtonState(props);
  useSplitButtonARIA(state, props, ref);
  useSplitButtonStyles(state);

  return [state, renderSplitButton];
};
