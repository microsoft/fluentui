import * as React from 'react';
import {
  List
} from '../../../../components/index';
import { createListItems } from '../../../utilities/data';
import './List.Basic.Example.scss';

let _cachedData;

export default class ListBasicExample extends React.Component<any, any> {
  constructor() {
    super();

    _cachedData = _cachedData || createListItems(30);
  }

  public render() {
    return (
      <List
        items={ _cachedData }
        onRenderCell={ (item, index) => (
          <div className='ms-ListBasicExample-itemCell'>
            <div className='ms-ListBasicExample-itemName ms-font-xl'>{ item.name }</div>
            <div className='ms-ListBasicExample-itemDesc ms-font-s'>{ item.description }</div>
          </div>
        ) }
      />
    );
  }
}
