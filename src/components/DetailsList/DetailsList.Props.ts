import * as React from 'react';
import { DetailsList } from './DetailsList';
import {
  ISelection,
  SelectionMode
} from '../../utilities/selection/index';
import {
  IDragDropEvents,
  IDragDropContext,
} from './../../utilities/dragdrop/index';
import {
  IGroup,
  IGroupRenderProps
} from '../GroupedList/index';
import { IDetailsRowProps } from '../DetailsList/DetailsRow';
import { IViewport } from '../../utilities/decorators/withViewport';

export interface IDetailsList {
  /**
   * Ensures that the list content is updated. Call this in cases where the list prop updates don't change, but the list
   * still needs to be re-evaluated. For example, if a sizer bar is adjusted and causes the list width to change, you can
   * call this to force a re-evaluation. Be aware that this can be an expensive operation and should be done sparingly.
   */
  forceUpdate: () => void;
}

export interface IDetailsListProps extends React.Props<DetailsList> {
  /** A key that uniquely identifies the given items. If provided, the selection will be reset when the key changes. */
  setKey?: string;

  /** The items to render. */
  items: any[];

  /**
   * Optional default focused index to set focus to once the items have rendered and the index exists.
   */
  initialFocusedIndex?: number;

  /** Optional class name to add to the root element. */
  className?: string;

  /** Optional grouping instructions. The definition for IGroup can be found under the GroupedList component. */
  groups?: IGroup[];

  /** Optional override properties to render groups. The definition for IGroupRenderProps can be found under the GroupedList component. */
  groupProps?: IGroupRenderProps;

  /** Optional selection model to track selection state.  */
  selection?: ISelection;

  /** Controls how/if the details list manages selection. */
  selectionMode?: SelectionMode;

  /** Controls how the columns are adjusted. */
  layoutMode?: DetailsListLayoutMode;

  /**
   * Controls the visibility of selection check box.
   * @default CheckboxVisibility.onHover
   */
  checkboxVisibility?: CheckboxVisibility;

  /**
   * Controls the visibility of the details header.
   * @default true
   */
  isHeaderVisible?: boolean;

  /** Given column defitions. If none are provided, default columns will be created based on the item's properties. */
  columns?: IColumn[];

  /** Controls how the list contrains overflow. */
  constrainMode?: ConstrainMode;

  /** Event names and corresponding callbacks that will be registered to rendered row elements. */
  rowElementEventMap?: [{ eventName: string, callback: (context: IDragDropContext, event?: any) => void }];

  /** Callback for when the details list has been updated. Useful for telemetry tracking externally. */
  onDidUpdate?: (detailsList?: DetailsList) => any;

  /** Callback for when a given row has been mounted. Useful for identifying when a row has been rendered on the page. */
  onRowDidMount?: (item?: any, index?: number) => void;

  /** Callback for when a given row has been mounted. Useful for identifying when a row has been removed from the page. */
  onRowWillUnmount?: (item?: any, index?: number) => void;

  /** Callback for when the user clicks on the column header. */
  onColumnHeaderClick?: (ev?: React.MouseEvent<HTMLElement>, column?: IColumn) => void;

  /** Callback for when the user asks for a contextual menu (usually via right click) from a column header. */
  onColumnHeaderContextMenu?: (column?: IColumn, ev?: Event) => void;

  /** Callback for when a given row has been invoked (by pressing enter while it is selected.) */
  onItemInvoked?: (item?: any, index?: number, ev?: Event) => void;

  /** Callback for when the context menu of an item has been accessed. */
  onItemContextMenu?: (item?: any, index?: number, ev?: Event) => void;

  /**
   *  If provided, will allow the caller to override the default row rendering.
   */
  onRenderRow?: (props: IDetailsRowProps, defaultRender?: (props: IDetailsRowProps) => JSX.Element) => JSX.Element;

  /**
   * If provided, will be the "default" item column renderer method. This affects cells within the rows; not the rows themselves.
   * If a column definition provides its own onRender method, that will be used instead of this.
   */
  onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => any;

  /** Map of callback functions related to drag and drop functionality. */
  dragDropEvents?: IDragDropEvents;

  /** Callback for what to render when the item is missing. */
  onRenderMissingItem?: (index?: number) => React.ReactNode;

  /** Viewport, provided by the withViewport decorator. */
  viewport?: IViewport;

  /** Callback for when an item in the list becomes active by clicking anywhere inside the row or navigating to it with keyboard. */
  onActiveItemChanged?: (item?: any, index?: number, ev?: React.FocusEvent<HTMLElement>) => void;

  /** The aria-label attribute to stamp out on the list header */
  ariaLabelForListHeader?: string;

