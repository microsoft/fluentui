import * as React from 'react';

import { BaseComponent, KeyCodes, assign, elementContains, getRTLSafeKeyCode, IRenderFunction, classNamesFunction } from '../../Utilities';
import {
  CheckboxVisibility,
  ColumnActionsMode,
  ConstrainMode,
  DetailsListLayoutMode,
  IColumn,
  IDetailsList,
  IDetailsListProps,
  IDetailsListStyles,
  IDetailsListStyleProps,
  IDetailsGroupRenderProps,
  ColumnDragEndLocation
} from '../DetailsList/DetailsList.types';
import { DetailsHeader } from '../DetailsList/DetailsHeader';
import { IDetailsHeader, SelectAllVisibility, IDetailsHeaderProps, IColumnReorderHeaderProps } from '../DetailsList/DetailsHeader.types';
import { IDetailsFooterProps } from '../DetailsList/DetailsFooter.types';
import { DetailsRowBase } from '../DetailsList/DetailsRow.base';
import { DetailsRow } from '../DetailsList/DetailsRow';
import { IDetailsRowProps } from '../DetailsList/DetailsRow.types';
import { IFocusZone, FocusZone, FocusZoneDirection } from '../../FocusZone';
import { IObjectWithKey, ISelection, Selection, SelectionMode, SelectionZone } from '../../utilities/selection/index';

import { DragDropHelper } from '../../utilities/dragdrop/DragDropHelper';
import { IGroupedList, GroupedList, IGroupDividerProps, IGroupRenderProps } from '../../GroupedList';
import { List, IListProps, ScrollToMode } from '../../List';
import { withViewport } from '../../utilities/decorators/withViewport';
import { GetGroupCount } from '../../utilities/groupedList/GroupedListUtility';
import { DEFAULT_CELL_STYLE_PROPS } from './DetailsRow.styles';
// For every group level there is a GroupSpacer added. Importing this const to have the source value in one place.
import { SPACER_WIDTH as GROUP_EXPAND_WIDTH } from '../GroupedList/GroupSpacer';

const getClassNames = classNamesFunction<IDetailsListStyleProps, IDetailsListStyles>();

export interface IDetailsListState {
  focusedItemIndex: number;
  lastWidth?: number;
  lastSelectionMode?: SelectionMode;
  adjustedColumns: IColumn[];
  isCollapsed?: boolean;
  isSizing?: boolean;
  isDropping?: boolean;
  isSomeGroupExpanded?: boolean;
}

const MIN_COLUMN_WIDTH = 100; // this is the global min width
const CHECKBOX_WIDTH = 40;

const DEFAULT_RENDERED_WINDOWS_AHEAD = 2;
const DEFAULT_RENDERED_WINDOWS_BEHIND = 2;

const SHIMMER_INITIAL_ITEMS = 10;
const SHIMMER_ITEMS = new Array(SHIMMER_INITIAL_ITEMS);

@withViewport
export class DetailsListBase extends BaseComponent<IDetailsListProps, IDetailsListState> implements IDetailsList {
  public static defaultProps = {
    layoutMode: DetailsListLayoutMode.justified,
    selectionMode: SelectionMode.multiple,
    constrainMode: ConstrainMode.horizontalConstrained,
    checkboxVisibility: CheckboxVisibility.onHover,
    isHeaderVisible: true,
    enableShimmer: false,
    compact: false
  };

  // References
  private _root = React.createRef<HTMLDivElement>();
  private _header = React.createRef<IDetailsHeader>();
  private _groupedList = React.createRef<IGroupedList>();
  private _list = React.createRef<List>();
  private _focusZone = React.createRef<IFocusZone>();
  private _selectionZone = React.createRef<SelectionZone>();

  private _selection: ISelection;
  private _activeRows: { [key: string]: DetailsRowBase };
  private _dragDropHelper: DragDropHelper | undefined;
  private _initialFocusedIndex: number | undefined;
  private _pendingForceUpdate: boolean;

  private _columnOverrides: {
    [key: string]: IColumn;
  };

  constructor(props: IDetailsListProps) {
    super(props);

    this._activeRows = {};
    this._columnOverrides = {};
    this._onColumnIsSizingChanged = this._onColumnIsSizingChanged.bind(this);
    this._onColumnResized = this._onColumnResized.bind(this);
    this._onColumnAutoResized = this._onColumnAutoResized.bind(this);
    this._onRowDidMount = this._onRowDidMount.bind(this);
    this._onRowWillUnmount = this._onRowWillUnmount.bind(this);
    this._onToggleCollapse = this._onToggleCollapse.bind(this);
    this._onActiveRowChanged = this._onActiveRowChanged.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onHeaderKeyDown = this._onHeaderKeyDown.bind(this);
    this._onContentKeyDown = this._onContentKeyDown.bind(this);
    this._onRenderCell = this._onRenderCell.bind(this);
    this._onGroupExpandStateChanged = this._onGroupExpandStateChanged.bind(this);
    this._onColumnDragEnd = this._onColumnDragEnd.bind(this);

    this.state = {
      focusedItemIndex: -1,
      lastWidth: 0,
      adjustedColumns: this._getAdjustedColumns(props),
      isSizing: false,
      isDropping: false,
      isCollapsed: props.groupProps && props.groupProps.isAllGroupsCollapsed,
      isSomeGroupExpanded: props.groupProps && !props.groupProps.isAllGroupsCollapsed
    };

    this._selection = props.selection || new Selection({ onSelectionChanged: undefined, getKey: props.getKey });

    if (!this.props.disableSelectionZone) {
      this._selection.setItems(props.items as IObjectWithKey[], false);
    }

    this._dragDropHelper = props.dragDropEvents
      ? new DragDropHelper({
          selection: this._selection,
          minimumPixelsForDrag: props.minimumPixelsForDrag
        })
      : undefined;
    this._initialFocusedIndex = props.initialFocusedIndex;
  }

