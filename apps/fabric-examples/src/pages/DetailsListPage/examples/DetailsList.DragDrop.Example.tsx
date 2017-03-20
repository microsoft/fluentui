/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import { IDetailsRowProps, DetailsRow } from 'office-ui-fabric-react/lib/DetailsList';
import {
  IDragDropHelper,
  IDragDropEvents,
  IDragDropOptions,
  IDragDropContext
} from 'office-ui-fabric-react/lib/utilities/dragdrop/interfaces';
import { createListItems } from '@uifabric/example-app-base';
import './DetailsList.DragDrop.Example.scss';

let _draggedItem: any = null;
let _draggedIndex: number = -1;

export class DetailsListDragDropExample extends React.Component<any, any> {
  constructor() {
    super();

    this._onRenderItemColumn = this._onRenderItemColumn.bind(this);

    this.state = {
      items: createListItems(10)
    };
  }

  public render() {
    let { items, selectionDetails } = this.state;

    return (
      <div className='ms-DetailsListDragDropExample'>
        <div>{ selectionDetails }</div>
        <DetailsList
          setKey='items'
          items={ items }
          selectionPreservedOnEmptyClick={ true }
          onItemInvoked={ (item) => { alert(`Item invoked: ${item.name}`); } }
          onRenderItemColumn={ this._onRenderItemColumn }
          dragDropEvents={ this._getDragDropEvents() }
        />
      </div>
    );
  }

  private _getDragDropEvents(): IDragDropEvents {
    return {
      canDrop: (dropContext?: IDragDropContext, dragContext?: IDragDropContext) => { return true; },
      canDrag: (item?: any) => { return true; },
      onDragEnter: (item?: any, event?: DragEvent) => { return 'drag-enter'; }, // return string is the css classes that will be added to the enterring element.
      onDragLeave: (item?: any, event?: DragEvent) => { return; },
      onDrop: (item?: any, event?: DragEvent) => {
        if (_draggedItem) {
          this._insertBeforeItem(item);
        }
      },
      onDragStart: (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent) => {
        _draggedItem = item;
        _draggedIndex = itemIndex;
      },
      onDragEnd: (item?: any, event?: DragEvent) => {
        _draggedItem = null;
        _draggedIndex = -1;
      },
    };
  }

  private _onRenderItemColumn(item, index, column) {
    if (column.key === 'name') {
      return <Link data-selection-invoke={ true }>{ item[column.key] }</Link>;
    }

    return item[column.key];
  }

  private _insertBeforeItem(item) {
    let index = this.state.items.indexOf(item);
    let items = this.state.items.filter((i) => i !== _draggedItem);

    if (_draggedIndex < index) {
      index = index - 1;
    }
    items.splice(index, 0, _draggedItem);

    this.setState({ items: items });
  }
}
