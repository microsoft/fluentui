import * as React from 'react';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { DetailsList, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { IColumn, buildColumns } from 'office-ui-fabric-react/lib/DetailsList';
import {
  IDragDropEvents,
  IDragDropContext
} from 'office-ui-fabric-react/lib/utilities/dragdrop/interfaces';
import { createListItems } from '@uifabric/example-app-base';
import './DetailsList.DragDrop.Example.scss';
import { IColumnReorderOptions } from 'office-ui-fabric-react/lib/components/DetailsList';

let _draggedItem: any = null;
let _draggedIndex = -1;
let _items: any[];
let _columns: IColumn[];
export class DetailsListDragDropExample extends React.Component<
  {},
  {
    items: {}[];
    selectionDetails?: string;
    columns: IColumn[];
    frozenColumnCount: number;
  }
> {
  private _selection: Selection;

  constructor(props: {}) {
    super(props);

    this._onRenderItemColumn = this._onRenderItemColumn.bind(this);
    this._handleDragDrop = this._handleDragDrop.bind(this);
    this._getColumnReorderOptions = this._getColumnReorderOptions.bind(this);

    this._selection = new Selection();

    _items = _items || createListItems(10, 0);
    _columns = _buildColumns();

    this.state = {
      items: createListItems(10),
      columns: _columns,
      frozenColumnCount: 1
    };
  }

  public render(): JSX.Element {
    const { items, selectionDetails, columns } = this.state;

    return (
      <div className='detailsListDragDropExample'>
        <div>{selectionDetails}</div>
        {/* <MarqueeSelection selection={ this._selection }> */}
        <DetailsList
          setKey='items'
          items={items}
          columns={columns}
          selection={this._selection}
          selectionPreservedOnEmptyClick={true}
          onItemInvoked={this._onItemInvoked}
          onRenderItemColumn={this._onRenderItemColumn}
          dragDropEvents={this._getDragDropEvents()}
          columnReorderOptions={this._getColumnReorderOptions()}
        />
        {/* </MarqueeSelection> */}
      </div>
    );
  }

  private _handleDragDrop = (draggedIndex: number, targetIndex: number) => {
    const draggedItems = this.state.columns[draggedIndex];
    const newColumns: IColumn[] = [...this.state.columns];

    // insert before the dropped item
    newColumns.splice(draggedIndex, 1);
    if (draggedIndex < targetIndex) {
      targetIndex--;
    }
    newColumns.splice(targetIndex, 0, draggedItems);
    this.setState({ columns: newColumns });
  }

  private _getColumnReorderOptions(): IColumnReorderOptions {
    return {
      frozenColumnCount: 1,
      handleColumnReorder: this._handleDragDrop
    };
  }

  private _getDragDropEvents(): IDragDropEvents {
    return {
      canDrop: (dropContext?: IDragDropContext, dragContext?: IDragDropContext) => {
        return true;
      },
      canDrag: (item?: any) => {
        return true;
      },
      onDragEnter: (item?: any, event?: DragEvent) => {
        return 'dragEnter';
      }, // return string is the css classes that will be added to the entering element.
      onDragLeave: (item?: any, event?: DragEvent) => {
        return;
      },
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
      }
    };
  }

  private _onItemInvoked(item: any): void {
    alert(`Item invoked: ${item.name}`);
  }

  private _onRenderItemColumn(item: any, index: number, column: IColumn): JSX.Element {
    if (column.key === 'name') {
      return <Link data-selection-invoke={true}>{item[column.key]}</Link>;
    }

    return item[column.key];
  }

  private _insertBeforeItem(item: any): void {
    const draggedItems = this._selection.isIndexSelected(_draggedIndex)
      ? this._selection.getSelection()
      : [_draggedItem];

    const items: any[] = this.state.items.filter((i: number) => draggedItems.indexOf(i) === -1);
    let insertIndex = items.indexOf(item);

    // if dragging/dropping on itself, index will be 0.
    if (insertIndex === -1) {
      insertIndex = 0;
    }

    items.splice(insertIndex, 0, ...draggedItems);

    this.setState({ items: items });
  }
}

function _buildColumns(): IColumn[] {
  const columns = buildColumns(_items, true);
  return columns;
}
