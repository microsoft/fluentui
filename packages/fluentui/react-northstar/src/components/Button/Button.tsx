import { Accessibility, buttonBehavior } from '@fluentui/accessibility';
import {
  compose,
  ComponentWithAs,
  getElementType,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
  useUnhandledProps,
  ShorthandConfig,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  ShorthandFactory,
  createShorthand,
} from '../../utils';
import { Box, BoxProps } from '../Box/Box';
import { Loader, LoaderProps } from '../Loader/Loader';
import { ComponentEventHandler, ShorthandValue } from '../../types';
import { ButtonGroup } from './ButtonGroup';
import { ButtonContent, ButtonContentProps } from './ButtonContent';

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

  /** A button can be disabled and focusable at the same time. */
  disabledFocusable?: boolean;

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

  /** A button can emphasize that it represents the tinted style. */
  tinted?: boolean;

  /** A button can be sized. */
  size?: 'small' | 'medium';

  /** A button can be elevated or flat. */
  flat?: boolean;
}

export type ButtonStylesProps = Pick<
  ButtonProps,
  | 'text'
  | 'primary'
  | 'tinted'
  | 'disabled'
  | 'disabledFocusable'
  | 'flat'
  | 'circular'
  | 'size'
  | 'loading'
  | 'inverted'
  | 'iconOnly'
  | 'fluid'
  | 'iconPosition'
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
export const Button = compose<'button', ButtonProps, ButtonStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();

    const {
      accessibility,
      // @ts-ignore
      active,
      as,
      children,
      content,
      icon,
      loader,
      disabled,
      disabledFocusable,
      flat,
      iconPosition,
      loading,
      text,
      primary,
      inverted,
      size,
      iconOnly,
      fluid,
      circular,
      className,
      styles,
      tinted,
      variables,
      design,
    } = props;

    const hasChildren = childrenExist(children);

    const getA11yProps = useAccessibility(accessibility, {
      debugName: composeOptions.displayName,
      mapPropsToBehavior: () => ({
        as,
        active,
        disabled,
        disabledFocusable,
      }),
      actionHandlers: {
        performClick: event => {
          event.preventDefault();
          handleClick(event);
        },
      },
      rtl: context.rtl,
    });
    const { classes, styles: resolvedStyles } = useStyles<ButtonStylesProps>(composeOptions.displayName, {
      className: composeOptions.className,
      mapPropsToStyles: () => ({
        text,
        primary,
        disabled,
        tinted,
        disabledFocusable,
        flat,
        circular,
        size,
        loading,
        inverted,
        iconOnly,
        iconPosition,
        fluid,
        hasContent: !!content,
      }),
      mapPropsToInlineStyles: () => ({
        className,
        design,
        styles,
        variables,
      }),
      rtl: context.rtl,
      composeOptions,
      unstable_props: props,
    });

    const slotProps = composeOptions.resolveSlotProps<ButtonProps>(props);

    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);
    const ElementType = getElementType(props);

    const renderIcon = () => {
      return createShorthand(composeOptions.slots.icon, icon, {
        defaultProps: () =>
          getA11yProps('icon', {
            styles: resolvedStyles.icon,
            ...slotProps.icon,
          }),
      });
    };

    const renderLoader = () => {
      return createShorthand(composeOptions.slots.loader, loader || {}, {
        defaultProps: () =>
          getA11yProps('loader', {
            styles: resolvedStyles.loader,
            ...slotProps.loader,
          }),
      });
    };

    const renderContent = () => {
      return createShorthand(composeOptions.slots.content, content, {
        defaultProps: () => getA11yProps('content', slotProps.content),
      });
    };

    const handleClick = (e: React.SyntheticEvent) => {
      if (disabled || disabledFocusable) {
        e.preventDefault();
        return;
      }

      _.invoke(props, 'onClick', e, props);
    };

    const handleFocus = (e: React.SyntheticEvent) => {
      _.invoke(props, 'onFocus', e, props);
    };

    const result = (
      <ElementType
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...getA11yProps('root', {
          onClick: handleClick,
          className: classes.root,
          onFocus: handleFocus,
          ref,
          ...unhandledProps,
        })}
      >
        {hasChildren ? (
          children
        ) : (
          <>
            {loading && renderLoader()}
            {iconPosition !== 'after' && renderIcon()}
            {renderContent()}
            {iconPosition === 'after' && renderIcon()}
          </>
        )}
      </ElementType>
    );

    setEnd();

    return result;
  },
  {
    className: buttonClassName,
    displayName: 'Button',

    slots: {
      content: ButtonContent,
      icon: Box,
      loader: Loader,
    },
    slotProps: props => ({
      content: {
        size: props.size,
      },
      loader: {
        role: undefined,
        secondary: props.primary,
      },
    }),

    shorthandConfig: {
      mappedProp: 'content',
    },
    handledProps: [
      'accessibility',
      'as',
      'children',
      'circular',
      'className',
      'content',
      'design',
      'disabled',
      'tinted',
      'disabledFocusable',
      'flat',
      'fluid',
      'icon',
      'iconOnly',
      'iconPosition',
      'inverted',
      'loader',
      'loading',
      'onClick',
      'onFocus',
      'primary',
      'text',
      'secondary',
      'size',
      'styles',
      'variables',
    ],
  },
) as ComponentWithAs<'button', ButtonProps> & {
  create: ShorthandFactory<ButtonProps>;
  shorthandConfig: ShorthandConfig<ButtonProps>;
  Content: typeof ButtonContent;
  Group: typeof ButtonGroup;
};

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
  disabledFocusable: PropTypes.bool,
  flat: PropTypes.bool,
  fluid: PropTypes.bool,
  icon: customPropTypes.shorthandAllowingChildren,
  iconOnly: PropTypes.bool,
  iconPosition: PropTypes.oneOf(['before', 'after']),
  inverted: PropTypes.bool,
  loader: customPropTypes.itemShorthandWithoutJSX,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  tinted: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
  primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
  text: PropTypes.bool,
  secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
  size: PropTypes.oneOf(['medium', 'small']),
};

Button.Group = ButtonGroup;
Button.Content = ButtonContent;

Button.create = createShorthandFactory({ Component: Button, mappedProp: 'content' });
