import { styled } from '../../Utilities';
import { IImageProps, IImageStyleProps, IImageStyles } from './Image.types';
import { ImageBase } from './Image.base';
import { getStyles } from './Image.styles';

export const Image: React.StatelessComponent<IImageProps> = styled<IImageProps, IImageStyleProps, IImageStyles>(
  ImageBase,
  getStyles,
  undefined,
  {
    scope: 'Image'
  }
);
