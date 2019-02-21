import * as React from 'react';
import { DetailsRowBase } from './DetailsRow.base';
import { IStyle, ITheme } from '../../Styling';
import { IColumn, CheckboxVisibility, IDetailsListProps } from './DetailsList.types';
import { ISelection, SelectionMode } from '../../utilities/selection/interfaces';
import { IDragDropHelper, IDragDropEvents } from '../../utilities/dragdrop/interfaces';
import { IViewport } from '../../utilities/decorators/withViewport';
import { CollapseAllVisibility } from '../GroupedList/GroupedList.types';
import { IBaseProps, IRefObject, IStyleFunctionOrObject } from '../../Utilities';
import { IDetailsRowCheckProps } from './DetailsRowCheck.types';
import { IDetailsRowFieldsProps } from './DetailsRowFields.types';

export interface IDetailsRow {}

export interface IDetailsItemProps {
  /**
   * Column metadata
   */
  columns?: IColumn[];

  /**
   * Nesting depth of a grouping
   */
  groupNestingDepth?: number;

  /**
   * How much to indent
   */
  indentWidth?: number | undefined;

  /**
   * Selection from utilities
   */
  selection?: ISelection | undefined;

  /**
   * Selection mode
   */
  selectionMode?: SelectionMode | undefined;

  /**
   * View port of the virtualized list
   */
  viewport?: IViewport | undefined;

  /**
   * Checkbox visibility
   */
  checkboxVisibility?: CheckboxVisibility | undefined;

  /**
   * Rules for rendering column cells.
   */
  cellStyleProps?: ICellStyleProps;
}

export interface IDetailsRowBaseProps extends Pick<IDetailsListProps, 'onRenderItemColumn'>, IBaseProps<IDetailsRow>, IDetailsItemProps {
  /**
   * Theme provided by styled() function
   */
  theme?: ITheme;

  /**
   * Overriding styles to this row
   */
  styles?: IStyleFunctionOrObject<IDetailsRowStyleProps, IDetailsRowStyles>;

  /**
   * Ref of the component
   */
  componentRef?: IRefObject<IDetailsRow>;

  /**
   * Data source for this component
   */
  item: any;

  /**
   * Index of the collection of items of the DetailsList
   */
  itemIndex: number;

  /**
   * Whether to render in compact mode
   */
  compact?: boolean;

  /**
   * A list of events to register
   */
  eventsToRegister?: { eventName: string; callback: (item?: any, index?: number, event?: any) => void }[];

  /**
   * Callback for did mount for parent
   */
  onDidMount?: (row?: DetailsRowBase) => void;

  /**
   * Callback for will mount for parent
   */
  onWillUnmount?: (row?: DetailsRowBase) => void;

  /**
   * Callback for rendering a checkbox
   */
  onRenderCheck?: (props: IDetailsRowCheckProps) => JSX.Element;

  /**
   * Handling drag and drop events
   */
  dragDropEvents?: IDragDropEvents;

  /**
   * Helper for the drag and drop
   */
  dragDropHelper?: IDragDropHelper;

  /**
   * Collapse all visibility
   */
  collapseAllVisibility?: CollapseAllVisibility;

  /**
   * Callback for getting the row aria label
   */
  getRowAriaLabel?: (item: any) => string;

  /**
   * Callback for getting the row aria-describedby
   */
  getRowAriaDescribedBy?: (item: any) => string;

  /**
   * Check button's aria label
   */
  checkButtonAriaLabel?: string;

  /**
   * Class name for the checkbox cell
   */
  checkboxCellClassName?: string;

  /**
   * DOM element into which to render row field
   */
  rowFieldsAs?: React.StatelessComponent<IDetailsRowFieldsProps> | React.ComponentClass<IDetailsRowFieldsProps>;

  /**
   * Overriding class name
   */
  className?: string;

  /**
   * Whether to render shimmer
   */
  shimmer?: boolean;

  /**
   * Rerender DetailsRow only when props changed. Might cause regression when depending on external updates.
   * @defaultvalue false
   */
  useReducedRowRenderer?: boolean;
}

export interface IDetailsRowProps extends IDetailsRowBaseProps {
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

export type IDetailsRowStyleProps = Required<Pick<IDetailsRowProps, 'theme'>> & {
  /** Whether the row is selected  */
  isSelected?: boolean;

  /** Whether there are any rows in the list selected */
  anySelected?: boolean;

  /** Whether this row can be selected */
  canSelect?: boolean;

  /** Class name of when this becomes a drop target. */
  droppingClassName?: string;

  /** Is the checkbox visible */
  isCheckVisible?: boolean;

  /** Is this a row header */
  isRowHeader?: boolean;

  /** A class name from the checkbox cell, so proper styling can be targeted */
  checkboxCellClassName?: string;

  /** CSS class name for the component */
  className?: string;

  /** Is list in compact mode */
  compact?: boolean;

  cellStyleProps?: ICellStyleProps;
};

export interface ICellStyleProps {
  cellLeftPadding: number;
  cellRightPadding: number;
  cellExtraRightPadding: number;
}

export interface IDetailsRowStyles {
  root: IStyle;
  cell: IStyle;
  cellUnpadded: IStyle;
  cellPadded: IStyle;
  checkCell: IStyle;
  isRowHeader: IStyle;
  isMultiline: IStyle;
  fields: IStyle;
  cellMeasurer: IStyle;
  checkCover: IStyle;
  shimmer: IStyle;
  shimmerIconPlaceholder: IStyle;
  shimmerLeftBorder: IStyle;
  shimmerBottomBorder: IStyle;
  check: IStyle;
}
