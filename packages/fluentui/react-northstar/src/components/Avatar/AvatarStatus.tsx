import * as React from 'react';
import {
  compose,
  useFluentContext,
  useTelemetry,
  useStyles,
  useAccessibility,
  getElementType,
  useUnhandledProps,
} from '@fluentui/react-bindings';
import { commonPropTypes, SizeValue, UIComponentProps, createShorthand } from '../../utils';

import { ShorthandValue } from '../../types';
import { Accessibility, StatusBehaviorProps } from '../../index';
import { BoxProps, Box } from '../Box/Box';

export interface AvatarStatusProps extends UIComponentProps {
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

export type AvatarStatusStylesProps = Required<Pick<AvatarStatusProps, 'color' | 'size' | 'state'>>;
export const avatarStatusClassName = 'ui-avatar__status';

/**
 * A AvatarStatus provides a status for the Avatar.
 */
export const AvatarStatus = compose<'span', AvatarStatusProps, AvatarStatusStylesProps, {}, {}>(
  (props, ref, composeOptions) => {
    const context = useFluentContext();
    const { setStart, setEnd } = useTelemetry(composeOptions.displayName, context.telemetry);
    setStart();

    const { color, icon, size, state, design, styles, variables, className } = props;

    const { classes, styles: resolvedStyles } = useStyles<AvatarStatusStylesProps>(composeOptions.displayName, {
      className: avatarStatusClassName,
      composeOptions,
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
      debugName: composeOptions.displayName,
      rtl: context.rtl,
    });

    const ElementType = getElementType(props);
    const unhandledProps = useUnhandledProps(composeOptions.handledProps, props);

    const iconElement = createShorthand(composeOptions.slots.icon, icon, {
      defaultProps: () =>
        getA11Props('icon', {
          styles: resolvedStyles.icon,
          as: 'span',
        }),
    });

    const element = (
      <ElementType {...getA11Props('root', { className: classes.root, ref, ...unhandledProps })}>
        {iconElement}
      </ElementType>
    );
    setEnd();

    return element;
  },
  {
    className: avatarStatusClassName,
    displayName: 'AvatarStatus',
    shorthandConfig: { mappedProp: 'state' },
    overrideStyles: true,
    mapPropsToStylesProps: ({ color, state, size }) => ({
      color,
      size,
      state,
    }),
    slots: {
      icon: Box,
    },
    handledProps: [
      'as',
      'accessibility',
      'className',
      'variables',
      'design',
      'styles',
      'color',
      'size',
      'state',
      'icon',
    ],
  },
);

AvatarStatus.propTypes = commonPropTypes.createCommon();
