import { Accessibility, buttonBehavior } from '@fluentui/accessibility';
import { mergeProps } from '@fluentui/react-compose/lib/next';
import {
  // compose,
  // ComponentWithAs,
  // getElementType,
  // useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
  // useUnhandledProps,
  // ShorthandConfig,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
// import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  // childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  // rtlTextContainer,
  SizeValue,
  // ShorthandFactory,
  // createShorthand,
} from '../../utils';
import { /* Box, */ BoxProps } from '../Box/Box';
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
export const Button = React.forwardRef<HTMLElement, ButtonProps>((props: ButtonProps, ref) => {
  const { state, render } = useButton(props, ref);
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Button.displayName, context.telemetry);
  setStart();

  const {
    // accessibility,
    // // @ts-ignore
    // active,
    // as,
    // children,
    content,
    // icon,
    // loader,
    disabled,
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
    variables,
    design,
  } = props;

  // const hasChildren = childrenExist(children);
  //
  // const getA11yProps = useAccessibility(accessibility, {
  //   debugName: composeOptions.displayName,
  //   mapPropsToBehavior: () => ({
  //     as,
  //     active,
  //     disabled,
  //     loading,
  //   }),
  //   actionHandlers: {
  //     performClick: event => {
  //       event.preventDefault();
  //       handleClick(event);
  //     },
  //   },
  //   rtl: context.rtl,
  // });

  const { classes, styles: resolvedStyles } = useStyles<ButtonStylesProps>(Button.displayName, {
    className: Button.className,
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
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
    composeOptions: {
      mapPropsToStylesPropsChain: [
        (props: ButtonProps) => ({
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
        }),
      ],
      displayNames: [Button.displayName],
      className: Button.className,
      displayName: Button.displayName,
    },
    unstable_props: props,
  });

  mergeProps(state, {
    className: classes.root,
    styles: resolvedStyles.root,
    icon: {
      className: classes.icon,
      styles: resolvedStyles.icon,
    },
    loader: {
      as: Loader,
      className: classes.loader,
      styles: resolvedStyles.loader,
      role: undefined,
    },
    children: /* analogous to the `content` slot in v0 */ {
      as: ButtonContent,
      content: props.content,
    },
  });

  // const slotProps = composeOptions.resolveSlotProps<ButtonProps>(props);
  //
  // const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);
  // const ElementType = getElementType(props);
  //
  // const renderIcon = () => {
  //   return createShorthand(composeOptions.slots.icon, icon, {
  //     defaultProps: () =>
  //       getA11yProps('icon', {
  //         styles: resolvedStyles.icon,
  //         ...slotProps.icon,
  //       }),
  //   });
  // };
  //
  // const renderLoader = () => {
  //   return createShorthand(composeOptions.slots.loader, loader || {}, {
  //     defaultProps: () =>
  //       getA11yProps('loader', {
  //         styles: resolvedStyles.loader,
  //         ...slotProps.loader,
  //       }),
  //   });
  // };
  //
  // const renderContent = () => {
  //   return createShorthand(composeOptions.slots.content, content, {
  //     defaultProps: () => getA11yProps('content', slotProps.content),
  //   });
  // };
  //
  // const handleClick = (e: React.SyntheticEvent) => {
  //   if (disabled) {
  //     e.preventDefault();
  //     return;
  //   }
  //
  //   _.invoke(props, 'onClick', e, props);
  // };
  //
  // const handleFocus = (e: React.SyntheticEvent) => {
  //   _.invoke(props, 'onFocus', e, props);
  // };
  //
  // const result = (
  //   <ElementType
  //     {...rtlTextContainer.getAttributes({ forElements: [children] })}
  //     {...getA11yProps('root', {
  //       onClick: handleClick,
  //       disabled,
  //       className: classes.root,
  //       onFocus: handleFocus,
  //       ref,
  //       ...unhandledProps,
  //     })}
  //   >
  //     {hasChildren ? (
  //       children
  //     ) : (
  //       <>
  //         {loading && renderLoader()}
  //         {iconPosition !== 'after' && renderIcon()}
  //         {renderContent()}
  //         {iconPosition === 'after' && renderIcon()}
  //       </>
  //     )}
  //   </ElementType>
  // );

  setEnd();

  // return result;
  return render(state);
}) as any; // TODO :)

Button.className = buttonClassName;
Button.displayName = 'Button';

// slots: {
//   content: ButtonContent,
//   icon: Box,
//   loader: Loader,
// },

// slotProps: props => ({
//   content: {
//     size: props.size,
//   },
//   loader: {
//     role: undefined,
//   },
// }),

// handledProps: [
//   'accessibility',
//   'as',
//   'children',
//   'circular',
//   'className',
//   'content',
//   'design',
//   'disabled',
//   'fluid',
//   'icon',
//   'iconOnly',
//   'iconPosition',
//   'inverted',
//   'loader',
//   'loading',
//   'onClick',
//   'onFocus',
//   'primary',
//   'text',
//   'secondary',
//   'size',
//   'styles',
//   'variables',
// ],

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

Button.create = createShorthandFactory({ Component: Button, mappedProp: 'content' });
