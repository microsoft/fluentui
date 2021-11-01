import * as React from 'react';
import { styled } from '@fluentui/utilities';
import { CheckboxBase } from './Checkbox.base';
import { getStyles } from './Checkbox.styles';
import type { ICheckboxProps, ICheckboxStyleProps, ICheckboxStyles } from './Checkbox.types';

export const Checkbox: React.FunctionComponent<ICheckboxProps> = styled<
  ICheckboxProps,
  ICheckboxStyleProps,
  ICheckboxStyles
>(CheckboxBase, getStyles, undefined, { scope: 'Checkbox' });
