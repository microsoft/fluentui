import {
  autobind,
  BaseComponent,
  customizable
} from '../../Utilities';
import { IColorCellProps, IColorCellStyles, IColorCellStyleProps } from './ColorPickerGridCell.types';
import { GridCell } from '../../utilities/grid/GridCell';
import { IGridCellProps } from '../../utilities/grid/GridCell.types';
import { classNamesFunction, IClassNames, mergeStyleSets, Stylesheet, InjectionMode } from '../../Styling';

const getClassNames = classNamesFunction<IColorCellStyleProps, IColorCellStyles>();

@customizable('ColorPickerGridCell', ['theme'])
export class ColorPickerGridCellBase extends GridCell<IColorCellProps, IGridCellProps<IColorCellProps>> {

}