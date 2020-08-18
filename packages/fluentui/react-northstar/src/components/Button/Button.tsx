import { Accessibility, buttonBehavior } from '@fluentui/accessibility';
import { mergeProps } from '@fluentui/react-compose/lib/next';
import { ComponentWithAs, ShorthandConfig, useFluentContext, useStyles, useTelemetry } from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  createShorthandFactory,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  SizeValue,
  ShorthandFactory,
} from '../../utils';
import { Box, BoxProps } from '../Box/Box';
import { Loader, LoaderProps } from '../Loader/Loader';
import { ComponentEventHandler, ShorthandValue } from '../../types';
import { ButtonGroup } from './ButtonGroup';
import { ButtonContent, ButtonContentProps } from './ButtonContent';
import { useButton } from '@fluentui/react-button/src/components/Button/useButton';

export interface ButtonProps
  extends UIComponentProps,
    ContentComponentProps<ShorthandValue<ButtonContentProps>>,
    ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility;

  /** A button can appear circular. */
  circular?: boolean;

  /** A button can show that it cannot be interacted with. */
  disabled?: boolean;

  /** A button can fill the width of its container. */
  fluid?: boolean;

  /** A button can have an icon. */
  icon?: ShorthandValue<BoxProps>;

  /** A button can contain only an icon. */
  iconOnly?: boolean;

  /** An icon button can format its Icon to appear before or after its content */
  iconPosition?: 'before' | 'after';

  /** A button that inherits its background and has a subtle appearance */
  inverted?: boolean;

  /** Shorthand to customize a button's loader. */
  loader?: ShorthandValue<LoaderProps>;

  /** A button can show a loading indicator. */
  loading?: boolean;

  /**
   * Called after a user clicks the button.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<ButtonProps>;

  /**
   * Called after a user focuses the button.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onFocus?: ComponentEventHandler<ButtonProps>;

  /** A button can emphasize that it represents the primary action. */
  primary?: boolean;

  /** A button can be formatted to show only text in order to indicate a less-pronounced action. */
  text?: boolean;

  /** A button can emphasize that it represents an alternative action. */
  secondary?: boolean;

  /** A button can be sized. */
  size?: SizeValue;
}

export type ButtonStylesProps = Pick<
  ButtonProps,
  'text' | 'primary' | 'disabled' | 'circular' | 'size' | 'loading' | 'inverted' | 'iconOnly' | 'fluid' | 'iconPosition'
> & {
  hasContent?: boolean;
};

export const buttonClassName = 'ui-button';

/**
 * A Button enables users to take an action, such as submitting a form, opening a dialog, etc.
 *
 * @accessibility
 * Implements [ARIA Button](https://www.w3.org/TR/wai-aria-practices-1.1/#button) design pattern.
 */
export const Button = (React.forwardRef<HTMLElement, ButtonProps>((props: ButtonProps, ref) => {
  const { state, render } = useButton(props, ref);
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Button.displayName, context.telemetry);
  setStart();

  const { content, disabled, iconPosition, loading, text, primary, inverted, size, iconOnly, fluid, circular } = props;
  const { classes, styles: resolvedStyles } = useStyles<ButtonStylesProps>(Button.displayName, {
    className: buttonClassName,
    mapPropsToStyles: () => ({
      text,
      primary,
      disabled,
      circular,
      size,
      loading,
      inverted,
      iconOnly,
      iconPosition,
      fluid,
      hasContent: !!content,
    }),
    rtl: context.rtl,
    unstable_props: props,
  });

  mergeProps(state, {
    className: classes.root,
    styles: resolvedStyles.root,
    // TODO: test that this works as expected still, without merging these props
    onClick: (e: React.SyntheticEvent<HTMLElement, Event>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      props?.onClick?.(e, props);
    },
    onFocus: (e: React.SyntheticEvent<HTMLElement, Event>) => {
      props?.onFocus?.(e, props);
    },

    components: {
      Loader,
      Content: ButtonContent,
    },

    icon: {
      // TODO: previously icon was rendered as Box, is this correct now?
      as: Box,
      className: classes.icon,
      styles: resolvedStyles.icon,
    },

    loader: {
      className: classes.loader,
      styles: resolvedStyles.loader,
      role: undefined, // TODO: why is this `undefined`?
    },

    content: /* analogous to the `content` slot in v0 */ {
      size,
      content: props.content,
    },
  });

  // TODO: verify all accessibility features are the same as they were
  const result = render(state);
  setEnd();

  return result;
}) as unknown) as ComponentWithAs<'button', ButtonProps> & {
  create: ShorthandFactory<ButtonProps>;
  shorthandConfig: ShorthandConfig<ButtonProps>;
  Content: typeof ButtonContent;
  Group: typeof ButtonGroup;
};

Button.displayName = 'Button';

Button.defaultProps = {
  as: 'button',
  accessibility: buttonBehavior,
  size: 'medium',
};

Button.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
  circular: PropTypes.bool,
  disabled: PropTypes.bool,
  fluid: PropTypes.bool,
  icon: customPropTypes.shorthandAllowingChildren,
  iconOnly: PropTypes.bool,
  iconPosition: PropTypes.oneOf(['before', 'after']),
  inverted: PropTypes.bool,
  loader: customPropTypes.itemShorthandWithoutJSX,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
  text: PropTypes.bool,
  secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
  size: customPropTypes.size,
};

Button.Group = ButtonGroup;
Button.Content = ButtonContent;

Button.shorthandConfig = {
  mappedProp: 'content',
};

// TODO: plan deprecation and removal of .create() methods in favor of hooks approach
Button.create = createShorthandFactory({ Component: Button, mappedProp: 'content' });