  public scrollToIndex(index: number, measureItem?: (itemIndex: number) => number, scrollToMode?: ScrollToMode): void {
    this._list.current && this._list.current.scrollToIndex(index, measureItem, scrollToMode);
    this._groupedList.current && this._groupedList.current.scrollToIndex(index, measureItem, scrollToMode);
  }

  public focusIndex(
    index: number,
    forceIntoFirstElement: boolean = false,
    measureItem?: (itemIndex: number) => number,
    scrollToMode?: ScrollToMode
  ): void {
    const item = this.props.items[index];
    if (item) {
      this.scrollToIndex(index, measureItem, scrollToMode);

      const itemKey = this._getItemKey(item, index);
      const row = this._activeRows[itemKey];
      if (row) {
        this._setFocusToRow(row, forceIntoFirstElement);
      }
    }
  }

  public getStartItemIndexInView(): number {
    if (this._list && this._list.current) {
      return this._list.current.getStartItemIndexInView();
    } else if (this._groupedList && this._groupedList.current) {
      return this._groupedList.current.getStartItemIndexInView();
    }
    return 0;
  }

  public componentWillUnmount(): void {
    if (this._dragDropHelper) {
      // TODO If the DragDropHelper was passed via props, this will dispose it, which is incorrect behavior.
      this._dragDropHelper.dispose();
    }
  }

  public componentDidUpdate(prevProps: IDetailsListProps, prevState: IDetailsListState) {
    if (this._initialFocusedIndex !== undefined) {
      const item = this.props.items[this._initialFocusedIndex];
      if (item) {
        const itemKey = this._getItemKey(item, this._initialFocusedIndex);
        const row = this._activeRows[itemKey];
        if (row) {
          this._setFocusToRowIfPending(row);
        }
      }
    }

    if (
      this.props.items !== prevProps.items &&
      this.props.items.length > 0 &&
      this.state.focusedItemIndex !== -1 &&
      !elementContains(this._root.current, document.activeElement as HTMLElement, false)
    ) {
      // Item set has changed and previously-focused item is gone.
      // Set focus to item at index of previously-focused item if it is in range,
      // else set focus to the last item.
      const index = this.state.focusedItemIndex < this.props.items.length ? this.state.focusedItemIndex : this.props.items.length - 1;
      const item = this.props.items[index];
      const itemKey = this._getItemKey(item, this.state.focusedItemIndex);
      const row = this._activeRows[itemKey];
      if (row) {
        this._setFocusToRow(row);
      } else {
        this._initialFocusedIndex = index;
      }
    }
    if (this.props.onDidUpdate) {
      this.props.onDidUpdate(this);
    }
  }

  public componentWillReceiveProps(newProps: IDetailsListProps): void {
    const {
      checkboxVisibility,
      items,
      setKey,
      selectionMode = this._selection.mode,
      columns,
      viewport,
      compact,
      dragDropEvents
    } = this.props;
    const { isAllGroupsCollapsed = undefined } = this.props.groupProps || {};

    const shouldResetSelection = newProps.setKey !== setKey || newProps.setKey === undefined;
    let shouldForceUpdates = false;

    if (newProps.layoutMode !== this.props.layoutMode) {
      shouldForceUpdates = true;
    }

    if (shouldResetSelection) {
      this._initialFocusedIndex = newProps.initialFocusedIndex;
      // reset focusedItemIndex when setKey changes
      this.setState({
        focusedItemIndex: this._initialFocusedIndex !== undefined ? this._initialFocusedIndex : -1
      });
    }

    if (!this.props.disableSelectionZone && newProps.items !== items) {
      this._selection.setItems(newProps.items, shouldResetSelection);
    }

    if (
      newProps.checkboxVisibility !== checkboxVisibility ||
      newProps.columns !== columns ||
      newProps.viewport!.width !== viewport!.width ||
      newProps.compact !== compact
    ) {
      shouldForceUpdates = true;
    }

    this._adjustColumns(newProps, true);

    if (newProps.selectionMode !== selectionMode) {
      shouldForceUpdates = true;
    }

    if (isAllGroupsCollapsed === undefined && (newProps.groupProps && newProps.groupProps.isAllGroupsCollapsed !== undefined)) {
      this.setState({
        isCollapsed: newProps.groupProps.isAllGroupsCollapsed,
        isSomeGroupExpanded: !newProps.groupProps.isAllGroupsCollapsed
      });
    }

    if (newProps.dragDropEvents !== dragDropEvents) {
      this._dragDropHelper && this._dragDropHelper.dispose();
      this._dragDropHelper = newProps.dragDropEvents
        ? new DragDropHelper({
            selection: this._selection,
            minimumPixelsForDrag: newProps.minimumPixelsForDrag
          })
        : undefined;
      shouldForceUpdates = true;
    }

    if (shouldForceUpdates) {
      this._pendingForceUpdate = true;
    }
  }

