import * as React from 'react';
import { Announced } from '../Announced';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { DetailsList, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { IColumn, buildColumns } from 'office-ui-fabric-react/lib/DetailsList';
import { IDragDropEvents, IDragDropContext } from 'office-ui-fabric-react/lib/utilities/dragdrop/interfaces';
import './Announced.Example.scss';

/* tslint:disable:no-any */
let _draggedItem: any = null;
let _draggedIndex = -1;
const _items: any[] = [];

let _columns: IColumn[] = [
  {
    key: 'column1',
    name: 'Name',
    fieldName: 'name',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for name'
  },
  {
    key: 'column2',
    name: 'Modified',
    fieldName: 'modified',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for modified'
  },
  {
    key: 'column3',
    name: 'Modified By',
    fieldName: 'modifiedby',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for modifiedby'
  },
  {
    key: 'column4',
    name: 'File Size',
    fieldName: 'filesize',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for filesize'
  }
];

const _names: string[] = [
  'Annie Lindqvist',
  'Aaron Reid',
  'Alex Lundberg',
  'Roko Kolar',
  'Christian Bergqvist',
  'Valentina Lovric',
  'Makenzie Sharett'
];

export class AnnouncedBulkLongRunningExample extends React.Component<
  {},
  {
    items: {}[];
    columns: IColumn[];
    numberOfItems: number;
  }
> {
  private _selection: Selection;

  constructor(props: {}) {
    super(props);

    this._onRenderItemColumn = this._onRenderItemColumn.bind(this);

    this._selection = new Selection();

    if (_items.length === 0) {
      for (let i = 0; i < 20; i++) {
        _items.push({
          key: i,
          name: 'Item ' + i,
          modified: i,
          modifiedby: _names[Math.floor(Math.random() * _names.length)],
          filesize: Math.floor(Math.random() * 30).toString() + ' MB'
        });
      }
    }

    _columns = buildColumns(_items, true);

    this.state = {
      items: _items,
      columns: _columns,
      numberOfItems: 0
    };
  }

  public render(): JSX.Element {
    const { items, columns, numberOfItems } = this.state;

    return (
      <>
        <p>Turn on Narrator and drag and drop the items.</p>
        <p>The Announced component should announce the number of items moved.</p>
        <p>
          Note: This example is to showcase the concept of copying, uploading, or moving many items and not full illustrative of the real
          world scenario.
        </p>
        {this._renderAnnounced(numberOfItems)}
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            setKey={'items'}
            items={items}
            columns={columns}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={this._onItemInvoked}
            onRenderItemColumn={this._onRenderItemColumn}
            dragDropEvents={this._getDragDropEvents()}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          />
        </MarqueeSelection>
      </>
    );
  }

  private _renderAnnounced(numberOfItems: number): JSX.Element | undefined {
    if (numberOfItems > 0) {
      return <Announced message={numberOfItems === 1 ? `${numberOfItems} item moved` : `${numberOfItems} items moved`} />;
    }
    return;
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
    const draggedItems = this._selection.isIndexSelected(_draggedIndex) ? this._selection.getSelection() : [_draggedItem];

    const items: any[] = this.state.items.filter((i: number) => draggedItems.indexOf(i) === -1);
    let insertIndex = items.indexOf(item);

    // if dragging/dropping on itself, index will be 0.
    if (insertIndex === -1) {
      insertIndex = 0;
    }

    items.splice(insertIndex, 0, ...draggedItems);

    this.setState({ items: items, numberOfItems: draggedItems.length });
  }
}
