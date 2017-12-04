/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DetailsList } from 'office-ui-fabric-react/lib/DetailsList';

let _columns = [
  {
    key: 'name',
    name: 'Name',
    fieldName: 'name',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  },
  {
    key: 'color',
    name: 'Color',
    fieldName: 'color',
    minWidth: 100,
    maxWidth: 200
  }
];
let _items = [
  {
    key: 'a',
    name: 'a',
    color: 'red'
  },
  {
    key: 'b',
    name: 'b',
    color: 'red'
  },
  {
    key: 'c',
    name: 'c',
    color: 'blue'
  },
  {
    key: 'd',
    name: 'd',
    color: 'blue'
  },
  {
    key: 'e',
    name: 'e',
    color: 'blue'
  }
];

export class DetailsListGroupedExample extends React.Component<any, any> {
  constructor() {
    super();

    this.state = {
      items: _items
    };
  }

  public render() {
    let { items } = this.state;

    return (
      <Fabric className='foo'>
        <DefaultButton
          onClick={ this._addItem }
          text='Add an item'
        />
        <DetailsList
          items={ items }
          groups={ [
            {
              key: 'groupred0',
              name: 'By "red"',
              startIndex: 0,
              count: 2
            },
            {
              key: 'groupgreen2',
              name: 'By "green"',
              startIndex: 2,
              count: 0
            },
            {
              key: 'groupblue2',
              name: 'By "blue"',
              startIndex: 2,
              count: 3
            }
          ] }
          columns={ _columns }
          ariaLabelForSelectAllCheckbox='Toggle selection for all items'
          ariaLabelForSelectionColumn='Toggle selection'
          groupProps={ {
            showEmptyGroups: true
          } }
        />
      </Fabric>
    );
  }

  private _addItem() {
    let items = this.state.items;

    this.setState({
      items: items.concat([{
        key: 'item-' + items.length,
        name: 'New item ' + items.length,
        color: 'blue'
      }])
    });
  }

}
