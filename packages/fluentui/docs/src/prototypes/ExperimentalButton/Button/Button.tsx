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
  const { fluentOverrideConfig, ...props } = inputProps;

  const classes = useButtonClasses({ props, ...(fluentOverrideConfig || {}) });

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
};

Button.displayName = 'Button';
Button.Group = ButtonGroup;
Button.Content = ButtonContent;

Button.shorthandConfig = {
  mappedProp: 'content',
};

export default withSafeTypeForAs<typeof Button, ButtonProps, 'button'>(Button);
