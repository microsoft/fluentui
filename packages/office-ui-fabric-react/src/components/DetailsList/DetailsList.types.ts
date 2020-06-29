import * as React from 'react';
import { DetailsListBase } from './DetailsList.base';
import { ISelection, SelectionMode, ISelectionZoneProps } from '../../utilities/selection/index';
import { IRefObject, IBaseProps, IRenderFunction, IStyleFunctionOrObject } from '../../Utilities';
import { IDragDropEvents, IDragDropContext, IDragDropHelper, IDragDropOptions } from './../../utilities/dragdrop/index';
import { IGroup, IGroupRenderProps, IGroupDividerProps, IGroupedListProps } from '../GroupedList/index';
import { IDetailsRowProps, IDetailsRowBaseProps } from '../DetailsList/DetailsRow';
import { IDetailsHeaderProps, IDetailsHeaderBaseProps } from './DetailsHeader';
import { IDetailsFooterProps, IDetailsFooterBaseProps } from './DetailsFooter.types';
import { IWithViewportProps, IViewport } from '../../utilities/decorators/withViewport';
import { IList, IListProps, ScrollToMode } from '../List/index';
import { ITheme, IStyle } from '../../Styling';
import { ICellStyleProps, IDetailsItemProps } from './DetailsRow.types';
import { IDetailsCheckboxProps } from './DetailsRowCheck.types';
import { IDetailsColumnStyleProps, IDetailsColumnProps, IDetailsColumnStyles } from './DetailsColumn.types';

export {
  IDetailsHeaderProps,
  IDetailsRowBaseProps,
  IDetailsHeaderBaseProps,
  IDetailsFooterBaseProps,
  IDragDropContext,
  IDragDropEvents,
  IDragDropHelper,
  IDragDropOptions,
  IViewport,
  IWithViewportProps,
};

/**
 * {@docCategory DetailsList}
 */
export interface IDetailsList extends IList {
  /**
   * Ensures that the list content is updated. Call this in cases where the list prop updates don't change, but the list
   * still needs to be re-evaluated. For example, if a sizer bar is adjusted and causes the list width to change,
   * you can call this to force a re-evaluation. Be aware that this can be an expensive operation and should be
   * done sparingly.
   */
  forceUpdate: () => void;

  /**
   * Scroll to and focus the item at the given index. focusIndex will call scrollToIndex on the specified index.
   *
   * @param index - Index of item to scroll to
   * @param forceIntoFirstElement - If true, focus will be set to the first focusable child element of the item rather
   *  than the item itself.
   * @param measureItem - Optional callback to measure the height of an individual item
   * @param scrollToMode - Optional setting to determine where in the window the item should be scrolled to
   * when focused.
   */
  focusIndex: (
    index: number,
    forceIntoFirstElement?: boolean,
    measureItem?: (itemIndex: number) => number,
    scrollToMode?: ScrollToMode,
  ) => void;

  /**
   * Get the start index of the page that is currently in view
   */
  getStartItemIndexInView: () => number;
}

/**
 * {@docCategory DetailsList}
 */
export interface IDetailsListProps extends IBaseProps<IDetailsList>, IWithViewportProps {
  /** Theme provided by a higher-order component. */
  theme?: ITheme;

  /** Custom overrides to the themed or default styles. */
  styles?: IStyleFunctionOrObject<IDetailsListStyleProps, IDetailsListStyles>;

  /**
   * Callback to access the IDetailsList interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IDetailsList>;

  /** A key that uniquely identifies the given items. If provided, the selection will be reset when the key changes. */
  setKey?: string;

  /** The items to render. */
  items: any[];

  /** Set this to true to indicate that the items being displayed are placeholder data. */
  isPlaceholderData?: boolean;

  /** Properties to pass through to the List components being rendered. */
  listProps?: IListProps;

  /** Default index to set focus to once the items have rendered and the index exists. */
  initialFocusedIndex?: number;

  /** Class name to add to the root element. */
  className?: string;

  /** Grouping instructions. */
  groups?: IGroup[];

  /** Override properties to render groups. */
  groupProps?: IDetailsGroupRenderProps;

  /** Override for the indent width used for group nesting. */
  indentWidth?: number;

  /** Selection model to track selection state.  */
  selection?: ISelection;

  /** Controls how/if the details list manages selection. Options include none, single, multiple */
  selectionMode?: SelectionMode;

  /**
   * By default, selection is cleared when clicking on an empty (non-focusable) section of the screen.
   * Setting this value to true overrides that behavior and maintains selection.
   * @defaultvalue false
   **/
  selectionPreservedOnEmptyClick?: boolean;

  /**
   * Additional props to pass through to the SelectionZone created by default.
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
   * Controls the visibility of the header.
   * @defaultvalue true
   */
  isHeaderVisible?: boolean;

