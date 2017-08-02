/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Link } from 'office-ui-fabric-react/lib/Link';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DetailsList, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { IDetailsRowProps, DetailsRow, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
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
  private _selection: Selection;

  constructor() {
    super();

    this._onRenderItemColumn = this._onRenderItemColumn.bind(this);

    this._selection = new Selection();

    this.state = {
      items: createListItems(10)
    };
  }

  public render() {
    let { items, selectionDetails } = this.state;

    return (
      <div className='detailsListDragDropExample'>
        <div>{ selectionDetails }</div>
        <MarqueeSelection selection={ this._selection }>
          <DetailsList
            setKey='items'
            items={ items }
            selection={ this._selection }
            selectionPreservedOnEmptyClick={ true }
            onItemInvoked={ (item) => { alert(`Item invoked: ${item.name}`); } }
            onRenderItemColumn={ this._onRenderItemColumn }
            dragDropEvents={ this._getDragDropEvents() }
          />
        </MarqueeSelection>
      </div>
    );
  }

  private _getDragDropEvents(): IDragDropEvents {
    return {
      canDrop: (dropContext?: IDragDropContext, dragContext?: IDragDropContext) => { return true; },
      canDrag: (item?: any) => { return true; },
      onDragEnter: (item?: any, event?: DragEvent) => { return 'dragEnter'; }, // return string is the css classes that will be added to the entering element.
      onDragLeave: (item?: any, event?: DragEvent) => { return; },
      onDrop: (item?: any, event?: DragEvent) => {
        if (_draggedItem) {
          this._insertBeforeItem(item);
        }
      },
      onDragStart: (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent) => {
        _draggedItem = item;
        _draggedIndex = itemIndex!;
      },
      onDragEnd: (item?: any, event?: DragEvent) => {
        _draggedItem = null;
        _draggedIndex = -1;
      },
    };
  }

  private _onRenderItemColumn(item: any, index: number, column: IColumn) {
    if (column.key === 'name') {
      return <Link data-selection-invoke={ true }>{ item[column.key] }</Link>;
    }

    return item[column.key];
  }

  private _insertBeforeItem(item: any) {
    let draggedItems = this._selection.isIndexSelected(_draggedIndex) ? this._selection.getSelection() : [_draggedItem];

    let items: any[] = this.state.items.filter((i: number) => draggedItems.indexOf(i) === -1);
    let insertIndex = items.indexOf(item);

    // if dragging/dropping on itself, index will be 0.
    if (insertIndex === -1) {
      insertIndex = 0;
    }

    items.splice(insertIndex, 0, ...draggedItems);

    this.setState({ items: items });
  }
}
