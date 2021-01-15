import * as React from 'react';
import {
  useFluentContext,
  useTelemetry,
  useStyles,
  useAccessibility,
  getElementType,
  useUnhandledProps,
  ComponentWithAs,
} from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';
import { commonPropTypes, UIComponentProps, createShorthandFactory } from '../../utils';
import { FluentComponentStaticProps } from '../../types';
import { Accessibility } from '@fluentui/accessibility';

export interface AvatarStatusIconProps extends UIComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<never>;
  /** The pre-defined state values which can be consumed directly. */
  state?: 'success' | 'info' | 'warning' | 'error' | 'unknown';
}

export type AvatarStatusIconStylesProps = Required<Pick<AvatarStatusIconProps, 'state'>>;
export const avatarStatusIconClassName = 'ui-avatar__statusicon';

/**
 * A AvatarStatusIcon provides a status icon for the Avatar.
 */
export const AvatarStatusIcon: ComponentWithAs<'span', AvatarStatusIconProps> & FluentComponentStaticProps = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(AvatarStatusIcon.displayName, context.telemetry);
  setStart();

  const { className, children, design, styles, variables, state } = props;

  const { classes } = useStyles<AvatarStatusIconStylesProps>(AvatarStatusIcon.displayName, {
    className: avatarStatusIconClassName,
    mapPropsToStyles: () => ({
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
    debugName: AvatarStatusIcon.displayName,
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(AvatarStatusIcon.handledProps, props);

  const element = (
    <ElementType {...getA11Props('root', { className: classes.root, ...unhandledProps })}>{children}</ElementType>
  );
  setEnd();

  return element;
};

AvatarStatusIcon.displayName = 'AvatarStatusIcon';
AvatarStatusIcon.propTypes = {
  ...commonPropTypes.createCommon(),
  state: PropTypes.oneOf(['success', 'info', 'warning', 'error', 'unknown']),
};
AvatarStatusIcon.handledProps = Object.keys(AvatarStatusIcon.propTypes) as any;
AvatarStatusIcon.defaultProps = {
  as: 'span',
};

AvatarStatusIcon.create = createShorthandFactory({ Component: AvatarStatusIcon });
