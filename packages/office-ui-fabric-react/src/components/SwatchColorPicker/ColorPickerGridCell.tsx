import {
  styled
} from '../../Utilities';
import { ColorPickerGridCellBase } from './ColorPickerGridCell.base';
// tslint:disable-next-line:no-unused-variable
import { IColorPickerGridCellProps } from './ColorPickerGridCell.types';
import { getStyles } from './ColorPickerGridCell.styles';

export const ColorPickerGridCell = styled(
  ColorPickerGridCellBase,
  getStyles
);