'use client';

import * as React from 'react';
import { ARIAButtonSlotProps, useARIAButtonProps } from '@fluentui/react-aria';
import { DistributiveOmit, getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { ButtonProps, ButtonState } from './Button.types';

type ButtonBaseProps = DistributiveOmit<ButtonProps, 'appearance' | 'size' | 'shape'>;

type ButtonBaseState = DistributiveOmit<ButtonState, 'appearance' | 'size' | 'shape'>;

/**
 * Given user props, defines default props for the Button, calls useButtonState, and returns processed state.
 * @param props - User provided props to the Button component.
 * @param ref - User provided ref to be passed to the Button component.
 */
export const useButtonBase_unstable = (
  props: ButtonBaseProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ButtonBaseState => {
  const {
    as = 'button',
    disabled = false,
    disabledFocusable = false,
    icon,
    iconPosition = 'before',
  } = props;
  const iconShorthand = slot.optional(icon, { elementType: 'span' });
  return {
    // Props passed at the top-level
    disabled,
    disabledFocusable,
    iconPosition,
    iconOnly: Boolean(iconShorthand?.children && !props.children), // Slots definition
    components: { root: 'button', icon: 'span' },
    root: slot.always<ARIAButtonSlotProps<'a'>>(getIntrinsicElementProps(as, useARIAButtonProps(props.as, props)), {
      elementType: 'button',
      defaultProps: {
        ref: ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>,
        type: as === 'button' ? 'button' : undefined,
      },
    }),
    icon: iconShorthand,
  };
};
