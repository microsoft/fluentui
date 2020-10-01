import * as React from 'react';
import { styled } from '@uifabric/utilities';
import { CheckboxBase } from './Checkbox.base';
import { getStyles } from './Checkbox.styles';
import { ICheckboxProps, ICheckboxStyleProps, ICheckboxStyles } from './Checkbox.types';

export const Checkbox: React.FunctionComponent<ICheckboxProps> = styled<
  ICheckboxProps,
  ICheckboxStyleProps,
  ICheckboxStyles
>(CheckboxBase, getStyles, undefined, { scope: 'Checkbox' });
