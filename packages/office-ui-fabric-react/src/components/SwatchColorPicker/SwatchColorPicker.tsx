import * as React from 'react';
import {
  IStyleFunction,
  styled
} from '../../Utilities';
import { SwatchColorPickerBase } from './SwatchColorPicker.base';
import { ISwatchColorPickerProps } from './SwatchColorPicker.types';
import { getStyles } from './SwatchColorPicker.styles';

export const SwatchColorPicker = styled(
  SwatchColorPickerBase,
  getStyles
);
