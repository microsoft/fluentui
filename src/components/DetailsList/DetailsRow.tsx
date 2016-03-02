import * as React from 'react';
import IColumn from './IColumn';
import { ISelection, SelectionMode, SELECTION_CHANGE } from '../../utilities/selection/ISelection';
import Check from './Check';
import EventGroup from '../../utilities/eventGroup/EventGroup';
import { getResourceUrl } from '../../utilities/resources';
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
}

export interface IDetailsRowState {
  isSelected: boolean;
  isFocused: boolean;
  isFocusable: boolean;
}

export default class DetailsRow extends React.Component<IDetailsRowProps, IDetailsRowState> {
  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement
  }

  private _events: EventGroup;

  constructor(props) {
    super(props);


    this.state = this._getSelectionState(props);

    this._events = new EventGroup(this);
  }

  public componentDidMount() {
    this._events.on(this.props.selection, SELECTION_CHANGE, this._onSelectionChanged);

    this.setFocus();
  }

  public componentDidUpdate() {
    this.setFocus();
  }

  public componentWillUnmount() {
    this._events.dispose();
  }

  public setFocus() {
    let { shouldSetFocus, selection, item } = this.props;
    let isFocused = shouldSetFocus && selection.getFocusedKey() === item.key;

    if (isFocused && this.refs.root) {
      this.refs.root.focus();
    }
  }

  public componentWillReceiveProps(newProps) {
    this.setState(this._getSelectionState(newProps));
  }

  public render() {
    let { selection, selectionMode, columns, item, itemIndex, shouldSetFocus } = this.props;
    let { isSelected, isFocused, isFocusable } = this.state;

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
            { column.getCellContent ? column.getCellContent(item, itemIndex) : (String(item[column.fieldName]) || '') }
          </div>
          )) }
        </div>
    );
  }

  private _getSelectionState(props: IDetailsRowProps): IDetailsRowState {
    let { item, shouldSetFocus, selection } = props;

    return {
      isSelected: selection.isKeySelected(item.key),
      isFocused: shouldSetFocus && selection.getFocusedKey() === item.key,
      isFocusable: selection.getFocusedKey() === item.key
    };
  }

  private _onSelectionChanged() {
    let selectionState = this._getSelectionState(this.props);

    if (!shallowCompare(selectionState, this.state)) {
      this.setState(selectionState);
    }
  }

}