  /** The aria-label attribute to stamp out on select all checkbox for the list */
  ariaLabelForSelectAllCheckbox?: string;

  /** Optional callback to get the aria-label string for a given item. */
  getRowAriaLabel?: (item: any) => string;

  /** Optional callback to get the item key that will be used in the selection. */
  getKey?: (item: any, index?: number) => string;

  /** A text summary of the table set via aria-label. */
  ariaLabel?: string;

  /** Check button aria label for details list. */
  checkButtonAriaLabel?: string;

  /** Aria label for grid in details list. */
  ariaLabelForGrid?: string;

  /** Boolean value to indicate if the role application should be applied on details list. Set to false by default */
  shouldApplyApplicationRole?: boolean;
}

export interface IColumn {
  /**
   * A unique key for identifying the column.
   */
  key: string;

  /**
   * Name to render on the column header.
   */
  name: string;

  /**
   * The field to pull the text value from for the column. This can be null if a custom
   * onRender method is provided.
   */
  fieldName: string;

  /**
   * An optional class name to stick on the column cell within each row.
   */
  className?: string;

  /**
   * Minimum width for the column.
   */
  minWidth: number;

  /**
   * Optional accessibility label (aria-label) attribute that will be stamped on to the element.
   * If none is specified, the arai-label attribute will contain the column name
   */
  ariaLabel?: string;

  /**
   * Optional flag on whether the column is a header for the given row. There should be only one column with
   * row header set to true.
   * @default false
   */
  isRowHeader?: boolean;

  /**
   * Maximum width for the column, if stretching is allowed in justified scenarios.
   */
  maxWidth?: number;

  /**
   * Defines how the column's header should render.
   * @default ColumnActionsMode.clickable */
  columnActionsMode?: ColumnActionsMode;

  /**
   * Icon name to show in addition to the text.
   */
  iconClassName?: string;

  /**
   * If specified will allow the column to be collapsed when rendered in justified layout.
   */
  isCollapsable?: boolean;

  /**
   * Determines if the column is currently sorted. Renders a sort arrow in the column header.
   */
  isSorted?: boolean;

  /**
   * Determines if the arrow is pointed down (descending) or up.
   */
  isSortedDescending?: boolean;

  /**
   * Determines if the column can be resized.
   */
  isResizable?: boolean;

  /**
   * Determines if the column can render multi-line text.
   */
  isMultiline?: boolean;

  /**
   * If provided uses this method to render custom cell content, rather than the default text rendering.
   */
  onRender?: (item?: any, index?: number, column?: IColumn) => any;

  /**
   * Determines if the column is filtered, and if so shows a filter icon.
   */
  isFiltered?: boolean;

  /**
   * If provided, will be executed when the user clicks on the column header.
   */
  onColumnClick?: (ev?: React.MouseEvent<HTMLElement>, column?: IColumn) => any;

  /**
   * If provided, will be executed when the user accesses the contextmenu on a column header.
   */
  onColumnContextMenu?: (column?: IColumn, ev?: React.MouseEvent<HTMLElement>) => any;

  /**
   * If set will show a grouped icon next to the column header name.
   */
  isGrouped?: boolean;

  /**
   * Arbitrary data passthrough which can be used by the caller.
   */
  data?: any;

  /**
   * Internal only value.
   */
  calculatedWidth?: number;

  /**
   * An optional class name to stick on the column cell within each header.
   */
  headerClassName?: string;
}

/**
 * Enum to describe how a particular column header behaves.... This enum is used to
 * to specify the property IColumn:columnActionsMode.
 * If IColumn:columnActionsMode is undefined, then it's equivalent to ColumnActionsMode.clickable
 */
export enum ColumnActionsMode {
  /**
   * Renders the column header as disabled.
   */
  disabled,

  /**
   * Renders the column header is clickable.
   */
  clickable,

  /**
   * Renders the column header ias clickable and displays the dropdown cheveron.
   */
  hasDropdown
}

export enum ConstrainMode {
  /** If specified, lets the content grow which allows the page to manage scrolling. */
  unconstrained,

  /**
   * If specified, constrains the list to the given layout space.
   */
  horizontalConstrained
}

export enum DetailsListLayoutMode {
  /**
   * Lets the user resize columns and makes not attempt to fit them.
   */
  fixedColumns,

  /**
   * Manages which columns are visible, tries to size them according to their min/max rules and drops
   * off columns that can't fit and have isCollapsable set.
   */
  justified
}

export enum CheckboxVisibility {
  /**
   * Visible on hover.
   */
  onHover,

  /**
   * Visible always.
   */
  always
}
