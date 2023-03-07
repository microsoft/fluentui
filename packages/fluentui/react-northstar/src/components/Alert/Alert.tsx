import { Accessibility, alertBehavior, AlertBehaviorProps } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  UIComponentProps,
  ContentComponentProps,
  commonPropTypes,
  childrenExist,
  createShorthandFactory,
} from '../../utils';
import { ComponentEventHandler, ShorthandValue, ShorthandCollection, FluentComponentStaticProps } from '../../types';
import { Box, BoxProps } from '../Box/Box';
import { ButtonProps } from '../Button/Button';
import { Text, TextProps } from '../Text/Text';

import { ButtonGroup, ButtonGroupProps } from '../Button/ButtonGroup';
import { AlertDismissAction, AlertDismissActionProps } from './AlertDismissAction';
import {
  useAccessibility,
  getElementType,
  useStyles,
  useTelemetry,
  useFluentContext,
  useUnhandledProps,
  useAutoControlled,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

export interface AlertSlotClassNames {
  content: string;
  actions: string;
  icon: string;
  header: string;
  body: string;
}

export interface AlertProps extends UIComponentProps, ContentComponentProps<ShorthandValue<BoxProps>> {
  /**
   * Accessibility behavior if overridden by the user.
   * @available alertWarningBehavior
   */
  accessibility?: Accessibility<AlertBehaviorProps>;

  /** An alert can contain action buttons. */
  actions?: ShorthandValue<ButtonGroupProps> | ShorthandCollection<ButtonProps>;

  /** An alert may contain an icon. */
  icon?: ShorthandValue<BoxProps>;

  /** An alert may contain a header. */
  header?: ShorthandValue<TextProps>;

  /** An alert's position relative to neighboring items. */
  attached?: boolean | 'top' | 'bottom';

  /** An alert can only take up the width of its content. */
  fitted?: boolean;

  /** An alert may be formatted to display a danger message. */
  danger?: boolean;

  /** A default value for the `visible` prop. */
  defaultVisible?: boolean;

  /** An alert can be dismissible. */
  dismissible?: boolean;

  /**
   * A button shorthand for the dismiss action slot. To use this slot the alert should be
   * dismissible.
   */
  dismissAction?: ShorthandValue<AlertDismissActionProps>;

  /** An alert may be formatted to display information. */
  info?: boolean;

  /**
   * Called after user will dismiss the alert.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onVisibleChange?: ComponentEventHandler<AlertProps>;

  /**
   * Called after the alert is focused.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onFocus?: ComponentEventHandler<AlertProps>;

  /** An alert can be formatted to display a successful message. */
  success?: boolean;

  /** An alert can be set to visible to force itself to be shown. */
  visible?: boolean;

  /** An alert can be formatted to display a warning message. */
  warning?: boolean;

  /** An alert can have a body that contains header and content elements. */
  body?: ShorthandValue<BoxProps>;
}

export type AlertStylesProps = Required<
  Pick<AlertProps, 'danger' | 'warning' | 'info' | 'success' | 'attached' | 'fitted' | 'dismissible' | 'visible'>
>;

export const alertClassName = 'ui-alert';
export const alertSlotClassNames: AlertSlotClassNames = {
  content: `${alertClassName}__content`,
  actions: `${alertClassName}__actions`,
  icon: `${alertClassName}__icon`,
  header: `${alertClassName}__header`,
  body: `${alertClassName}__body`,
};

/**
 * An Alert displays a brief, important message to attract a user's attention without interrupting their current task.
 *
 * @accessibility
 * Implements [ARIA Alert](https://www.w3.org/TR/wai-aria-practices-1.1/#alert) design pattern.
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Alert.displayName, context.telemetry);
  setStart();
  const {
    warning,
    danger,
    info,
    success,
    attached,
    fitted,
    dismissible,
    variables,
    className,
    design,
    styles,
    children,
    actions,
    dismissAction,
    content,
    icon,
    header,
    body,
  } = props;

  const [visible, setVisible] = useAutoControlled({
    defaultValue: props.defaultVisible,
    value: props.visible,
    initialValue: true,
  });

  const [bodyId] = React.useState(_.uniqueId('alert-body-'));
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Alert.handledProps, props);

  const getA11yProps = useAccessibility(props.accessibility, {
    debugName: Alert.displayName,
    mapPropsToBehavior: () => ({
      warning,
      danger,
      bodyId,
      visible,
    }),
    rtl: context.rtl,
  });

  const { classes, styles: resolvedStyles } = useStyles<AlertStylesProps>(Alert.displayName, {
    className: alertClassName,
    mapPropsToStyles: () => ({
      warning,
      danger,
      info,
      success,
      attached,
      fitted,
      dismissible,
      visible,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const handleDismissOverrides = (predefinedProps: ButtonProps) => ({
    onClick: (e: React.SyntheticEvent, buttonProps: ButtonProps) => {
      _.invoke(predefinedProps, 'onClick', e, buttonProps);
      _.invoke(props, 'onVisibleChange', e, { ...props, visible: false });
      setVisible(false);
    },
  });

  const handleFocus = (e: React.SyntheticEvent) => {
    _.invoke(props, 'onFocus', e, props);
  };

  const renderContent = () => {
    const bodyContent = (
      <>
        {Text.create(header, {
          defaultProps: () =>
            getA11yProps('header', {
              className: alertSlotClassNames.header,
              styles: resolvedStyles.header,
            }),
        })}
        {Box.create(content, {
          defaultProps: () =>
            getA11yProps('content', {
              className: alertSlotClassNames.content,
              styles: resolvedStyles.content,
            }),
        })}
      </>
    );

    return (
      <>
        {Box.create(icon, {
          defaultProps: () =>
            getA11yProps('icon', {
              className: alertSlotClassNames.icon,
              styles: resolvedStyles.icon,
            }),
        })}
        {Box.create(body, {
          defaultProps: () =>
            getA11yProps('body', {
              className: alertSlotClassNames.body,
              styles: resolvedStyles.body,
              id: bodyId,
            }),
          overrideProps: {
            children: bodyContent,
          },
        })}

        {ButtonGroup.create(actions, {
          defaultProps: () =>
            getA11yProps('actions', {
              className: alertSlotClassNames.actions,
              styles: resolvedStyles.actions,
            }),
        })}
        {dismissible &&
          AlertDismissAction.create(dismissAction, {
            defaultProps: () =>
              getA11yProps('dismissAction', {
                danger,
                warning,
                info,
                success,
                variables,
              }),
            overrideProps: handleDismissOverrides,
          })}
      </>
    );
  };

  const element = getA11yProps.unstable_wrapWithFocusZone(
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        onFocus: handleFocus,
        ref,
        ...unhandledProps,
      })}
    >
      {childrenExist(children) ? children : renderContent()}
    </ElementType>,
  );

  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, AlertProps> &
  FluentComponentStaticProps<AlertProps> & {
    DismissAction: typeof AlertDismissAction;
  };

Alert.defaultProps = {
  accessibility: alertBehavior,
  dismissAction: {},
  body: {},
};

Alert.propTypes = {
  ...commonPropTypes.createCommon({ content: 'shorthand' }),
  actions: PropTypes.oneOfType([customPropTypes.itemShorthand, customPropTypes.collectionShorthand]),
  icon: customPropTypes.shorthandAllowingChildren,
  header: customPropTypes.itemShorthand,
  attached: PropTypes.oneOf([true, false, 'top', 'bottom']),
  fitted: PropTypes.bool,
  danger: PropTypes.bool,
  defaultVisible: PropTypes.bool,
  dismissible: PropTypes.bool,
  dismissAction: customPropTypes.shorthandAllowingChildren,
  info: PropTypes.bool,
  onVisibleChange: PropTypes.func,
  onFocus: PropTypes.func,
  success: PropTypes.bool,
  visible: PropTypes.bool,
  warning: PropTypes.bool,
  body: customPropTypes.shorthandAllowingChildren,
};

Alert.displayName = 'Alert';

Alert.handledProps = Object.keys(Alert.propTypes) as any;

Alert.create = createShorthandFactory({
  Component: Alert,
});

Alert.DismissAction = AlertDismissAction;
