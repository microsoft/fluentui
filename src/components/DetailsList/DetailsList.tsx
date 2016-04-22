import * as React from 'react';
import { withViewport } from '../../utilities/decorators/withViewport';
import { assign } from '../../utilities/object';
import { css } from '../../utilities/css';
import DetailsHeader from './DetailsHeader';
import DetailsRow from './DetailsRow';
import DetailsGroup from './DetailsGroup';
import { Selection } from '../../utilities/selection/Selection';
import SelectionZone from '../../utilities/selection/SelectionZone';
import EventGroup from '../../utilities/eventGroup/EventGroup';
import { IDetailsListProps } from './DetailsList.Props';
import { ISelection, SelectionMode, IObjectWithKey } from '../../utilities/selection/interfaces';
import {
  ConstrainMode,
  DetailsListLayoutMode,
  ColumnActionsMode,
  IColumn,
  IGroup
} from './interfaces';
import DragDropHelper from '../../utilities/dragdrop/DragDropHelper';
import './DetailsList.scss';

export interface IDetailsListState {
  lastWidth?: number;
  lastSelectionMode?: SelectionMode;
  adjustedColumns?: IColumn[];
  columnOverrides?: { [key: string]: IColumn };
  layoutMode?: DetailsListLayoutMode;
  groups?: IGroup[];
  isAllCollapsed?: boolean;
}

const DEFAULT_GROUP_ITEM_LIMIT = 5;
const MIN_RESIZABLE_COLUMN_WIDTH = 100; // this is the global min width
const CHECKBOX_WIDTH = 40;
const GROUP_EXPAND_WIDTH = 36;

@withViewport
export class DetailsList extends React.Component<IDetailsListProps, IDetailsListState> {
  public static defaultProps = {
    layoutMode: DetailsListLayoutMode.justified,
    selectionMode: SelectionMode.multiple,
    constrainMode: ConstrainMode.horizontalConstrained,
    groupItemLimit: DEFAULT_GROUP_ITEM_LIMIT
  };

  public refs: {
    [key: string]: React.ReactInstance,
    header: DetailsHeader,
    root: HTMLElement
  };

  private _events: EventGroup;
  private _selection: ISelection;
  private _activeRows: { [key: string]: DetailsRow };
  private _dragDropHelper: DragDropHelper;

