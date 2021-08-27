import * as React from 'react';
import { styled } from '../../Utilities';
import { ColorPickerBase } from './ColorPicker.base';
import { getStyles } from './ColorPicker.styles';
import type { IColorPickerProps, IColorPickerStyles, IColorPickerStyleProps } from './ColorPicker.types';

export const ColorPicker: React.FunctionComponent<IColorPickerProps> = styled<
  IColorPickerProps,
  IColorPickerStyleProps,
  IColorPickerStyles
>(ColorPickerBase, getStyles, undefined, { scope: 'ColorPicker' });
