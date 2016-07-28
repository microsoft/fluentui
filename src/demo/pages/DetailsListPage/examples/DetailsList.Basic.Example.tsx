/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  DetailsList,
  TextField
} from '../../../../index';
import { createListItems } from '../../../utilities/data';

let _items: any[];

export class DetailsListBasicExample extends React.Component<any, any> {
  constructor() {
    super();

    _items = _items || createListItems(500);
    this.state = { filterText: '' };
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
        <DetailsList items={ items } shouldApplyApplicationRole= { true } setKey='set' />
      </div>
    );
  }

}

