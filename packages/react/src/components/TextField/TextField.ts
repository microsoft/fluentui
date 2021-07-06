import * as React from 'react';
import { styled } from '../../Utilities';
import { TextFieldBase } from './TextField.base';
import { ITextFieldProps, ITextFieldStyles, ITextFieldStyleProps } from './TextField.types';
import { getStyles } from './TextField.styles';
export { ITextField } from './TextField.types';

export const TextField: React.FunctionComponent<ITextFieldProps> = styled<
  ITextFieldProps,
  ITextFieldStyleProps,
  ITextFieldStyles
>(TextFieldBase, getStyles, undefined, {
  scope: 'TextField',
});
