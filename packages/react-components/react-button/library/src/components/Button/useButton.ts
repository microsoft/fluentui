'use client';

import * as React from 'react';
import { useButtonContext } from '../../contexts/ButtonContext';
import { ARIAButtonSlotProps, useARIAButtonProps } from '@fluentui/react-aria';
import { slot } from '@fluentui/react-utilities';
import type { ButtonBaseProps, ButtonBaseState, ButtonProps, ButtonState } from './Button.types';

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
  const { appearance = 'secondary', shape = 'rounded', size = contextSize ?? 'medium', ...buttonProps } = props;
  const state = useButtonBase_unstable(buttonProps, ref);

  return {
    appearance,
    shape,
    size,
    ...state,
  };
};

/**
 * Base hook for Button component, which manages state related to slots structure and ARIA attributes.
 *
 * @param props - User provided props to the Button component.
 * @param ref - User provided ref to be passed to the Button component.
 */
export const useButtonBase_unstable = (
  props: ButtonBaseProps,
  ref?: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): ButtonBaseState => {
  const { icon, iconPosition = 'before', ...buttonProps } = props;
  const iconShorthand = slot.optional(icon, { elementType: 'span' });

  return {
    disabled: props.disabled ?? false,
    disabledFocusable: props.disabledFocusable ?? false,
    iconPosition,
    iconOnly: Boolean(iconShorthand?.children && !props.children),
    components: { root: 'button', icon: 'span' },
    root: slot.always<ARIAButtonSlotProps<'a'>>(useARIAButtonProps(buttonProps.as, buttonProps), {
      elementType: 'button',
      defaultProps: {
        ref: ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>,
        type: props.as !== 'a' ? 'button' : undefined,
      },
    }),
    icon: iconShorthand,
  };
};
