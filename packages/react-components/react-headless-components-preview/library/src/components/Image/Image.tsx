'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useImage } from './useImage';
import { renderImage } from './renderImage';
import type { ImageProps } from './Image.types';
import { composeComponent } from '../../utils/composeComponent';

/**
 * Image component - represents an image, which can be used to display a picture, icon, or other visual content.
 */
export const Image: ForwardRefComponent<ImageProps> = /*#__PURE__*/ composeComponent('Image', useImage, renderImage);
