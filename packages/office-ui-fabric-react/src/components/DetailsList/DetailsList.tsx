
import * as React from 'react';
import * as stylesImport from './DetailsList.scss';

import {
  BaseComponent,
  KeyCodes,
  assign,
  autobind,
  css,
  getRTLSafeKeyCode,
  IRenderFunction
} from '../../Utilities';
import {
  CheckboxVisibility,
  ColumnActionsMode,
  ConstrainMode,
  DetailsListLayoutMode,
  IColumn,
  IDetailsList,
  IDetailsListProps,
} from '../DetailsList/DetailsList.Props';
import { DetailsHeader, IDetailsHeader, SelectAllVisibility, IDetailsHeaderProps } from '../DetailsList/DetailsHeader';
import { DetailsRow, IDetailsRowProps } from '../DetailsList/DetailsRow';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import {
  IObjectWithKey,
  ISelection,
  Selection,
  SelectionMode,
  SelectionZone,
} from '../../utilities/selection/index';

import { DragDropHelper } from '../../utilities/dragdrop/DragDropHelper';
import { GroupedList } from '../../GroupedList';
import { List, IListProps } from '../../List';
import { withViewport } from '../../utilities/decorators/withViewport';

const styles: any = stylesImport;

export interface IDetailsListState {
  lastWidth?: number;
  lastSelectionMode?: SelectionMode;
  adjustedColumns?: IColumn[];
  isCollapsed?: boolean;
  isSizing?: boolean;
  isDropping?: boolean;
  isSomeGroupExpanded?: boolean;
}

const MIN_COLUMN_WIDTH = 100; // this is the global min width
const CHECKBOX_WIDTH = 40;
const GROUP_EXPAND_WIDTH = 36;
const DEFAULT_INNER_PADDING = 16;
const ISPADDED_WIDTH = 24;

const DEFAULT_RENDERED_WINDOWS_AHEAD = 2;
const DEFAULT_RENDERED_WINDOWS_BEHIND = 2;

@withViewport
export class DetailsList extends BaseComponent<IDetailsListProps, IDetailsListState> implements IDetailsList {
  public static defaultProps = {
    layoutMode: DetailsListLayoutMode.justified,
    selectionMode: SelectionMode.multiple,
    constrainMode: ConstrainMode.horizontalConstrained,
    checkboxVisibility: CheckboxVisibility.onHover,
    isHeaderVisible: true
  };

  // References
  // tslint:disable-next-line:no-unused-variable
  private _root: HTMLElement;
  private _header: IDetailsHeader;
  private _groupedList: GroupedList;
  private _list: List;
  private _focusZone: FocusZone;
  private _selectionZone: SelectionZone;

  private _selection: ISelection;
  private _activeRows: { [key: string]: DetailsRow };
  private _dragDropHelper: DragDropHelper | null;
  private _initialFocusedIndex: number | undefined;

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
    this._onHeaderKeyDown = this._onHeaderKeyDown.bind(this);
    this._onContentKeyDown = this._onContentKeyDown.bind(this);
    this._onRenderCell = this._onRenderCell.bind(this);
    this._onGroupExpandStateChanged = this._onGroupExpandStateChanged.bind(this);

    this.state = {
      lastWidth: 0,
      adjustedColumns: this._getAdjustedColumns(props),
      isSizing: false,
      isDropping: false,
      isCollapsed: props.groupProps && props.groupProps.isAllGroupsCollapsed,
      isSomeGroupExpanded: props.groupProps && !props.groupProps.isAllGroupsCollapsed
    };

