'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { ImageSwatchProps } from './ImageSwatch.types';
import { useImageSwatch } from './useImageSwatch';
import { renderImageSwatch } from './renderImageSwatch';
import { composeComponent } from '../../../utils/composeComponent';

export const ImageSwatch: ForwardRefComponent<ImageSwatchProps> = /*#__PURE__*/ composeComponent(
  'ImageSwatch',
  useImageSwatch,
  renderImageSwatch,
);
