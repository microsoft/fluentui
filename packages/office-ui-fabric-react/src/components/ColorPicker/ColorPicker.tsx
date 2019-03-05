import { styled } from '../../Utilities';
import { ColorPickerBase } from './ColorPicker.base';
import { getStyles } from './ColorPicker.styles';
import { IColorPickerProps, IColorPickerStyles, IColorPickerStyleProps } from './ColorPicker.types';

export const ColorPicker: React.StatelessComponent<IColorPickerProps> = styled<
  IColorPickerProps,
  IColorPickerStyleProps,
  IColorPickerStyles
>(ColorPickerBase, getStyles, undefined, { scope: 'ColorPicker' });
