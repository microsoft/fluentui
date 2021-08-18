import * as React from 'react';
import { styled } from '@fluentui/utilities';
import { SliderBase } from './Slider.base';
import { getStyles } from './Slider.styles';
import type { ISliderProps, ISliderStyleProps, ISliderStyles } from './Slider.types';

export const Slider: React.FunctionComponent<ISliderProps> = styled<ISliderProps, ISliderStyleProps, ISliderStyles>(
  SliderBase,
  getStyles,
  undefined,
  {
    scope: 'Slider',
  },
);
