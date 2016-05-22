import * as React from 'react';
import {
  Fabric,
  TextField,
  List
} from '../../../../index';
import { createListItems } from '../../../utilities/data';
import './List.Basic.Example.scss';

export interface IListBasicExampleState {
  items?: any[];
  filterText?: string;
}

export class ListBasicExample extends React.Component<any, any> {
  constructor() {
    super();

    this._onFilterChanged = this._onFilterChanged.bind(this);

    this.state = {
      filterText: '',
      items: createListItems(5000)
    };
  }

  public render() {
    let { filterText, items } = this.state;
    let filteredItems = filterText ?
      items.filter(item => item.name.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) :
      items;
    let resultCountText = filteredItems.length === items.length ? '' : ` (${ filteredItems.length } of ${ items.length } shown)`;

    return (
      <div>
        <TextField label={ 'Filter by name' + resultCountText } onChanged={ this._onFilterChanged } />
        <Fabric>
          <List
            items={ filteredItems }
            onRenderCell={ (item, index) => (
              <div className='ms-ListBasicExample-itemCell'>
                <div className='ms-ListBasicExample-itemName ms-font-xl'>{ item.name }</div>
                <div className='ms-ListBasicExample-itemDesc ms-font-s'>{ item.description }</div>
              </div>
            ) }
          />
        </Fabric>
      </div>
    );
  }

  private _onFilterChanged(text: string) {
    this.setState({
      filterText: text
    });
  }
}
