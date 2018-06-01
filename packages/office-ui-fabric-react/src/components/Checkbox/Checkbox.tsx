import { styled } from '../../Utilities';
import { CheckboxBase } from './Checkbox.base';
import { getStyles } from './Checkbox.styles';
import { ICheckboxProps } from './Checkbox.types';

export const Checkbox: (props: ICheckboxProps) => JSX.Element = styled(
  CheckboxBase,
  getStyles
);
