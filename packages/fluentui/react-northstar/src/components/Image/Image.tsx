import { Accessibility, AccessibilityAttributes, imageBehavior, ImageBehaviorProps } from '@fluentui/accessibility';
import {
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useFluentContext,
  useStyles,
  useTelemetry,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { createShorthandFactory, UIComponentProps, commonPropTypes } from '../../utils';
import { FluentComponentStaticProps } from '../../types';

export interface ImageProps extends UIComponentProps, ImageBehaviorProps {
  /** Alternative text. */
  alt?: string;

  'aria-label'?: AccessibilityAttributes['aria-label'];

  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<ImageBehaviorProps>;

  /** An image may be formatted to appear inline with text as an avatar. */
  avatar?: boolean;

  /** An image can appear circular. */
  circular?: boolean;

  /** An image can take up the width of its container. */
  fluid?: boolean;

  /** Image source URL. */
  src?: string;
}

export type ImageStylesProps = Pick<ImageProps, 'avatar' | 'circular' | 'fluid'>;
export const imageClassName = 'ui-image';

/**
 * An Image is a graphic representation of something.
 *
 * @accessibility
 * If image should be visible to screen readers, textual representation needs to be provided in 'alt' property.
 *
 * Other considerations:
 *  - when alt property is empty, then Narrator in scan mode navigates to image and narrates it as empty paragraph.
 *  - when image has role='presentation' then screen readers navigate to the element in scan/virtual mode. To avoid this, the attribute "aria-hidden='true'" is applied by the default image behavior.
 *  - when alt property is used in combination with aria-label, arialabbeledby or title, additional screen readers verification is needed as each screen reader handles this combination differently.
 */
export const Image = React.forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Image.displayName, context.telemetry);
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
    debugName: Image.displayName,
    mapPropsToBehavior: () => ({
      alt,
      'aria-label': ariaLabel,
    }),
    rtl: context.rtl,
  });
  const { classes } = useStyles<ImageStylesProps>(Image.displayName, {
    className: imageClassName,
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
  const unhandledProps = useUnhandledProps(Image.handledProps, props);

  const result = <ElementType {...getA11Props('root', { className: classes.root, ref, ...unhandledProps })} />;

  setEnd();

  return result;
}) as unknown as ForwardRefWithAs<'img', HTMLImageElement, ImageProps> & FluentComponentStaticProps<ImageProps>;

Image.displayName = 'Image';
Image.defaultProps = {
  as: 'img' as const,
  accessibility: imageBehavior,
};

Image.propTypes = {
  ...commonPropTypes.createCommon({
    children: false,
    content: false,
  }),
  avatar: PropTypes.bool,
  circular: PropTypes.bool,
  fluid: PropTypes.bool,
};

Image.handledProps = Object.keys(Image.propTypes) as any;

Image.create = createShorthandFactory({ Component: Image, mappedProp: 'src', allowsJSX: false });
