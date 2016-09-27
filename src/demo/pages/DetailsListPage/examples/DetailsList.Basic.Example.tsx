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

    this._onRenderItemColumn = this._onRenderItemColumn.bind(this);
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

  private _getSelectionDetails(): string {
    let selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as any).name;
      default:
        return `${ selectionCount } items selected`;
    }
  }
}
