import { styled } from '../../Utilities';
import { SwatchColorPickerBase } from './SwatchColorPicker.base';
import { ISwatchColorPickerProps } from './SwatchColorPicker.types';
import { getStyles } from './SwatchColorPicker.styles';

export const SwatchColorPicker: (props: ISwatchColorPickerProps) => JSX.Element = styled(
  SwatchColorPickerBase,
  getStyles
);
