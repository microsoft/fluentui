import * as React from 'react';
import { styled } from '../../Utilities';
import { SwatchColorPickerBase } from './SwatchColorPicker.base';
import { getStyles } from './SwatchColorPicker.styles';
import type {
  ISwatchColorPickerProps,
  ISwatchColorPickerStyles,
  ISwatchColorPickerStyleProps,
} from './SwatchColorPicker.types';

export const SwatchColorPicker: React.FunctionComponent<ISwatchColorPickerProps> = styled<
  ISwatchColorPickerProps,
  ISwatchColorPickerStyleProps,
  ISwatchColorPickerStyles
>(SwatchColorPickerBase, getStyles, undefined, { scope: 'SwatchColorPicker' });
