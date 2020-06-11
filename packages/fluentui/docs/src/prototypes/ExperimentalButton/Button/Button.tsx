import * as React from 'react';

import {
  ButtonGroup,
  ButtonContent,
  ButtonProps as InternalButtonProps,
  ButtonStylesProps as InternalButtonStylesProps,
  WithAsProp,
  withSafeTypeForAs,
} from '@fluentui/react-northstar';

import useButtonAria from './hooks/useButtonAria';
import useButtonClasses, { UseButtonClassesInput } from './hooks/useButtonClasses';
import useButtonTemplate from './hooks/useButtonTemplate';
import { ShorthandConfig } from '@fluentui/react-compose';

export const buttonClassName = 'ui-button';

export interface ButtonProps extends InternalButtonProps {
  fluentOverrideConfig?: UseButtonClassesInput;
  classes?: Record<string, string>;
}

export interface ButtonStylesProps extends InternalButtonStylesProps {}

/**
 * A Button enables users to take an action, such as submitting a form, opening a dialog, etc.
 *
 * @accessibility
 * Implements [ARIA Button](https://www.w3.org/TR/wai-aria-practices-1.1/#button) design pattern.
 */
const Button = React.forwardRef((inputProps: ButtonProps, ref) => {
  // support compose
  const { fluentOverrideConfig, classes: inputClasses, ...props } = inputProps;

  const classes = useButtonClasses({ props, classes: inputClasses, ...(fluentOverrideConfig || {}) });

  const getA11yProps = useButtonAria({ props: { as: 'button', ...props } });

  const element = useButtonTemplate({
    props,
    classes,
    getA11yProps,
    ref,
  });

  return element;
}) as React.ForwardRefExoticComponent<WithAsProp<ButtonProps>> & {
  Group: typeof ButtonGroup;
  Content: typeof ButtonContent;
  shorthandConfig: ShorthandConfig<ButtonProps>;
  stylingTokensResolver: (props, stylingTokens) => Record<string, string | number | boolean>;
};

Button.displayName = 'Button';
Button.Group = ButtonGroup;
Button.Content = ButtonContent;

Button.shorthandConfig = {
  mappedProp: 'content',
};

Button.stylingTokensResolver = (props, stylingTokens) => ({
  text: props.text,
  primary: props.primary,
  disabled: props.disabled,
  circular: props.circular,
  size: props.size,
  loading: props.loading,
  inverted: props.inverted,
  iconOnly: props.iconOnly,
  iconPosition: props.iconPosition,
  fluid: props.fluid,
  hasContent: !!props.content,
  ...stylingTokens,
});

export default withSafeTypeForAs<typeof Button, ButtonProps, 'button'>(Button);
