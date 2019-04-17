import { styled } from '../../Utilities';
import { ColorPickerGridCellBase } from './ColorPickerGridCell.base';
import { IColorPickerGridCellProps, IColorPickerGridCellStyleProps, IColorPickerGridCellStyles } from './ColorPickerGridCell.types';
import { getStyles } from './ColorPickerGridCell.styles';

export const ColorPickerGridCell: React.StatelessComponent<IColorPickerGridCellProps> = styled<
  IColorPickerGridCellProps,
  IColorPickerGridCellStyleProps,
  IColorPickerGridCellStyles
>(ColorPickerGridCellBase, getStyles, undefined, { scope: 'ColorPickerGridCell' });