    this._selection = props.selection || new Selection({ onSelectionChanged: undefined, getKey: props.getKey });
    this._selection.setItems(props.items as IObjectWithKey[], false);
    this._dragDropHelper = props.dragDropEvents ? new DragDropHelper({
      selection: this._selection,
      minimumPixelsForDrag: props.minimumPixelsForDrag
    }) : null;
    this._initialFocusedIndex = props.initialFocusedIndex;
  }

  public scrollToIndex(index: number, measureItem?: (itemIndex: number) => number): void {
    this._list && this._list.scrollToIndex(index, measureItem);
    this._groupedList && this._groupedList.scrollToIndex(index, measureItem);
  }

  public componentWillUnmount() {
    if (this._dragDropHelper) {
      this._dragDropHelper.dispose();
    }
  }

  public componentDidUpdate(prevProps: any, prevState: any) {
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

    if (this.props.onDidUpdate) {
      this.props.onDidUpdate(this);
    }
  }

  public componentWillReceiveProps(newProps: IDetailsListProps) {
    let {
      checkboxVisibility,
      items,
      setKey,
      selectionMode,
      columns,
      viewport
    } = this.props;
    let shouldResetSelection = (newProps.setKey !== setKey) || newProps.setKey === undefined;
    let shouldForceUpdates = false;

    if (newProps.layoutMode !== this.props.layoutMode) {
      shouldForceUpdates = true;
    }

    if (shouldResetSelection) {
      this._initialFocusedIndex = newProps.initialFocusedIndex;
    }

    if (newProps.items !== items) {
      this._selection.setItems(newProps.items, shouldResetSelection);
    }

    if (
      newProps.checkboxVisibility !== checkboxVisibility ||
      newProps.columns !== columns ||
      newProps.viewport!.width !== viewport!.width
    ) {
      shouldForceUpdates = true;
    }

    this._adjustColumns(newProps, true);

    if (newProps.selectionMode !== selectionMode) {
      shouldForceUpdates = true;
    }

    if (shouldForceUpdates) {
      this._forceListUpdates();
    }
  }

  public render() {
    let {
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
      items,
      isHeaderVisible,
      layoutMode,
      onItemInvoked,
      onItemContextMenu,
      onColumnHeaderClick,
      onColumnHeaderContextMenu,
      selectionMode,
      selectionPreservedOnEmptyClick,
      ariaLabel,
      ariaLabelForGrid,
      rowElementEventMap,
      shouldApplyApplicationRole = false,
      getKey,
      listProps,
      usePageCache,
      onShouldVirtualize
    } = this.props;
    let {
      adjustedColumns,
      isCollapsed,
      isSizing,
      isSomeGroupExpanded
    } = this.state;
    let {
      _selection: selection,
      _dragDropHelper: dragDropHelper
    } = this;
    let groupNestingDepth = this._getGroupNestingDepth();
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
      let isSelectAllVisible = isCollapsedGroupSelectVisible || !groups || isSomeGroupExpanded;
      selectAllVisibility = isSelectAllVisible ? SelectAllVisibility.visible : SelectAllVisibility.hidden;
    }

    if (checkboxVisibility === CheckboxVisibility.hidden) {
      selectAllVisibility = SelectAllVisibility.none;
    }

    const {
      onRenderDetailsHeader = this._onRenderDetailsHeader
    } = this.props;

    return (
      // If shouldApplyApplicationRole is true, role application will be applied to make arrow keys work
      // with JAWS.
      <div
        ref={ this._resolveRef('_root') }
        className={ css(
          'ms-DetailsList',
          styles.root,
          className,
          (layoutMode === DetailsListLayoutMode.fixedColumns) && 'is-fixed',
          (constrainMode === ConstrainMode.horizontalConstrained) && ('is-horizontalConstrained ' + styles.rootIsHorizontalConstrained),
          !!compact && ('ms-DetailsList--Compact ' + styles.rootCompact)
        ) }
        data-automationid='DetailsList'
        data-is-scrollable='false'
        aria-label={ ariaLabel }
        { ...(shouldApplyApplicationRole ? { role: 'application' } : {}) }
      >
        <div
          role='grid'
          aria-label={ ariaLabelForGrid }
          aria-rowcount={ (isHeaderVisible ? 1 : 0) + (items ? items.length : 0) }
          aria-colcount={ (selectAllVisibility !== SelectAllVisibility.none ? 1 : 0) + (adjustedColumns ? adjustedColumns.length : 0) }
          aria-readonly='true'
        >
          <div onKeyDown={ this._onHeaderKeyDown } role='presentation'>
            { isHeaderVisible && onRenderDetailsHeader({
              componentRef: this._resolveRef('_header'),
              selectionMode: selectionMode!,
              layoutMode: layoutMode!,
              selection: selection,
              columns: adjustedColumns as IColumn[],
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
              collapseAllVisibility: groupProps && groupProps.collapseAllVisibility
            }, this._onRenderDetailsHeader) }
          </div>
          <div onKeyDown={ this._onContentKeyDown } role='presentation'>
            <FocusZone
              ref={ this._resolveRef('_focusZone') }
              className={ styles.focusZone }
              direction={ FocusZoneDirection.vertical }
              isInnerZoneKeystroke={ isRightArrow }
              onActiveElementChanged={ this._onActiveRowChanged }
            >
              <SelectionZone
                ref={ this._resolveRef('_selectionZone') }
                selection={ selection }
                selectionPreservedOnEmptyClick={ selectionPreservedOnEmptyClick }
                selectionMode={ selectionMode }
                onItemInvoked={ onItemInvoked }
                onItemContextMenu={ onItemContextMenu }
              >
                { groups ? (
                  <GroupedList
                    ref={ this._resolveRef('_groupedList') }
                    groups={ groups }
                    groupProps={ groupProps }
                    items={ items }
                    onRenderCell={ this._onRenderCell }
                    selection={ selection }
                    selectionMode={ selectionMode }
                    dragDropEvents={ dragDropEvents }
                    dragDropHelper={ dragDropHelper as DragDropHelper }
                    eventsToRegister={ rowElementEventMap }
                    listProps={ additionalListProps }
                    onGroupExpandStateChanged={ this._onGroupExpandStateChanged }
                    usePageCache={ usePageCache }
                    onShouldVirtualize={ onShouldVirtualize }
                  />
                ) : (
                    <List
                      ref={ this._resolveRef('_list') }
                      role='presentation'
                      items={ items }
                      onRenderCell={ this._onRenderListCell(0) }
                      usePageCache={ usePageCache }
                      onShouldVirtualize={ onShouldVirtualize }
                      { ...additionalListProps }
                    />
                  )
                }
              </SelectionZone>
            </FocusZone>
          </div>
        </div>
      </div>
    );
  }

  public forceUpdate() {
    super.forceUpdate();
    this._forceListUpdates();
  }

  @autobind
  protected _onRenderRow(props: IDetailsRowProps, defaultRender?: any) {
    return <DetailsRow { ...props } />;
  }

  @autobind
  private _onRenderDetailsHeader(detailsHeaderProps: IDetailsHeaderProps, defaultRender?: IRenderFunction<IDetailsHeaderProps>) {
    return <DetailsHeader { ...detailsHeaderProps } />;
  }

  @autobind
  private _onRenderListCell(nestingDepth: number)
    : (item: any, itemIndex: number) => React.ReactNode {
    return (item: any, itemIndex: number): React.ReactNode => {
      return this._onRenderCell(nestingDepth, item, itemIndex as number);
    };
  }

  private _onRenderCell(nestingDepth: number, item: any, index: number): React.ReactNode {
    let {
      compact,
      dragDropEvents,
      rowElementEventMap: eventsToRegister,
      onRenderMissingItem,
      onRenderItemColumn,
      onRenderRow = this._onRenderRow,
      selectionMode,
      viewport,
      checkboxVisibility,
      getRowAriaLabel,
      checkButtonAriaLabel,
      checkboxClassName,
      groupProps
    } = this.props;
    let collapseAllVisibility = groupProps && groupProps.collapseAllVisibility;
    let selection = this._selection;
    let dragDropHelper = this._dragDropHelper;
    let {
      adjustedColumns: columns
    } = this.state;

    if (!item) {
      if (onRenderMissingItem) {
        onRenderMissingItem(index);
      }

      return null;
    }

    return onRenderRow({
      item: item,
      itemIndex: index,
      compact: compact,
      columns: columns as IColumn[],
      groupNestingDepth: nestingDepth,
      selectionMode: selectionMode!,
      selection: selection,
      onDidMount: this._onRowDidMount,
      onWillUnmount: this._onRowWillUnmount,
      onRenderItemColumn: onRenderItemColumn,
      eventsToRegister: eventsToRegister,
      dragDropEvents: dragDropEvents,
      dragDropHelper: dragDropHelper!,
      viewport: viewport,
      checkboxVisibility: checkboxVisibility,
      collapseAllVisibility: collapseAllVisibility,
      getRowAriaLabel: getRowAriaLabel,
      checkButtonAriaLabel: checkButtonAriaLabel,
      checkboxClassName: checkboxClassName,
    }, this._onRenderRow);
  }

  private _onGroupExpandStateChanged(isSomeGroupExpanded: boolean) {
    this.setState({ isSomeGroupExpanded: isSomeGroupExpanded });
  }

  private _onColumnIsSizingChanged(column: IColumn, isSizing: boolean) {
    this.setState({ isSizing: isSizing });
  }

  private _onHeaderKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    if (ev.which === KeyCodes.down) {
      if (this._focusZone && this._focusZone.focus()) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    }
  }

  private _onContentKeyDown(ev: React.KeyboardEvent<HTMLElement>) {
    if (ev.which === KeyCodes.up && !ev.altKey) {
      if (this._header && this._header.focus()) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    }
  }

  private _getGroupNestingDepth(): number {
    let { groups } = this.props;
    let level = 0;
    let groupsInLevel = groups;

    while (groupsInLevel && groupsInLevel.length > 0) {
      level++;
      groupsInLevel = groupsInLevel[0].children;
    }

    return level;
  }

  private _onRowDidMount(row: DetailsRow) {
    const { item, itemIndex } = row.props;
    const itemKey = this._getItemKey(item, itemIndex);
    this._activeRows[itemKey] = row; // this is used for column auto resize

    this._setFocusToRowIfPending(row);

    const { onRowDidMount } = this.props;
    if (onRowDidMount) {
      onRowDidMount(item, itemIndex);
    }
  }

  private _setFocusToRowIfPending(row: DetailsRow) {
    const { itemIndex } = row.props;
    if (this._initialFocusedIndex !== undefined && itemIndex === this._initialFocusedIndex) {
      if (this._selectionZone) {
        this._selectionZone.ignoreNextFocus();
      }
      this._async.setTimeout(() => {
        row.focus();
      }, 0);

      delete this._initialFocusedIndex;
    }
  }

  private _onRowWillUnmount(row: DetailsRow) {
    let { onRowWillUnmount } = this.props;

    const { item, itemIndex } = row.props;
    const itemKey = this._getItemKey(item, itemIndex);
    delete this._activeRows[itemKey];

    if (onRowWillUnmount) {
      onRowWillUnmount(item, itemIndex);
    }
  }

  private _onToggleCollapse(collapsed: boolean) {
    this.setState({
      isCollapsed: collapsed
    });
    if (this._groupedList) {
      this._groupedList.toggleCollapseAll(collapsed);
    }
  }

  private _forceListUpdates() {
    if (this._groupedList) {
      this._groupedList.forceUpdate();
    }
    if (this._list) {
      this._list.forceUpdate();
    }
  }

  private _adjustColumns(newProps: IDetailsListProps, forceUpdate?: boolean) {
    let adjustedColumns = this._getAdjustedColumns(newProps, forceUpdate);
    let { width: viewportWidth } = this.props.viewport!;

    if (adjustedColumns) {
      this.setState({
        adjustedColumns: adjustedColumns,
        lastWidth: viewportWidth,
      });
    }
  }

  /** Returns adjusted columns, given the viewport size and layout mode. */
  private _getAdjustedColumns(newProps: IDetailsListProps, forceUpdate?: boolean): IColumn[] | undefined {
    let { columns: newColumns, items: newItems, layoutMode, selectionMode } = newProps;
    let { width: viewportWidth } = newProps.viewport!;

    let columns = this.props ? this.props.columns : [];
    let lastWidth = this.state ? this.state.lastWidth : -1;
    let lastSelectionMode = this.state ? this.state.lastSelectionMode : undefined;

    if (viewportWidth !== undefined) {
      if (!forceUpdate &&
        lastWidth === viewportWidth &&
        lastSelectionMode === selectionMode &&
        (!columns || newColumns === columns)) {
        return undefined;
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
      adjustedColumns = this._getJustifiedColumns(newColumns, viewportWidth, newProps);
    }

    return adjustedColumns;
  }

  /** Builds a set of columns based on the given columns mixed with the current overrides. */
  private _getFixedColumns(newColumns: IColumn[]) {
    return newColumns.map(column => {
      let newColumn = assign({}, column, this._columnOverrides[column.key]);

      if (!newColumn.calculatedWidth) {
        newColumn.calculatedWidth = newColumn.maxWidth || newColumn.minWidth || MIN_COLUMN_WIDTH;
      }

      return newColumn;
    });
  }

  /** Builds a set of columns to fix within the viewport width. */
  private _getJustifiedColumns(newColumns: IColumn[], viewportWidth: number, props: IDetailsListProps) {
    let {
      selectionMode,
      checkboxVisibility,
      groups
    } = props;
    let outerPadding = DEFAULT_INNER_PADDING;
    let rowCheckWidth = (selectionMode !== SelectionMode.none && checkboxVisibility !== CheckboxVisibility.hidden) ? CHECKBOX_WIDTH : 0;
    let groupExpandWidth = groups ? GROUP_EXPAND_WIDTH : 0;
    let totalWidth = 0; // offset because we have one less inner padding.
    let availableWidth = viewportWidth - (outerPadding + rowCheckWidth + groupExpandWidth);
    let adjustedColumns: IColumn[] = newColumns.map((column, i) => {
      let newColumn = assign(
        {},
        column,
        {
          calculatedWidth: column.minWidth || MIN_COLUMN_WIDTH
        },
        this._columnOverrides[column.key]);

      if (newColumn.maxWidth && newColumn.calculatedWidth > newColumn.maxWidth) {
        newColumn.calculatedWidth = newColumn.maxWidth;
      }

      totalWidth += newColumn.calculatedWidth + (i > 0 ? DEFAULT_INNER_PADDING : 0) + (column.isPadded ? ISPADDED_WIDTH : 0);

      return newColumn;
    });

    let lastIndex = adjustedColumns.length - 1;

    // Remove collapsable columns.
    while (lastIndex > -1 && totalWidth > availableWidth) {
      let column = adjustedColumns[lastIndex];

      if (column.isCollapsable) {
        totalWidth -= column.calculatedWidth! + DEFAULT_INNER_PADDING;
        adjustedColumns.splice(lastIndex, 1);
      }
      lastIndex--;
    }

    // Then expand columns starting at the beginning, until we've filled the width.
    for (let i = 0; i < adjustedColumns.length && totalWidth < availableWidth; i++) {
      let column = adjustedColumns[i];
      const overrides = this._columnOverrides[column.key];
      if (overrides && overrides.calculatedWidth) {
        continue;
      }

      let maxWidth = column.maxWidth;
      let minWidth = column.minWidth || maxWidth || MIN_COLUMN_WIDTH;
      let spaceLeft = availableWidth - totalWidth;
      let increment = maxWidth ? Math.min(spaceLeft, maxWidth - minWidth) : spaceLeft;

      // Add remaining space to the last column.
      if (i === (adjustedColumns.length - 1)) {
        increment = spaceLeft;
      }

      column.calculatedWidth = (column.calculatedWidth as number) + increment;
      totalWidth += increment;
    }

    // Mark the last column as not resizable to avoid extra scrolling issues.
    if (adjustedColumns.length) {
      adjustedColumns[adjustedColumns.length - 1].isResizable = false;
    }

    return adjustedColumns;
  }

  private _onColumnResized(resizingColumn: IColumn, newWidth: number) {
    let newCalculatedWidth = Math.max(resizingColumn.minWidth || MIN_COLUMN_WIDTH, newWidth);
    if (this.props.onColumnResize) {
      this.props.onColumnResize(resizingColumn, newCalculatedWidth);
    }

    this._rememberCalculatedWidth(resizingColumn, newCalculatedWidth);

    this._adjustColumns(this.props, true);
    this._forceListUpdates();
  }

  private _rememberCalculatedWidth(column: IColumn, newCalculatedWidth: number) {
    let overrides = this._columnOverrides[column.key] = this._columnOverrides[column.key] || {} as IColumn;
    overrides.calculatedWidth = newCalculatedWidth;
  }

  /**
   * Callback function when double clicked on the details header column resizer
   * which will measure the column cells of all the active rows and resize the
   * column to the max cell width.
   *
   * @private
   * @param {IColumn} column (double clicked column definition)
   * @param {number} columnIndex (double clicked column index)
   * @todo min width 100 should be changed to const value and should be consistent with the value used on _onSizerMove method in DetailsHeader
   */
  private _onColumnAutoResized(column: IColumn, columnIndex: number) {
    let max = 0;
    let count = 0;
    let totalCount = Object.keys(this._activeRows).length;

    for (let key in this._activeRows) {
      if (this._activeRows.hasOwnProperty(key)) {
        let currentRow = this._activeRows[key];
        currentRow.measureCell(columnIndex, (width: number) => {
          max = Math.max(max, width);
          count++;
          if (count === totalCount) {
            this._onColumnResized(column, max);
          }
        });
      }
    }
  }

  /**
   * Call back function when an element in FocusZone becomes active. It will transalate it into item
   * and call onActiveItemChanged callback if specified.
   *
   * @private
   * @param {el} row element that became active in Focus Zone
   * @param {ev} focus event from Focus Zone
   */
  private _onActiveRowChanged(el?: HTMLElement, ev?: React.FocusEvent<HTMLElement>) {
    let { items, onActiveItemChanged } = this.props;

    if (!onActiveItemChanged || !el) {
      return;
    }
    let index = Number(el.getAttribute('data-item-index'));
    if (index >= 0) {
      onActiveItemChanged(items[index], index, ev);
    }
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
}

export function buildColumns(
  items: any[],
  canResizeColumns?: boolean,
  onColumnClick?: (ev: React.MouseEvent<HTMLElement>, column: IColumn) => any,
  sortedColumnKey?: string,
  isSortedDescending?: boolean,
  groupedColumnKey?: string,
  isMultiline?: boolean) {
  let columns: IColumn[] = [];

  if (items && items.length) {
    let firstItem = items[0];
    let isFirstColumn = true;

    for (let propName in firstItem) {
      if (firstItem.hasOwnProperty(propName)) {
        columns.push({
          key: propName,
          name: propName,
          fieldName: propName,
          minWidth: MIN_COLUMN_WIDTH,
          maxWidth: 300,
          isCollapsable: !!columns.length,
          isMultiline: (isMultiline === undefined) ? false : isMultiline,
          isSorted: sortedColumnKey === propName,
          isSortedDescending: !!isSortedDescending,
          isRowHeader: false,
          columnActionsMode: ColumnActionsMode.clickable,
          isResizable: canResizeColumns,
          onColumnClick: onColumnClick,
          isGrouped: groupedColumnKey === propName
        });

        isFirstColumn = false;
      }
    }
  }

  return columns;
}

function isRightArrow(event: React.KeyboardEvent<HTMLElement>) {
  return event.which === getRTLSafeKeyCode(KeyCodes.right);
}
