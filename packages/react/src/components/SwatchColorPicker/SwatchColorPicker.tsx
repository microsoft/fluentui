import * as React from 'react';
import { styled } from '../../Utilities';
import { SwatchColorPickerBase } from './SwatchColorPicker.base';
import {
  ISwatchColorPickerProps,
  ISwatchColorPickerStyles,
  ISwatchColorPickerStyleProps,
} from './SwatchColorPicker.types';
import { getStyles } from './SwatchColorPicker.styles';

export const SwatchColorPicker: React.FunctionComponent<ISwatchColorPickerProps> = styled<
  ISwatchColorPickerProps,
  ISwatchColorPickerStyleProps,
  ISwatchColorPickerStyles
>(SwatchColorPickerBase, getStyles, undefined, { scope: 'SwatchColorPicker' });
