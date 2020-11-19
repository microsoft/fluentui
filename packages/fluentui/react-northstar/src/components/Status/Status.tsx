import { Accessibility, statusBehavior, StatusBehaviorProps } from '@fluentui/accessibility';
import {
  ComponentWithAs,
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useStyles,
  useTelemetry,
  useFluentContext,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { makeStyles } from '@material-ui/styles';

import { createShorthandFactory, UIComponentProps, commonPropTypes, SizeValue, pxToRem } from '../../utils';
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

/*
NOTES:

For overrides to work as expected, component can apply as many classes as it needs, but all must have just 1-class specificity
  - can we achieve that?

PROBLEMS:

(token as a condition)
variables.borderColor - conditionally adds styles
  - so should it be a separate class?
  - but we should not access variables in component render

(props as a value)
backgroundColor - passes prop directly to style - anti-pattern, but how should I handle it?
  - should it be variable override in component usage?

How to consume:
 - theme
 - variable overrides - by calling another makeStyles - see AvatarUsageExample.shorthand
 */

const statusStyles = {
  Status: {
    // Component variables
    '--status-success-background-color': '#6BB700', // siteVariables.colorScheme.green.background
    '--status-info-background-color': '#8B8CC7', // siteVariables.colorScheme.brand.background
    '--status-warning-background-color': '#FFAA44', // siteVariables.colorScheme.yellow.background
    '--status-error-background-color': '#C4314B', // siteVariables.colorScheme.red.background

    '--status-size-smallest': pxToRem(6),
    '--status-size-smaller': pxToRem(10),
    '--status-size-small': pxToRem(10),
    '--status-size-medium': pxToRem(10),
    '--status-size-large': pxToRem(10),
    '--status-size-larger': pxToRem(16),
    '--status-size-largest': pxToRem(0),

    // Default variables
    '--status-background-color': '#979593', // siteVariables.colorScheme.default.background5

    // Styles
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    height: 'var(--status-size)',
    width: 'var(--status-size)',

    verticalAlign: 'middle',
    borderRadius: '9999px',

    // ...(variables.borderColor && {
    //   borderColor: variables.borderColor,
    //   borderWidth: pxToRem(variables.borderWidth),
    //   borderStyle: 'solid',
    // }),
    // backgroundColor: color || getBackgroundColor(state, variables),

    backgroundColor: 'var(--status-background-color)',
  },

  'Status--size_smallest': {
    '--border-width': '0px',
    '--status-size': 'var(--status-size-smallest)',
  },
  'Status--size_smaller': {
    '--border-width': '0px',
    '--status-size': 'var(--status-size-smaller)',
  },
  'Status--size_small': {
    '--border-width': '0px',
    '--status-size': 'var(--status-size-small)',
  },
  'Status--size_medium': {
    '--border-width': '0px',
    '--status-size': 'var(--status-size-medium)',
  },
  'Status--size_large': {
    '--border-width': '0px',
    '--status-size': 'var(--status-size-large)',
  },
  'Status--size_larger': {
    '--border-width': '0px',
    '--status-size': 'var(--status-size-larger)',
  },
  'Status--size_largest': {
    '--border-width': '0px',
    '--status-size': 'var(--status-size-largest)',
  },

  'Status--state_success': {
    '--status-background-color': 'var(--status-success-background-color)',
  },
  'Status--state_info': {
    '--status-background-color': 'var(--status-info-background-color)',
  },
  'Status--state_warning': {
    '--status-background-color': 'var(--status-warning-background-color)',
  },
  'Status--state_error': {
    '--status-background-color': 'var(--status-error-background-color)',
  },
};

const useMUIStyles = makeStyles(statusStyles);

/**
 * A Status represents someone's or something's state.
 *
 * @accessibility
 * Implements [ARIA img](https://www.w3.org/TR/wai-aria-1.1/#img) role.
 */
export const Status: ComponentWithAs<'span', StatusProps> & FluentComponentStaticProps = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Status.displayName, context.telemetry);
  setStart();

  const { className, color, icon, size, state, design, styles, variables } = props;
  const { /* classes, */ styles: resolvedStyles } = useStyles<StatusStylesProps>(Status.displayName, {
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

  const muiClasses = useMUIStyles();
  const mapStateToClassname = state => {
    switch (state) {
      case 'success':
      case 'info':
      case 'warning':
      case 'error':
        return muiClasses[`Status--state_${state}`];
      case 'unknown':
      default:
        return null;
    }
  };

  const classes = {
    root: [
      statusClassName,
      className,
      muiClasses.Status,
      mapStateToClassname(state),
      size && muiClasses[`Status--size_${size}`],
    ]
      .filter(Boolean)
      .join(' '),
  };

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
