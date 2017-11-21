import * as React from 'react';
import { styled } from '../../Styling';
import {
  ICheckboxProps
} from './Checkbox.types';
import { CheckboxBase } from './Checkbox.base';
import { getStyles } from './Checkbox.styles';

// Create a Checkbox variant which uses these default styles and this styled subcomponent.
export const Checkbox = styled(
  CheckboxBase,
  getStyles
);
