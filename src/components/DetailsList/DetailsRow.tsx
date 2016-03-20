import * as React from 'react';
import IColumn from './IColumn';
import { ISelection, SelectionMode, SELECTION_CHANGE } from '../../utilities/selection/ISelection';
import Check from './Check';
import EventGroup from '../../utilities/eventGroup/EventGroup';
import { shallowCompare } from '../../utilities/object';
import { css } from '../../utilities/css';
import './DetailsRow.scss';

export interface IDetailsRowProps {
  item: any;
  itemIndex: number;
  columns: IColumn[];
  selectionMode: SelectionMode;
  selection: ISelection;
  shouldSetFocus?: boolean;
  onWillUnmount?: any;
  onDidMount?: any;
}
export interface IDetailsRowSelectionState {
  isSelected: boolean;
  isFocused: boolean;
  isFocusable: boolean;
}

export interface IDetailsRowState {
  selectionState: IDetailsRowSelectionState;
  columnMeasureInfo?: {
    index: number;
    onMeasureDone: (measuredWidth: number) => void;
  };
}

export default class DetailsRow extends React.Component<IDetailsRowProps, IDetailsRowState> {
  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement,
    cellMeasurer: HTMLElement
  };

  private _events: EventGroup;

  constructor(props) {
    super(props);

    this.state = {
      selectionState: this._getSelectionState(props),
      columnMeasureInfo: null
    };

    this._events = new EventGroup(this);
  }

  public componentDidMount() {
    this._events.on(this.props.selection, SELECTION_CHANGE, this._onSelectionChanged);

    if (this.props.onDidMount) {
      this.props.onDidMount(this);
    }

    this.setFocus();
  }

  public componentDidUpdate() {
    let state = this.state;
    let { columnMeasureInfo } = state;
    if (columnMeasureInfo) {
      let { columns } = this.props;
      this.refs.cellMeasurer.innerHTML = this._getCellContent(columns[columnMeasureInfo.index], columnMeasureInfo.index);
      let newWidth = this.refs.cellMeasurer.getBoundingClientRect().width;
      columnMeasureInfo.onMeasureDone(newWidth);

      state.columnMeasureInfo = null;
      this.setState(state);
    }
    this.setFocus();
  }

  public componentWillUnmount() {
    this._events.dispose();

    if (this.props.onWillUnmount) {
      this.props.onWillUnmount(this);
    }
  }

  public setFocus() {
    let { shouldSetFocus, selection, item } = this.props;
    let isFocused = shouldSetFocus && selection.getFocusedKey() === item.key;

    if (isFocused && this.refs.root) {
      this.refs.root.focus();
    }
  }

  public componentWillReceiveProps(newProps) {
    this.setState({
      selectionState: this._getSelectionState(newProps)
    });
  }

  public render() {
    let { selectionMode, columns, item, itemIndex } = this.props;
    let { selectionState: { isSelected, isFocusable }, columnMeasureInfo } = this.state;

    return (
      <div
        ref='root'
        className={ css('ms-DetailsRow ms-font-s', {
          'is-selected': isSelected
        }) }
        data-selection-key={ item.key }
        tabIndex={ isFocusable ? 0 : -1 }
        >
        <div className='ms-DetailsRow-focusBox' />
        { (selectionMode !== SelectionMode.none) ? (
          <button
            tabIndex={ -1 }
            className='ms-DetailsRow-check'
            data-selection-toggle={ true }
            >
            <Check isChecked={ isSelected } />
          </button>
        ) : null }
        { columns.map(column => (
          <div key={ column.key } className={ css('ms-DetailsRow-cell', {
            'is-clipped': column.isClipped
          }) } style={ { width: column.calculatedWidth } }>
            { this._getCellContent(column, itemIndex) }
          </div>
        )) }
        { (columnMeasureInfo) ? (
          <span className='ms-DetailsRow-cellMeasurer ms-DetailsRow-cell' ref='cellMeasurer'/>
        ) : (null) }
      </div>
    );
  }

  /**
   * measure cell at index. and call the call back with the measured cell width when finish measure
   *
   * @param {number} index (the cell index)
   * @param {(width: number) => void} onMeasureDone (the call back function when finish measure)
   */
  public measureCell(index: number, onMeasureDone: (width: number) => void) {
    let state = this.state;
    state.columnMeasureInfo = { index: index, onMeasureDone: onMeasureDone };
    this.setState(state);
  }

  private _getCellContent(column: IColumn, index: number): any {
    let { item } = this.props;
    let cellContent;

    try {
      cellContent = column.getCellContent ? column.getCellContent(item, index) : (String(item[column.fieldName]) || '');
    } catch (e) {
      cellContent = `{ Exception: ${e.message}}`;
    }

    return cellContent;
  }

  private _getSelectionState(props: IDetailsRowProps): IDetailsRowSelectionState {
    let { item, shouldSetFocus, selection } = props;

    return {
      isSelected: selection.isKeySelected(item.key),
      isFocused: shouldSetFocus && selection.getFocusedKey() === item.key,
      isFocusable: selection.getFocusedKey() === item.key
    };
  }

  private _onSelectionChanged() {
    let selectionState = this._getSelectionState(this.props);

    if (!shallowCompare(selectionState, this.state.selectionState)) {
      this.setState({
        selectionState: selectionState
      });
    }
  }

}
