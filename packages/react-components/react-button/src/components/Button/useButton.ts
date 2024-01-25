import * as React from 'react';
import { ARIAButtonSlotProps, useARIAButtonProps } from '@fluentui/react-aria';
import { getIntrinsicElementProps, slot, useEventCallback } from '@fluentui/react-utilities';
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
    as = 'button',
    disabled = false,
    disabledFocusable = false,
    icon,
    iconPosition = 'before',
    shape = 'rounded',
    size = contextSize ?? 'medium',
    actionState = 'none',
    onClick,
  } = props;
  const iconShorthand = slot.optional(icon, { elementType: 'span' });

  const _props = { ...props };

  _props.onClick = useEventCallback(ev => {
    if (actionState === 'none') {
      onClick && onClick(ev);
    }
  });

  return {
    // Props passed at the top-level
    appearance,
    disabled,
    disabledFocusable,
    iconPosition,
    shape,
    size, // State calculated from a set of props
    actionState,
    iconOnly: Boolean(iconShorthand?.children && !props.children), // Slots definition
    components: { root: 'button', icon: 'span' },
    root: slot.always<ARIAButtonSlotProps<'a'>>(getIntrinsicElementProps(as, useARIAButtonProps(props.as, _props)), {
      elementType: 'button',
      defaultProps: {
        ref: ref as React.Ref<HTMLButtonElement & HTMLAnchorElement>,
        type: 'button',
      },
    }),
    icon: iconShorthand,
  };
};
