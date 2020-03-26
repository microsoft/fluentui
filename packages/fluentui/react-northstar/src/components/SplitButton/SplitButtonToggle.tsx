import { Accessibility, buttonBehavior } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as _ from 'lodash';

import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
} from '../../utils';
import Icon, { IconProps } from '../Icon/Icon';
import {
  ComponentEventHandler,
  WithAsProp,
  ShorthandValue,
  withSafeTypeForAs,
  FluentComponentStaticProps,
  ProviderContextPrepared,
} from '../../types';
import { getElementType, useAccessibility, useStyles, useTelemetry, useUnhandledProps } from '@fluentui/react-bindings';
// @ts-ignore
import { ThemeContext } from 'react-fela';

export interface SplitButtonToggleProps extends UIComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility;

  /** A button can show that it cannot be interacted with. */
  disabled?: boolean;

  /** A button can have an icon. */
  icon?: ShorthandValue<IconProps>;

  /**
   * Called after a user clicks the button.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<SplitButtonToggleProps>;

  /**
   * Called after a user focuses the button.
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onFocus?: ComponentEventHandler<SplitButtonToggleProps>;

  /** A button can emphasize that it represents the primary action. */
  primary?: boolean;

  /** A button can emphasize that it represents an alternative action. */
  secondary?: boolean;
}

export type SplitButtonToggleStylesProps = Pick<SplitButtonToggleProps, 'primary' | 'disabled'>;

const SplitButtonToggle: React.FC<WithAsProp<SplitButtonToggleProps>> &
  FluentComponentStaticProps<SplitButtonToggleProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(SplitButtonToggle.displayName, context.telemetry);
  setStart();

  const {
    accessibility,
    // @ts-ignore
    active,
    as,
    children,
    icon,
    disabled,
    primary,
    className,
    styles,
    variables,
    design,
  } = props;

  const hasChildren = childrenExist(children);

  const getA11Props = useAccessibility(accessibility, {
    debugName: SplitButtonToggle.displayName,
    mapPropsToBehavior: () => ({
      as,
      active,
      disabled,
    }),
    actionHandlers: {
      performClick: event => {
        event.preventDefault();
        handleClick(event);
      },
    },
    rtl: context.rtl,
  });
  const { classes, styles: resolvedStyles } = useStyles<SplitButtonToggleStylesProps>(SplitButtonToggle.displayName, {
    className: SplitButtonToggle.className,
    mapPropsToStyles: () => ({
      primary,
      disabled,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const unhandledProps = useUnhandledProps(SplitButtonToggle.handledProps, props);
  const ElementType = getElementType(props);

  const renderIcon = () => {
    return Icon.create(icon, {
      defaultProps: () =>
        getA11Props('icon', {
          styles: resolvedStyles.icon,
        }),
    });
  };

  const handleClick = (e: React.SyntheticEvent) => {
    if (disabled) {
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
      {...getA11Props('root', {
        onClick: handleClick,
        disabled,
        className: classes.root,
        onFocus: handleFocus,
        ...unhandledProps,
      })}
    >
      {hasChildren ? children : renderIcon()}
    </ElementType>
  );

  setEnd();

  return result;
};

SplitButtonToggle.defaultProps = {
  as: 'button',
  accessibility: buttonBehavior,
};

SplitButtonToggle.displayName = 'SplitButtonToggle';
SplitButtonToggle.className = 'ui-splitbutton__toggleButton'; // TODO get this from the SplitButton

SplitButtonToggle.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  disabled: PropTypes.bool,
  icon: customPropTypes.itemShorthandWithoutJSX,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  primary: customPropTypes.every([customPropTypes.disallow(['secondary']), PropTypes.bool]),
  secondary: customPropTypes.every([customPropTypes.disallow(['primary']), PropTypes.bool]),
};

SplitButtonToggle.handledProps = Object.keys(SplitButtonToggle.propTypes) as any;

SplitButtonToggle.create = createShorthandFactory({ Component: SplitButtonToggle, mappedProp: 'children' });

/**
 * A Button enables users to take an action, such as submitting a form, opening a dialog, etc.
 *
 * @accessibility
 * Implements [ARIA Button](https://www.w3.org/TR/wai-aria-practices-1.1/#button) design pattern.
 */
export default withSafeTypeForAs<typeof SplitButtonToggle, SplitButtonToggleProps, 'button'>(SplitButtonToggle);
