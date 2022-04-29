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
import { commonPropTypes, SizeValue, UIComponentProps, createShorthandFactory, createShorthand } from '../../utils';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import { ShorthandValue, FluentComponentStaticProps } from '../../types';
import { Accessibility, statusBehavior as avatarStatusBehavior, StatusBehaviorProps } from '@fluentui/accessibility';
import { AvatarStatusIcon, AvatarStatusIconProps } from './AvatarStatusIcon';
import { AvatarStatusImage, AvatarStatusImageProps } from './AvatarStatusImage';
import { statusClassName } from '../Status/Status';

export interface AvatarStatusProps extends UIComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<StatusBehaviorProps>;

  /** A custom color. */
  color?: string;

  /** Shorthand for the icon, to provide customizing status */
  icon?: ShorthandValue<AvatarStatusIconProps>;

  /** Shorthand for the image. */
  image?: ShorthandValue<AvatarStatusImageProps>;

  /** Size multiplier */
  size?: SizeValue;

  /** The pre-defined state values which can be consumed directly. */
  state?: 'success' | 'info' | 'warning' | 'error' | 'unknown';
}

export type AvatarStatusStylesProps = Required<Pick<AvatarStatusProps, 'color' | 'size' | 'state'>>;
// update in upcoming breaking change and enable a unit test
export const avatarStatusClassName = statusClassName;

/**
 * A AvatarStatus provides a status for the Avatar.
 */
export const AvatarStatus = (React.forwardRef<HTMLSpanElement, AvatarStatusProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(AvatarStatus.displayName, context.telemetry);
  setStart();

  const { className, color, design, icon, image, size, state, styles, variables } = props;
  const { classes } = useStyles<AvatarStatusStylesProps>(AvatarStatus.displayName, {
    className: avatarStatusClassName,
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
    debugName: AvatarStatus.displayName,
    rtl: context.rtl,
  });
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(AvatarStatus.handledProps, props);

  const iconElement = createShorthand(
    AvatarStatusIcon,
    icon as ShorthandValue<AvatarStatusIconProps & { as: 'span' }>,
    {
      defaultProps: () => ({
        size,
        state,
      }),
    },
  );

  const imageElement = createShorthand(AvatarStatusImage, image, {
    defaultProps: () =>
      getA11Props('image', {
        size,
      }),
  });

  const element = (
    <ElementType {...getA11Props('root', { className: classes.root, ref, ...unhandledProps })}>
      {imageElement || iconElement}
    </ElementType>
  );
  setEnd();

  return element;
}) as unknown) as ForwardRefWithAs<'span', HTMLSpanElement, AvatarStatusProps> & FluentComponentStaticProps;

AvatarStatus.displayName = 'AvatarStatus';
AvatarStatus.propTypes = {
  ...commonPropTypes.createCommon({
    children: false,
    content: false,
  }),
  color: PropTypes.string,
  icon: customPropTypes.shorthandAllowingChildren,
  image: customPropTypes.itemShorthandWithoutJSX,
  size: customPropTypes.size,
  state: PropTypes.oneOf(['success', 'info', 'warning', 'error', 'unknown']),
};
AvatarStatus.handledProps = Object.keys(AvatarStatus.propTypes) as any;
AvatarStatus.defaultProps = {
  accessibility: avatarStatusBehavior,
  as: 'span',
  size: 'medium',
  state: 'unknown',
};

AvatarStatus.create = createShorthandFactory({ Component: AvatarStatus, mappedProp: 'state' });
