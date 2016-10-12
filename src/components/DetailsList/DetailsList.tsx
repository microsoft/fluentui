import * as React from 'react';
import {
  IDetailsListProps,
  ColumnActionsMode,
  ConstrainMode,
  DetailsListLayoutMode,
  IColumn,
  IDetailsList,
  CheckboxVisibility
} from '../DetailsList/DetailsList.Props';
import { DetailsHeader, SelectAllVisibility } from '../DetailsList/DetailsHeader';
import { DetailsRow, IDetailsRowProps } from '../DetailsList/DetailsRow';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { GroupedList } from '../../GroupedList';
import { List } from '../../List';
import { withViewport } from '../../utilities/decorators/withViewport';
import { assign } from '../../utilities/object';
import { css } from '../../utilities/css';
import { autobind } from '../../utilities/autobind';

import {
  IObjectWithKey,
  ISelection,
  Selection,
  SelectionMode,
  SelectionZone
} from '../../utilities/selection/index';
import { EventGroup } from '../../utilities/eventGroup/EventGroup';
import { getRTLSafeKeyCode } from '../../utilities/rtl';
import { KeyCodes } from '../../utilities/KeyCodes';
import { DragDropHelper } from '../../utilities/dragdrop/DragDropHelper';
import './DetailsList.scss';

export interface IDetailsListState {
  lastWidth?: number;
  lastSelectionMode?: SelectionMode;
  adjustedColumns?: IColumn[];
  layoutMode?: DetailsListLayoutMode;
  isCollapsed?: boolean;
  isSizing?: boolean;
  isDropping?: boolean;
  isSomeGroupExpanded?: boolean;
}

const MIN_COLUMN_WIDTH = 100; // this is the global min width
const CHECKBOX_WIDTH = 36;
const GROUP_EXPAND_WIDTH = 36;
const DEFAULT_INNER_PADDING = 16;

const DEFAULT_RENDERED_WINDOWS_AHEAD = 2;
const DEFAULT_RENDERED_WINDOWS_BEHIND = 2;

@withViewport
export class DetailsList extends React.Component<IDetailsListProps, IDetailsListState> implements IDetailsList {
  public static defaultProps = {
    layoutMode: DetailsListLayoutMode.justified,
    selectionMode: SelectionMode.multiple,
    constrainMode: ConstrainMode.horizontalConstrained,
    checkboxVisibility: CheckboxVisibility.onHover,
    isHeaderVisible: true
  };

  public refs: {
    [ key: string]: React.ReactInstance,
    header: DetailsHeader,
    root: HTMLElement,
    groupedList: GroupedList,
    list: List,
    focusZone: FocusZone,
    selectionZone: SelectionZone
  };

