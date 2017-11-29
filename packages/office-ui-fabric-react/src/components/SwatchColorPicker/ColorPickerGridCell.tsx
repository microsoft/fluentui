import * as React from 'react';
import {
  IStyleFunction,
  styled
} from '../../Utilities';
import { ColorPickerGridCellBase } from './ColorPickerGridCell.base';
import { IColorPickerGridCellProps } from './ColorPickerGridCell.types';
import { getStyles } from './ColorPickerGridCell.styles';

export const ColorPickerGridCell = styled(
  ColorPickerGridCellBase,
  getStyles
);