  public componentWillUpdate(): void {
    if (this._pendingForceUpdate) {
      this._forceListUpdates();
    }
  }

  public render(): JSX.Element {
    const {
      ariaLabelForListHeader,
      ariaLabelForSelectAllCheckbox,
      ariaLabelForSelectionColumn,
      className,
      checkboxVisibility,
      compact,
      constrainMode,
      dragDropEvents,
      groups,
      groupProps,
      indentWidth,
      items,
      isHeaderVisible,
      layoutMode,
      onItemInvoked,
      onItemContextMenu,
      onColumnHeaderClick,
      onColumnHeaderContextMenu,
      selectionMode = this._selection.mode,
      selectionPreservedOnEmptyClick,
      selectionZoneProps,
      ariaLabel,
      ariaLabelForGrid,
      rowElementEventMap,
      shouldApplyApplicationRole = false,
      getKey,
      listProps,
      usePageCache,
      onShouldVirtualize,
      enableShimmer,
      viewport,
      minimumPixelsForDrag,
      getGroupHeight,
      styles,
      theme,
      cellStyleProps = DEFAULT_CELL_STYLE_PROPS
    } = this.props;
    const { adjustedColumns, isCollapsed, isSizing, isSomeGroupExpanded } = this.state;
    const { _selection: selection, _dragDropHelper: dragDropHelper } = this;
    const groupNestingDepth = this._getGroupNestingDepth();
    const additionalListProps: IListProps = {
      renderedWindowsAhead: isSizing ? 0 : DEFAULT_RENDERED_WINDOWS_AHEAD,
      renderedWindowsBehind: isSizing ? 0 : DEFAULT_RENDERED_WINDOWS_BEHIND,
      getKey,
      ...listProps
    };
    let selectAllVisibility = SelectAllVisibility.none; // for SelectionMode.none
    if (selectionMode === SelectionMode.single) {
      selectAllVisibility = SelectAllVisibility.hidden;
    }
    if (selectionMode === SelectionMode.multiple) {
      // if isCollapsedGroupSelectVisible is false, disable select all when the list has all collapsed groups
      let isCollapsedGroupSelectVisible = groupProps && groupProps.headerProps && groupProps.headerProps.isCollapsedGroupSelectVisible;
      if (isCollapsedGroupSelectVisible === undefined) {
        isCollapsedGroupSelectVisible = true;
      }
      const isSelectAllVisible = isCollapsedGroupSelectVisible || !groups || isSomeGroupExpanded;
      selectAllVisibility = isSelectAllVisible ? SelectAllVisibility.visible : SelectAllVisibility.hidden;
    }

    if (checkboxVisibility === CheckboxVisibility.hidden) {
      selectAllVisibility = SelectAllVisibility.none;
    }

    const { onRenderDetailsHeader = this._onRenderDetailsHeader, onRenderDetailsFooter = this._onRenderDetailsFooter } = this.props;

    const detailsFooterProps = this._getDetailsFooterProps();
    const columnReorderProps = this._getColumnReorderProps();

    const rowCount = (isHeaderVisible ? 1 : 0) + GetGroupCount(groups) + (items ? items.length : 0);

    const classNames = getClassNames(styles, {
      theme: theme!,
      compact,
      isFixed: layoutMode === DetailsListLayoutMode.fixedColumns,
      isHorizontalConstrained: constrainMode === ConstrainMode.horizontalConstrained,
      className
    });

    const list = groups ? (
      <GroupedList
        componentRef={this._groupedList}
        groups={groups}
        groupProps={groupProps ? this._getGroupProps(groupProps) : undefined}
        items={items}
        onRenderCell={this._onRenderCell}
        selection={selection}
        selectionMode={checkboxVisibility !== CheckboxVisibility.hidden ? selectionMode : SelectionMode.none}
        dragDropEvents={dragDropEvents}
        dragDropHelper={dragDropHelper}
        eventsToRegister={rowElementEventMap}
        listProps={additionalListProps}
        onGroupExpandStateChanged={this._onGroupExpandStateChanged}
        usePageCache={usePageCache}
        onShouldVirtualize={onShouldVirtualize}
        getGroupHeight={getGroupHeight}
        compact={compact}
      />
    ) : (
      <List
        ref={this._list}
        role="presentation"
        items={enableShimmer && !items.length ? SHIMMER_ITEMS : items}
        onRenderCell={this._onRenderListCell(0)}
        usePageCache={usePageCache}
        onShouldVirtualize={onShouldVirtualize}
        {...additionalListProps}
      />
    );

    return (
      // If shouldApplyApplicationRole is true, role application will be applied to make arrow keys work
      // with JAWS.
      <div
        ref={this._root}
        className={classNames.root}
        data-automationid="DetailsList"
        data-is-scrollable="false"
        aria-label={ariaLabel}
        {...(shouldApplyApplicationRole ? { role: 'application' } : {})}
      >
        <div
          role="grid"
          aria-label={ariaLabelForGrid}
          aria-rowcount={rowCount}
          aria-colcount={(selectAllVisibility !== SelectAllVisibility.none ? 1 : 0) + (adjustedColumns ? adjustedColumns.length : 0)}
          aria-readonly="true"
        >
          <div onKeyDown={this._onHeaderKeyDown} role="presentation" className={classNames.headerWrapper}>
            {isHeaderVisible &&
              onRenderDetailsHeader(
                {
                  componentRef: this._header,
                  selectionMode: selectionMode,
                  layoutMode: layoutMode!,
                  selection: selection,
                  columns: adjustedColumns,
                  onColumnClick: onColumnHeaderClick,
                  onColumnContextMenu: onColumnHeaderContextMenu,
                  onColumnResized: this._onColumnResized,
                  onColumnIsSizingChanged: this._onColumnIsSizingChanged,
                  onColumnAutoResized: this._onColumnAutoResized,
                  groupNestingDepth: groupNestingDepth,
                  isAllCollapsed: isCollapsed,
                  onToggleCollapseAll: this._onToggleCollapse,
                  ariaLabel: ariaLabelForListHeader,
                  ariaLabelForSelectAllCheckbox: ariaLabelForSelectAllCheckbox,
                  ariaLabelForSelectionColumn: ariaLabelForSelectionColumn,
                  selectAllVisibility: selectAllVisibility,
                  collapseAllVisibility: groupProps && groupProps.collapseAllVisibility,
                  viewport: viewport,
                  columnReorderProps: columnReorderProps,
                  minimumPixelsForDrag: minimumPixelsForDrag,
                  cellStyleProps: cellStyleProps,
                  checkboxVisibility,
                  indentWidth
                },
                this._onRenderDetailsHeader
              )}
          </div>
          <div onKeyDown={this._onContentKeyDown} role="presentation" className={classNames.contentWrapper}>
            <FocusZone
              componentRef={this._focusZone}
              className={classNames.focusZone}
              direction={FocusZoneDirection.vertical}
              isInnerZoneKeystroke={isRightArrow}
              onActiveElementChanged={this._onActiveRowChanged}
              onBlur={this._onBlur}
            >
              {!this.props.disableSelectionZone ? (
                <SelectionZone
                  ref={this._selectionZone}
                  selection={selection}
                  selectionPreservedOnEmptyClick={selectionPreservedOnEmptyClick}
                  selectionMode={selectionMode}
                  onItemInvoked={onItemInvoked}
                  onItemContextMenu={onItemContextMenu}
                  enterModalOnTouch={this.props.enterModalSelectionOnTouch}
                  {...selectionZoneProps || {}}
                >
                  {list}
                </SelectionZone>
              ) : (
                list
              )}
            </FocusZone>
          </div>
          {onRenderDetailsFooter(
            {
              ...detailsFooterProps
            },
            this._onRenderDetailsFooter
          )}
        </div>
      </div>
    );
  }

