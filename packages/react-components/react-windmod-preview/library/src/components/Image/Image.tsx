'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderImage, useImage } from '@fluentui/react-headless-components-preview/image';

import type { ImageProps } from './Image.types';
import { useImageStyles } from './useImageStyles';

/**
 * An Image displays a picture, icon or other visual content. Windmod Image: the headless
 * image decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Image: ForwardRefComponent<ImageProps> = React.forwardRef(
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-image's styled useImage.
  ({ block = false, bordered = false, fit = 'default', shadow = false, shape = 'square', ...rest }, ref) => {
    return renderImage(
      useImageStyles({
        ...useImage(rest, ref),
        block,
        bordered,
        fit,
        shadow,
        shape,
      }),
    );
  },
);

Image.displayName = 'Image';
