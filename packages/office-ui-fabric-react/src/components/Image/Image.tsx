import { ImageBase } from './Image.base';
import { IImageProps } from './Image.types';
import { getStyles } from './Image.styles';
import { styled } from '../../Styling';

export const Image = styled(
  ImageBase,
  getStyles
);