  constructor(props: IDetailsListProps) {
    super(props);

    this._activeRows = {};
    this._onColumnResized = this._onColumnResized.bind(this);
    this._onColumnAutoResized = this._onColumnAutoResized.bind(this);
    this._onAllSelectedChanged = this._onAllSelectedChanged.bind(this);
    this._onRowDidMount = this._onRowDidMount.bind(this);
    this._onRowWillUnmount = this._onRowWillUnmount.bind(this);
    this._onToggleCollapse = this._onToggleCollapse.bind(this);
    this._onToggleCollapseAll = this._onToggleCollapseAll.bind(this);
    this._onToggleSelectGroup = this._onToggleSelectGroup.bind(this);
    this._onShowMore = this._onShowMore.bind(this);
    this._getGroupKey = this._getGroupKey.bind(this);

    this.state = {
      lastWidth: 0,
      columnOverrides: {} as { [key: string]: IColumn },
      adjustedColumns: this._getAdjustedColumns(props),
      layoutMode: this.props.layoutMode,
      groups: this.props.groups,
      isAllCollapsed: false // assuming expanded groups by default for now
    };

    this._events = new EventGroup(this);
    this._selection = props.selection || new Selection();
    this._selection.setItems(props.items as IObjectWithKey[], false);
    this._dragDropHelper = props.dragDropEvents ? new DragDropHelper({ selection: this._selection }) : null;
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

  public componentWillReceiveProps(newProps) {
    let { setKey, groups, items } = this.props;
    let { layoutMode } = this.state;
    let shouldResetSelection = (newProps.setKey !== setKey) || newProps.setKey === undefined;

    if (newProps.layoutMode !== this.props.layoutMode) {
      layoutMode = newProps.layoutMode;
      this.setState({ layoutMode: layoutMode });
    }

    if (newProps.items !== items) {
      this._selection.setItems(newProps.items, shouldResetSelection);
    }

    this._adjustColumns(newProps, true, layoutMode);

    if (newProps.groups !== groups) {
      this.setState({ groups: newProps.groups });
    }
  }

  public render() {
    let { items, className, selectionMode, constrainMode, groupItemLimit, onItemInvoked, rowElementEventMap,
      dragDropEvents, onRenderMissingItem } = this.props;
    let { adjustedColumns, layoutMode, groups, isAllCollapsed } = this.state;
    let { _selection: selection } = this;
    let isGrouped = groups && groups.length > 0;

    if (!groups) {
      groups = [ null ];
    }
    if (!groupItemLimit) {
      groupItemLimit = DEFAULT_GROUP_ITEM_LIMIT;
    }

    let renderedGroups = groups.map((group: IGroup, groupIndex: number) => (
      (!group || group.count > 0) ? (
        <DetailsGroup
          ref={ 'detailsGroup_' + groupIndex }
          key={ this._getGroupKey(group, groupIndex) }
          items={ items }
          columns={ adjustedColumns }
          group={ group }
          groupIndex={ groupIndex }
          groupItemLimit={ groupItemLimit }
          selectionMode={ selectionMode }
          selection={ selection }
          eventsToRegister={ rowElementEventMap }
          onRowDidMount={ this._onRowDidMount }
          onRowWillUnmount={ this._onRowWillUnmount }
          dragDropEvents={ dragDropEvents }
          onRenderMissingItem={ onRenderMissingItem }
          dragDropHelper={ this._dragDropHelper }
          onToggleCollapse={ this._onToggleCollapse }
          onToggleSelectGroup={ this._onToggleSelectGroup }
          onShowMore={ this._onShowMore }
          />
        ) : null
    ));

    return (
      <div ref='root' className={css('ms-DetailsList', className, {
        'is-fixed': layoutMode === DetailsListLayoutMode.fixedColumns,
        'is-horizontalConstrained': constrainMode === ConstrainMode.horizontalConstrained
      }) }>
          <DetailsHeader
            ref='header'
            selectionMode={ selectionMode }
            layoutMode={ layoutMode }
            selection={ selection }
            columns={ adjustedColumns }
            onColumnResized={ this._onColumnResized }
            onColumnAutoResized={ this._onColumnAutoResized }
            isGrouped={ isGrouped }
            isAllCollapsed={ isAllCollapsed }
            onToggleCollapseAll={ this._onToggleCollapseAll }
            />
        <SelectionZone
          selection={ this._selection }
          selectionMode={ selectionMode }
          onItemInvoked={ onItemInvoked }>
          { renderedGroups }
        </SelectionZone>
      </div>
    );
  }

  private _getGroupKey(group: IGroup, groupIndex: number): string {
    return 'group-' + (group ?
      group.key + '-' + group.count :
      '');
  }

  private _onRowDidMount(row: DetailsRow) {
    let { onRowDidMount } = this.props;
    let index = row.props.itemIndex;

    this._activeRows[index] = row; // this is used for column auto resize
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

  private _onAllSelectedChanged() {
    this._selection.toggleAllSelected();
  }

  private _onToggleCollapse(groupIndex: number) {
    let { groups } = this.state;
    let group = groups ? groups[groupIndex] : null;

    if (group) {
      group.isCollapsed = !group.isCollapsed;
      this.forceUpdate();
    }
  }

  private _onToggleCollapseAll(isAllCollapsed: boolean) {
    let { groups } = this.state;

    if (groups) {
      for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
        groups[groupIndex].isCollapsed = isAllCollapsed;
      }

      this.forceUpdate();
    }
  }

  private _onToggleSelectGroup(groupIndex: number) {
    let { groups } = this.state;
    let group = groups ? groups[groupIndex] : null;

    if (group) {
      let isSelected = !group.isSelected;
      let start = group.startIndex;
      let end = group.startIndex + Math.min(group.count, this.props.groupItemLimit);
      for (let idx = start; idx < end; idx++) {
        this._selection.setIndexSelected(idx, isSelected, true /*shouldFocus */, false /* shouldAnchor */);
      }
      group.isSelected = isSelected;

      this.setState({
        groups: groups
      });
    }
  }

  private _forceListUpdates(groups?: IGroup[]) {
    groups = groups || this.state.groups;

    let groupCount = groups ? groups.length : 1;

    for (let i = 0; i < groupCount; i++) {
      let detailsGroup = this.refs['detailsGroup_' + String(i)] as DetailsGroup;
      if (detailsGroup) {
        detailsGroup.forceListUpdate();
      }
    }
  }

  private _onShowMore(groupIndex: number) {
    let { groups } = this.state;
    let group = groups ? groups[groupIndex] : null;

    if (this.props.onShowAll) {
      this.props.onShowAll(group);
    } else {
      // default implementation
      if (group) {
        group.isShowingAll = true;

        this.setState({
          groups: groups
        });
      }
    }
  }

  private _adjustColumns(newProps: IDetailsListProps, forceUpdate?: boolean, layoutMode?: DetailsListLayoutMode) {
    let adjustedColumns = this._getAdjustedColumns(newProps, forceUpdate, layoutMode);
    let { viewport: { width: viewportWidth } } = this.props;

    if (adjustedColumns) {
      this.setState({
        adjustedColumns: adjustedColumns,
        lastWidth: viewportWidth
      });
    }

    if (forceUpdate) {
      this._forceListUpdates(newProps.groups);
    }
  }

  private _getAdjustedColumns(newProps: IDetailsListProps, forceUpdate?: boolean, layoutMode?: DetailsListLayoutMode): IColumn[] {
    let { columns: newColumns, viewport: { width: viewportWidth }, selectionMode, groups } = newProps;
    if (layoutMode === undefined) {
      layoutMode = newProps.layoutMode;
    }

    let columns = this.props ? this.props.columns : [];
    let lastWidth = this.state ? this.state.lastWidth : -1;
    let lastSelectionMode = this.state ? this.state.lastSelectionMode : undefined;
    let columnOverrides = this.state ? this.state.columnOverrides : {};

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

    newColumns = newColumns || buildColumns(this.props.items);

    let adjustedColumns = [];
    let outerPadding = 0;
    let innerPadding = 16;
    let rowCheckWidth = (selectionMode !== SelectionMode.none) ? CHECKBOX_WIDTH : 0;
    let groupExpandWidth = groups ? GROUP_EXPAND_WIDTH : 0;

    let totalWidth = 0; // offset because we have one less inner padding.
    let availableWidth = viewportWidth - (outerPadding * 2) - rowCheckWidth - groupExpandWidth;

    if (layoutMode === DetailsListLayoutMode.fixedColumns) {
      availableWidth = Number.MAX_VALUE;
    }

    // First, add all of the minimum widths, noting the lastColumn the fits within viewport width.
    for (let i = 0; i < newColumns.length; i++) {
      let column = assign({}, newColumns[i], columnOverrides[newColumns[i].key]);
      let padding = (i > 0 ? innerPadding : 0);
      let minWidth = column.minWidth || column.maxWidth || 150;

      column.maxWidth = column.maxWidth || column.minWidth;

      if (!column.isCollapsable || (totalWidth + padding + minWidth) <= availableWidth) {
        adjustedColumns.push(column);
        totalWidth += minWidth + padding;
        column.calculatedWidth = minWidth;
      }
    }

    // Then expand columns starting at the beginning, until we've filled the width.
    for (let i = 0; i < adjustedColumns.length && totalWidth < availableWidth; i++) {
      let column = adjustedColumns[i];
      let maxWidth = column.maxWidth;
      let minWidth = column.minWidth || maxWidth;

      let spaceLeft = availableWidth - totalWidth;
      let increment = Math.min(spaceLeft, maxWidth - minWidth);

      if (layoutMode === DetailsListLayoutMode.justified && i === (adjustedColumns.length - 1)) {
        increment = spaceLeft;
      }

      column.calculatedWidth += increment;
      totalWidth += increment;
    }

      // Make the last row in justified layout not resizable.
      if (layoutMode === DetailsListLayoutMode.justified) {
        adjustedColumns[adjustedColumns.length - 1].isResizable = false;
      }

    return adjustedColumns;
  }

  private _onColumnResized(resizingColumn: IColumn, newWidth: number) {
    let { columnOverrides } = this.state;

    // update column override based on the input width
    function _resizeColumn(column: IColumn, width: number) {
      let overrides = columnOverrides[column.key] = columnOverrides[column.key] || {} as IColumn;
      overrides.minWidth = overrides.maxWidth = Math.max(width, column.isResizable ? MIN_RESIZABLE_COLUMN_WIDTH : 0);
      overrides.isCollapsable = false;
    }

    if (this.state.layoutMode === DetailsListLayoutMode.justified) {
      // for justified layout, locked column width using current calculated width
      for (let adjustedColumn of this.state.adjustedColumns) {
        _resizeColumn(adjustedColumn, adjustedColumn.calculatedWidth);
      }
      this.setState({ layoutMode: DetailsListLayoutMode.fixedColumns }); // once column is resized, we need to change to fix column mode
    }

    _resizeColumn(resizingColumn, newWidth);
    this._adjustColumns(this.props, true, DetailsListLayoutMode.fixedColumns);
  }

  /**
   * Call back function when double clicked on the details header column resizer
   * which will measure the double clicked column cells of all the active rows.
   * and resize the column to the max cell width
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
          minWidth: 220,
          maxWidth: 300,
          isCollapsable: !!columns.length,
          isMultiline: (isMultiline === undefined) ? false : isMultiline,
          isSortable: sortedColumnKey !== undefined,
          isSorted: sortedColumnKey === propName,
          isSortedDescending: !!isSortedDescending,
          columnActionsMode: ColumnActionsMode.hasDropdown,
          isFilterable: false,
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

export default DetailsList;
