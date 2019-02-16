import { styled } from '../../Utilities';
import { ColorPickerBase } from './ColorPicker.base';
import { getStyles } from './ColorPicker.styles';
import { IColorPickerProps, IColorPickerStyles, IColorPickerStyleProps } from './ColorPicker.types';

export const ColorPicker: (props: IColorPickerProps) => JSX.Element = styled<IColorPickerProps, IColorPickerStyleProps, IColorPickerStyles>(
  ColorPickerBase,
  getStyles,
  undefined,
  { scope: 'ColorPicker' }
);