  public forceUpdate(): void {
    super.forceUpdate();
    this._forceListUpdates();
  }

  protected _onRenderRow = (props: IDetailsRowProps, defaultRender?: IRenderFunction<IDetailsRowProps>): JSX.Element => {
    return <DetailsRow {...props} />;
  };

  private _onRenderDetailsHeader = (
    detailsHeaderProps: IDetailsHeaderProps,
    defaultRender?: IRenderFunction<IDetailsHeaderProps>
  ): JSX.Element => {
    return <DetailsHeader {...detailsHeaderProps} />;
  };

  private _onRenderDetailsFooter = (
    detailsFooterProps: IDetailsFooterProps,
    defaultRender?: IRenderFunction<IDetailsFooterProps>
  ): JSX.Element | null => {
    return null;
  };

  private _onRenderListCell = (nestingDepth: number): ((item: any, itemIndex: number) => React.ReactNode) => {
    return (item: any, itemIndex: number): React.ReactNode => {
      return this._onRenderCell(nestingDepth, item, itemIndex);
    };
  };

  private _onRenderCell(nestingDepth: number, item: any, index: number): React.ReactNode {
    const {
      compact,
      dragDropEvents,
      rowElementEventMap: eventsToRegister,
      onRenderMissingItem,
      onRenderItemColumn,
      onRenderRow = this._onRenderRow,
      selectionMode = this._selection.mode,
      viewport,
      checkboxVisibility,
      getRowAriaLabel,
      getRowAriaDescribedBy,
      checkButtonAriaLabel,
      checkboxCellClassName,
      groupProps,
      useReducedRowRenderer,
      indentWidth,
      cellStyleProps = DEFAULT_CELL_STYLE_PROPS
    } = this.props;
    const collapseAllVisibility = groupProps && groupProps.collapseAllVisibility;
    const selection = this._selection;
    const dragDropHelper = this._dragDropHelper;
    const { adjustedColumns: columns } = this.state;

    const rowProps: IDetailsRowProps = {
      item: item,
      itemIndex: index,
      compact: compact,
      columns: columns,
      groupNestingDepth: nestingDepth,
      selectionMode: selectionMode,
      selection: selection,
      onDidMount: this._onRowDidMount,
      onWillUnmount: this._onRowWillUnmount,
      onRenderItemColumn: onRenderItemColumn,
      eventsToRegister: eventsToRegister,
      dragDropEvents: dragDropEvents,
      dragDropHelper: dragDropHelper,
      viewport: viewport,
      checkboxVisibility: checkboxVisibility,
      collapseAllVisibility: collapseAllVisibility,
      getRowAriaLabel: getRowAriaLabel,
      getRowAriaDescribedBy: getRowAriaDescribedBy,
      checkButtonAriaLabel: checkButtonAriaLabel,
      checkboxCellClassName: checkboxCellClassName,
      useReducedRowRenderer: useReducedRowRenderer,
      indentWidth,
      cellStyleProps: cellStyleProps
    };

    if (!item) {
      if (onRenderMissingItem) {
        return onRenderMissingItem(index, rowProps);
      }

      return null;
    }

    return onRenderRow(rowProps, this._onRenderRow);
  }

