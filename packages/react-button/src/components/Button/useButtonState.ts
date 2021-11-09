import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { ButtonProps, ButtonState } from './Button.types';

/**
 * Takes props and returns state for eventually rendering a Button.
 * @param props - User provided props to the Button component.
 */
export const useButtonState = (props: ButtonProps) => {
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

    root: getNativeElementProps(as || 'button', props),
    icon: iconShorthand,
  };

  return state;
};
