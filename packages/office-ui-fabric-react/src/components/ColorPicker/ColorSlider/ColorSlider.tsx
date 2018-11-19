import { styled } from '../../../Utilities';
import { ColorSliderBase } from './ColorSlider.base';
import { getStyles } from './ColorSlider.styles';
import { IColorSliderProps, IColorSliderStyleProps, IColorSliderStyles } from './ColorSlider.types';

export const ColorSlider: (props: IColorSliderProps) => JSX.Element = styled<IColorSliderProps, IColorSliderStyleProps, IColorSliderStyles>(
  ColorSliderBase,
  getStyles,
  undefined,
  { scope: 'ColorSlider' }
);
