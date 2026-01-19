'use client';

import * as React from 'react';
import type { ToggleButtonProps, ToggleButtonState } from './ToggleButton.types';
import { useToggleButtonBase_unstable } from './useToggleButtonBase';
import { useButtonContext } from '../../contexts';

/**
 * Given user props, defines default props for the ToggleButton, calls `useToggleButtonBase_unstable` and adds design-related props, and returns
 * processed state.
 * @param props - User provided props to the ToggleButton component.
 * @param ref - User provided ref to be passed to the ToggleButton component.
 */
export const useToggleButton_unstable = (
  props: ToggleButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ToggleButtonState => {
  'use no memo';

  const { size: contextSize } = useButtonContext();
  const { appearance = 'secondary', shape = 'rounded', size = contextSize ?? 'medium' } = props;

  const buttonState = useToggleButtonBase_unstable(props, ref);

  return {
    appearance,
    shape,
    size,
    ...buttonState,
  };
};
