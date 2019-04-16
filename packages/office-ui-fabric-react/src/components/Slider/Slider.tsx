import { styled } from '../../Utilities';

import { ISliderProps, ISliderStyleProps, ISliderStyles } from './Slider.types';

import { SliderBase } from './Slider.base';
import { getStyles } from './Slider.styles';

export const Slider: React.StatelessComponent<ISliderProps> = styled<ISliderProps, ISliderStyleProps, ISliderStyles>(
  SliderBase,
  getStyles,
  undefined,
  {
    scope: 'Slider'
  }
);
