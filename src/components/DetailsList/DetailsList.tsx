import * as React from 'react';
import List from '../List/index';
import { IViewport, withViewport } from '../../utilities/decorators/withViewport';
import { assign } from '../../utilities/object';
import { css } from '../../utilities/css';
import DetailsHeader from './DetailsHeader';
import DetailsRow from './DetailsRow';
import { IColumn, DetailsListLayoutMode, ConstrainMode, IGroup } from './interfaces';
import GroupFooter from './GroupFooter';
import GroupHeader from './GroupHeader';
import { ISelection, SelectionMode } from '../../utilities/selection/ISelection';
import IObjectWithKey from '../../utilities/selection/IObjectWithKey';
import {Selection } from '../../utilities/selection/Selection';
import SelectionZone from '../../utilities/selection/SelectionZone';
import EventGroup from '../../utilities/eventGroup/EventGroup';
import './DetailsList.scss';

const DEFAULT_GROUP_ITEM_LIMIT = 5;

export interface IDetailsListProps {
  items: any[];
  groups?: IGroup[];
  selection?: ISelection;
  selectionMode?: SelectionMode;
  layoutMode?: DetailsListLayoutMode;
  columns?: IColumn[];
  viewport?: IViewport;
  constrainMode?: ConstrainMode;
  groupItemLimit?: number;
  className?: string;
  onDidUpdate?: (detailsList?: DetailsList) => any;
  onRowDidMount?: (index?: number) => void;
  onRowWillUnmount?: (index?: number) => void;
  onRenderMissingItem?: (index?: number, containsFocus?: boolean) => React.ReactNode;
}

export interface IDetailsListState {
  lastWidth?: number;
  lastSelectionMode?: SelectionMode;
  adjustedColumns?: IColumn[];
  columnOverrides?: { [key: string]: IColumn };
  layoutMode?: DetailsListLayoutMode;
  groups?: IGroup[];
  isAllCollapsed?: boolean;
}

export interface IDetailsListViewData {
  columns: IColumn[];
  layoutMode: DetailsListLayoutMode;
  rowCheckWidth: number;
}

const MIN_RESIZABLE_COLUMN_WIDTH = 100; // this is the global min width

@withViewport
export class DetailsList extends React.Component<IDetailsListProps, IDetailsListState> {
  public static defaultProps = {
    layoutMode: DetailsListLayoutMode.justified,
    selectionMode: SelectionMode.multiple,
    constrainMode: ConstrainMode.horizontalConstrained
  };

  public refs: {
    [key: string]: React.ReactInstance,
    header: DetailsHeader
  };

