import * as React from 'react';
import { IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import { CollapseAllVisibility } from '../../GroupedList';
import { ITooltipHostProps } from '../../Tooltip';
import { IViewport } from '../../utilities/decorators/withViewport';
import { ISelection, SelectionMode } from '../../utilities/selection/interfaces';
import { ITheme, IStyle } from '../../Styling';
import { DetailsHeaderBase } from './DetailsHeader.base';
import { IColumn, DetailsListLayoutMode, IColumnReorderOptions } from './DetailsList.types';

export interface IDetailsHeader {
  focus: () => boolean;
}

export interface IDetailsHeaderProps extends React.Props<DetailsHeaderBase> {
  theme?: ITheme;
  styles?: IStyleFunctionOrObject<IDetailsHeaderStyleProps, IDetailsHeaderStyles>;
  componentRef?: (component: IDetailsHeader | null) => void;
  columns: IColumn[];
  selection: ISelection;
  selectionMode: SelectionMode;
  layoutMode: DetailsListLayoutMode;
  onColumnIsSizingChanged?: (column: IColumn, isSizing: boolean) => void;
  onColumnResized?: (column: IColumn, newWidth: number, columnIndex: number) => void;
  onColumnAutoResized?: (column: IColumn, columnIndex: number) => void;
  onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void;
  onColumnContextMenu?: (column: IColumn, ev: React.MouseEvent<HTMLElement>) => void;
  onRenderColumnHeaderTooltip?: IRenderFunction<ITooltipHostProps>;
  groupNestingDepth?: number;
  indentWidth?: number;
  collapseAllVisibility?: CollapseAllVisibility;
  isAllCollapsed?: boolean;
  onToggleCollapseAll?: (isAllCollapsed: boolean) => void;
  /** ariaLabel for the entire header */
  ariaLabel?: string;
  /** ariaLabel for the header checkbox that selects or deselects everything */
  ariaLabelForSelectAllCheckbox?: string;
  ariaLabelForSelectionColumn?: string;
  selectAllVisibility?: SelectAllVisibility;
  viewport?: IViewport;
  columnReorderOptions?: IColumnReorderOptions | null;
  minimumPixelsForDrag?: number;
  className?: string;
}

export enum SelectAllVisibility {
  none = 0,
  hidden = 1,
  visible = 2
}

export interface IDetailsHeaderState {
  columnResizeDetails?: IColumnResizeDetails;
  isAllSelected?: boolean;
  isSizing?: boolean;
  groupNestingDepth?: number;
  isAllCollapsed?: boolean;
}

export interface IColumnResizeDetails {
  columnIndex: number;
  originX?: number;
  columnMinWidth: number;
}

export interface IDropHintDetails {
  originX: number; // X index of dropHint Element relative to header
  startX: number; // start index of the range for the current drophint
  endX: number; // end index of the range for the current drophint
  dropHintElementRef: HTMLElement; // Reference for drophint to change the style when needed
}

export type IDetailsHeaderStyleProps = Required<Pick<IDetailsHeaderProps, 'theme'>> &
  Pick<IDetailsHeaderProps, 'className'> & {
    isSelectAllHidden?: boolean;
    isAllSelected?: boolean;
    isResizingColumn?: boolean;
    isAllCollapsed?: boolean;
    isSizing?: boolean;
  };

export interface IDetailsHeaderStyles {
  root: IStyle;
  check: IStyle;
  cellWrapperPadded: IStyle;
  cellIsCheck: IStyle;
  cellIsActionable: IStyle;
  cellIsEmpty: IStyle;
  cell: IStyle;
  gripperBarVerticalStyle: IStyle;
  cellSizer: IStyle;
  cellSizerStart: IStyle;
  cellSizerEnd: IStyle;
  cellIsResizing: IStyle;
  collapseButton: IStyle;
  iconOnlyHeader: IStyle;
  nearIcon: IStyle;
  sortIcon: IStyle;
  filterChevron: IStyle;
  cellTitle: IStyle;
  cellName: IStyle;
  checkTooltip: IStyle;
  cellTooltip: IStyle;
  sizingOverlay: IStyle;
  borderWhileDragging: IStyle;
  dropHintCircleStyle: IStyle;
  dropHintLineStyle: IStyle;
  dropHintStyle: IStyle;
  borderAfterDropping: IStyle;
  accessibleLabel: IStyle;
}
