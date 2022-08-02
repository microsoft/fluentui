import * as React from 'react';
import { ARIAButtonSlotProps, useARIAButtonShorthand } from '@fluentui/react-aria';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
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
  const {
    appearance = 'secondary',
    as = 'button',
    disabled = false,
    disabledFocusable = false,
    icon,
    iconPosition = 'before',
    shape = 'rounded',
    size = 'medium',
  } = props;
  const iconShorthand = resolveShorthand(icon);

  return {
    // Props passed at the top-level
    appearance,
    disabled,
    disabledFocusable,
    iconPosition,
    shape,
    size,

    // State calculated from a set of props
    iconOnly: Boolean(iconShorthand?.children && !props.children),

    // Slots definition
    components: {
      root: 'button',
      icon: 'span',
    },

    root: getNativeElementProps(
      as,
      useARIAButtonShorthand<ARIAButtonSlotProps<'a'>>(props, {
        required: true,
        defaultProps: {
          ref: ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>,
          type: 'button',
        },
      }),
    ),
    icon: iconShorthand,
  };
};
