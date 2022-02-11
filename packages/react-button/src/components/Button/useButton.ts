import * as React from 'react';
import { useARIAButton } from '@fluentui/react-aria';
import type { ARIAButtonSlotProps } from '@fluentui/react-aria';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import { useButtonStyles_unstable } from './useButtonStyles';
import { renderButton_unstable } from './renderButton';
import type { ButtonProps, ButtonState, ButtonRender } from './Button.types';

/**
 * Given user props, defines default props for the Button, calls useButtonState, and returns processed state.
 * @param props - User provided props to the Button component.
 * @param ref - User provided ref to be passed to the Button component.
 */
export const useButton_unstable = (
  props: ButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): [ButtonState, ButtonRender] => {
  const {
    appearance,
    as,
    block = false,
    disabled = false,
    disabledFocusable = false,
    icon,
    iconPosition = 'before',
    shape = 'rounded',
    size = 'medium',
  } = props;
  const iconShorthand = resolveShorthand(icon);

  const state: ButtonState = {
    // Props passed at the top-level
    appearance,
    block,
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
      as || 'button',
      useARIAButton<ARIAButtonSlotProps>(props, {
        required: true,
        defaultProps: {
          // useARIAButton isn't working with React.Ref<HTMLButtonElement | HTMLAnchorElement>
          ref: ref as React.Ref<HTMLButtonElement>,
          type: 'button', // This is added because the default for type is 'submit'
        },
      }),
    ),
    icon: iconShorthand,
  };

  useButtonStyles_unstable(state);

  return [state, renderButton_unstable];
};
