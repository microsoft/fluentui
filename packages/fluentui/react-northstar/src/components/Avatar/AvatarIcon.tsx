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
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import {
  commonPropTypes,
  UIComponentProps,
  ContentComponentProps,
  ChildrenComponentProps,
  childrenExist,
} from '../../utils';
import { FluentComponentStaticProps } from '../../types';
import { Accessibility } from '@fluentui/accessibility';
import { AvatarSizeValue } from './Avatar';

export interface AvatarIconProps extends UIComponentProps, ContentComponentProps, ChildrenComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<never>;

  /** The avatar icon can have a square shape. */
  square?: boolean;

  /** Size multiplier. */
  size?: AvatarSizeValue;
}

export type AvatarIconStylesProps = Required<Pick<AvatarIconProps, 'size' | 'square'>>;
export const avatarIconClassName = 'ui-avatar__icon';

/**
 * A AvatarIcon provides a status icon for the Avatar.
 */
export const AvatarIcon = React.forwardRef<HTMLSpanElement, AvatarIconProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(AvatarIcon.displayName, context.telemetry);
  setStart();

  const { className, children, design, styles, variables, size, square, content } = props;

  const { classes } = useStyles<AvatarIconStylesProps>(AvatarIcon.displayName, {
    className: avatarIconClassName,
    mapPropsToStyles: () => ({
      size,
      square,
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
    debugName: AvatarIcon.displayName,
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(AvatarIcon.handledProps, props);

  const element = (
    <ElementType {...getA11Props('root', { className: classes.root, ref, ...unhandledProps })}>
      {childrenExist(children) ? children : content}
    </ElementType>
  );
  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'span', HTMLSpanElement, AvatarIconProps> &
  FluentComponentStaticProps<AvatarIconProps>;

AvatarIcon.displayName = 'AvatarIcon';
AvatarIcon.propTypes = {
  ...commonPropTypes.createCommon(),
  square: PropTypes.bool,
  size: customPropTypes.size,
};
AvatarIcon.handledProps = Object.keys(AvatarIcon.propTypes) as any;
AvatarIcon.defaultProps = {
  as: 'span',
};

AvatarIcon.shorthandConfig = {
  mappedProp: 'content',
};