  private _onGroupExpandStateChanged(isSomeGroupExpanded: boolean): void {
    this.setState({ isSomeGroupExpanded: isSomeGroupExpanded });
  }

  private _onColumnIsSizingChanged(column: IColumn, isSizing: boolean): void {
    this.setState({ isSizing: isSizing });
  }

  private _onHeaderKeyDown(ev: React.KeyboardEvent<HTMLElement>): void {
    if (ev.which === KeyCodes.down) {
      if (this._focusZone.current && this._focusZone.current.focus()) {
        // select the first item in list after down arrow key event
        this._selection.setIndexSelected(0, true, false);
        ev.preventDefault();
        ev.stopPropagation();
      }
    }
  }

  private _onContentKeyDown(ev: React.KeyboardEvent<HTMLElement>): void {
    if (ev.which === KeyCodes.up && !ev.altKey) {
      if (this._header.current && this._header.current.focus()) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    }
  }

  private _getGroupNestingDepth(): number {
    const { groups } = this.props;
    let level = 0;
    let groupsInLevel = groups;

    while (groupsInLevel && groupsInLevel.length > 0) {
      level++;
      groupsInLevel = groupsInLevel[0].children;
    }

    return level;
  }

  private _onRowDidMount(row: DetailsRowBase): void {
    const { item, itemIndex } = row.props;
    const itemKey = this._getItemKey(item, itemIndex);
    this._activeRows[itemKey] = row; // this is used for column auto resize

    this._setFocusToRowIfPending(row);

    const { onRowDidMount } = this.props;
    if (onRowDidMount) {
      onRowDidMount(item, itemIndex);
    }
  }

  private _setFocusToRowIfPending(row: DetailsRowBase): void {
    const { itemIndex } = row.props;
    if (this._initialFocusedIndex !== undefined && itemIndex === this._initialFocusedIndex) {
      this._setFocusToRow(row);
      delete this._initialFocusedIndex;
    }
  }

  private _setFocusToRow(row: DetailsRowBase, forceIntoFirstElement: boolean = false): void {
    if (this._selectionZone.current) {
      this._selectionZone.current.ignoreNextFocus();
    }
    this._async.setTimeout((): void => {
      row.focus(forceIntoFirstElement);
    }, 0);
  }

  private _onRowWillUnmount(row: DetailsRowBase): void {
    const { onRowWillUnmount } = this.props;

    const { item, itemIndex } = row.props;
    const itemKey = this._getItemKey(item, itemIndex);
    delete this._activeRows[itemKey];

    if (onRowWillUnmount) {
      onRowWillUnmount(item, itemIndex);
    }
  }

  private _onToggleCollapse(collapsed: boolean): void {
    this.setState({
      isCollapsed: collapsed
    });
    if (this._groupedList.current) {
      this._groupedList.current.toggleCollapseAll(collapsed);
    }
  }

