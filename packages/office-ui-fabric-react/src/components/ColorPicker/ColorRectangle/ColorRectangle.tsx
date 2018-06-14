import { styled } from '../../../Utilities';
import { ColorRectangleBase } from './ColorRectangle.base';
import { getStyles } from './ColorRectangle.styles';
import { IColorRectangleProps } from './ColorRectangle.types';

export const ColorRectangle: (props: IColorRectangleProps) => JSX.Element = styled(ColorRectangleBase, getStyles);
