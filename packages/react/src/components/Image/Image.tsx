import * as React from 'react';
import { styled } from '../../Utilities';
import { ImageBase } from './Image.base';
import { getStyles } from './Image.styles';
import type { IImageProps, IImageStyleProps, IImageStyles } from './Image.types';

export const Image: React.FunctionComponent<IImageProps> = styled<IImageProps, IImageStyleProps, IImageStyles>(
  ImageBase,
  getStyles,
  undefined,
  {
    scope: 'Image',
  },
  true,
);
Image.displayName = 'Image';
