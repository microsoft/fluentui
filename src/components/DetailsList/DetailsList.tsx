import * as React from 'react';
import List from '../List/index';
import { IViewport, withViewport } from '../../utilities/decorators/withViewport';
import { assign } from '../../utilities/object';
import { css } from '../../utilities/css';
import DetailsHeader from './DetailsHeader';
import DetailsRow from './DetailsRow';
import IColumn from './IColumn';
import { ISelection, SelectionMode, SELECTION_CHANGE } from '../../utilities/selection/ISelection';
import IObjectWithKey from '../../utilities/selection/IObjectWithKey';
import {Selection } from '../../utilities/selection/Selection';
import SelectionZone from '../../utilities/selection/SelectionZone';
import DetailsListLayoutMode from './DetailsListLayoutMode';
import EventGroup from '../../utilities/eventGroup/EventGroup';
import './DetailsList.scss';

export interface IDetailsListProps {
  items: any[];
  selection?: ISelection;
  selectionMode?: SelectionMode;
  layoutMode?: DetailsListLayoutMode;
  columns?: IColumn[];
  viewport?: IViewport;

  className?: string;
}

export interface IDetailsListState {
  lastWidth?: number;
  lastSelectionMode?: SelectionMode;
  adjustedColumns?: IColumn[];
  columnOverrides?: { [ key: string ]: IColumn }
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
    selectionMode: SelectionMode.multiple
  };

  public refs: {
    [key: string]: React.ReactInstance,
    header: DetailsHeader,
    list: List
  }

  private _events: EventGroup;
  private _selection: ISelection;

  public componentDidMount() {
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public componentWillReceiveProps(newProps) {
    this._adjustColumns(newProps, true);
  }

  constructor(props: IDetailsListProps) {
    super(props);

    this._onColumnResized = this._onColumnResized.bind(this);
    this._onAllSelectedChanged = this._onAllSelectedChanged.bind(this);

    this.state = {
      lastWidth: 0,
      columnOverrides: {} as { [key: string]: IColumn },
      adjustedColumns: this._getAdjustedColumns(props)
    };

    this._events = new EventGroup(this);
    this._selection = props.selection || new Selection();
    this._selection.setItems(props.items as IObjectWithKey[], false);
  }

  public render() {
    let { className, items, viewport, layoutMode, selectionMode } = this.props;
    let { adjustedColumns } = this.state;
    let { _selection:selection } = this;

    return (
      <div className={css('ms-DetailsList', className, {
        'is-fixed': layoutMode === DetailsListLayoutMode.fixedColumns
      })}>
        <SelectionZone selection={ this._selection } selectionMode={ selectionMode }>
          <DetailsHeader
            ref='header'
            selectionMode={ selectionMode }
            layoutMode={ layoutMode }
            selection={ selection }
            columns={ adjustedColumns }
            onColumnResized={ this._onColumnResized }
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
              />
              ) }
          />
        </SelectionZone>
      </div>
    );
  }

  private _previousFocusIndex: number;

  private _onAllSelectedChanged() {
    this._selection.toggleAllSelected();
  }

  private _adjustColumns(newProps: IDetailsListProps, forceUpdate?: boolean) {
    let adjustedColumns = this._getAdjustedColumns(newProps, forceUpdate);
    let { viewport: { width: viewportWidth }, selectionMode } = this.props;

    if (adjustedColumns) {
      this.setState({
        adjustedColumns: adjustedColumns,
        lastSelectionMode: selectionMode,
        lastWidth: viewportWidth
      });
    }

    if (forceUpdate) {
      this.refs.list.forceUpdate();
    }
  }

  private _getAdjustedColumns(newProps: IDetailsListProps, forceUpdate?: boolean): IColumn[] {
    let { columns: newColumns, viewport: { width: viewportWidth }, selectionMode, layoutMode } = newProps;
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

    columns = columns || this._buildColumns(this.props.items);

    let adjustedColumns = [];
    let outerPadding = 0;
    let innerPadding = 16;
    let rowCheckWidth = (selectionMode === SelectionMode.none) ? 0 : 40;

    let totalWidth = 0; // offset because we have one less inner padding.
    let lastColumn: number;
    let availableWidth = viewportWidth - (outerPadding * 2) - rowCheckWidth;
    let hasHiddenColumns = false;

    if (layoutMode === DetailsListLayoutMode.fixedColumns) {
      availableWidth = Number.MAX_VALUE;
    }

    // First, add all of the minimum widths, noting the lastColumn the fits within viewport width.
    for (let i = 0; i < columns.length; i++) {
      let column = assign({}, columns[i], columnOverrides[columns[i].key]);
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

  private _onColumnResized(column: IColumn, newWidth: number) {
    let { columnOverrides } = this.state;
    let overrides = columnOverrides[column.key] = columnOverrides[column.key] || {} as IColumn;

    overrides.minWidth = overrides.maxWidth = newWidth;
    overrides.isCollapsable = false;

    this._adjustColumns(this.props, true);
  }

  private _buildColumns(items) {
    let columns:IColumn[] = [];

    if (items && items.length) {
      let firstItem = items[0];
      let totalStringLength = 0;
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
            isSortable: true,
            isSorted: isFirstColumn,
            isSortedDescending: false,
            isFilterable: isFirstColumn
          });

          isFirstColumn = false;
        }
      }
    }

    return columns;
  }

}

export default DetailsList;