  private _events: EventGroup;
  private _selection: ISelection;
  private _activeRows: { [key: string]: DetailsRow };

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
    this._onRenderCell = this._onRenderCell.bind(this);
    this._onShowMore = this._onShowMore.bind(this);
    this._getItemsToRender = this._getItemsToRender.bind(this);

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
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.onDidUpdate) {
      this.props.onDidUpdate(this);
    }
  }

  public componentWillReceiveProps(newProps) {
    let { layoutMode } = this.state;

    if (newProps.layoutMode !== this.props.layoutMode) {
      layoutMode = newProps.layoutMode;
      this.setState({ layoutMode: layoutMode });
    }

    if (newProps.items !== this.props.items) {
      this._selection.setItems(newProps.items, true);
    }

    this._adjustColumns(newProps, true, layoutMode);

    if (newProps.groups !== this.props.groups) {
      this.setState({ groups: newProps.groups });
    }
  }

  public render() {
    let { className, selectionMode, constrainMode, groupItemLimit } = this.props;
    let { adjustedColumns, layoutMode, groups, isAllCollapsed } = this.state;
    let { _selection: selection } = this;

    let isGrouped = groups && groups.length > 0;
    if (!groups) {
      groups = [ null ];
    }
    if (!groupItemLimit) {
      groupItemLimit = DEFAULT_GROUP_ITEM_LIMIT;
    }

    let renderedGroups = groups.map((group: IGroup, groupIdx: number) => (
      <div key={ groupIdx }>
        <GroupHeader
          ref={ 'groupHeader_' + groupIdx }
          group={ group }
          groupIndex={ groupIdx }
          onToggleCollapse={ this._onToggleCollapse }
          onToggleSelectGroup={ this._onToggleSelectGroup }
        />
        {
          group && group.isCollapsed ?
          null :
          <List
              ref={ 'list_' + groupIdx }
              items={ this._getItemsToRender(group) }
              onRenderCell={ this._onRenderCell }
            />
        }
        {
          group && group.isCollapsed && !group.isShowingAll ?
          null :
          <GroupFooter
            ref={ 'groupFooter_' + groupIdx }
            group={ group }
            groupIndex={ groupIdx }
            groupItemLimit={ groupItemLimit }
            onShowMore={ this._onShowMore }
          />
        }
       </div>
    ));

    return (
      <div className={css('ms-DetailsList', className, {
        'is-fixed': layoutMode === DetailsListLayoutMode.fixedColumns,
        'is-horizontalConstrained': constrainMode === ConstrainMode.horizontalConstrained
      }) }>
        <SelectionZone selection={ this._selection } selectionMode={ selectionMode }>
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
          { renderedGroups }
        </SelectionZone>
      </div>
    );
  }

  private _onRenderCell(item: any, index: number, containsFocus: boolean): React.ReactNode {
    let result = null;

    if (item) {
      let { selectionMode } = this.props;
      let { adjustedColumns, groups } = this.state;
      let { _selection: selection } = this;

      let isGrouped = groups && groups.length > 0;

      result = (
        <DetailsRow
          item={ item }
          itemIndex={ index }
          columns={ adjustedColumns }
          selectionMode={ selectionMode }
          selection={ selection }
          shouldSetFocus={ containsFocus }
          onDidMount={ this._onRowDidMount }
          onWillUnmount={ this._onRowWillUnmount }
          isGrouped={ isGrouped }
          />
      );
    } else {
      let { onRenderMissingItem } = this.props;

      if (onRenderMissingItem) {
        result = onRenderMissingItem(index, containsFocus);
      }
    }

    return result;
  }

  private _onRowDidMount(row: DetailsRow) {
    let { onRowDidMount } = this.props;
    let index = row.props.itemIndex;

    this._activeRows[index] = row;
    if (onRowDidMount) {
      onRowDidMount(index);
    }
  }

  private _onRowWillUnmount(row: DetailsRow) {
    let { onRowWillUnmount } = this.props;
    let index = row.props.itemIndex;

    delete this._activeRows[index];
    if (onRowWillUnmount) {
      onRowWillUnmount(index);
    }
  }

  private _getItemsToRender(group: IGroup) {
    let { items, groupItemLimit } = this.props;

    if (group) {
      let start = group.startIndex;
      let end = group.isShowingAll ?
        group.startIndex + group.count :
        group.startIndex + Math.min(group.count, groupItemLimit);
      return items.slice(start, end);
    } else {
      return items;
    }
  }

  private _onAllSelectedChanged() {
    this._selection.toggleAllSelected();
  }

  private _onToggleCollapse(groupIdx: number) {
    let { groups } = this.state;
    let group = groups ? groups[groupIdx] : null;
    if (group) {
      group.isCollapsed = !group.isCollapsed;
      this.setState({
        groups: groups
      });
    }
  }

  private _onToggleCollapseAll(isAllCollapsed: boolean) {
    let { groups } = this.state;
    groups = groups.map((group: any) => {
      group.isCollapsed = isAllCollapsed;
      return group;
    });
    this.setState({
      isAllCollapsed: isAllCollapsed,
      groups: groups
    });
  }

  private _onToggleSelectGroup(groupIdx: number) {
    let { groups } = this.state;
    let group = groups ? groups[groupIdx] : null;
    if (group) {
      let isSelected = !group.isSelected;
      let start = group.startIndex;
      let end = group.startIndex + Math.min(group.count, this.props.groupItemLimit);
      for (let idx = start; idx <= end; idx++) {
        this._selection.setIndexSelected(idx, isSelected /* isSelected */, true /*shouldFocus */, false /* shouldAnchor */);
      }
      group.isSelected = isSelected;

      this.setState({
        groups: groups
      });
    }
  }

  private _onShowMore(groupIdx: number) {
    let { groups } = this.state;
    let group = groups ? groups[groupIdx] : null;
    if (group) {
      group.isShowingAll = true;

      this.setState({
        groups: groups
      });
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
      let groupCount = newProps.groups ? newProps.groups.length : 1;
      for (let i = 0; i < groupCount; i++) {
        let list = this.refs['list_' + String(i)] as List;
        if (list) {
          list.forceUpdate();
        }
      }
    }
  }

  private _getAdjustedColumns(newProps: IDetailsListProps, forceUpdate?: boolean, layoutMode?: DetailsListLayoutMode): IColumn[] {
    let { columns: newColumns, viewport: { width: viewportWidth }, selectionMode } = newProps;
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
    let rowCheckWidth = (selectionMode === SelectionMode.none) ? 0 : 40;

    let totalWidth = 0; // offset because we have one less inner padding.
    let availableWidth = viewportWidth - (outerPadding * 2) - rowCheckWidth;

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
  groupedColumnKey?: string) {
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
          isClipped: true,
          isSortable: sortedColumnKey !== undefined,
          isSorted: sortedColumnKey === propName,
          isSortedDescending: !!isSortedDescending,
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