  private _onColumnDragEnd(props: { dropLocation?: ColumnDragEndLocation }, event: MouseEvent): void {
    const { columnReorderOptions } = this.props;
    let finalDropLocation: ColumnDragEndLocation = ColumnDragEndLocation.outside;
    if (columnReorderOptions && columnReorderOptions.onDragEnd) {
      if (props.dropLocation && props.dropLocation !== ColumnDragEndLocation.header) {
        finalDropLocation = props.dropLocation;
      } else if (this._root.current) {
        const clientRect = this._root.current.getBoundingClientRect();
        if (
          event.clientX > clientRect.left &&
          event.clientX < clientRect.right &&
          event.clientY > clientRect.top &&
          event.clientY < clientRect.bottom
        ) {
          finalDropLocation = ColumnDragEndLocation.surface;
        }
      }
      columnReorderOptions.onDragEnd(finalDropLocation);
    }
  }

  private _forceListUpdates(): void {
    this._pendingForceUpdate = false;

    if (this._groupedList.current) {
      this._groupedList.current.forceUpdate();
    }
    if (this._list.current) {
      this._list.current.forceUpdate();
    }
  }

  private _notifyColumnsResized(): void {
    this.state.adjustedColumns.forEach(column => {
      if (column.onColumnResize) {
        column.onColumnResize(column.currentWidth);
      }
    });
  }

  private _adjustColumns(newProps: IDetailsListProps, forceUpdate?: boolean, resizingColumnIndex?: number): void {
    const adjustedColumns = this._getAdjustedColumns(newProps, forceUpdate, resizingColumnIndex);
    const { width: viewportWidth } = this.props.viewport!;

    if (adjustedColumns) {
      this.setState(
        {
          adjustedColumns: adjustedColumns,
          lastWidth: viewportWidth
        },
        this._notifyColumnsResized
      );
    }
  }

  /** Returns adjusted columns, given the viewport size and layout mode. */
  private _getAdjustedColumns(newProps: IDetailsListProps, forceUpdate?: boolean, resizingColumnIndex?: number): IColumn[] {
    const { items: newItems, layoutMode, selectionMode } = newProps;
    let { columns: newColumns } = newProps;
    let { width: viewportWidth } = newProps.viewport!;

    const columns = this.props ? this.props.columns : [];
    const lastWidth = this.state ? this.state.lastWidth : -1;
    const lastSelectionMode = this.state ? this.state.lastSelectionMode : undefined;

    if (viewportWidth !== undefined) {
      if (!forceUpdate && lastWidth === viewportWidth && lastSelectionMode === selectionMode && (!columns || newColumns === columns)) {
        return [];
      }
    } else {
      viewportWidth = this.props.viewport!.width;
    }

    newColumns = newColumns || buildColumns(newItems, true);

    let adjustedColumns: IColumn[];

    if (layoutMode === DetailsListLayoutMode.fixedColumns) {
      adjustedColumns = this._getFixedColumns(newColumns);

      // Preserve adjusted column calculated widths.
      adjustedColumns.forEach(column => {
        this._rememberCalculatedWidth(column, column.calculatedWidth!);
      });
    } else {
      if (resizingColumnIndex !== undefined) {
        adjustedColumns = this._getJustifiedColumnsAfterResize(newColumns, viewportWidth, newProps, resizingColumnIndex);
      } else {
        adjustedColumns = this._getJustifiedColumns(newColumns, viewportWidth, newProps, 0);
      }

      adjustedColumns.forEach(column => {
        this._getColumnOverride(column.key).currentWidth = column.calculatedWidth;
      });
    }

    return adjustedColumns;
  }

  /** Builds a set of columns based on the given columns mixed with the current overrides. */
  private _getFixedColumns(newColumns: IColumn[]): IColumn[] {
    return newColumns.map(column => {
      const newColumn: IColumn = assign({}, column, this._columnOverrides[column.key]);

      if (!newColumn.calculatedWidth) {
        newColumn.calculatedWidth = newColumn.maxWidth || newColumn.minWidth || MIN_COLUMN_WIDTH;
      }

      return newColumn;
    });
  }

  private _getJustifiedColumnsAfterResize(
    newColumns: IColumn[],
    viewportWidth: number,
    props: IDetailsListProps,
    resizingColumnIndex: number
  ): IColumn[] {
    const fixedColumns = newColumns.slice(0, resizingColumnIndex);
    fixedColumns.forEach(column => (column.calculatedWidth = this._getColumnOverride(column.key).currentWidth));

    const fixedWidth = fixedColumns.reduce((total, column, i) => total + getPaddedWidth(column, i === 0, props), 0);

    const remainingColumns = newColumns.slice(resizingColumnIndex);
    const remainingWidth = viewportWidth - fixedWidth;

    return [...fixedColumns, ...this._getJustifiedColumns(remainingColumns, remainingWidth, props, resizingColumnIndex)];
  }

