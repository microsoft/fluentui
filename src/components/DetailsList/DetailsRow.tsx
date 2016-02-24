import * as React from 'react';
import IColumn from './IColumn';
import { ISelection, SelectionMode } from '../../utilities/selection/ISelection';
import './DetailsRow.scss';
import { getResourceUrl } from '../../utilities/resources';
import { shallowCompare } from '../../utilities/object';

export interface IDetailsRowProps {
  item: any;
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
    let { selectionMode, columns, item, isSelected, isFocused, isFocusable, onSelectionChanged } = this.props;

    let cells = columns.map(column => (
        <div key={ column.key } className='DetailsRow-cell' style={ { width: column.calculatedWidth } }>
          { column.getCellContent ? column.getCellContent(item) : (String(item[column.fieldName]) || '') }
        </div>
    ));

    let rootClass =  'DetailsRow' +
      (isSelected ? ' DetailsRow--isSelected' : '');

    return (
      <div
        ref='root'
        className={ rootClass }
        data-selection-key={ item.key }
        tabIndex={ isFocusable ? 0 : -1 }
      >
        <div className='DetailsRow-focusBox' />
          { (selectionMode !== SelectionMode.none) ? (
          <button
            tabIndex={ -1 }
            className='DetailsRow-check'
            data-selection-toggle={ true }
          >
            <div className='DetailsRow-checkClip'>
              <img className="DetailsRow-checkImage" src={ getResourceUrl('check.png') } />
            </div>
          </button>
          ) : null }
          { cells }
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
