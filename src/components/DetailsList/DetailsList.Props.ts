import * as React from 'react';
import { DetailsList } from './DetailsList';
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

  /** Optional override properties to render groups. */
  groupProps?: IDetailsGroupProps;

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

  /** Callback for when an item in the list becomes active by clicking anywhere inside the row or navigating to it with keyboard. */
  onActiveItemChanged?: (item?: any, index?: number, ev?: React.FocusEvent) => void;

  /** The aria-label attribute to stamp out on the list header */
  ariaLabelForListHeader?: string;

  /** The aria-label attribute to stamp out on select all checkbox for the list */
  ariaLabelForSelectAllCheckbox?: string;

  /** Optional callback to get the item key that will be used in the selection. */
  getKey?: (item: any, index?: number) => string;
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
  onRender?: (item: any, index?: number) => any;

  /**
   * Determines if the column is filtered, and if so shows a filter icon.
   */
  isFiltered?: boolean;

  /**
   * If provided, will be executed when the user clicks on the column header.
   */
  onColumnClick?: (column: IColumn, ev: React.MouseEvent) => any;

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

export interface IGroup {
  /**
   * Unique identifier for the group.
   */
  key: string;

  /**
   * Display name for the group, rendered on the header.
   */
  name: string;

  /**
   * Start index for the group within the given items.
   */
  startIndex: number;

  /**
   * How many items should be rendered within the group.
   */
  count: number;

  /**
   * Nested groups, if any.
   */
  children?: IGroup[];

  /**
   * Number indicating the level of nested groups.
   */
  level?: number;

  /**
   * If all the items in the group are selected.
   */
  isSelected?: boolean;

  /**
   * If all the items in the group are collapsed.
   */
  isCollapsed?: boolean;

  /**
   * If the items within the group are summarized or showing all.
   */
  isShowingAll?: boolean;

  /**
   * If drag/drop is enabled for the group header.
   */
  isDropEnabled?: boolean;

  /**
   * Arbitrary data required to be preserved by the caller.
   */
  data?: any;

  /**
   * Override which allows the caller to provide a custom header.
   */
  onRenderHeader?: (group: IGroup) => React.ReactNode;

  /**
   * Override which allows the caller to provider a customer footer.
   */
  onRenderFooter?: (group: IGroup) => React.ReactNode;
}

export interface IDetailsGroupProps {
  /** Boolean indicating if all groups are in collapsed state. */
  isAllGroupsCollapsed?: boolean;

  /** Grouping item limit. */
  getGroupItemLimit?: (group: IGroup) => number;

  /** Callback for when all groups are expanded or collapsed. */
  onToggleCollapseAll?: (isAllCollapsed: boolean) => void;

  /** Information to pass in to the group header. */
  headerProps?: IDetailsGroupHeaderProps;

  /** Information to pass in to the group footer. */
  footerProps?: IDetailsGroupFooterProps;
}

export interface IDetailsGroupHeaderProps {
  /** Callback to determine if a group has missing items and needs to load them from the server. */
  isGroupLoading?: (group: IGroup) => boolean;

  /** Text shown on group headers to indicate the group is being loaded. */
  loadingText?: string;

  /** Callback for when the group header is clicked. */
  onGroupHeaderClick?: (group: IGroup) => void;

  /** Callback for when the group is expanded or collapsed. */
  onToggleCollapse?: (group: IGroup) => void;

  /** Callback for when the group is selected. */
  onToggleSelectGroup?: (group: IGroup) => void;
}

export interface IDetailsGroupFooterProps {
  /** Callback for when the "Show All" link in group footer is clicked */
  onToggleSummarize?: (group: IGroup) => void;

  /** Text to display for the group footer show all link. */
  showAllLinkText?: string;
}