  private _events: EventGroup;
  private _selection: ISelection;
  private _activeRows: { [key: string]: DetailsRow };
  private _dragDropHelper: DragDropHelper;
  private _initialFocusedIndex: number;

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
      layoutMode: props.layoutMode,
      isSizing: false,
      isDropping: false,
      isCollapsed: props.groupProps && props.groupProps.isAllGroupsCollapsed,
      isSomeGroupExpanded: props.groupProps && !props.groupProps.isAllGroupsCollapsed
    };

    this._events = new EventGroup(this);
    this._selection = props.selection || new Selection({ onSelectionChanged: null, getKey: props.getKey });
    this._selection.setItems(props.items as IObjectWithKey[], false);
    this._dragDropHelper = props.dragDropEvents ? new DragDropHelper({ selection: this._selection }) : null;
    this._initialFocusedIndex = props.initialFocusedIndex;
  }

  public componentWillUnmount() {
    this._events.dispose();
    if (this._dragDropHelper) {
      this._dragDropHelper.dispose();
    }
  }

  public componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.onDidUpdate) {
      this.props.onDidUpdate(this);
    }
  }

  public componentWillReceiveProps(newProps: IDetailsListProps) {
    let {
      items,
      setKey,
      selectionMode,
      columns,
      viewport
    } = this.props;
    let { layoutMode } = this.state;
    let shouldResetSelection = (newProps.setKey !== setKey) || newProps.setKey === undefined;
    let shouldForceUpdates = false;

    if (newProps.layoutMode !== this.props.layoutMode) {
      layoutMode = newProps.layoutMode;
      this.setState({ layoutMode: layoutMode });
      shouldForceUpdates = true;
    }

    if (shouldResetSelection) {
      this._initialFocusedIndex = newProps.initialFocusedIndex;
    }

    if (newProps.items !== items) {
      this._selection.setItems(newProps.items, shouldResetSelection);
    }

    if (
      newProps.columns !== columns ||
      newProps.viewport.width !== viewport.width
    ) {
      shouldForceUpdates = true;
    }

    this._adjustColumns(newProps, true, layoutMode);

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
      className,
      constrainMode,
      dragDropEvents,
      groups,
      groupProps,
      items,
      isHeaderVisible,
      onItemInvoked,
      onColumnHeaderClick,
      onColumnHeaderContextMenu,
      selectionMode,
      ariaLabel,
      ariaLabelForGrid,
      rowElementEventMap,
      shouldApplyApplicationRole = false
    } = this.props;
    let {
      adjustedColumns,
      isCollapsed,
      layoutMode,
      isSizing,
      isSomeGroupExpanded
    } = this.state;
    let {
      _selection: selection,
      _dragDropHelper: dragDropHelper
    } = this;
    let groupNestingDepth = this._getGroupNestingDepth();
    let additionalListProps = {
      renderedWindowsAhead: isSizing ? 0 : DEFAULT_RENDERED_WINDOWS_AHEAD,
      renderedWindowsBehind: isSizing ? 0 : DEFAULT_RENDERED_WINDOWS_BEHIND
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

    return (
      // If shouldApplyApplicationRole is true, role application will be applied to make arrow keys work
      // with JAWS.
      <div
        ref='root'
        className={css('ms-DetailsList', className, {
          'is-fixed': layoutMode === DetailsListLayoutMode.fixedColumns,
          'is-horizontalConstrained': constrainMode === ConstrainMode.horizontalConstrained
        }) }
        data-automationid='DetailsList'
        data-is-scrollable='false'
        aria-label={ ariaLabel }
        role={ shouldApplyApplicationRole ? 'application' : '' }>
        <div role='grid' aria-label={ ariaLabelForGrid }>
          <div onKeyDown={ this._onHeaderKeyDown } role='presentation'>
            { isHeaderVisible && (
              <DetailsHeader
                ref='header'
                selectionMode={ selectionMode }
                layoutMode={ layoutMode }
                selection={ selection }
                columns={ adjustedColumns }
                onColumnClick={ onColumnHeaderClick }
                onColumnContextMenu={ onColumnHeaderContextMenu }
                onColumnResized={ this._onColumnResized }
                onColumnIsSizingChanged={ this._onColumnIsSizingChanged }
                onColumnAutoResized={ this._onColumnAutoResized }
                groupNestingDepth={ groupNestingDepth }
                isAllCollapsed={ isCollapsed }
                onToggleCollapseAll={ this._onToggleCollapse }
                ariaLabel={ ariaLabelForListHeader }
                ariaLabelForSelectAllCheckbox={ ariaLabelForSelectAllCheckbox }
                selectAllVisibility={ selectAllVisibility }
                />
            ) }
          </div>
          <div ref='contentContainer' onKeyDown={ this._onContentKeyDown } role='presentation'>
            <FocusZone
              ref='focusZone'
              direction={ FocusZoneDirection.vertical }
              isInnerZoneKeystroke={ (ev) => (ev.which === getRTLSafeKeyCode(KeyCodes.right)) }
              onActiveElementChanged={ this._onActiveRowChanged }
              >
              <SelectionZone
                ref='selectionZone'
                selection={ selection }
                selectionMode={ selectionMode }
                onItemInvoked={ onItemInvoked }>
                { groups ? (
                  <GroupedList
                    groups={ groups }
                    groupProps={ groupProps }
                    items={ items }
                    onRenderCell={ this._onRenderCell }
                    selection={ selection }
                    selectionMode={ selectionMode }
                    dragDropEvents={ dragDropEvents }
                    dragDropHelper={ dragDropHelper }
                    eventsToRegister={ rowElementEventMap }
                    listProps={ additionalListProps }
                    onGroupExpandStateChanged={ this._onGroupExpandStateChanged }
                    ref='groupedList'
                    />
                ) : (
                    <List
                      items={ items }
                      onRenderCell={ (item, itemIndex) => this._onRenderCell(0, item, itemIndex) }
                      { ...additionalListProps }
                      ref='list'
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
  protected _onRenderRow(props: IDetailsRowProps) {
    return <DetailsRow { ...props } />;
  }

  private _onRenderCell(nestingDepth: number, item: any, index: number): React.ReactNode {
    let {
      dragDropEvents,
      rowElementEventMap: eventsToRegister,
      onRenderMissingItem,
      onRenderItemColumn,
      onRenderRow = this._onRenderRow,
      selectionMode,
      viewport,
      checkboxVisibility,
      getRowAriaLabel,
      checkButtonAriaLabel
    } = this.props;
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
      getRowAriaLabel: getRowAriaLabel,
      checkButtonAriaLabel: checkButtonAriaLabel
    });
  }

  private _onGroupExpandStateChanged(isSomeGroupExpanded: boolean) {
    this.setState({ isSomeGroupExpanded: isSomeGroupExpanded });
  }

  private _onColumnIsSizingChanged(column: IColumn, isSizing: boolean) {
    this.setState({ isSizing: isSizing });
  }

  private _onHeaderKeyDown(ev: React.KeyboardEvent) {
    if (ev.which === KeyCodes.down) {
      if (this.refs.focusZone && this.refs.focusZone.focus()) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    }
  }

  private _onContentKeyDown(ev: React.KeyboardEvent) {
    if (ev.which === KeyCodes.up) {
      if (this.refs.header && this.refs.header.focus()) {
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
    let { onRowDidMount } = this.props;
    let index = row.props.itemIndex;

    this._activeRows[index] = row; // this is used for column auto resize

    // Set focus to the row if it should receive focus.
    if (this._initialFocusedIndex !== undefined && index === this._initialFocusedIndex) {
      if (this.refs.selectionZone) {
        this.refs.selectionZone.ignoreNextFocus();
      }
      row.focus();

      delete this._initialFocusedIndex;
    }

    if (onRowDidMount) {
      onRowDidMount(row.props.item, index);
    }
  }

  private _onRowWillUnmount(row: DetailsRow) {
    let { onRowWillUnmount } = this.props;
    let index = row.props.itemIndex;

    delete this._activeRows[index];
    this._events.off(row.refs.root);
    if (onRowWillUnmount) {
      onRowWillUnmount(row.props.item, index);
    }
  }

  private _onToggleCollapse(collapsed: boolean) {
    this.setState({
      isCollapsed: collapsed
    });
    if (this.refs.groupedList) {
      this.refs.groupedList.toggleCollapseAll(collapsed);
    }
  }

  private _forceListUpdates() {
    if (this.refs.groupedList) {
      this.refs.groupedList.forceUpdate();
    }
    if (this.refs.list) {
      this.refs.list.forceUpdate();
    }
  }

  private _adjustColumns(newProps: IDetailsListProps, forceUpdate?: boolean, layoutMode?: DetailsListLayoutMode) {
    let adjustedColumns = this._getAdjustedColumns(newProps, forceUpdate, layoutMode);
    let { viewport: { width: viewportWidth } } = this.props;

    if (adjustedColumns) {
      this.setState({
        adjustedColumns: adjustedColumns,
        lastWidth: viewportWidth,
        layoutMode: layoutMode
      });
    }
  }

  /** Returns adjusted columns, given the viewport size and layout mode. */
  private _getAdjustedColumns(newProps: IDetailsListProps, forceUpdate?: boolean, layoutMode?: DetailsListLayoutMode): IColumn[] {
    let { columns: newColumns, items: newItems, viewport: { width: viewportWidth }, selectionMode } = newProps;

    if (layoutMode === undefined) {
      layoutMode = newProps.layoutMode;
    }

    let columns = this.props ? this.props.columns : [];
    let lastWidth = this.state ? this.state.lastWidth : -1;
    let lastSelectionMode = this.state ? this.state.lastSelectionMode : undefined;

    if (viewportWidth !== undefined) {
      if (!forceUpdate &&
        lastWidth === viewportWidth &&
        lastSelectionMode === selectionMode &&
        (!columns || newColumns === columns)) {
        return;
      }
    } else {
      viewportWidth = this.props.viewport.width;
    }

    newColumns = newColumns || buildColumns(newItems, true);

    let adjustedColumns: IColumn[];

    if (layoutMode === DetailsListLayoutMode.fixedColumns) {
      adjustedColumns = this._getFixedColumns(newColumns);
    } else {
      adjustedColumns = this._getJustifiedColumns(newColumns, viewportWidth);
    }

    // Preserve adjusted column calculated widths.
    adjustedColumns.forEach(column => {
      let overrides = this._columnOverrides[column.key] = this._columnOverrides[column.key] || {} as IColumn;
      overrides.calculatedWidth = column.calculatedWidth;
    });

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
  private _getJustifiedColumns(newColumns: IColumn[], viewportWidth: number) {
    let {
      selectionMode,
      groups
    } = this.props;
    let outerPadding = DEFAULT_INNER_PADDING;
    let rowCheckWidth = (selectionMode !== SelectionMode.none) ? CHECKBOX_WIDTH : 0;
    let groupExpandWidth = groups ? GROUP_EXPAND_WIDTH : 0;
    let totalWidth = 0; // offset because we have one less inner padding.
    let availableWidth = viewportWidth - outerPadding - rowCheckWidth - groupExpandWidth;
    let adjustedColumns: IColumn[] = newColumns.map((column, i) => {
      let newColumn = assign(
        {},
        column,
        {
          calculatedWidth: column.minWidth || MIN_COLUMN_WIDTH
        });

      totalWidth += newColumn.calculatedWidth + (i > 0 ? DEFAULT_INNER_PADDING : 0);

      return newColumn;
    });

    let lastIndex = adjustedColumns.length - 1;

    // Remove collapsable columns.
    while (lastIndex > 1 && totalWidth > availableWidth) {
      let column = adjustedColumns[lastIndex];

      if (column.isCollapsable) {
        totalWidth -= column.calculatedWidth + DEFAULT_INNER_PADDING;
        adjustedColumns.splice(lastIndex, 1);
      }
      lastIndex--;
    }

    // Then expand columns starting at the beginning, until we've filled the width.
    for (let i = 0; i < adjustedColumns.length && totalWidth < availableWidth; i++) {
      let column = adjustedColumns[i];
      let maxWidth = column.maxWidth;
      let minWidth = column.minWidth || maxWidth || MIN_COLUMN_WIDTH;
      let spaceLeft = availableWidth - totalWidth;
      let increment = Math.min(spaceLeft, maxWidth - minWidth);

      // Add remaining space to the last column.
      if (i === (adjustedColumns.length - 1)) {
        increment = spaceLeft;
      }

      column.calculatedWidth += increment;
      totalWidth += increment;
    }

    // Mark the last column as not resizable to avoid extra scrolling issues.
    if (adjustedColumns.length) {
      adjustedColumns[adjustedColumns.length - 1].isResizable = false;
    }

    return adjustedColumns;
  }

  private _onColumnResized(resizingColumn: IColumn, newWidth: number) {
    this._columnOverrides[resizingColumn.key].calculatedWidth = Math.max(
      resizingColumn.minWidth || MIN_COLUMN_WIDTH,
      newWidth);
    this._adjustColumns(this.props, true, DetailsListLayoutMode.fixedColumns);
    this._forceListUpdates();
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
  private _onActiveRowChanged(el?: HTMLElement, ev?: React.FocusEvent) {
    let { items, onActiveItemChanged } = this.props;

    if (!onActiveItemChanged || !el) {
      return;
    }
    let index = Number(el.getAttribute('data-item-index'));
    if (index >= 0) {
      onActiveItemChanged(items[index], index, ev);
    }
  };
}

export function buildColumns(
  items: any[],
  canResizeColumns?: boolean,
  onColumnClick?: (column: IColumn, ev: React.MouseEvent) => any,
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
