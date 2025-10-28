import * as React from 'react';

import { Accessibility, imageBehavior, ImageBehaviorProps } from '@fluentui/accessibility';
import {
  ForwardRefWithAs,
  getElementType,
  useAccessibilityBehavior,
  useAccessibilitySlotProps,
  useFluentContext,
  useStyles,
  useUnhandledProps,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';

import { FluentComponentStaticProps } from '../../types';
import { commonPropTypes, createShorthandFactory, UIComponentProps } from '../../utils';
import { AvatarSizeValue } from './Avatar';

export interface AvatarStatusImageProps extends UIComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<ImageBehaviorProps>;

  /** Size multiplier */
  size?: AvatarSizeValue;

  /** AvatarImage source URL. */
  src?: string;
}

export type AvatarStatusImageStylesProps = Required<Pick<AvatarStatusImageProps, 'size'>>;
export const avatarStatusImageClassName = 'ui-avatar__statusimage';

/**
 * A AvatarStatusImage provides a status image for the Avatar.
 */
export const AvatarStatusImage = React.forwardRef<HTMLImageElement, AvatarStatusImageProps>((props, ref) => {
  const context = useFluentContext();

  const { accessibility = imageBehavior, children, className, design, size, styles, variables } = props;

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

  const a11yBehavior = useAccessibilityBehavior(accessibility, {
    rtl: context.rtl,
  });

  const ElementType = getElementType(props, 'img');
  const unhandledProps = useUnhandledProps(AvatarStatusImage.handledProps, props);

  const element = (
    <ElementType
      {...useAccessibilitySlotProps(a11yBehavior, 'root', { className: classes.root, ref, ...unhandledProps })}
    >
      {children}
    </ElementType>
  );

  return element;
}) as unknown as ForwardRefWithAs<'img', HTMLImageElement, AvatarStatusImageProps> &
  FluentComponentStaticProps<AvatarStatusImageProps>;

AvatarStatusImage.displayName = 'AvatarStatusImage';

AvatarStatusImage.propTypes = {
  ...commonPropTypes.createCommon(),
  size: customPropTypes.size,
};
AvatarStatusImage.handledProps = Object.keys(AvatarStatusImage.propTypes) as any;

AvatarStatusImage.shorthandConfig = {
  allowsJSX: false,
  mappedProp: 'src',
};
AvatarStatusImage.create = createShorthandFactory({
  allowsJSX: false,
  Component: AvatarStatusImage,
  mappedProp: 'src',
});
