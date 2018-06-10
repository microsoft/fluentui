import {
  styled
} from '../../Utilities';
import { ColorPickerGridCellBase } from './ColorPickerGridCell.base';
import { IColorPickerGridCellProps } from './ColorPickerGridCell.types';
import { getStyles } from './ColorPickerGridCell.styles';

export const ColorPickerGridCell: (props: IColorPickerGridCellProps) => JSX.Element = styled(
  ColorPickerGridCellBase,
  getStyles
);