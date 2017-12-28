import { styled } from '../../Utilities';
import { TextFieldBase } from './TextField.base';
import { ITextFieldProps } from './TextField.types';
import { getStyles } from './TextField.styles';

export const TextField = styled(
  TextFieldBase,
  getStyles
);
