import { styled } from '../../Utilities';
import { TextFieldBase } from './TextField.base';
import { ITextFieldProps } from './TextField.types';
import { getStyles, getLabelStyles } from './TextField.styles';

export const TextField = styled(
  TextFieldBase,
  getStyles,
  props => ({
    getLabelStyles
  })
);
