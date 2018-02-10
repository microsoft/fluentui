import { styled } from '@uifabric/utilities';
import {
  ICheckboxProps,
  ICheckboxStyleProps,
  ICheckboxStyles
} from './Checkbox.types';
import { CheckboxBase } from './Checkbox.base';
import { getStyles } from './Checkbox.styles';

export const Checkbox = styled<ICheckboxProps, ICheckboxStyleProps, ICheckboxStyles>(
  CheckboxBase,
  getStyles
);
