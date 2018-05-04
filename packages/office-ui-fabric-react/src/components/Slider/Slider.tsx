import { styled } from '../../Utilities';
import { SliderBase } from './Slider.base';
import { ISliderProps, ISliderStyleProps, ISliderStyles } from './Slider.types';
import { getStyles } from './Slider.styles';

export const Slider = styled<ISliderProps, ISliderStyleProps, ISliderStyles>(
  SliderBase,
  getStyles
);