import * as React from 'react';
import List from '../List/index';
import { IViewport, withViewport } from '../../utilities/decorators/withViewport';
import { assign } from '../../utilities/object';
import { css } from '../../utilities/css';
import DetailsHeader from './DetailsHeader';
import DetailsRow from './DetailsRow';
import { IColumn, DetailsListLayoutMode, ConstrainMode, IDragDropEvents, IGroup } from './interfaces';
import GroupFooter from './GroupFooter';
import GroupHeader from './GroupHeader';
import { ISelection, SelectionMode } from '../../utilities/selection/ISelection';
import { IObjectWithKey } from '../../utilities/selection/IObjectWithKey';
import { Selection } from '../../utilities/selection/Selection';
import SelectionZone from '../../utilities/selection/SelectionZone';
import EventGroup from '../../utilities/eventGroup/EventGroup';
import './DetailsList.scss';

const DEFAULT_GROUP_ITEM_LIMIT = 5;

export interface IDetailsListProps extends React.Props<DetailsList> {
  /** A key that uniquely identifies the given items. If provided, the selection will be reset when the key changes. */
  setKey?: string;

  /** The items to render. */
  items: any[];

  /** Optional class name to add to the root element. */
  className?: string;

  /** Optional grouping instructions. */
  groups?: IGroup[];

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

  /** Grouping item limit. */
  groupItemLimit?: number;

  /** Event names and corresponding callbacks that will be registered to rendered row elements. */
  rowElementEventMap?: [{ eventName: string, callback: (item?: any, index?: number, event?: any) => void }];

  /** Callback for when the details list has been updated. Useful for telemetry tracking externally. */
  onDidUpdate?: (detailsList?: DetailsList) => any;

  /** Callback for when a given row has been mounted. Useful for identifying when a row has been rendered on the page. */
  onRowDidMount?: (item?: any, index?: number) => void;

  /** Callback for when a given row has been mounted. Useful for identifying when a row has been removed from the page. */
  onRowWillUnmount?: (item?: any, index?: number) => void;

  /** Map of callback functions related to drag and drop functionality. */
  dragDropEvents?: IDragDropEvents;

    /** Callback for what to render when the item is missing. */
  onRenderMissingItem?: (index?: number) => React.ReactNode;

  /** Viewport, provided by the withViewport decorator. */
  viewport?: IViewport;
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

const DISTANCE_FOR_DRAG_SQUARED = 25; // the minimum mouse move distance to treat it as drag event
const MIN_RESIZABLE_COLUMN_WIDTH = 100; // this is the global min width

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
  private _dragging: boolean;
  private _dragData: {
    eventTarget: EventTarget;
    clientX: number;
    clientY: number;
    dataTransfer?: DataTransfer;
    dropTarget?: DetailsRow;
    dragTarget?: DetailsRow;
  };

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
    this._dragging = false;
  }

  public componentDidMount() {
    let { dragDropEvents } = this.props;

    if (dragDropEvents) {
      // clear drag data when mouse up, use capture event to ensure it will be run
      this._events.on(document.body, 'mouseup', this._onMouseUp.bind(this), true);
      this._events.on(document, 'mouseup', this._onDocumentMouseUp.bind(this), true);
    }
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
              selection={ selection }
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
        <SelectionZone selection={ this._selection } selectionMode={ selectionMode }>
          { renderedGroups }
        </SelectionZone>
      </div>
    );
  }

  private _onRenderCell(item: any, index: number): React.ReactNode {
    let result = null;
    let { selectionMode, rowElementEventMap, dragDropEvents, onRenderMissingItem } = this.props;
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
        onDidMount={ this._onRowDidMount }
        onWillUnmount={ this._onRowWillUnmount }
        eventsToRegister={ rowElementEventMap }
        dragDropEvents={ dragDropEvents }
        isGrouped={ isGrouped }
        />
    );

    if (!item) {
      if (onRenderMissingItem) {
        onRenderMissingItem(index);
      }
    }

    return result;
  }

  private _onRowDidMount(row: DetailsRow) {
    let { onRowDidMount } = this.props;
    let index = row.props.itemIndex;

    this._activeRows[index] = row; // this is used for column auto resize
    this._registerDragDropEvents(row);
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

  /**
   * clear drag data when mouse up on body
   */
  private _onMouseUp(event: MouseEvent) {
    this._dragging = false;
    if (this._dragData && this._dragData.dropTarget) {
      // raise dargleave event to let dropTarget know it need to remove dropping style
      EventGroup.raise(this._dragData.dropTarget.refs.root, 'dragleave');
    }
    this._dragData = null;
  }

  /**
   * clear drag data when mouse up outside of the document
   */
  private _onDocumentMouseUp(event: MouseEvent) {
    if (event.target === document.documentElement) {
      this._onMouseUp(event);
    }
  }

  /**
   * Register mouse events to enable drag items in the list and drop to the other item.
   * when mouse down on a draggable item, we start to track dragdata.
   * when mouse move over a row while dragging some items, fire dragenter to the row
   * when mouse leave a row while dragging some items, fire dragleave to the row
   * details row will handle dragenter and dragleave event to change the style.
   *
   * @private
   * @param {DetailsRow} row
   */
  private _registerDragDropEvents(row: DetailsRow) {
    let { dragDropEvents } = this.props;

    if (dragDropEvents) {
      this._events.on(row.refs.root, 'mousemove', this._onRowMouseMove.bind(this, row));
      this._events.on(row.refs.root, 'mouseleave', this._onRowMouseLeave.bind(this, row));

      if (dragDropEvents.canDrag) {
        this._events.on(row.refs.root, 'mousedown', this._onRowMouseDown.bind(this, row));
      }
    }
  }

  /**
   * when mouse move over a new row while dragging some items,
   * fire dragleave on the old row and fire dragenter to the new row
   * row will handle style change on dragenter and dragleave events.
   */
  private _onRowMouseMove(row: DetailsRow, event: MouseEvent) {
    if (this._dragging) {
      if (this._dragData.dropTarget && this._dragData.dropTarget.props.itemIndex !== row.props.itemIndex) {
        EventGroup.raise(this._dragData.dropTarget.refs.root, 'dragleave');
        this._dragData.dropTarget = null;
      }

      if (!this._dragData.dropTarget) {
        EventGroup.raise(row.refs.root, 'dragenter');
        this._dragData.dropTarget = row;
      }
    } else if (this._dragData) {
      let xDiff = this._dragData.clientX - event.clientX;
      let yDiff = this._dragData.clientY - event.clientY;
      if (xDiff * xDiff + yDiff * yDiff >= DISTANCE_FOR_DRAG_SQUARED) {
        if (this._dragData.dragTarget &&
          this._selection.isIndexSelected(this._dragData.dragTarget.props.itemIndex)) {
          this._dragging = true;
        }
      }
    }
  }

  /**
   * when mouse leave a row while dragging some items, fire dragleave to the row
   */
  private _onRowMouseLeave(row: DetailsRow, event: MouseEvent) {
    if (this._dragging) {
      if (this._dragData && this._dragData.dropTarget) {
        EventGroup.raise(row.refs.root, 'dragleave');
        this._dragData.dropTarget = null;
      }
    }
  }

  /**
   * when mouse down on a draggable item, we start to track dragdata.
   */
  private _onRowMouseDown(row: DetailsRow, event: MouseEvent) {
    let { dragDropEvents } = this.props;

    if (dragDropEvents.canDrag(row.props.item)) {
      this._dragData = {
        clientX: event.clientX,
        clientY: event.clientY,
        eventTarget: event.target,
        dragTarget: row
      };
    } else {
      this._dragData = null;
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
