import * as React from 'react';
import { getNativeElementProps } from '@fluentui/react-utilities';
import type { SplitButtonState, SplitButtonProps } from '@fluentui/react-button';

/**
 * Modifies state to include aria props and keyboard navigation handlers.
 * @param state - Computed state for SplitButtonState.
 * @param props - User provided props to the SplitButtonState component.
 * @param ref - User provided ref to be passed to the SplitButtonState component.
 */
export const useSplitButtonARIA = (
  state: SplitButtonState,
  props: SplitButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
) => {
  // TODO: why doesn't split button use button aria to begin with, like all the other buttons?
  state.root = getNativeElementProps('div', { ref, ...props });
};
