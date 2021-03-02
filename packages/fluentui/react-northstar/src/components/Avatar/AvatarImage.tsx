import { Accessibility, AccessibilityAttributes, imageBehavior, ImageBehaviorProps } from '@fluentui/accessibility';
import {
  ComponentWithAs,
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
} from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { UIComponentProps, commonPropTypes, createShorthandFactory } from '../../utils';
import { FluentComponentStaticProps } from '../../types';
import { imageClassName } from '../Image/Image';

export interface AvatarImageProps extends UIComponentProps, ImageBehaviorProps {
  /** Alternative text. */
  alt?: string;

  'aria-label'?: AccessibilityAttributes['aria-label'];

  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<ImageBehaviorProps>;

  /** @deprecated An image may be formatted to appear inline with text as an avatar. */
  avatar?: boolean;

  /** An Avatarimage can appear circular. */
  circular?: boolean;

  /** An Avatarimage can take up the width of its container. */
  fluid?: boolean;

  /** AvatarImage source URL. */
  src?: string;
}

export type AvatarImageStylesProps = Pick<AvatarImageProps, 'avatar' | 'circular' | 'fluid'>;
export const avatarImageClassName = imageClassName;

/**
 * An AvatarImage is a graphic representation used by Avatar.
 */
export const AvatarImage: ComponentWithAs<'img', AvatarImageProps> & FluentComponentStaticProps<AvatarImageProps> = (
  props,
) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(AvatarImage.displayName, context.telemetry);
  setStart();

  const {
    accessibility,
    alt,
    'aria-label': ariaLabel,
    avatar,
    circular,
    className,
    design,
    fluid,
    styles,
    variables,
  } = props;

  const getA11Props = useAccessibility(accessibility, {
    debugName: AvatarImage.displayName,
    mapPropsToBehavior: () => ({
      alt,
      'aria-label': ariaLabel,
    }),
    rtl: context.rtl,
  });
  const { classes } = useStyles<AvatarImageStylesProps>(AvatarImage.displayName, {
    className: avatarImageClassName,
    mapPropsToStyles: () => ({
      avatar,
      circular,
      fluid,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(AvatarImage.handledProps, props);

  const result = <ElementType {...getA11Props('root', { className: classes.root, ...unhandledProps })} />;

  setEnd();

  return result;
};

AvatarImage.displayName = 'AvatarImage';
AvatarImage.defaultProps = {
  as: 'img',
  accessibility: imageBehavior,
};

AvatarImage.propTypes = {
  ...commonPropTypes.createCommon({
    children: false,
    content: false,
  }),
  avatar: PropTypes.bool,
  circular: PropTypes.bool,
  fluid: PropTypes.bool,
};

AvatarImage.shorthandConfig = {
  mappedProp: 'src',
  allowsJSX: false,
};

AvatarImage.handledProps = Object.keys(AvatarImage.propTypes) as any;
AvatarImage.create = createShorthandFactory({ Component: AvatarImage, mappedProp: 'src', allowsJSX: false });
