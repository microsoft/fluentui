import * as React from 'react';
import { styled } from '../../Utilities';
import { ColorPickerGridCellBase } from './ColorPickerGridCell.base';
import {
  IColorPickerGridCellProps,
  IColorPickerGridCellStyleProps,
  IColorPickerGridCellStyles,
} from './ColorPickerGridCell.types';
import { getStyles } from './ColorPickerGridCell.styles';

export const ColorPickerGridCell: React.FunctionComponent<IColorPickerGridCellProps> = styled<
  IColorPickerGridCellProps,
  IColorPickerGridCellStyleProps,
  IColorPickerGridCellStyles
>(ColorPickerGridCellBase, getStyles, undefined, { scope: 'ColorPickerGridCell' }, true);
