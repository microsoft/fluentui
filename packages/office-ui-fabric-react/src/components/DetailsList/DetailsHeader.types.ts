import * as React from 'react';
import { IRefObject, IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import { CollapseAllVisibility } from '../../GroupedList';
import { ITooltipHostProps } from '../../Tooltip';
import { ITheme, IStyle } from '../../Styling';
import { DetailsHeaderBase } from './DetailsHeader.base';
import { IColumn, DetailsListLayoutMode, IColumnReorderOptions, ColumnDragEndLocation } from './DetailsList.types';
import { ICellStyleProps, IDetailsItemProps } from './DetailsRow.types';
import { ISelection, SelectionMode } from '../../utilities/selection/index';

export interface IDetailsHeader {
  /** sets focus into the header */
  focus: () => boolean;
}

export interface IDetailsHeaderBaseProps extends React.ClassAttributes<DetailsHeaderBase>, IDetailsItemProps {
  /** Theme from the Higher Order Component */
  theme?: ITheme;

  /** Call to provide customized styling that will layer on top of the variant rules. */
  styles?: IStyleFunctionOrObject<IDetailsHeaderStyleProps, IDetailsHeaderStyles>;

  /** Ref to the component itself */
  componentRef?: IRefObject<IDetailsHeader>;

  /** Layout mode - fixedColumns or justified */
  layoutMode: DetailsListLayoutMode;

  /** Callback for when column sizing has changed */
  onColumnIsSizingChanged?: (column: IColumn, isSizing: boolean) => void;

  /** Callback for when column is resized */
  onColumnResized?: (column: IColumn, newWidth: number, columnIndex: number) => void;

  /** Callback for when column is automatically resized */
  onColumnAutoResized?: (column: IColumn, columnIndex: number) => void;

  /** Callback for when the column is clicked */
  onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void;

  /** Callback for when the column needs to show a context menu */
  onColumnContextMenu?: (column: IColumn, ev: React.MouseEvent<HTMLElement>) => void;

  /** Callback to render a tooltip for the column header */
  onRenderColumnHeaderTooltip?: IRenderFunction<ITooltipHostProps>;

  /** Whether to collapse for all visibility */
  collapseAllVisibility?: CollapseAllVisibility;

  /** Whether or not all is collapsed */
  isAllCollapsed?: boolean;

  /** Callback for when collapse all is toggled */
  onToggleCollapseAll?: (isAllCollapsed: boolean) => void;

  /** ariaLabel for the entire header */
  ariaLabel?: string;

  /** ariaLabel for expand/collapse group button */
  ariaLabelForToggleAllGroupsButton?: string;

  /** ariaLabel for the header checkbox that selects or deselects everything */
  ariaLabelForSelectAllCheckbox?: string;

  /** ariaLabel for the selection column */
  ariaLabelForSelectionColumn?: string;

  /** Select all button visibility */
  selectAllVisibility?: SelectAllVisibility;

  /** Column reordering options */
  columnReorderOptions?: IColumnReorderOptions;

  /** Column reordering options */
  columnReorderProps?: IColumnReorderHeaderProps;

  /** Minimum pixels to be moved before dragging is registered */
  minimumPixelsForDrag?: number;

  /** Overriding class name */
  className?: string;
}

export interface IDetailsHeaderProps extends IDetailsHeaderBaseProps {
  /**
   * Column metadata
   */
  columns: IColumn[];

  /**
   * Selection from utilities
   */
  selection: ISelection;

  /**
   * Selection mode
   */
  selectionMode: SelectionMode;
}

export enum SelectAllVisibility {
  none = 0,
  hidden = 1,
  visible = 2
}

export interface IDetailsHeaderState {
  columnReorderProps?: IColumnReorderHeaderProps;
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

export interface IColumnReorderHeaderProps extends IColumnReorderOptions {
  /** Callback to notify the column dragEnd event to List
   * Need this to check whether the dragEnd has happened on
   * corresponding list or outside of the list
   */
  onColumnDragEnd?: (props: { dropLocation?: ColumnDragEndLocation }, event: MouseEvent) => void;
}

export interface IDropHintDetails {
  originX: number; // X index of dropHint Element relative to header
  startX: number; // start index of the range for the current drophint
  endX: number; // end index of the range for the current drophint
  dropHintElementRef: HTMLElement; // Reference for drophint to change the style when needed
}

export type IDetailsHeaderStyleProps = Required<Pick<IDetailsHeaderProps, 'theme'>> &
  Pick<IDetailsHeaderProps, 'className'> & {
    /** Whether to hide select all checkbox */
    isSelectAllHidden?: boolean;

    /** Whether the "select all" checkbox is checked */
    isAllSelected?: boolean;

    /** Is column being resized */
    isResizingColumn?: boolean;

    /** Are all columns collapsed */
    isAllCollapsed?: boolean;

    /** Whether the header is sizing */
    isSizing?: boolean;

    /** Whether checkbox is hidden  */
    isCheckboxHidden?: boolean;

    cellStyleProps?: ICellStyleProps;
  };

export interface IDetailsHeaderStyles {
  root: IStyle;
  check: IStyle;
  cellWrapperPadded: IStyle;
  cellIsCheck: IStyle;
  cellIsActionable: IStyle;
  cellIsEmpty: IStyle;
  cellSizer: IStyle;
  cellSizerStart: IStyle;
  cellSizerEnd: IStyle;
  cellIsResizing: IStyle;
  cellIsGroupExpander: IStyle;
  collapseButton: IStyle;
  checkTooltip: IStyle;
  sizingOverlay: IStyle;
  dropHintCircleStyle: IStyle;
  dropHintCaretStyle: IStyle;
  dropHintLineStyle: IStyle;
  dropHintStyle: IStyle;
  accessibleLabel: IStyle;
}
