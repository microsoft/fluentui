/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import {
  DetailsList,
  Selection
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { createListItems } from '@uifabric/example-app-base';

let _items: any[];

export class DetailsListBasicExample extends React.Component<any, any> {
  constructor() {
    super();

    _items = _items || createListItems(50);

    this._onRenderItemColumn = this._onRenderItemColumn.bind(this);

    this.state = {
      items: _items,
    };
  }

  public render() {
    let { items, selectionDetails } = this.state;

    return (
      <div>
        <div>{ selectionDetails }</div>
          <DetailsList
            items={ items }
            setKey='set'
            selectionPreservedOnEmptyClick={ true }
            onItemInvoked={ (item) => alert(`Item invoked: ${item.name}`) }
            onRenderItemColumn={ this._onRenderItemColumn }
          />
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
