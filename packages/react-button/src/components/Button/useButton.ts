import * as React from 'react';
import { resolveShorthand } from '@fluentui/react-utilities';
import type { ButtonProps, ButtonSlots, ButtonState } from './Button.types';
import { useARIAButton } from '@fluentui/react-aria';

/**
 * Consts listing which props are shorthand props.
 */
export const buttonSlots: (keyof ButtonSlots)[] = ['icon', 'root'];

/**
 * Given user props, defines default props for the Button, calls useButtonState, and returns processed state.
 * @param props - User provided props to the Button component.
 * @param ref - User provided ref to be passed to the Button component.
 */
export const useButton = (
  {
    icon,
    block = false,
    circular = false,
    disabledFocusable = false,
    iconPosition = 'before',
    outline = false,
    primary = false,
    size = 'medium',
    subtle = false,
    transparent = false,
    ...props
  }: ButtonProps,
  ref: React.Ref<unknown>,
): ButtonState => {
  const iconShorthand = resolveShorthand(icon);
  return {
    components: {
      root: 'button',
      icon: 'span',
    },
    root: useARIAButton(props, {
      required: true,
      defaultProps: {
        ref: ref as React.Ref<HTMLButtonElement>,
        type: 'button', // This is added because the default for type is 'submit'
      },
    }),
    icon: iconShorthand,
    block,
    circular,
    disabledFocusable,
    iconPosition,
    outline,
    primary,
    size,
    subtle,
    transparent,
    iconOnly: Boolean(iconShorthand?.children && props.children),
  };
};
