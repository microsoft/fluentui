import { styled } from '../../Utilities';
import { CheckboxBase } from './Checkbox.base';
import { getStyles } from './Checkbox.styles';
import { ICheckboxProps, ICheckboxStyleProps, ICheckboxStyles } from './Checkbox.types';

export const Checkbox: (props: ICheckboxProps) => JSX.Element = styled<ICheckboxProps, ICheckboxStyleProps, ICheckboxStyles>(
  CheckboxBase,
  getStyles,
  undefined,
  { scope: 'Checkbox' }
);
