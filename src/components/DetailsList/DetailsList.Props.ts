import * as React from 'react';
import DetailsList from './DetailsList';
import {
  ISelection,
  SelectionMode
} from '../../utilities/selection/interfaces';
import {
  IDragDropEvents,
  IDragDropContext
} from './../../utilities/dragdrop/interfaces';
import { IViewport } from '../../utilities/decorators/withViewport';

export interface IDetailsListProps extends React.Props<DetailsList> {
  /** A key that uniquely identifies the given items. If provided, the selection will be reset when the key changes. */
  setKey?: string;

  /** The items to render. */
  items: any[];

  /** Optional class name to add to the root element. */
  className?: string;

  /** Optional grouping instructions. */
  groups?: IGroup[];

  /** Optional selection model to track selection state.  */
  selection?: ISelection;

  /** Controls how/if the details list manages selection. */
  selectionMode?: SelectionMode;

  /** Controls how the columns are adjusted. */
  layoutMode?: DetailsListLayoutMode;

  /** Given column defitions. If none are provided, default columns will be created based on the item's properties. */
  columns?: IColumn[];

  /** Controls how the list contrains overflow. */
  constrainMode?: ConstrainMode;

  /** Grouping item limit. */
  groupItemLimit?: number;

  /** Text to display for the group footer show all link. */
  showAllLinkText?: string;

  /** Event names and corresponding callbacks that will be registered to rendered row elements. */
  rowElementEventMap?: [{ eventName: string, callback: (context: IDragDropContext, event?: any) => void }];

  /** Callback for when the details list has been updated. Useful for telemetry tracking externally. */
  onDidUpdate?: (detailsList?: DetailsList) => any;

  /** Callback for when a given row has been mounted. Useful for identifying when a row has been rendered on the page. */
  onRowDidMount?: (item?: any, index?: number) => void;

  /** Callback for when a given row has been mounted. Useful for identifying when a row has been removed from the page. */
  onRowWillUnmount?: (item?: any, index?: number) => void;

  /** Callback for when a given row has been invoked (by pressing enter while it is selected.) */
  onItemInvoked?: (item?: any, index?: number, ev?: Event) => void;

  /** Map of callback functions related to drag and drop functionality. */
  dragDropEvents?: IDragDropEvents;

    /** Callback for what to render when the item is missing. */
  onRenderMissingItem?: (index?: number) => React.ReactNode;

  /** Viewport, provided by the withViewport decorator. */
  viewport?: IViewport;

  /** Callback for when the "Show All" link in group footer is clicked */
  onShowAll?: (group: IGroup) => void;
}

export interface IColumn {
  key: string;
  name: string;
  fieldName: string;
  minWidth: number;
  maxWidth?: number;
  columnActionsMode?: ColumnActionsMode; /** if undefined, then behavior defaults to ColumnActionsMode.clickable */
  iconClassName?: string; /** CSS class name of an icon to show in addition to the text */
  isCollapsable?: boolean;
  isSortable?: boolean;
  isSorted?: boolean;
  isResizable?: boolean;
  isSortedDescending?: boolean;
  isMultiline?: boolean;
  getCellContent?: (item: any, index?: number) => any;
  calculatedWidth?: number;
  isFilterable?: boolean;
  isFiltered?: boolean;
  onColumnClick?: (column: IColumn, ev: React.MouseEvent) => any;
  // Internal state when a column is resizing.
  isSizing?: boolean;
  isGroupable?: boolean;
  isGrouped?: boolean;
  // Arbitrary data required to be preserved by the caller.
  data?: any;
}

/**
 * Enum to describe how a particular column header behaves.... This enum is used to
 * to specify the property IColumn:columnActionsMode.
 * If IColumn:columnActionsMode is undefined, then it's equivalent to ColumnActionsMode.clickable
 */
export enum ColumnActionsMode {
  /** disable the column header */
  disabled,
  /** column header is clickable */
  clickable,
  /** column header is clickable and displays the dropdown cheveron */
  hasDropdown
}

export enum ConstrainMode {
  unconstrained,
  horizontalConstrained
}

export enum DetailsListLayoutMode {
  fixedColumns,
  justified
}

export interface IGroup {
  key: string;
  name: string;
  startIndex: number;
  count: number;
  isSelected?: boolean;
  isCollapsed?: boolean;
  isShowingAll?: boolean;
  isDropEnabled?: boolean;
  // Arbitrary data required to be preserved by the caller.
  data?: any;
}
