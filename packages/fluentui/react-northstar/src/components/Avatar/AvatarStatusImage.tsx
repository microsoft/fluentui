import * as React from 'react';

import { Accessibility, imageBehavior, ImageBehaviorProps } from '@fluentui/accessibility';
import {
  ForwardRefWithAs,
  getElementType,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
  useUnhandledProps,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';

import { FluentComponentStaticProps } from '../../types';
import { commonPropTypes, createShorthandFactory, SizeValue, UIComponentProps } from '../../utils';

export interface AvatarStatusImageProps extends UIComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<ImageBehaviorProps>;

  /** Size multiplier */
  size?: SizeValue;

  /** AvatarImage source URL. */
  src?: string;
}

export type AvatarStatusImageStylesProps = Required<Pick<AvatarStatusImageProps, 'size'>>;
export const avatarStatusImageClassName = 'ui-avatar__statusimage';

/**
 * A AvatarStatusImage provides a status image for the Avatar.
 */
export const AvatarStatusImage = (React.forwardRef<HTMLImageElement, AvatarStatusImageProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(AvatarStatusImage.displayName, context.telemetry);
  setStart();

  const { children, className, design, size, styles, variables } = props;

  const { classes } = useStyles<AvatarStatusImageStylesProps>(AvatarStatusImage.displayName, {
    className: avatarStatusImageClassName,
    mapPropsToStyles: () => ({
      size,
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
    debugName: AvatarStatusImage.displayName,
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(AvatarStatusImage.handledProps, props);

  const element = (
    <ElementType {...getA11Props('root', { className: classes.root, ref, ...unhandledProps })}>{children}</ElementType>
  );
  setEnd();

  return element;
}) as unknown) as ForwardRefWithAs<'img', HTMLImageElement, AvatarStatusImageProps> &
  FluentComponentStaticProps<AvatarStatusImageProps>;

AvatarStatusImage.displayName = 'AvatarStatusImage';

AvatarStatusImage.propTypes = {
  ...commonPropTypes.createCommon(),
  size: customPropTypes.size,
};
AvatarStatusImage.handledProps = Object.keys(AvatarStatusImage.propTypes) as any;
AvatarStatusImage.defaultProps = {
  accessibility: imageBehavior,
  as: 'img',
};

AvatarStatusImage.shorthandConfig = {
  allowsJSX: false,
  mappedProp: 'src',
};
AvatarStatusImage.create = createShorthandFactory({
  allowsJSX: false,
  Component: AvatarStatusImage,
  mappedProp: 'src',
});