  /** column defitions. If none are provided, default columns will be created based on the items' properties. */
  columns?: IColumn[];

  /** Controls how the list contrains overflow. */
  constrainMode?: ConstrainMode;

  /** Event names and corresponding callbacks that will be registered to rendered row elements. */
  rowElementEventMap?: { eventName: string; callback: (context: IDragDropContext, event?: any) => void }[];

  /** Callback for when the list has been updated. Useful for telemetry tracking externally. */
  onDidUpdate?: (detailsList?: DetailsListBase) => void;

  /**
   * Callback for when a given row has been mounted. Useful for identifying when a row has been rendered on the page.
   */
  onRowDidMount?: (item?: any, index?: number) => void;

  /**
   * Callback for when a given row has been unmounted.
   * Useful for identifying when a row has been removed from the page.
   */
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
   * If undefined or false is returned, `ev.preventDefault()` will be called.
   */
  onItemContextMenu?: (item?: any, index?: number, ev?: Event) => void | boolean;

  /**
   * Callback to override the default row rendering.
   */
  onRenderRow?: IRenderFunction<IDetailsRowProps>;

  /**
   * If provided, will be the "default" item column renderer method.
   * This affects cells within the rows, not the rows themselves.
   * If a column definition provides its own `onRender` method, that will be used instead of this.
   */
  onRenderItemColumn?: (item?: any, index?: number, column?: IColumn) => React.ReactNode;

  /**
   * If provided, will be the "default" item column cell value return.
   * A column's `getValueKey` can override `getCellValueKey`.
   */
  getCellValueKey?: (item?: any, index?: number, column?: IColumn) => string;

  /** Map of callback functions related to row drag and drop functionality. */
  dragDropEvents?: IDragDropEvents;

  /** Callback for what to render when the item is missing. */
  onRenderMissingItem?: (index?: number, rowProps?: IDetailsRowProps) => React.ReactNode;

  /** An override to render the details header. */
  onRenderDetailsHeader?: IRenderFunction<IDetailsHeaderProps>;

  /** An override to render the details footer. */
  onRenderDetailsFooter?: IRenderFunction<IDetailsFooterProps>;

  /**  If provided, can be used to render a custom checkbox. */
  onRenderCheckbox?: IRenderFunction<IDetailsListCheckboxProps>;

  /** Viewport info, provided by the `withViewport` decorator. */
  viewport?: IViewport;

  /**
   * Callback for when an item in the list becomes active by clicking anywhere inside the row or navigating to it
   * with the keyboard.
   */
  onActiveItemChanged?: (item?: any, index?: number, ev?: React.FocusEvent<HTMLElement>) => void;

  /** Accessible label for the list header. */
  ariaLabelForListHeader?: string;

  /** Accessible label for the select all checkbox. */
  ariaLabelForSelectAllCheckbox?: string;

  /** Accessible label for the name of the selection column. */
  ariaLabelForSelectionColumn?: string;

  /** Callback to get the aria-label string for a given item. */
  getRowAriaLabel?: (item: any) => string;

  /** Callback to get the aria-describedby IDs (space-separated strings) of elements that describe the item. */
  getRowAriaDescribedBy?: (item: any) => string;

  /**
   * Callback to get the item key, to be used in the selection and on render.
   * Must be provided if sorting or filtering is enabled.
   */
  getKey?: (item: any, index?: number) => string;

  /** Accessible label describing or summarizing the list. */
  ariaLabel?: string;

  /** Accessible label for the check button. */
  checkButtonAriaLabel?: string;

  /** Accessible label for the grid within the list. */
  ariaLabelForGrid?: string;

  /**
   * Whether the role `application` should be applied to the list.
   * @defaultvalue false
   */
  shouldApplyApplicationRole?: boolean;

  /**
   * The minimum mouse move distance to interpret the action as drag event.
   * @defaultvalue 5
   */
  minimumPixelsForDrag?: number;

  /**
   * Whether to render in compact mode.
   * @defaultvalue false
   */
  compact?: boolean;

  /**
   * Whether to enable render page caching. This is an experimental performance optimization that is off by default.
   * @defaultvalue false
   */
  usePageCache?: boolean;

  /**
   * Callback to determine whether the list should be rendered in full, or virtualized.
   *
   * Virtualization will add and remove pages of items as the user scrolls them into the visible range.
   * This benefits larger list scenarios by reducing the DOM on the screen, but can negatively affect performance
   * for smaller lists.
   *
   * The default implementation will virtualize when this callback is not provided.
   */
  onShouldVirtualize?: (props: IListProps) => boolean;

  /** Class name to add to the cell of a checkbox. */
  checkboxCellClassName?: string;

  /** Whether the selection zone should enter modal state on touch. */
  enterModalSelectionOnTouch?: boolean;

