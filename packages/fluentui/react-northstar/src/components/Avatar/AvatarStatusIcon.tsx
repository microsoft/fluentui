import * as React from 'react';
import {
  useFluentContext,
  useTelemetry,
  useStyles,
  useAccessibility,
  getElementType,
  useUnhandledProps,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';
import { commonPropTypes, UIComponentProps, createShorthandFactory, SizeValue } from '../../utils';
import * as customPropTypes from '@fluentui/react-proptypes';
import { FluentComponentStaticProps } from '../../types';
import { Accessibility } from '@fluentui/accessibility';

export interface AvatarStatusIconProps extends UIComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<never>;

  /** The pre-defined state values which can be consumed directly. */
  state?: 'success' | 'info' | 'warning' | 'error' | 'unknown';

  /** Size multiplier */
  size?: SizeValue;
}

export type AvatarStatusIconStylesProps = Required<Pick<AvatarStatusIconProps, 'size' | 'state'>>;
export const avatarStatusIconClassName = 'ui-avatar__statusicon';

/**
 * A AvatarStatusIcon provides a status icon for the Avatar.
 */
export const AvatarStatusIcon = (React.forwardRef<HTMLSpanElement, AvatarStatusIconProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(AvatarStatusIcon.displayName, context.telemetry);
  setStart();

  const { children, className, design, size, state, styles, variables } = props;

  const { classes } = useStyles<AvatarStatusIconStylesProps>(AvatarStatusIcon.displayName, {
    className: avatarStatusIconClassName,
    mapPropsToStyles: () => ({
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
    debugName: AvatarStatusIcon.displayName,
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(AvatarStatusIcon.handledProps, props);

  const element = (
    <ElementType {...getA11Props('root', { className: classes.root, ref, ...unhandledProps })}>{children}</ElementType>
  );
  setEnd();

  return element;
}) as unknown) as ForwardRefWithAs<'span', HTMLSpanElement, AvatarStatusIconProps> & FluentComponentStaticProps;

AvatarStatusIcon.displayName = 'AvatarStatusIcon';
AvatarStatusIcon.propTypes = {
  ...commonPropTypes.createCommon(),
  size: customPropTypes.size,
  state: PropTypes.oneOf(['success', 'info', 'warning', 'error', 'unknown']),
};
AvatarStatusIcon.handledProps = Object.keys(AvatarStatusIcon.propTypes) as any;
AvatarStatusIcon.defaultProps = {
  as: 'span',
};

AvatarStatusIcon.create = createShorthandFactory({ Component: AvatarStatusIcon });
