import { styled } from '../../Utilities';
import { ColorPickerBase } from './ColorPicker.base';
import { getStyles } from './ColorPicker.styles';
import { IColorPickerProps } from './ColorPicker.types';

export const ColorPicker: (props: IColorPickerProps) => JSX.Element = styled(
  ColorPickerBase,
  getStyles
);
