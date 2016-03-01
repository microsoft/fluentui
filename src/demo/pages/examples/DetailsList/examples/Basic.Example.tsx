import * as React from 'react';

import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  Link,
  Dropdown
} from '../../../../../components/index';

import { createListItems } from './data';
import './Basic.Example.scss';

let _items;

export default class ScrollableDivExample extends React.Component<any, any> {
  constructor() {;
    super();

    if (!_items) {
      _items = createListItems(10000);
    }

    this._onLayoutChanged = this._onLayoutChanged.bind(this);
    this._onSelectionChanged = this._onSelectionChanged.bind(this);

    this.state = {
      layoutMode: DetailsListLayoutMode.justified,
      selectionMode: SelectionMode.multiple
    };
  }

  public render() {
    let { layoutMode, selectionMode } = this.state;

    return (
      <div className='ScrollableDivExample'>
        <div className='ScrollableDivExample-configPanel'>
          <Dropdown label='Layout mode' onChange={ this._onLayoutChanged } options={
            Object.keys(DetailsListLayoutMode)
              .filter(key => !isNaN(Number(key)))
              .map(propName => (
                { key: propName, text: DetailsListLayoutMode[propName], isSelected: layoutMode === Number(propName) }
              ))
          } />
          <Dropdown label='Selection mode' onChange={ this._onSelectionChanged } options={
            Object.keys(SelectionMode)
              .filter(key => !isNaN(Number(key)))
              .map(propName => (
                { key: propName, text: SelectionMode[propName], isSelected: selectionMode === Number(propName)  }
              ))
          } />
        </div>
        <DetailsList
          items={ _items }
          layoutMode={ layoutMode }
          selectionMode={ selectionMode }
        />
      </div>
    );
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

}

