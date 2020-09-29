import { Accessibility, buttonBehavior } from '@fluentui/accessibility';
import { makeMergeProps } from '@fluentui/react-compose/lib/next';
import { ComponentWithAs, ShorthandConfig, useFluentContext, useTelemetry } from '@fluentui/react-bindings';
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
// TODO: had to use deep path because SASS was trying to be compiled as a side effect
import { useButton } from '@fluentui/react-button/src/components/Button/useButton';
import { useButtonStyles } from './useButtonStyles';

const mergeProps = makeMergeProps()

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
//
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

  // TODO: use {} first arg to avoid mutations so we can compare defaults to final and
  //       detect user's input apart from component defaults
  mergeProps(state, {
    as: 'button',
    // accessibility: buttonBehavior,
    size: 'medium',
    components: {
      loader: Loader,
      content: ButtonContent,
      icon: Box,
    },
    icon: {
      children: <strong>:)</strong>,
    },
  });

  // EXTRAS
  const { content, disabled, size } = state;
  const { classes, styles: resolvedStyles } = useButtonStyles({ props: state, rtl: context.rtl });

  const overrides = {
    className: classes.root,
    styles: resolvedStyles.root,

    // // TODO: test that this works as expected still, without merging these props
    // //        - [ ] max call stack exceeded on click
    // onClick: (e: React.SyntheticEvent<HTMLElement, Event>) => {
    //   if (disabled) {
    //     e.preventDefault();
    //     return;
    //   }
    //
    //   state?.onClick?.(e, props);
    // },
    //
    // onFocus: (e: React.SyntheticEvent<HTMLElement, Event>) => {
    //   props?.onFocus?.(e, props);
    // },

    // TODO: this is ugly, don't require others to do this when authoring a new component
    //       this was added to prevent "defining" a slot with props when the user isn't using that slot in their props
    ...(typeof props.icon === 'object' &&
      props.icon !== null && {
        icon: {
          className: classes.icon,
          styles: resolvedStyles.icon,
        },
      }),

    loader: {
      className: classes.loader,
      styles: resolvedStyles.loader,
      role: undefined, // TODO: why is this `undefined`?
    },

    content: {
      size,
      // TODO: this is resolved as { children: 'Click here' }
      //       1. We can't spread this reliably, we need some resolve shorthand
      //       2. Why is this being resolved to an object, is that what we really want?
      // ...content,
      // content: { children: 'test' }

      // TODO: 3 weeks later... mutating is bad :P
      //       mergeProps enters and infinite loop when a source key references a target key.
      //       In our case, that is taking the original state.content and using it in the value of a new source:
      //         `mergeProps(target, source)`
      content,
    },
  };

  mergeProps(
    state,
    overrides,
    // TODO: can't merge all user's props, yet, step through
    // props
    // { icon: props.icon },
  );

  // TODO: verify all accessibility features are the same as they were
  // TODO: there is no way
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
