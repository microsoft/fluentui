import * as React from 'react';
import { styled } from '../../Utilities';

import { ISliderProps, ISliderStyleProps, ISliderStyles } from './Slider.types';

import { SliderBase } from './Slider.base';
import { getStyles } from './Slider.styles';

/* eslint-disable deprecation/deprecation */

/** @deprecated */
export const Slider: React.FunctionComponent<ISliderProps> = styled<ISliderProps, ISliderStyleProps, ISliderStyles>(
  SliderBase,
  getStyles,
  undefined,
  {
    scope: 'Slider',
  },
);
