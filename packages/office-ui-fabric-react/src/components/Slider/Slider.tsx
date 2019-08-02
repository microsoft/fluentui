import * as React from 'react';
import { styled } from '../../Utilities';

import { ISliderProps, ISliderStyleProps, ISliderStyles } from './Slider.types';

// import { SliderBase } from './Slider.base';
import { RangeSlider } from './rangeSlider';
import { getStyles } from './Slider.styles';

export const Slider: React.StatelessComponent<ISliderProps> = styled<ISliderProps, ISliderStyleProps, ISliderStyles>(
  RangeSlider,
  getStyles,
  undefined,
  {
    scope: 'Slider'
  }
);
