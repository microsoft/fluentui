import { styled } from '../../Utilities';
import { TextFieldBase } from './TextField.base';
import { ITextFieldProps, ITextFieldStyleProps, ITextFieldStyles } from './TextField.types';
import { getStyles } from './TextField.styles';

export const TextField = styled<ITextFieldProps, ITextFieldStyleProps, ITextFieldStyles>(
  TextFieldBase,
  getStyles
);