  /** Builds a set of columns to fix within the viewport width. */
  private _getJustifiedColumns(newColumns: IColumn[], viewportWidth: number, props: IDetailsListProps, firstIndex: number): IColumn[] {
    const { selectionMode = this._selection.mode, checkboxVisibility } = props;
    const rowCheckWidth = selectionMode !== SelectionMode.none && checkboxVisibility !== CheckboxVisibility.hidden ? CHECKBOX_WIDTH : 0;
    const groupExpandWidth = this._getGroupNestingDepth() * GROUP_EXPAND_WIDTH;
    let totalWidth = 0; // offset because we have one less inner padding.
    const availableWidth = viewportWidth - (rowCheckWidth + groupExpandWidth);
    const adjustedColumns: IColumn[] = newColumns.map((column, i) => {
      const newColumn = {
        ...column,
        calculatedWidth: column.minWidth || MIN_COLUMN_WIDTH,
        ...this._columnOverrides[column.key]
      };

      const isFirst = i + firstIndex === 0;
      totalWidth += getPaddedWidth(newColumn, isFirst, props);

      return newColumn;
    });

    let lastIndex = adjustedColumns.length - 1;

    // Shrink or remove collapsable columns.
    while (lastIndex > 0 && totalWidth > availableWidth) {
      const column = adjustedColumns[lastIndex];

      const minWidth = column.minWidth || MIN_COLUMN_WIDTH;
      const overflowWidth = totalWidth - availableWidth;

      if (column.calculatedWidth! - minWidth >= overflowWidth || !(column.isCollapsable || column.isCollapsible)) {
        const originalWidth = column.calculatedWidth!;
        column.calculatedWidth = Math.max(column.calculatedWidth! - overflowWidth, minWidth);
        totalWidth -= originalWidth - column.calculatedWidth;
      } else {
        totalWidth -= getPaddedWidth(column, false, props);
        adjustedColumns.splice(lastIndex, 1);
      }
      lastIndex--;
    }

    // Then expand columns starting at the beginning, until we've filled the width.
    for (let i = 0; i < adjustedColumns.length && totalWidth < availableWidth; i++) {
      const column = adjustedColumns[i];
      const isLast = i === adjustedColumns.length - 1;
      const overrides = this._columnOverrides[column.key];
      if (overrides && overrides.calculatedWidth && !isLast) {
        continue;
      }

      const spaceLeft = availableWidth - totalWidth;
      let increment: number;
      if (isLast) {
        increment = spaceLeft;
      } else {
        const maxWidth = column.maxWidth;
        const minWidth = column.minWidth || maxWidth || MIN_COLUMN_WIDTH;
        increment = maxWidth ? Math.min(spaceLeft, maxWidth - minWidth) : spaceLeft;
      }

      column.calculatedWidth = (column.calculatedWidth as number) + increment;
      totalWidth += increment;
    }

    return adjustedColumns;
  }

  private _onColumnResized(resizingColumn: IColumn, newWidth: number, resizingColumnIndex: number): void {
    const newCalculatedWidth = Math.max(resizingColumn.minWidth || MIN_COLUMN_WIDTH, newWidth);
    if (this.props.onColumnResize) {
      this.props.onColumnResize(resizingColumn, newCalculatedWidth, resizingColumnIndex);
    }

    this._rememberCalculatedWidth(resizingColumn, newCalculatedWidth);

    this._adjustColumns(this.props, true, resizingColumnIndex);
    this._forceListUpdates();
  }

  private _rememberCalculatedWidth(column: IColumn, newCalculatedWidth: number): void {
    const overrides = this._getColumnOverride(column.key);
    overrides.calculatedWidth = newCalculatedWidth;
    overrides.currentWidth = newCalculatedWidth;
  }

  private _getColumnOverride(key: string): IColumn {
    return (this._columnOverrides[key] = this._columnOverrides[key] || {});
  }

  /**
   * Callback function when double clicked on the details header column resizer
   * which will measure the column cells of all the active rows and resize the
   * column to the max cell width.
   *
   * @private
   * @param {IColumn} column (double clicked column definition)
   * @param {number} columnIndex (double clicked column index)
   * @todo min width 100 should be changed to const value and should be consistent with the
   * value used on _onSizerMove method in DetailsHeader
   */
  private _onColumnAutoResized(column: IColumn, columnIndex: number): void {
    let max = 0;
    let count = 0;
    const totalCount = Object.keys(this._activeRows).length;

    for (const key in this._activeRows) {
      if (this._activeRows.hasOwnProperty(key)) {
        const currentRow = this._activeRows[key];
        currentRow.measureCell(columnIndex, (width: number) => {
          max = Math.max(max, width);
          count++;
          if (count === totalCount) {
            this._onColumnResized(column, max, columnIndex);
          }
        });
      }
    }
  }

  /**
   * Call back function when an element in FocusZone becomes active. It will translate it into item
   * and call onActiveItemChanged callback if specified.
   *
   * @private
   * @param {el} row element that became active in Focus Zone
   * @param {ev} focus event from Focus Zone
   */
  private _onActiveRowChanged(el?: HTMLElement, ev?: React.FocusEvent<HTMLElement>): void {
    const { items, onActiveItemChanged } = this.props;

    if (!el) {
      return;
    }

    // Check and assign index only if the event was raised from any DetailsRow element
    if (el.getAttribute('data-item-index')) {
      const index = Number(el.getAttribute('data-item-index'));
      if (index >= 0) {
        if (onActiveItemChanged) {
          onActiveItemChanged(items[index], index, ev);
        }
        this.setState({
          focusedItemIndex: index
        });
      }
    }
  }

