import * as React from 'react';
import IColumn from './IColumn';
import { ISelection, SelectionMode } from '../../utilities/selection/ISelection';
import Check from './Check';
import { getResourceUrl } from '../../utilities/resources';
import { shallowCompare } from '../../utilities/object';
import { css } from '../../utilities/css';
import './DetailsRow.scss';

export interface IDetailsRowProps {
  item: any;
  itemIndex: number;
  columns: IColumn[];
  selectionMode: SelectionMode;
  isSelected: boolean;
  isFocused: boolean;
  isFocusable: boolean;
  onSelectionChanged?: (item: any, isSelected: boolean) => void;
}

export default class DetailsRow extends React.Component<IDetailsRowProps, any> {
  public refs: {
    [key: string]: React.ReactInstance,
    root: HTMLElement
  }
  constructor() {
    super();
    this._onSelectClick = this._onSelectClick.bind(this);
  }

  public shouldComponentUpdate(nextProps): boolean {
    return !shallowCompare(this.props, nextProps);
  }

  public componentDidMount() {
    if (this.props.isFocused) {
      this.setFocus();
    }
  }

  public setFocus() {
    setTimeout(()=> {
      if (this.props.isFocused && this.refs.root) {
        this.refs.root.focus();
      }
    }, 0);
  }

  public componentWillReceiveProps(newProps) {
    if (!this.props.isFocused && newProps.isFocused && newProps.isFocusable) {
      this.setFocus();
    }
  }

  public render() {
    let { selectionMode, columns, item, itemIndex, isSelected, isFocused, isFocusable, onSelectionChanged } = this.props;

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

  private _onSelectClick() {
    let { item, onSelectionChanged } = this.props;

    if (onSelectionChanged) {
      onSelectionChanged(item, !this.props.isSelected);
    }
  }

}
