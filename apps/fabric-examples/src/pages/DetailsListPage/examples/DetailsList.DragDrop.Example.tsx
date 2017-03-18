/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import {IDetailsRowProps, DetailsRow } from 'office-ui-fabric-react/lib/DetailsList';
import {
  IDragDropHelper,
  IDragDropEvents,
  IDragDropOptions,
  IDragDropContext
} from 'office-ui-fabric-react/lib/utilities/dragdrop/interfaces';
import { createListItems } from '@uifabric/example-app-base';

let _items: any[];
let _draggedItem: any = null;

export class DetailsListDragDropExample extends React.Component<any, any> {
  constructor() {
    super();

    _items = _items || createListItems(10);

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
            setKey='items'
            items={ items }
            selectionPreservedOnEmptyClick={ true }
            onItemInvoked={ (item) => {this._deleteItem(item);alert(`Item invoked: ${item.name}`);} }
            onRenderItemColumn={ this._onRenderItemColumn }
            dragDropEvents = {this._getDragDropEvents() }
          />
      </div>
    );
  }

  private _getDragDropEvents(): IDragDropEvents {
    return {
      canDrop: (dropContext?: IDragDropContext, dragContext?: IDragDropContext) => { return true; },
      canDrag: (item?: any) => { return true; },
      onDragEnter: (item?: any, event?: DragEvent) => { return ''; }, // return string is the css classes that will be added to the enterring element.
      onDragLeave: (item?: any, event?: DragEvent) => { return; },
      onDrop: (item?: any, event?: DragEvent) => {
        if (_draggedItem) {
          this._insertBeforeItem(item);
          console.log(_items);
        }
      },
      onDragStart: (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent) => {
        _draggedItem = item;
        console.log('ondragstart');
      },
      onDragEnd: (item?: any, event?: DragEvent) => {
        _draggedItem = null;
        console.log(' drag end');
      },
    };
  }

  private _onRenderItemColumn(item, index, column) {
    if (column.key === 'name') {
      return <Link data-selection-invoke={ true }>{ item[column.key] }</Link>;
    }

    return item[column.key];
  }

  private _deleteItem(item) {
    let index = _items.indexOf(item);
    this.setState({items: this.state.items.filter((i)=>i !== item)});
  }

  private _insertBeforeItem(item) {
    let index = _items.indexOf(item);

    let items = this.state.items.filter((i)=>i !== _draggedItem);
    //let items = this.state.items.slice(0,index).concat([item]).concat(this.state.items.slice(index));
    this.setState({items: items});
  }
}
