import * as React from 'react';
import {
  IColumn,
  DetailsList,
  buildColumns,
  DetailsListLayoutMode,
  SelectionMode,
  Dropdown,
  Checkbox
} from '../../../../components/index';
import { createListItems } from '../../../utilities/data';
import './DetailsList.Basic.Example.scss';

let _items;

export interface IDetailsListBasicExampleState {
  layoutMode?: DetailsListLayoutMode;
  selectionMode?: SelectionMode;
  canResizeColumns?: boolean;
  columns?: IColumn[];
}

export default class DetailsListBasicExample extends React.Component<any, IDetailsListBasicExampleState> {
  constructor() {;
    super();

    if (!_items) {
      _items = createListItems(10000);
    }

    this._onResizeChanged = this._onResizeChanged.bind(this);
    this._onLayoutChanged = this._onLayoutChanged.bind(this);
    this._onSelectionChanged = this._onSelectionChanged.bind(this);

    this.state = {
      layoutMode: DetailsListLayoutMode.justified,
      selectionMode: SelectionMode.multiple,
      canResizeColumns: false,
      columns: this._getColumns(_items, false)
    };
  }

  public render() {
    let { layoutMode, selectionMode, canResizeColumns, columns } = this.state;

    return (
      <div className='DetailsListBasicExample'>
        <div className='DetailsListBasicExample-configPane'>
          <Dropdown label='Layout mode' onChanged={ this._onLayoutChanged } options={
            Object.keys(DetailsListLayoutMode)
              .filter(key => !isNaN(Number(key)))
              .map(propName => (
                { key: propName, text: DetailsListLayoutMode[propName], isSelected: layoutMode === Number(propName) }
              ))
          } />
          <Dropdown label='Selection mode' onChanged={ this._onSelectionChanged } options={
            Object.keys(SelectionMode)
              .filter(key => !isNaN(Number(key)))
              .map(propName => (
                { key: propName, text: SelectionMode[propName], isSelected: selectionMode === Number(propName)  }
              ))
          } />
        </div>

        <div className='DetailsListBasicExample-configPane'>
          <Checkbox text='Allow column resizing' isChecked={ canResizeColumns } onChanged={ this._onResizeChanged } />
        </div>

        <DetailsList
          items={ _items }
          columns={ columns }
          layoutMode={ layoutMode }
          selectionMode={ selectionMode }
        />
      </div>
    );
  }

  private _onResizeChanged(isChecked) {
    this.setState({
      canResizeColumns: isChecked,
      columns: this._getColumns(_items, isChecked)
    });
  }

  private _onLayoutChanged(option) {
    this.setState({
      layoutMode: Number(option.key)
    });
  }

  private _onSelectionChanged(option) {
    this.setState({
      selectionMode: Number(option.key)
    });
  }

  private _getColumns(items: any[], canResizeColumns: boolean) {
    let columns = buildColumns(items);

    columns.forEach(column => column.isResizable = canResizeColumns);

    return columns;
  }

}

