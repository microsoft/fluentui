'use client';

import * as React from 'react';
import { ARIAButtonSlotProps, useARIAButtonProps } from '@fluentui/react-aria';
import { slot } from '@fluentui/react-utilities';
import { useButtonContext } from '../../contexts/ButtonContext';
import type { ButtonProps, ButtonState } from './Button.types';

/**
 * Given user props, defines default props for the Button, calls useButtonState, and returns processed state.
 * @param props - User provided props to the Button component.
 * @param ref - User provided ref to be passed to the Button component.
 */
export const useButton_unstable = (
  props: ButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ButtonState => {
  const { size: contextSize } = useButtonContext();
  const {
    appearance = 'secondary',
    icon,
    iconPosition = 'before',
    shape = 'rounded',
    size = contextSize ?? 'medium',
    ...rest
  } = props;
  const as = props.as || 'button';
  const iconShorthand = slot.optional(icon, { elementType: 'span' });
  return {
    // Props passed at the top-level
    appearance,
    disabled: props.disabled || false,
    disabledFocusable: props.disabledFocusable || false,
    iconPosition,
    shape,
    size, // State calculated from a set of props
    iconOnly: Boolean(iconShorthand?.children && !props.children), // Slots definition
    components: { root: 'button', icon: 'span' },
    root: slot.always<ARIAButtonSlotProps<'a'>>(useARIAButtonProps(rest.as, rest), {
      elementType: 'button',
      defaultProps: {
        ref: ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>,
        type: as === 'button' ? 'button' : undefined,
      },
    }),
    icon: iconShorthand,
  };
};
