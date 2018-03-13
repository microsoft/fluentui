import { styled } from '../../Utilities';
import { SwatchColorPickerBase } from './SwatchColorPicker.base';
// tslint:disable-next-line:no-unused-variable
import { ISwatchColorPickerProps } from './SwatchColorPicker.types';
import { getStyles } from './SwatchColorPicker.styles';

export const SwatchColorPicker = styled(
  SwatchColorPickerBase,
  getStyles
);
