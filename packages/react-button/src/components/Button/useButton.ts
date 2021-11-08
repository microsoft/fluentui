import * as React from 'react';
import { useARIAButton } from '@fluentui/react-aria';
import { getNativeElementProps, resolveShorthand } from '@fluentui/react-utilities';
import type { ButtonProps, ButtonState } from './Button.types';
import { useButtonStyles } from './useButtonStyles';
import { renderButton } from './renderButton';

/**
 * Given user props, defines default props for the Button, calls useButtonState, and returns processed state.
 * @param props - User provided props to the Button component.
 * @param ref - User provided ref to be passed to the Button component.
 */
type RenderButton = (state: ButtonState) => React.ReactElement;

const useButtonState = (props: ButtonProps) => {
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

const useButtonARIA = (
  state: ButtonState,
  props: ButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
) => {
  const ariaProps = getNativeElementProps(
    props.as || 'button',
    useARIAButton(props, {
      required: true,
      defaultProps: {
        // useARIAButton isn't working with React.Ref<HTMLButtonElement | HTMLAnchorElement>
        ref: ref as React.Ref<HTMLButtonElement>,
        type: 'button', // This is added because the default for type is 'submit'
      },
    }),
  );

  state.root = {
    ...state.root,
    ...ariaProps,
  };
};

export const useButton = (
  props: ButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): { state: ButtonState; render: RenderButton } => {
  const state = useButtonState(props);
  useButtonARIA(state, props, ref);
  useButtonStyles(state);

  return { state, render: renderButton };
};
