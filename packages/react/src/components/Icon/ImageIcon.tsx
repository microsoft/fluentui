import * as React from 'react';
import { Image } from '../Image/Image';
import { css, getNativeProps, htmlElementProperties } from '../../Utilities';
import { classNames, MS_ICON } from './Icon.styles';
import type { IImageIconProps } from './Icon.types';

/**
 * Fast icon component which only supports images (not font glyphs) and can't be targeted by customizations.
 * To style the icon, use `className` or reference `ms-Icon` in CSS.
 * {@docCategory Icon}
 */
export const ImageIcon: React.FunctionComponent<IImageIconProps> = props => {
  const { className, imageProps } = props;

  const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, htmlElementProperties, [
    'aria-label',
    'aria-labelledby',
    'title',
    'aria-describedby',
  ]);
  const altText = imageProps.alt || props['aria-label'];
  const hasName =
    altText ||
    props['aria-labelledby'] ||
    props.title ||
    imageProps['aria-label'] ||
    imageProps['aria-labelledby'] ||
    imageProps.title;

  // move naming or describing attributes from the container (where they are invalid) to the image
  const imageNameProps = {
    'aria-labelledby': props['aria-labelledby'],
    'aria-describedby': props['aria-describedby'],
    title: props.title,
  };

  const containerProps = hasName
    ? {}
    : {
        'aria-hidden': true,
      };

  return (
    <div {...containerProps} {...nativeProps} className={css(MS_ICON, classNames.root, classNames.image, className)}>
      <Image {...imageNameProps} {...imageProps} alt={hasName ? altText : ''} />
    </div>
  );
};
