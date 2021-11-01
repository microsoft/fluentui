import * as React from 'react';
import { styled } from '../../Utilities';
import { TextFieldBase } from './TextField.base';
import { getStyles } from './TextField.styles';
import type { ITextFieldProps, ITextFieldStyles, ITextFieldStyleProps } from './TextField.types';

export const TextField: React.FunctionComponent<ITextFieldProps> = styled<
  ITextFieldProps,
  ITextFieldStyleProps,
  ITextFieldStyles
>(TextFieldBase, getStyles, undefined, {
  scope: 'TextField',
});

export type { ITextField } from './TextField.types';
