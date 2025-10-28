import { Accessibility, statusBehavior, StatusBehaviorProps } from '@fluentui/accessibility';
import {
  getElementType,
  useUnhandledProps,
  useAccessibilityBehavior,
  useAccessibilitySlotProps,
  useStyles,
  useFluentContext,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { createShorthandFactory, UIComponentProps, commonPropTypes, SizeValue } from '../../utils';
import { ShorthandValue, FluentComponentStaticProps } from '../../types';
import { Box, BoxProps } from '../Box/Box';

export interface StatusProps extends UIComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<StatusBehaviorProps>;

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

/**
 * A Status represents someone's or something's state.
 *
 * @accessibility
 * Implements [ARIA img](https://www.w3.org/TR/wai-aria-1.1/#img) role.
 */
export const Status = React.forwardRef<HTMLSpanElement, StatusProps>((props, ref) => {
  const context = useFluentContext();

  const {
    accessibility = statusBehavior,
    className,
    color,
    icon,
    size = 'medium',
    state = 'unknown',
    design,
    styles,
    variables,
  } = props;
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
  const a11yBehavior = useAccessibilityBehavior(accessibility, {
    rtl: context.rtl,
  });
  const ElementType = getElementType(props, 'span');
  const unhandledProps = useUnhandledProps(Status.handledProps, props);

  const iconElement = Box.create(icon, {
    defaultProps: useAccessibilitySlotProps(a11yBehavior, 'icon', {
      styles: resolvedStyles.icon,
      as: 'span',
    }),
  });

  const element = (
    <ElementType
      {...useAccessibilitySlotProps(a11yBehavior, 'root', { className: classes.root, ref, ...unhandledProps })}
    >
      {iconElement}
    </ElementType>
  );

  return element;
}) as unknown as ForwardRefWithAs<'span', HTMLSpanElement, StatusProps> & FluentComponentStaticProps;

Status.displayName = 'Status';
Status.propTypes = {
  ...commonPropTypes.createCommon({
    children: false,
    content: false,
  }),
  color: PropTypes.string,
  icon: customPropTypes.shorthandAllowingChildren,
  size: customPropTypes.size,
  state: PropTypes.oneOf<'success' | 'info' | 'warning' | 'error' | 'unknown'>([
    'success',
    'info',
    'warning',
    'error',
    'unknown',
  ]),
};
Status.handledProps = Object.keys(Status.propTypes) as any;

Status.create = createShorthandFactory({ Component: Status, mappedProp: 'state' });
