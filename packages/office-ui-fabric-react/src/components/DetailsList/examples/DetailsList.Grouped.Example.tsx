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

function groupBy(items: any[], fieldName: string) {
  let groups = items.reduce((currentGroups, currentItem, index) => {
    let lastCurrentGroup = currentGroups[currentGroups.length - 1];
    let fieldValue = currentItem[fieldName];

    if (!lastCurrentGroup || lastCurrentGroup.value !== fieldValue) {
      currentGroups.push({
        key: 'group' + fieldValue + index,
        name: `By "${fieldValue}"`,
        value: fieldValue,
        startIndex: index,
        level: 0,
        count: 0
      });
    }
    if (lastCurrentGroup) {
      lastCurrentGroup.count = index - lastCurrentGroup.startIndex;
    }
    return currentGroups;
  }, []);

  // Fix last group count
  let lastGroup = groups[groups.length - 1];

  if (lastGroup) {
    lastGroup.count = items.length - lastGroup.startIndex;
  }

  return groups;
}

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
        <DefaultButton onClick={ () => this._addItem() } text='Add an item' />
        <DetailsList
          items={ items }
          groups={ groupBy(items, 'color') }
          columns={ _columns }
          ariaLabelForSelectAllCheckbox='Toggle selection for all items'
          ariaLabelForSelectionColumn='Toggle selection'
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
