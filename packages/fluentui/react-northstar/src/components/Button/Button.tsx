import { Accessibility, buttonBehavior } from '@fluentui/accessibility';
import { ComponentWithAs, useFluentContext, useTelemetry } from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as cx from 'classnames';
import * as _ from 'lodash';
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
import { ComponentEventHandler } from '../../types';
import { ButtonGroup } from './ButtonGroup';
import { ButtonContent, ButtonContentProps } from './ButtonContent';
// TODO: had to use deep path because SASS was trying to be compiled as a side effect
import { useButton } from '@fluentui/react-button/src/components/Button/useButton';
import { useButtonStyles } from './useButtonStyles';

export interface ButtonProps
  extends UIComponentProps,
    ContentComponentProps<ButtonContentProps>,
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
  icon?: BoxProps;

  /** A button can contain only an icon. */
  iconOnly?: boolean;

  /** An icon button can format its Icon to appear before or after its content */
  iconPosition?: 'before' | 'after';

  /** A button that inherits its background and has a subtle appearance */
  inverted?: boolean;

  /** Shorthand to customize a button's loader. */
  loader?: LoaderProps;

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
  // TODO: we should consider ALL fluent packages as part of our cost, correct?
  //       Previously, this timer started AFTER useButton, but that is also fluent.
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Button.displayName, context.telemetry);
  setStart();

  // BASE
  const { state, render } = useButton(props, ref);

  // EXTRAS
  const { classes, styles: resolvedStyles } = useButtonStyles({ props: state, rtl: context.rtl });

  const newState = {
    ...state,

    // DEFAULTS
    as: 'button',
    accessibility: buttonBehavior,
    size: 'medium',

    // OVERRIDES
    components: {
      ...state.components,
      loader: Loader,
      content: ButtonContent,
      icon: Box,
    },
    style: { ...state.style, ...props.style },
    styles: _.merge(state.styles, resolvedStyles.root, props.styles),
    className: cx(buttonClassName, state.className, classes.root, props.className),

    // TODO: test that this works as expected still, without merging these props
    //        - [ ] max call stack exceeded on click
    onClick: (e: React.SyntheticEvent<HTMLElement, Event>) => {
      if (props.disabled) {
        e.preventDefault();
        return;
      }

      state.onClick?.(e);
      props.onClick?.(e, props);
    },

    onFocus: (e: React.SyntheticEvent<HTMLElement, Event>) => {
      state.onFocus?.(e);
      props.onFocus?.(e, props);
    },

    // TODO: this is ugly, don't require others to do this when authoring a new component
    //       this was added to prevent "defining" a slot with props when the user isn't using that slot in their props
    ...(typeof props.icon !== 'undefined' && {
      icon: {
        ...(state.icon as object),
        ...props.icon,
        style: { ...state.icon?.style, ...props.icon?.style },
        styles: _.merge(state.icon?.styles, resolvedStyles.icon, props.icon?.styles),
        className: cx(state.icon?.className, classes.icon, props.icon?.className),
      },
    }),

    ...(typeof props.loader !== 'undefined' && {
      loader: {
        ...(state.loader as object),
        role: undefined, // TODO: why is this `undefined`?
        ...props.loader,
        style: { ...state.loader?.style, ...props.loader?.style },
        styles: _.merge(state.loader?.styles, resolvedStyles.loader, props.loader?.styles),
        className: cx(state.icon?.className, classes.loader, props.icon?.className),
      },
    }),

    ...(typeof props.content !== 'undefined' && {
      content: {
        ...(state.content as object),
        ...props.content,
        style: { ...state.content?.style, ...props.content?.style },
        styles: _.merge(state.content?.styles, resolvedStyles.content, props.content?.styles),
        className: _.merge(state.content?.className, classes.content, props.content?.className),
      },
    }),
  };

  // TODO: verify all accessibility features are the same as they were
  // TODO: there is no way
  const result = render(newState);
  setEnd();

  return result;
}) as unknown) as ComponentWithAs<'button', ButtonProps> & {
  create: ShorthandFactory<ButtonProps>;
  Content: typeof ButtonContent;
  Group: typeof ButtonGroup;
};

Button.displayName = 'Button';

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

// TODO: plan deprecation and removal of .create() methods in favor of hooks approach
Button.create = createShorthandFactory({ Component: Button, mappedProp: 'content' });