  /** Options for column reordering using drag and drop. */
  columnReorderOptions?: IColumnReorderOptions;

  /** Callback to override default group height calculation used by list virtualization. */
  getGroupHeight?: IGroupedListProps['getGroupHeight'];

  /**
   * Whether to re-render a row only when props changed. Might cause regression when depending on external updates.
   * @defaultvalue false
   */
  useReducedRowRenderer?: boolean;

  /**
   * Props impacting the render style of cells. Since these have an impact on calculated column widths, they are
   * handled separately from normal theme styling, but they are passed to the styling system.
   */
  cellStyleProps?: ICellStyleProps;

  /** Whether to disable the built-in SelectionZone, so the host component can provide its own. */
  disableSelectionZone?: boolean;

  /** Whether to animate updates */
  enableUpdateAnimations?: boolean;

  /**
   * Whether to use fast icon and check components. The icons can't be targeted by customization
   * but are still customizable via class names.
   * @defaultvalue true
   */
  useFastIcons?: boolean;
}

/**
 * {@docCategory DetailsList}
 */
export interface IColumn {
  /** A unique key for identifying the column. */
  key: string;

  /** Name to render on the column header. */
  name: string;

  /**
   * The field to pull the text value from for the column.
   * Can be unset if a custom `onRender` method is provided.
   */
  fieldName?: string;

  /** Class name to apply to the column cell within each row. */
  className?: string;

  /** Custom overrides to the themed or default styles. */
  styles?: IStyleFunctionOrObject<IDetailsColumnStyleProps, IDetailsColumnStyles>;

  /** Minimum width for the column. */
  minWidth: number;

  /**
   * Accessible label for the column. The column name will still be used as the primary label,
   * but this text (if specified) will be read after the column name.
   */
  ariaLabel?: string;

  /** Whether the column is a header for the given row. There should be only one column with this set to true. */
  isRowHeader?: boolean;

  /** Maximum width for the column, if stretching is allowed in justified scenarios. */
  maxWidth?: number;

  /**
   * Defines how the column's header should render.
   * @defaultvalue ColumnActionsMode.clickable
   */
  columnActionsMode?: ColumnActionsMode;

  /** Custom icon to use in the column header. */
  iconName?: string;

  /**
   * Whether only the icon should be displayed in the column header.
   * If true, the column name and dropdown chevron will not be displayed.
   */
  isIconOnly?: boolean;

  /** Class name for the icon within the header. */
  iconClassName?: string;

  /**
   * If true, allow the column to be collapsed when rendered in justified layout.
   * @deprecated Use `isCollapsible`
   */
  isCollapsable?: boolean;

  /** If true, allow the column to be collapsed when rendered in justified layout. */
  isCollapsible?: boolean;

  /** Determines if the column is currently sorted. Renders a sort arrow in the column header. */
  isSorted?: boolean;

  /** Determines if the sort arrow is pointed down (descending) or up. */
  isSortedDescending?: boolean;

  /** Determines if the column can be resized. */
  isResizable?: boolean;

  /** Determines if the column can render multi-line text. */
  isMultiline?: boolean;

  /** Custom renderer for cell content, instead of the default text rendering. */
  onRender?: (item?: any, index?: number, column?: IColumn) => any;

  /** Custom override for the parent list's `getCellValueKey`. */
  getValueKey?: (item?: any, index?: number, column?: IColumn) => string;

  /** Custom renderer for column header divider. */
  onRenderDivider?: IRenderFunction<IDetailsColumnProps>;

  /** Whether the list is filtered by this column. If true, shows a filter icon next to this column's name. */
  isFiltered?: boolean;

  /** Callback for when the user clicks on the column header. */
  onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void;

  /** Callback for when the user opens the column header context menu. */
  onColumnContextMenu?: (column?: IColumn, ev?: React.MouseEvent<HTMLElement>) => void;

  /**
   * Callback for when the column is resized (`width` is the current width).
   *
   * Prefer this over `DetailsList`'s `onColumnResize` if you require the `IColumn` to report its width
   * after every resize event. Consider debouncing the callback if resize events occur frequently.
   */
  onColumnResize?: (width?: number) => void;

  /** Whether the list is grouped by this column. If true, shows a grouped icon next to this column's name. */
  isGrouped?: boolean;

  /** Arbitrary data passthrough which can be used by the caller. */
  data?: any;

  /** Internal only value. */
  calculatedWidth?: number;

  /**
   * Internal only value.
   * Remembers the actual width of the column in any case.
   * `calculatedWidth` is only saved when it's defined by user, not for justified calculations.
   */
  currentWidth?: number;

  /** Class name to apply to the column header cell. */
  headerClassName?: string;

  /** If true, add additional LTR padding-right to column and cells. */
  isPadded?: boolean;

