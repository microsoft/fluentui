import * as React from 'react';
import IColumn from './IColumn';
import { css } from '../../utilities/css';
import { getResourceUrl } from '../../utilities/resources';
import { FocusZone, FocusZoneDirection } from '../../utilities/focus/index';
import { ISelection, SelectionMode, SELECTION_CHANGE } from '../../utilities/selection/ISelection';
import DetailsListLayoutMode from './DetailsListLayoutMode';
import Check from './Check';
import './DetailsHeader.scss';
import EventGroup from '../../utilities/eventGroup/EventGroup';

export interface IDetailsHeaderProps {
  columns: IColumn[];
  selection: ISelection;
  selectionMode: SelectionMode;
  layoutMode: DetailsListLayoutMode;
  onSort?: (column: IColumn) => void;
  onColumnIsSizingChanged?: (column: IColumn, isSizing: boolean) => void;
  onColumnResized?: (column: IColumn, newWidth: number) => void;

  ref?: string;
}

export interface IDetailsHeaderState {
  columnResizeDetails?: IColumnResizeDetails;
  isAllSelected?: boolean;
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



export default class DetailsHeader extends React.Component<IDetailsHeaderProps, IDetailsHeaderState> {
  private _events: EventGroup;

  constructor() {
    super();

    this._events = new EventGroup(this);

    this.state = {
      columnResizeDetails: null
    };

    this._onSizerMove = this._onSizerMove.bind(this);
    this._onSizerUp = this._onSizerUp.bind(this);
  }

  public componentWillReceiveProps(newProps) {
  }

  public componentDidMount() {
    let { selection } = this.props;

    this._events.on(selection, SELECTION_CHANGE, this._onSelectionChanged);
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public render() {
    let { selectionMode, layoutMode, columns, onSort } = this.props;
    let { isAllSelected } = this.state;
    let { columnResizeDetails } = this.state;

    return (
      <div
        className={ css('ms-DetailsHeader ms-font-s', {
          'is-allSelected': isAllSelected,
          'is-singleSelect': selectionMode === SelectionMode.single,
          'is-resizingColumn': !!columnResizeDetails
        }) } ref='root'>
        <FocusZone direction={ FocusZoneDirection.horizontal }>
          { (selectionMode === SelectionMode.multiple) ? (
          <button
            className='ms-DetailsHeader-cell is-check'
            data-selection-all-toggle='true'
          >
            <Check isChecked={ isAllSelected } />
          </button>
          ) : (null) }
          { columns.map((column, columnIndex) => (
          <div key={ column.key } className='ms-DetailsHeader-cellSizeWrapper'>
            <div className='ms-DetailsHeader-cellWrapper'>
              <button
                key={ column.fieldName }
                disabled={ !column.isSortable }
                className={ css('ms-DetailsHeader-cell', {
                  'is-sortable': column.isSortable,
                  'is-sorted': column.isSorted,
                  'is-sortedDescending': column.isSortedDescending
                }) }
                style={ { width: column.calculatedWidth } }
                onClick={ (ev) => (onSort ? onSort(column) : null) }
              >
                <span className="ms-DetailsHeader-sortArrow ms-Icon ms-Icon--arrowUp2" />
                { column.name }
                { column.isFilterable ? (
                  <i className='ms-DetailsHeader-filterChevron ms-Icon ms-Icon--chevronDown' />
                ) : (null)}
              </button>
            </div>
            { (column.isResizable) ? (
            <button
              className={ css('ms-DetailsHeader-cell is-sizer', {
                'is-resizing': columnResizeDetails && columnResizeDetails.columnIndex === columnIndex
              }) }
              onMouseDown={ this._onSizerDown.bind(this, columnIndex) }
            />
            ) : (null) }
          </div>
          ))}
        </FocusZone>
        <div className='ms-DetailsHeader-sizerCover' onMouseMove={ this._onSizerMove } onMouseUp={ this._onSizerUp } />
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


  private _onSelectionChanged() {
    let isAllSelected = this.props.selection.isAllSelected();

    if (this.state.isAllSelected !== isAllSelected) {
      this.setState({
        isAllSelected: isAllSelected
      });
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

  private _handleColumnClick(column) {
    let { onSort } = this.props;

    if (onSort && column.isSortable) {
      onSort(column);
    }
  }
}
