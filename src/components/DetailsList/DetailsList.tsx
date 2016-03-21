import * as React from 'react';
import List from '../List/index';
import { IViewport, withViewport } from '../../utilities/decorators/withViewport';
import { assign } from '../../utilities/object';
import { css } from '../../utilities/css';
import DetailsHeader from './DetailsHeader';
import DetailsRow from './DetailsRow';
import { IColumn, DetailsListLayoutMode, ConstrainMode } from './interfaces';
import { ISelection, SelectionMode } from '../../utilities/selection/ISelection';
import IObjectWithKey from '../../utilities/selection/IObjectWithKey';
import {Selection } from '../../utilities/selection/Selection';
import SelectionZone from '../../utilities/selection/SelectionZone';
import EventGroup from '../../utilities/eventGroup/EventGroup';
import './DetailsList.scss';

export interface IDetailsListProps {
  items: any[];
  selection?: ISelection;
  selectionMode?: SelectionMode;
  layoutMode?: DetailsListLayoutMode;
  columns?: IColumn[];
  viewport?: IViewport;
  constrainMode?: ConstrainMode;
  className?: string;
  onDidUpdate?: (detailsList?: DetailsList) => any;
}

export interface IDetailsListState {
  lastWidth?: number;
  lastSelectionMode?: SelectionMode;
  adjustedColumns?: IColumn[];
  columnOverrides?: { [key: string]: IColumn };
  layoutMode?: DetailsListLayoutMode;
}

export interface IDetailsListViewData {
  columns: IColumn[];
  layoutMode: DetailsListLayoutMode;
  rowCheckWidth: number;
}

@withViewport
export class DetailsList extends React.Component<IDetailsListProps, IDetailsListState> {
  public static defaultProps = {
    layoutMode: DetailsListLayoutMode.justified,
    selectionMode: SelectionMode.multiple,
    constrainMode: ConstrainMode.horizontalConstrained
  };

  public refs: {
    [key: string]: React.ReactInstance,
    header: DetailsHeader,
    list: List
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

    this.state = {
      lastWidth: 0,
      columnOverrides: {} as { [key: string]: IColumn },
      adjustedColumns: this._getAdjustedColumns(props),
      layoutMode: this.props.layoutMode,
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
  }

  public render() {
    let { className, items, selectionMode, constrainMode } = this.props;
    let { adjustedColumns, layoutMode } = this.state;
    let { _selection: selection } = this;

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
            />
          <List
            ref='list'
            items={ items }
            onRenderCell={ (item: any, index: number, containsFocus: boolean) => (
              <DetailsRow
                item={ item }
                itemIndex={ index }
                columns={ adjustedColumns }
                selectionMode={ selectionMode }
                selection={ selection }
                shouldSetFocus={ containsFocus }
                onDidMount={ this._onRowDidMount }
                onWillUnmount={ this._onRowWillUnmount }
                />
            ) }
            />
        </SelectionZone>
      </div>
    );
  }

  private _onRowDidMount(row) {
    this._activeRows[row.props.itemIndex] = row;
  }

  private _onRowWillUnmount(row) {
    delete this._activeRows[row.props.itemIndex];
  }

  private _onAllSelectedChanged() {
    this._selection.toggleAllSelected();
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
      this.refs.list.forceUpdate();
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

    const MINWIDTH = 100; // this is the global min width

    // update column override based on the input width
    function _resizeColumn(column: IColumn, width: number) {
      let overrides = columnOverrides[column.key] = columnOverrides[column.key] || {} as IColumn;
      overrides.minWidth = overrides.maxWidth = Math.max(width, MINWIDTH);
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
  isSortedDescending?: boolean) {
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
          onColumnClick: onColumnClick
        });

        isFirstColumn = false;
      }
    }
  }

  return columns;
}

export default DetailsList;
