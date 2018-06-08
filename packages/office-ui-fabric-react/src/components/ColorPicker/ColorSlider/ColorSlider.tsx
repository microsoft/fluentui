import { styled } from '../../../Utilities';
import { ColorSliderBase } from './ColorSlider.base';
import { getStyles } from './ColorSlider.styles';
import { IColorSliderProps } from './ColorSlider.types';

export const ColorSlider: (props: IColorSliderProps) => JSX.Element = styled(ColorSliderBase, getStyles);