  /**
   * Accessible label for indicating that the list is sorted by this column in ascending order.
   * This will be read after the main column header label.
   */
  sortAscendingAriaLabel?: string;

  /**
   * Accessible label for indicating that the list is sorted by this column in descending order.
   * This will be read after the main column header label.
   */
  sortDescendingAriaLabel?: string;

  /** Accessible label for the status of this column when grouped. */
  groupAriaLabel?: string;

  /** Accessible label for the status of this column when filtered. */
  filterAriaLabel?: string;

  /** Whether a dropdown menu is open so that the appropriate ARIA attributes are rendered. */
  isMenuOpen?: boolean;
}

/**
 * Enum to describe how a particular column header behaves.
 * This is used to to specify the property `IColumn.columnActionsMode`.
 * If `IColumn.columnActionsMode` is undefined, it's equivalent to `ColumnActionsMode.clickable`.
 * {@docCategory DetailsList}
 */
export enum ColumnActionsMode {
  /** Renders the column header as disabled. */
  disabled = 0,

  /** Renders the column header as clickable. Default value. */
  clickable = 1,

  /** Renders the column header as clickable and displays the dropdown chevron. */
  hasDropdown = 2,
}

/**
 * {@docCategory DetailsList}
 */
export enum ConstrainMode {
  /** Lets the content grow which allows the page to manage scrolling. */
  unconstrained = 0,

  /** Constrains the list to the given layout space. */
  horizontalConstrained = 1,
}

/**
 * {@docCategory DetailsList}
 */
export interface IColumnReorderOptions {
  /**
   * Specifies the number fixed columns from left
   * @defaultvalue 0
   */
  frozenColumnCountFromStart?: number;

  /**
   * Specifies the number fixed columns from right
   * @defaultvalue 0
   */
  frozenColumnCountFromEnd?: number;

  /**
   * Callback to handle when dragging on this column's DetailsHeader has started.
   */
  onColumnDragStart?: (dragStarted: boolean) => void;

  /**
   * Callback to handle column reordering.
   * `draggedIndex` is the source column index, which should be placed at `targetIndex`.
   * @deprecated Use `onColumnDrop` instead.
   */
  handleColumnReorder?: (draggedIndex: number, targetIndex: number) => void;

  /**
   * Callback to handle column reordering.
   * `draggedIndex` is the source column index, which should be placed at `targetIndex`.
   */
  onColumnDrop?: (dragDropDetails: IColumnDragDropDetails) => void;

  /**
   * Callback to handle when dragging on this column's DetailsHeader has finished.
   */
  onDragEnd?: (columnDropLocationDetails: ColumnDragEndLocation) => void;
}

/**
 * {@docCategory DetailsList}
 */
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
 * {@docCategory DetailsList}
 */
export enum ColumnDragEndLocation {
  /** Drag ended outside of current list */
  outside = 0,

  /** Drag ended within current list */
  surface = 1,

  /** Drag ended on header */
  header = 2,
}

/**
 * {@docCategory DetailsList}
 */
export enum DetailsListLayoutMode {
  /**
   * Lets the user resize columns and makes not attempt to fit them.
   */
  fixedColumns = 0,

  /**
   * Manages which columns are visible, tries to size them according to their min/max rules and drops
   * off columns that can't fit and have isCollapsible set.
   */
  justified = 1,
}

/**
 * {@docCategory DetailsList}
 */
export enum CheckboxVisibility {
  /** Visible on hover. */
  onHover = 0,

  /** Visible always. */
  always = 1,

  /** Hide checkboxes. */
  hidden = 2,
}

/**
 * {@docCategory DetailsList}
 */
export type IDetailsListStyleProps = Required<Pick<IDetailsListProps, 'theme'>> &
  Pick<IDetailsListProps, 'className'> & {
    /** Whether the list is horizontally constrained */
    isHorizontalConstrained?: boolean;

    /** Whether the list is in compact mode */
    compact?: boolean;

    /** Whether the list is fixed in size */
    isFixed?: boolean;
  };

/**
 * {@docCategory DetailsList}
 */
export interface IDetailsListStyles {
  root: IStyle;
  focusZone: IStyle;
  headerWrapper: IStyle;
  contentWrapper: IStyle;
}

/**
 * {@docCategory DetailsList}
 */
export interface IDetailsGroupRenderProps extends IGroupRenderProps {
  onRenderFooter?: IRenderFunction<IDetailsGroupDividerProps>;
  onRenderHeader?: IRenderFunction<IDetailsGroupDividerProps>;
}

/**
 * {@docCategory DetailsList}
 */
export interface IDetailsGroupDividerProps extends IGroupDividerProps, IDetailsItemProps {}

export interface IDetailsListCheckboxProps extends IDetailsCheckboxProps {}
