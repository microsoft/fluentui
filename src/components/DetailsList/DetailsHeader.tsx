import * as React from 'react';
import { IColumn, DetailsListLayoutMode } from './interfaces';
import { css } from '../../utilities/css';
import { FocusZone, FocusZoneDirection } from '../../utilities/focus/index';
import { ISelection, SelectionMode, SELECTION_CHANGE } from '../../utilities/selection/ISelection';
import Check from './Check';
import './DetailsHeader.scss';
import EventGroup from '../../utilities/eventGroup/EventGroup';

const MOUSEDOWN_PRIMARY_BUTTON = 0; // for mouse down event we are using ev.button property, 0 means left button
const MOUSEMOVE_PRIMARY_BUTTON = 1; // for mouse move event we are using ev.buttons property, 1 means left button

export interface IDetailsHeaderProps {
  columns: IColumn[];
  selection: ISelection;
  selectionMode: SelectionMode;
  layoutMode: DetailsListLayoutMode;
  onColumnIsSizingChanged?: (column: IColumn, isSizing: boolean) => void;
  onColumnResized?: (column: IColumn, newWidth: number) => void;
  onColumnAutoResized?: (column: IColumn, columnIndex: number) => void;

  ref?: string;
}

export interface IDetailsHeaderState {
  columnResizeDetails?: IColumnResizeDetails;
  isAllSelected?: boolean;
  isSizing?: boolean;
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

  public componentDidMount() {
    let { selection } = this.props;

    this._events.on(selection, SELECTION_CHANGE, this._onSelectionChanged);
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public render() {
    let { selectionMode, columns } = this.props;
    let { isAllSelected, columnResizeDetails, isSizing } = this.state;

    return (
      <div
        className={ css('ms-DetailsHeader ms-font-s', {
          'is-allSelected': isAllSelected,
          'is-singleSelect': selectionMode === SelectionMode.single,
          'is-resizingColumn': !!columnResizeDetails && isSizing
            }) }
        onMouseMove={ this._onMove.bind(this) }
        onMouseUp={ this._onUp.bind(this) }
        ref='root'>
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
                  'is-sorted': column.isSorted
                }) }
                style={ { width: column.calculatedWidth } }
                onClick={ this._onColumnClick.bind(this, column) }
              >
                <span
                  className={ css('ms-DetailsHeader-sortArrow ms-Icon', {
                    'ms-Icon--arrowUp2': !column.isSortedDescending,
                    'ms-Icon--arrowDown2': column.isSortedDescending
                  }) }
                />
                { column.name }
                { column.isFilterable ? (
                  <i className='ms-DetailsHeader-filterChevron ms-Icon ms-Icon--chevronDown' />
                ) : (null)}
              </button>
            </div>
            { (column.isResizable) ? (
            <div
              className={ css('ms-DetailsHeader-cell is-sizer', {
                'is-resizing': columnResizeDetails && columnResizeDetails.columnIndex === columnIndex && isSizing
              }) }
              onMouseDown={ this._onSizerDown.bind(this, columnIndex) }
              onDoubleClick={ this._onSizerDoubleClick.bind(this, columnIndex) }
            />
            ) : (null) }
          </div>
          ))}
        </FocusZone>
        <div className='ms-DetailsHeader-sizerCover' onMouseMove={ this._onSizerMove } onMouseUp={ this._onSizerUp } />
      </div>
    );
  }

  /**
   * double click on the column sizer will auto ajust column width
   * to fit the longest content among current rendered rows.
   *
   * @private
   * @param {number} columnIndex (index of the column user double clicked)
   * @param {React.MouseEvent} ev (mouse double click event)
   */
  private _onSizerDoubleClick(columnIndex: number, ev: React.MouseEvent) {
    let { onColumnAutoResized, columns } = this.props;
    if (onColumnAutoResized) {
      onColumnAutoResized(columns[columnIndex], columnIndex);
    }
  }

  /**
   * mouse move event handler in the header
   * it will set isSizing state to true when user clicked on the sizer and move the mouse.
   *
   * @private
   * @param {React.MouseEvent} ev (mouse move event)
   */
  private _onMove(ev: React.MouseEvent) {
    let {
      // use buttons property here since ev.button in some edge case is not upding well during the move.
      // but firefox doesn't support it, so we set the default value when it is not defined.
      buttons = MOUSEMOVE_PRIMARY_BUTTON
    } = ev;

    if (buttons !== MOUSEMOVE_PRIMARY_BUTTON) {
      // cancel mouse down event and return early when the primary button is not pressed
      this._onUp(ev);
      return;
    }

    let { columnResizeDetails, isSizing } = this.state;

    if (columnResizeDetails && !isSizing && ev.clientX !== columnResizeDetails.originX) {
      isSizing = true;
      this.setState({ isSizing: isSizing });
    }
  }

  /**
   * mouse up event handler in the header
   * clear the resize related state.
   * This is to ensure we can catch double click event
   *
   * @private
   * @param {React.MouseEvent} ev (mouse up event)
   */
  private _onUp(ev: React.MouseEvent) {
    this.setState({
      columnResizeDetails: null,
      isSizing: false
    });
  }

  private _onSizerDown(columnIndex: number, ev: React.MouseEvent) {
    if (ev.button !== MOUSEDOWN_PRIMARY_BUTTON) {
      // Ignore anything except the primary button.
      return;
    }

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
    let {
      // use buttons property here since ev.button in some edge case is not upding well during the move.
      // but firefox doesn't support it, so we set the default value when it is not defined.
      buttons = MOUSEMOVE_PRIMARY_BUTTON
    } = ev;

    if (buttons !== MOUSEMOVE_PRIMARY_BUTTON) {
      // cancel mouse down event and return early when the primary button is not pressed
      this._onSizerUp();
      return;
    }

    let { onColumnResized, columns } = this.props;

    if (onColumnResized) {
      let { columnResizeDetails } = this.state;

      onColumnResized(
        columns[columnResizeDetails.columnIndex],
        columnResizeDetails.columnMinWidth + (ev.clientX - columnResizeDetails.originX)
      );
    }
  }

  private _onSizerUp() {
    let { columns, onColumnIsSizingChanged } = this.props;
    let { columnResizeDetails } = this.state;

    this.setState({
        columnResizeDetails: null,
        isSizing: false
    });

     if (onColumnIsSizingChanged) {
       onColumnIsSizingChanged(columns[columnResizeDetails.columnIndex], false);
     }
  }

  private _onColumnClick(column, ev) {
    if (column.onColumnClick) {
      column.onColumnClick(column, ev);
    }
  }

}
