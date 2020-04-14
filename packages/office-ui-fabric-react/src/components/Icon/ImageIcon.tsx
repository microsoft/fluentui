import * as React from 'react';

import { IImageIconProps } from './Icon.types';
import { Image } from '../Image/Image';
import { css, getNativeProps, htmlElementProperties } from '../../Utilities';
import { classNames, MS_ICON } from './Icon.styles';

/**
 * Fast icon component which only supports images (not font glyphs) and can't be targeted by customizations.
 * To style the icon, use `className` or reference `ms-Icon` in CSS.
 * {@docCategory Icon}
 */
export const ImageIcon: React.FunctionComponent<IImageIconProps> = props => {
  const { className, imageProps } = props;

  const nativeProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, htmlElementProperties, [
    'aria-label',
  ]);
  const imageAlt = imageProps['alt'] || props['aria-label'] || '';

  return (
    <div {...nativeProps} className={css(MS_ICON, classNames.root, classNames.image, className)}>
      <Image {...imageProps} alt={imageAlt} />
    </div>
  );
};
