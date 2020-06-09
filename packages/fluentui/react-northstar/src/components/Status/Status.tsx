import { Accessibility, statusBehavior } from '@fluentui/accessibility';
import { getElementType, useUnhandledProps, useAccessibility, useStyles, useTelemetry } from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import { createShorthandFactory, UIComponentProps, commonPropTypes, SizeValue } from '../../utils';
import {
  WithAsProp,
  ShorthandValue,
  withSafeTypeForAs,
  ProviderContextPrepared,
  FluentComponentStaticProps,
} from '../../types';
import Box, { BoxProps } from '../Box/Box';

export interface StatusProps extends UIComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<never>;

  /** A custom color. */
  color?: string;

  /** Shorthand for the icon, to provide customizing status */
  icon?: ShorthandValue<BoxProps>;

  /** Size multiplier */
  size?: SizeValue;

  /** The pre-defined state values which can be consumed directly. */
  state?: 'success' | 'info' | 'warning' | 'error' | 'unknown';
}

export type StatusStylesProps = Pick<StatusProps, 'color' | 'size' | 'state'>;
export const statusClassName = 'ui-status';

const Status: React.FC<WithAsProp<StatusProps>> & FluentComponentStaticProps = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(Status.displayName, context.telemetry);
  setStart();

  const { className, color, icon, size, state, design, styles, variables } = props;
  const { classes, styles: resolvedStyles } = useStyles<StatusStylesProps>(Status.displayName, {
    className: statusClassName,
    mapPropsToStyles: () => ({
      color,
      size,
      state,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });
  const getA11Props = useAccessibility(props.accessibility, {
    debugName: Status.displayName,
    rtl: context.rtl,
  });
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Status.handledProps, props);

  const iconElement = Box.create(icon, {
    defaultProps: () =>
      getA11Props('icon', {
        styles: resolvedStyles.icon,
        as: 'span',
      }),
  });

  const element = (
    <ElementType {...getA11Props('root', { className: classes.root, ...unhandledProps })}>{iconElement}</ElementType>
  );
  setEnd();

  return element;
};

Status.displayName = 'Status';
Status.propTypes = {
  ...commonPropTypes.createCommon({
    children: false,
    content: false,
  }),
  color: PropTypes.string,
  icon: customPropTypes.shorthandAllowingChildren,
  size: customPropTypes.size,
  state: PropTypes.oneOf(['success', 'info', 'warning', 'error', 'unknown']),
};
Status.handledProps = Object.keys(Status.propTypes) as any;
Status.defaultProps = {
  accessibility: statusBehavior,
  as: 'span',
  size: 'medium',
  state: 'unknown',
};

Status.create = createShorthandFactory({ Component: Status, mappedProp: 'state' });

/**
 * A Status represents someone's or something's state.
 *
 * @accessibility
 * Implements [ARIA img](https://www.w3.org/TR/wai-aria-1.1/#img) role.
 */
export default withSafeTypeForAs<typeof Status, StatusProps, 'span'>(Status);
