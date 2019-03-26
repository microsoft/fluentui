import { styled } from '../../../Utilities';
import { ColorRectangleBase } from './ColorRectangle.base';
import { getStyles } from './ColorRectangle.styles';
import { IColorRectangleProps, IColorRectangleStyles, IColorRectangleStyleProps } from './ColorRectangle.types';

export const ColorRectangle: React.StatelessComponent<IColorRectangleProps> = styled<
  IColorRectangleProps,
  IColorRectangleStyleProps,
  IColorRectangleStyles
>(ColorRectangleBase, getStyles, undefined, { scope: 'ColorRectangle' });
