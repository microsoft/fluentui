import * as React from 'react';
import { IColumn, IDragDropEvents } from './interfaces';
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
  eventsToRegister?: [{ eventName: string, callback: (item?: any, index?: number, event?: any) => void }];
  onWillUnmount?: (row?: DetailsRow) => void;
  onDidMount?: (row?: DetailsRow) => void;
  dragDropEvents?: IDragDropEvents;
  isGrouped?: boolean;
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
  isDropping?: boolean;
  isGrouped?: boolean;
}

const DEFAULT_DROPPING_CSS_CLASS = 'is-dropping';

export default class DetailsRow extends React.Component<IDetailsRowProps, IDetailsRowState> {
  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement,
    cellMeasurer: HTMLElement
  };

  private _events: EventGroup;
  private _dragEnterCount: number;
  private _droppingCssClasses: string;

  constructor(props) {
    super(props);

    this.state = {
      selectionState: this._getSelectionState(props),
      columnMeasureInfo: null,
      isDropping: false,
      isGrouped: props.isGrouped
    };

    this._events = new EventGroup(this);
    this._dragEnterCount = 0;
    this._droppingCssClasses = '';
  }

  public componentDidMount() {
    let { eventsToRegister, itemIndex, item, dragDropEvents } = this.props;

    if (dragDropEvents && dragDropEvents.canDrop && dragDropEvents.canDrop(item)) {
      // dragenter and dragleave will be fired when hover to the child element
      // but we only want to change state when enter or leave the current element
      // use the count to ensure it.
      this._events.on(this.refs.root, 'dragenter', (event: DragEvent) => {
        event.preventDefault(); // needed for IE
        this._dragEnterCount++;
        if (this._dragEnterCount === 1) {
          this._updateDroppingState(true, event);
        }
      });

      this._events.on(this.refs.root, 'dragleave', (event: DragEvent) => {
        this._dragEnterCount--;
        if (this._dragEnterCount === 0) {
          this._updateDroppingState(false, event);
        }
      });

      this._events.on(this.refs.root, 'dragend', (event: DragEvent) => {
        this._updateDroppingState(false, event);
      });

      this._events.on(this.refs.root, 'drop', (event: DragEvent) => {
        this._updateDroppingState(false, event);
      });
    }

    if (eventsToRegister) {
      for (let event of eventsToRegister) {
        this._events.on(this.refs.root, event.eventName, event.callback.bind(null, item, itemIndex));
      }
    }

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
      selectionState: this._getSelectionState(newProps),
      isGrouped: newProps.isGrouped
    });
  }

  public render() {
    let { selectionMode, columns, item, itemIndex, dragDropEvents } = this.props;
    let { selectionState: { isSelected, isFocusable }, columnMeasureInfo, isDropping, isGrouped } = this.state;
    let isDraggable = Boolean(dragDropEvents && dragDropEvents.canDrag && dragDropEvents.canDrag(item));
    let droppingClassName = isDropping ? (this._droppingCssClasses ? this._droppingCssClasses : DEFAULT_DROPPING_CSS_CLASS) : '';

    return (
      <div
        ref='root'
        className={ css('ms-DetailsRow ms-font-s', droppingClassName, {
          'is-selected': isSelected
        }) }
        data-selection-key={ item.key }
        data-is-draggable={ isDraggable }
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
        { isGrouped ? (
          <span className='ms-DetailsRow-collapseGroupSpacer'>
          </span>
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

  /**
   * update isDropping state based on the input value, which is used to change style during drag and drop
   *
   * when change to true, that means drag enter. we will add default dropping class name
   * or the custom dropping class name (return result from onDragEnter) to the root elemet.
   *
   * when change to false, that means drag leave. we will remove the dropping class name from root element.
   *
   * @private
   * @param {boolean} newValue (new isDropping state value)
   * @param {DragEvent} event (the event trigger dropping state change which can be dragenter, dragleave etc)
   */
  private _updateDroppingState(newValue: boolean, event: DragEvent) {
    let { selectionState, isDropping } = this.state;
    let { dragDropEvents, item } = this.props;

    if (!newValue) {
      this._dragEnterCount = 0; // reset drag enter counter
      if (dragDropEvents.onDragLeave) {
        dragDropEvents.onDragLeave(event, item);
      }
    } else {
      if (dragDropEvents.onDragEnter) {
        this._droppingCssClasses = dragDropEvents.onDragEnter(event, item);
      }
    }

    if (isDropping !== newValue) {
      this.setState({ selectionState: selectionState, isDropping: newValue });
    }
  }
}
