/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';

let _items: {
  key: number,
  name: string,
  value: number
}[] = [];

let _columns = [
  {
    key: 'column1',
    name: 'Name',
    fieldName: 'name',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  },
  {
    key: 'column2',
    name: 'Value',
    fieldName: 'value',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  },
];

export class DetailsListCompactExample extends React.Component<any, any> {
  private _selection: Selection;

  constructor() {
    super();

    // Populate with items for demos.
    if (_items.length === 0) {
      for (let i = 0; i < 200; i++) {
        _items.push({
          key: i,
          name: 'Item ' + i,
          value: i
        });
      }
    }

    this._selection = new Selection({
      onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
    });

    this.state = {
      items: _items,
      selectionDetails: this._getSelectionDetails()
    };
  }

  public render() {
    let { items, selectionDetails } = this.state;

    return (
      <div>
        <div>{ selectionDetails }</div>
        <TextField
          label='Filter by name:'
          onChanged={ text => this.setState({ items: text ? _items.filter(i => i.name.toLowerCase().indexOf(text) > -1) : _items }) }
        />
        <MarqueeSelection selection={ this._selection }>
          <DetailsList
            items={ items }
            columns={ _columns }
            setKey='set'
            layoutMode={ DetailsListLayoutMode.fixedColumns }
            selection={ this._selection }
            selectionPreservedOnEmptyClick={ true }
            onItemInvoked={ (item) => alert(`Item invoked: ${item.name}`) }
            compact={ true }
          />
        </MarqueeSelection>
      </div>
    );
  }

  private _getSelectionDetails(): string {
    let selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as any).name;
      default:
        return `${selectionCount} items selected`;
    }
  }
}
