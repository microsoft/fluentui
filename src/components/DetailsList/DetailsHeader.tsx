import * as React from 'react';
import IColumn from './IColumn';
import './DetailsHeader.scss';
import { css } from '../../utilities/css';
import { getResourceUrl } from '../../utilities/resources';
import { FocusZone, FocusZoneDirection } from '../../utilities/focus/index';
import { SelectionMode } from '../../utilities/selection/ISelection';
import DetailsListLayoutMode from './DetailsListLayoutMode';

export interface IDetailsHeaderProps {
  columns: IColumn[];
  selectionMode: SelectionMode;
  layoutMode: DetailsListLayoutMode;
  isAllSelected: boolean;
  onSort?: (column: IColumn) => void;
  onColumnIsSizingChanged?: (column: IColumn, isSizing: boolean) => void;
  onColumnResized?: (column: IColumn, newWidth: number) => void;
  onIsAllSelectedChanged?: (isAllSelected: boolean) => void;
}

export interface IFilterItem {
  name: string;
  key: string;
}

export interface IColumnResizeDetails {
  columnIndex: number;
  originX: number;
  columnMinWidth: number;
}

export interface IDetailsHeaderState {
  columnResizeDetails: IColumnResizeDetails;
}

export default class DetailsHeader extends React.Component<IDetailsHeaderProps, IDetailsHeaderState> {
  constructor() {
    super();

    this.state = {
      columnResizeDetails: null
    };

    this._onSizerMove = this._onSizerMove.bind(this);
    this._onSizerUp = this._onSizerUp.bind(this);
  }

  public componentWillReceiveProps(newProps) {
  }

  public render() {
    let { selectionMode, layoutMode, columns, onSort, isAllSelected } = this.props;
    let { columnResizeDetails } = this.state;

    return (
      <div
        className={ css('DetailsHeader ms-font-s', {
          'is-allSelected': isAllSelected,
          'is-singleSelect': selectionMode === SelectionMode.single,
          'is-resizingColumn': !!columnResizeDetails
        }) } ref='root'>
        <FocusZone direction={ FocusZoneDirection.horizontal }>
          { (selectionMode === SelectionMode.multiple) ? (
          <button
            className='DetailsHeader-cell is-check'
            onClick={ this._handleSelectAllClick.bind(this) }
          >
            <div className='DetailsHeader-checkClip'>
              <img className="DetailsHeader-checkImage" src={ getResourceUrl('check.png') } />
            </div>
          </button>
          ) : (null) }
          { columns.map((column, columnIndex) => (
          <div key={ column.key } className='DetailsHeader-cellSizeWrapper'>
            <div className='DetailsHeader-cellWrapper'>
              <button
                key={ column.fieldName }
                disabled={ !column.isSortable }
                className={ css('DetailsHeader-cell', {
                  'is-sortable': column.isSortable,
                  'is-sorted': column.isSorted,
                  'is-sortedDescending': column.isSortedDescending
                }) }
                style={ { width: column.calculatedWidth } }
                onClick={ (ev) => (onSort ? onSort(column) : null) }
              >
                { column.name }
                <span className="DetailsHeader-sortArrow ms-Icon ms-Icon--arrowUp2" />
              </button>
              { column.isFilterable ? (
                <button className='DetailsHeader-cell is-filter'>
                  <i className='ms-Icon ms-Icon--chevronDown' />
                </button>
              ) : (null)}
            </div>
            { (layoutMode === DetailsListLayoutMode.fixedColumns) ? (
            <button
              className={ css('DetailsHeader-cell is-sizer', {
                'is-resizing': columnResizeDetails && columnResizeDetails.columnIndex === columnIndex
              }) }
              onMouseDown={ this._onSizerDown.bind(this, columnIndex) }
            />
            ) : (null) }
          </div>
          ))}
        </FocusZone>
        <div className='DetailsHeader-sizerCover' onMouseMove={ this._onSizerMove } onMouseUp={ this._onSizerUp } />
      </div>
    );
  }

  private _onSizerDown(columnIndex: number, ev: React.MouseEvent) {
    let { columns, onColumnIsSizingChanged } = this.props;

    this.setState({
       columnResizeDetails: {
         columnIndex: columnIndex,
         columnMinWidth: columns[columnIndex].calculatedWidth,
         originX: ev.clientX
       }
     });

     if (onColumnIsSizingChanged) {
       onColumnIsSizingChanged(columns[columnIndex], true);
     }
  }

  private _onSizerMove(ev: React.MouseEvent) {
    let { onColumnResized, columns } = this.props;

    if (onColumnResized) {
      let { columnResizeDetails } = this.state;

      onColumnResized(
        columns[columnResizeDetails.columnIndex],
        Math.max(100, columnResizeDetails.columnMinWidth + (ev.clientX - columnResizeDetails.originX))
      );
    }
  }

  private _onSizerUp() {
    let { columns, onColumnIsSizingChanged } = this.props;
    let { columnResizeDetails } = this.state;

    this.setState({
      columnResizeDetails: null
    });

     if (onColumnIsSizingChanged) {
       onColumnIsSizingChanged(columns[columnResizeDetails.columnIndex], false);
     }
  }

  private _handleSelectAllClick() {
    let { isAllSelected, onIsAllSelectedChanged } = this.props;

    if (onIsAllSelectedChanged) {
      onIsAllSelectedChanged(!isAllSelected);
    }
  }

  private _handleColumnClick(column) {
    let { onSort } = this.props;

    if (onSort && column.isSortable) {
      onSort(column);
    }
  }
}
