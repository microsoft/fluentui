/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  DetailsList,
  MarqueeSelection,
  Selection,
  TextField,
  Link
} from '../../../../index';
import { createListItems } from '../../../utilities/data';

let _items: any[];

export class DetailsListBasicExample extends React.Component<any, any> {
  private _selection: Selection;

  constructor() {
    super();

    _items = _items || createListItems(500);
    this._selection = new Selection();

    this.state = { filterText: '' };
    this._onRenderItemColumn = this._onRenderItemColumn.bind(this);
  }

  public render() {
    let { filterText } = this.state;
    let items = this.state.filterText ? _items.filter(i => i.name.toLowerCase().indexOf(filterText) > -1) : _items;

    return (
      <div>
        <TextField
          label='Filter by name:'
          onChanged={ text => this.setState({ filterText: text }) }
          />
        <MarqueeSelection selection={ this._selection }>
          <DetailsList
            items={ items }
            initialFocusedIndex={ 0 }
            setKey='set'
            selection={ this._selection }
            onItemInvoked={ (item) => alert(`Item invoked: ${item.name}`) }
            onRenderItemColumn={ this._onRenderItemColumn }
            />
        </MarqueeSelection>
      </div>
    );
  }

  private _onRenderItemColumn(item, index, column) {
    if (column.key === 'name') {
      return <Link data-selection-invoke={ true }>{ item[column.key] }</Link>;
    }

    return item[column.key];
  }
}

