import * as React from 'react';
import { resolveShorthand, ExtractRef } from '@fluentui/react-utilities';
import type { ButtonProps, ButtonSlots, ButtonState } from './Button.types';
import { useARIAButton } from '@fluentui/react-aria';

/**
 * Consts listing which props are shorthand props.
 */
export const buttonSlots: (keyof ButtonSlots)[] = ['icon', 'root'];

/**
 * Given user props, returns the final state for a Button.
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
  ref: React.Ref<ExtractRef<ButtonProps>>,
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
        ref,
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