  private _onBlur(event: React.FocusEvent<HTMLElement>): void {
    this.setState({
      focusedItemIndex: -1
    });
  }

  private _getItemKey(item: any, itemIndex: number): string | number {
    const { getKey } = this.props;

    let itemKey: string | number | undefined = undefined;
    if (item) {
      itemKey = item.key;
    }

    if (getKey) {
      itemKey = getKey(item, itemIndex);
    }

    if (!itemKey) {
      itemKey = itemIndex;
    }

    return itemKey;
  }

  private _getDetailsFooterProps(): IDetailsFooterProps {
    const { adjustedColumns: columns } = this.state;

    const {
      viewport,
      checkboxVisibility,
      indentWidth,
      cellStyleProps = DEFAULT_CELL_STYLE_PROPS,
      selectionMode = this._selection.mode
    } = this.props;

    return {
      columns: columns,
      groupNestingDepth: this._getGroupNestingDepth(),
      selection: this._selection,
      selectionMode: selectionMode,
      viewport: viewport,
      checkboxVisibility,
      indentWidth,
      cellStyleProps
    };
  }

  private _getColumnReorderProps(): IColumnReorderHeaderProps | undefined {
    const { columnReorderOptions } = this.props;
    if (columnReorderOptions) {
      return {
        ...columnReorderOptions,
        onColumnDragEnd: this._onColumnDragEnd
      };
    }
  }

  private _getGroupProps(detailsGroupProps: IDetailsGroupRenderProps): IGroupRenderProps {
    const { onRenderFooter: onRenderDetailsGroupFooter, onRenderHeader: onRenderDetailsGroupHeader } = detailsGroupProps;
    const { adjustedColumns: columns } = this.state;
    const {
      selectionMode = this._selection.mode,
      viewport,
      cellStyleProps = DEFAULT_CELL_STYLE_PROPS,
      checkboxVisibility,
      indentWidth
    } = this.props;
    const groupNestingDepth = this._getGroupNestingDepth();
    const onRenderFooter = onRenderDetailsGroupFooter
      ? (props: IGroupDividerProps, defaultRender?: IRenderFunction<IGroupDividerProps>) => {
          return onRenderDetailsGroupFooter(
            {
              ...props,
              columns: columns,
              groupNestingDepth: groupNestingDepth,
              indentWidth,
              selection: this._selection,
              selectionMode: selectionMode,
              viewport: viewport,
              checkboxVisibility,
              cellStyleProps
            },
            defaultRender
          );
        }
      : undefined;

    const onRenderHeader = onRenderDetailsGroupHeader
      ? (props: IGroupDividerProps, defaultRender?: IRenderFunction<IGroupDividerProps>) => {
          return onRenderDetailsGroupHeader(
            {
              ...props,
              columns: columns,
              groupNestingDepth: groupNestingDepth,
              indentWidth,
              selection: this._selection,
              selectionMode: selectionMode,
              viewport: viewport,
              checkboxVisibility,
              cellStyleProps
            },
            defaultRender
          );
        }
      : undefined;

    return {
      ...detailsGroupProps,
      onRenderFooter,
      onRenderHeader
    };
  }
}

export function buildColumns(
  items: any[],
  canResizeColumns?: boolean,
  onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => void,
  sortedColumnKey?: string,
  isSortedDescending?: boolean,
  groupedColumnKey?: string,
  isMultiline?: boolean
) {
  const columns: IColumn[] = [];

  if (items && items.length) {
    const firstItem = items[0];

    for (const propName in firstItem) {
      if (firstItem.hasOwnProperty(propName)) {
        columns.push({
          key: propName,
          name: propName,
          fieldName: propName,
          minWidth: MIN_COLUMN_WIDTH,
          maxWidth: 300,
          isCollapsable: !!columns.length,
          isCollapsible: !!columns.length,
          isMultiline: isMultiline === undefined ? false : isMultiline,
          isSorted: sortedColumnKey === propName,
          isSortedDescending: !!isSortedDescending,
          isRowHeader: false,
          columnActionsMode: ColumnActionsMode.clickable,
          isResizable: canResizeColumns,
          onColumnClick: onColumnClick,
          isGrouped: groupedColumnKey === propName
        });
      }
    }
  }

  return columns;
}

function isRightArrow(event: React.KeyboardEvent<HTMLElement>): boolean {
  return event.which === getRTLSafeKeyCode(KeyCodes.right);
}

function getPaddedWidth(column: IColumn, isFirst: boolean, props: IDetailsListProps): number {
  const { cellStyleProps = DEFAULT_CELL_STYLE_PROPS } = props;

  return (
    column.calculatedWidth! +
    cellStyleProps.cellLeftPadding +
    cellStyleProps.cellRightPadding +
    (column.isPadded ? cellStyleProps.cellExtraRightPadding : 0)
  );
}
