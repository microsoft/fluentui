import * as React from 'react';
import { DetailsListBase } from './DetailsList.base';
import { ISelection, SelectionMode, ISelectionZoneProps } from '../../utilities/selection/index';
import { IRefObject, IBaseProps, IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import { IDragDropEvents, IDragDropContext } from './../../utilities/dragdrop/index';
import { IGroup, IGroupRenderProps, IGroupDividerProps, IGroupedListProps } from '../GroupedList/index';
import { IDetailsRowProps, IDetailsRowBaseProps } from '../DetailsList/DetailsRow';
import { IDetailsHeaderProps, IDetailsHeaderBaseProps } from './DetailsHeader';
import { IDetailsFooterProps, IDetailsFooterBaseProps } from './DetailsFooter.types';
import { IWithViewportProps, IViewport } from '../../utilities/decorators/withViewport';
import { IList, IListProps, ScrollToMode } from '../List/index';
import { ITheme, IStyle } from '../../Styling';
import { ICellStyleProps, IDetailsItemProps } from './DetailsRow.types';
import { IDetailsColumnProps } from './DetailsColumn';

export { IDetailsHeaderProps, IDetailsRowBaseProps, IDetailsHeaderBaseProps, IDetailsFooterBaseProps };

export interface IDetailsList extends IList {
  /**
   * Ensures that the list content is updated. Call this in cases where the list prop updates don't change, but the list
   * still needs to be re-evaluated. For example, if a sizer bar is adjusted and causes the list width to change, you can
   * call this to force a re-evaluation. Be aware that this can be an expensive operation and should be done sparingly.
   */
  forceUpdate: () => void;

  /**
   * Scroll to and focus the item at the given index. focusIndex will call scrollToIndex on the specified index.
   *
   * @param index - Index of item to scroll to
   * @param forceIntoFirstElement - If true, focus will be set to the first focusable child element of the item rather
   *  than the item itself.
   * @param measureItem - Optional callback to measure the height of an individual item
   * @param scrollToMode - Optional setting to determine where in the window the item should be scrolled to when focused.
   */
  focusIndex: (
    index: number,
    forceIntoFirstElement?: boolean,
    measureItem?: (itemIndex: number) => number,
    scrollToMode?: ScrollToMode
  ) => void;

  /**
   * Get the start index of the page that is currently in view
   */
  getStartItemIndexInView: () => number;
}

export interface IDetailsListProps extends IBaseProps<IDetailsList>, IWithViewportProps {
  /**
   * Theme provided by the Higher Order Component
   */
  theme?: ITheme;

  /**
   * Style function to be passed in to override the themed or default styles
   */
  styles?: IStyleFunctionOrObject<IDetailsListStyleProps, IDetailsListStyles>;

  /**
   * Optional callback to access the IDetailsList interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IDetailsList>;

  /** A key that uniquely identifies the given items. If provided, the selection will be reset when the key changes. */
  setKey?: string;

  /** The items to render. */
  items: any[];

  /** Optional properties to pass through to the list components being rendered. */
  listProps?: IListProps;

  /**
   * Optional default focused index to set focus to once the items have rendered and the index exists.
   */
  initialFocusedIndex?: number;

  /** Optional class name to add to the root element. */
  className?: string;

  /** Optional grouping instructions. The definition for IGroup can be found under the GroupedList component. */
  groups?: IGroup[];

  /** Optional override properties to render groups. The definition for IGroupRenderProps can be found under the GroupedList component. */
  groupProps?: IDetailsGroupRenderProps;

  /** Optional override for the indent width used for group nesting. */
  indentWidth?: number;

  /** Optional selection model to track selection state.  */
  selection?: ISelection;

  /** Controls how/if the details list manages selection. Options include none, single, multiple */
  selectionMode?: SelectionMode;

  /**
   * By default, selection is cleared when clicking on an empty (non-focusable) section of the screen. Setting this value to true
   * overrides that behavior and maintains selection.
   * @defaultvalue false
   **/
  selectionPreservedOnEmptyClick?: boolean;

  /**
   * Addition props to pass through to the selection zone created by default.
   */
  selectionZoneProps?: ISelectionZoneProps;

  /** Controls how the columns are adjusted. */
  layoutMode?: DetailsListLayoutMode;

  /**
   * Controls the visibility of selection check box.
   * @defaultvalue CheckboxVisibility.onHover
   */
  checkboxVisibility?: CheckboxVisibility;

  /**
   * Controls the visibility of the details header.
   * @defaultvalue true
   */
  isHeaderVisible?: boolean;

  /** Given column defitions. If none are provided, default columns will be created based on the item's properties. */
  columns?: IColumn[];

  /** Controls how the list contrains overflow. */
  constrainMode?: ConstrainMode;

  /** Event names and corresponding callbacks that will be registered to rendered row elements. */
  rowElementEventMap?: { eventName: string; callback: (context: IDragDropContext, event?: any) => void }[];

  /** Callback for when the details list has been updated. Useful for telemetry tracking externally. */
  onDidUpdate?: (detailsList?: DetailsListBase) => void;

  /** Callback for when a given row has been mounted. Useful for identifying when a row has been rendered on the page. */
  onRowDidMount?: (item?: any, index?: number) => void;

  /** Callback for when a given row has been unmounted. Useful for identifying when a row has been removed from the page. */
  onRowWillUnmount?: (item?: any, index?: number) => void;

  /** Callback for when the user clicks on the column header. */
  onColumnHeaderClick?: (ev?: React.MouseEvent<HTMLElement>, column?: IColumn) => void;

  /** Callback for when the user asks for a contextual menu (usually via right click) from a column header. */
  onColumnHeaderContextMenu?: (column?: IColumn, ev?: React.MouseEvent<HTMLElement>) => void;

  /** Callback fired on column resize */
  onColumnResize?: (column?: IColumn, newWidth?: number, columnIndex?: number) => void;

  /** Callback for when a given row has been invoked (by pressing enter while it is selected.) */
  onItemInvoked?: (item?: any, index?: number, ev?: Event) => void;

  /**
   * Callback for when the context menu of an item has been accessed.
   * If undefined or false are returned, ev.preventDefault() will be called.
   */
  onItemContextMenu?: (item?: any, index?: number, ev?: Event) => void | boolean;

  /**
   *  If provided, will allow the caller to override the default row rendering.
   */
  onRenderRow?: IRenderFunction<IDetailsRowProps>;

  /**
   * If provided, will be the "default" item column renderer method. This affects cells within the rows; not the rows themselves.
   * If a column definition provides its own onRender method, that will be used instead of this.
   */
  onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => React.ReactNode;

  /** Map of callback functions related to row drag and drop functionality. */
  dragDropEvents?: IDragDropEvents;

  /** Callback for what to render when the item is missing. */
  onRenderMissingItem?: (index?: number, rowProps?: IDetailsRowProps) => React.ReactNode;

  /**
   * If set to true and we provide an empty array, it will render 10 lines of whatever provided in onRenderMissingItem.
   * @defaultvalue false
   */
  enableShimmer?: boolean;

  /**
   * An override to render the details header.
   */
  onRenderDetailsHeader?: IRenderFunction<IDetailsHeaderProps>;

  /**
   * An override to render the details footer.
   */
  onRenderDetailsFooter?: IRenderFunction<IDetailsFooterProps>;

  /** Viewport, provided by the withViewport decorator. */
  viewport?: IViewport;

  /** Callback for when an item in the list becomes active by clicking anywhere inside the row or navigating to it with keyboard. */
  onActiveItemChanged?: (item?: any, index?: number, ev?: React.FocusEvent<HTMLElement>) => void;

  /** The aria-label attribute to stamp out on the list header */
  ariaLabelForListHeader?: string;

  /** The aria-label attribute to stamp out on select all checkbox for the list */
  ariaLabelForSelectAllCheckbox?: string;

  /**
   * An ARIA label for the name of the selection column, for localization.
   */
  ariaLabelForSelectionColumn?: string;

  /** Optional callback to get the aria-label string for a given item. */
  getRowAriaLabel?: (item: any) => string;

  /** Optional callback to get the aria-describedby IDs (space separated strings) of the elements that describe the item. */
  getRowAriaDescribedBy?: (item: any) => string;

  /** Optional callback to get the item key, to be used in the selection and on render. */
  getKey?: (item: any, index?: number) => string;

  /** A text summary of the table set via aria-label. */
  ariaLabel?: string;

  /** Check button aria label for details list. */
  checkButtonAriaLabel?: string;

  /** Aria label for grid in details list. */
  ariaLabelForGrid?: string;

  /** Boolean value to indicate if the role application should be applied on details list. Set to false by default */
  shouldApplyApplicationRole?: boolean;

  /**
   * The minimum mouse move distance to interpret the action as drag event.
   * @defaultvalue 5
   */
  minimumPixelsForDrag?: number;

  /** Boolean value to indicate if the component should render in compact mode. Set to false by default */
  compact?: boolean;

  /**
   * Boolean value to enable render page caching. This is an experimental performance optimization
   * that is off by default.
   * @defaultvalue false
   */
  usePageCache?: boolean;

  /**
   * Optional callback to determine whether the list should be rendered in full, or virtualized.
   * Virtualization will add and remove pages of items as the user scrolls them into the visible range.
   * This benefits larger list scenarios by reducing the DOM on the screen, but can negatively affect performance for smaller lists.
   * The default implementation will virtualize when this callback is not provided.
   */
  onShouldVirtualize?: (props: IListProps) => boolean;

  /**
   * Optional class name to add to the cell of a checkbox
   */
  checkboxCellClassName?: string;

  /**
   * Whether or not the selection zone should enter modal state on touch.
   */
  enterModalSelectionOnTouch?: boolean;

  /**
   * Options for column re-order using drag and drop
   */
  columnReorderOptions?: IColumnReorderOptions;

  /**
   * Optional function to override default group height calculation used by list virtualization.
   */
  getGroupHeight?: IGroupedListProps['getGroupHeight'];

  /**
   * Rerender DetailsRow only when props changed. Might cause regression when depending on external updates.
   * @defaultvalue false
   */
  useReducedRowRenderer?: boolean;

  /**
   * Props impacting the render style of cells. Since these have an impact on calculated column widths, they are
   * handled separately from normal theme styling, but they are passed to the styling system.
   */
  cellStyleProps?: ICellStyleProps;

  /**
   * Whether or not to disable the built-in SelectionZone, so the host component can provide its own.
   */
  disableSelectionZone?: boolean;
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
  fieldName?: string;

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
   * @defaultvalue false
   */
  isRowHeader?: boolean;

  /**
   * Maximum width for the column, if stretching is allowed in justified scenarios.
   */
  maxWidth?: number;

  /**
   * Defines how the column's header should render.
   * @defaultvalue ColumnActionsMode.clickable
   */
  columnActionsMode?: ColumnActionsMode;

  /**
   * Optional iconName to use for the column header.
   */
  iconName?: string;

  /**
   * Whether or not only the icon is used in the column header.
   * Set this to true so the column name and dropdown chevron are not displayed.
   */
  isIconOnly?: boolean;

  /**
   * Class name to add to the Icon component.
   */
  iconClassName?: string;

  /**
   * If specified will allow the column to be collapsed when rendered in justified layout.
   * @deprecated Use `isCollapsible`
   */
  isCollapsable?: boolean;

  /**
   * If specified will allow the column to be collapsed when rendered in justified layout.
   */
  isCollapsible?: boolean;

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
   * If provider, can be used to render a custom column header divider
   */
  onRenderDivider?: IRenderFunction<IDetailsColumnProps>;

  /**
   * Determines if the column is filtered, and if so shows a filter icon.
   */
  isFiltered?: boolean;

  /**
   * If provided, will be executed when the user clicks on the column header.
   */
  onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void;

  /**
   * If provided, will be executed when the user accesses the contextmenu on a column header.
   */
  onColumnContextMenu?: (column?: IColumn, ev?: React.MouseEvent<HTMLElement>) => void;

  /**
   * If provided, will be executed when the column is resized with the column's current width.
   * Prefer this callback over `DetailsList` `onColumnResize` if you require the `IColumn` to
   * report its width after every resize event. Consider debouncing the callback if resize events
   * occur frequently.
   */
  onColumnResize?: (width?: number) => void;

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
   * Internal only value.
   * Remembers the actual witdh of the column on any case.
   * On the other hand, calculatedWidth is only saved when it's defined by user, not for justified calculations.
   */
  currentWidth?: number;

  /**
   * An optional class name to stick on the column cell within each header.
   */
  headerClassName?: string;

  /**
   * If set, will add additional LTR padding-right to column and cells.
   */
  isPadded?: boolean;

  /**
   * ARIA label for the sort order of this column when sorted ascending.
   */
  sortAscendingAriaLabel?: string;
  /**
   * ARIA label for the sort order of this column when sorted descending.
   */
  sortDescendingAriaLabel?: string;
  /**
   * ARIA label for the status of this column when grouped.
   */
  groupAriaLabel?: string;
  /**
   * ARIA label for the status of this column when filtered.
   */
  filterAriaLabel?: string;
  /**
   * Indicates whether a dropdown menu is open so that the appropriate ARIA attributes are rendered.
   */
  isMenuOpen?: boolean;
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
  disabled = 0,

  /**
   * Renders the column header is clickable.
   */
  clickable = 1,

  /**
   * Renders the column header ias clickable and displays the dropdown cheveron.
   */
  hasDropdown = 2
}

export enum ConstrainMode {
  /** If specified, lets the content grow which allows the page to manage scrolling. */
  unconstrained = 0,

  /**
   * If specified, constrains the list to the given layout space.
   */
  horizontalConstrained = 1
}

export interface IColumnReorderOptions {
  /**
   * Specifies the number fixed columns from left(0th index)
   * @defaultvalue 0
   */
  frozenColumnCountFromStart?: number;

  /**
   * Specifies the number fixed columns from right
   * @defaultvalue 0
   */
  frozenColumnCountFromEnd?: number;

  /**
   * Callback to handle the column dragstart
   * draggedStarted indicates that the column drag has been started on DetailsHeader
   */
  onColumnDragStart?: (dragStarted: boolean) => void;

  /**
   * Callback to handle the column reorder
   * draggedIndex is the source column index, that need to be placed in targetIndex
   * Deprecated, use `onColumnDrop` instead.
   * @deprecated Use `onColumnDrop` instead.
   */
  handleColumnReorder?: (draggedIndex: number, targetIndex: number) => void;

  /**
   * Callback to handle the column reorder
   * draggedIndex is the source column index, that need to be placed in targetIndex
   */
  onColumnDrop?: (dragDropDetails: IColumnDragDropDetails) => void;

  /**
   * Callback to handle the column reorder
   */
  onDragEnd?: (columnDropLocationDetails: ColumnDragEndLocation) => void;
}

export interface IColumnDragDropDetails {
  /**
   * Specifies the source column index
   * @defaultvalue -1
   */
  draggedIndex: number;

  /**
   * Specifies the target column index
   * @defaultvalue -1
   */
  targetIndex: number;
}

/**
 * Enum to describe where the column has been dropped, after starting the drag
 */
export enum ColumnDragEndLocation {
  /**
   * Drag ended outside of current list
   */
  outside = 0,

  /**
   * Drag ended on current List
   */
  surface = 1,

  /**
   * Drag ended on Header
   */
  header = 2
}

export enum DetailsListLayoutMode {
  /**
   * Lets the user resize columns and makes not attempt to fit them.
   */
  fixedColumns = 0,

  /**
   * Manages which columns are visible, tries to size them according to their min/max rules and drops
   * off columns that can't fit and have isCollapsible set.
   */
  justified = 1
}

export enum CheckboxVisibility {
  /**
   * Visible on hover.
   */
  onHover = 0,

  /**
   * Visible always.
   */
  always = 1,

  /**
   * Hide checkboxes.
   */
  hidden = 2
}

export type IDetailsListStyleProps = Required<Pick<IDetailsListProps, 'theme'>> &
  Pick<IDetailsListProps, 'className'> & {
    /** Whether the the list is horizontally constrained */
    isHorizontalConstrained?: boolean;

    /** Whether the list is in compact mode */
    compact?: boolean;

    /** Whether the list is fixed in size */
    isFixed?: boolean;
  };

export interface IDetailsListStyles {
  root: IStyle;
  focusZone: IStyle;
  headerWrapper: IStyle;
  contentWrapper: IStyle;
}

export interface IDetailsGroupRenderProps extends IGroupRenderProps {
  onRenderFooter?: IRenderFunction<IDetailsGroupDividerProps>;
  onRenderHeader?: IRenderFunction<IDetailsGroupDividerProps>;
}

export interface IDetailsGroupDividerProps extends IGroupDividerProps, IDetailsItemProps {}
