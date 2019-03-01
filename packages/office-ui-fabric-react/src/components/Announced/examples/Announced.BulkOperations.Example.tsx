import * as React from 'react';
import { Announced } from '../Announced';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { DetailsList, Selection } from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { IDragDropEvents, IDragDropContext } from 'office-ui-fabric-react/lib/utilities/dragdrop/interfaces';
import { mergeStyles, getTheme } from 'office-ui-fabric-react/lib/Styling';
import './Announced.Example.scss';

const _items: IFileExampleItem[] = [];

const theme = getTheme();
const dragEnterClass = mergeStyles({
  backgroundColor: theme.palette.neutralLight
});

const _columns: IColumn[] = [
  {
    key: 'name',
    name: 'Name',
    fieldName: 'name',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for name'
  },
  {
    key: 'modified',
    name: 'Modified',
    fieldName: 'modified',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for modified'
  },
  {
    key: 'modifiedby',
    name: 'Modified By',
    fieldName: 'modifiedby',
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
    ariaLabel: 'Operations for modifiedby'
  },
  {
    key: 'filesize',
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

function generateRandomDate(): string {
  return new Date(new Date(2010, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2010, 0, 1).getTime())).toDateString();
}

export interface IFileExampleItem {
  key: string;
  name: string;
  modified: string;
  modifiedby: string;
  filesize: string;
}

export class AnnouncedBulkOperationsExample extends React.Component<
  {},
  {
    items: IFileExampleItem[];
    columns: IColumn[];
    numberOfItems: number;
  }
> {
  private _selection: Selection;
  private _dragDropEvents: IDragDropEvents;
  private _draggedItem: IFileExampleItem | undefined;
  private _draggedIndex: number;

  constructor(props: {}) {
    super(props);

    this._selection = new Selection();
    this._dragDropEvents = this._getDragDropEvents();
    this._draggedIndex = -1;

    this._onRenderItemColumn = this._onRenderItemColumn.bind(this);
    this._renderAnnounced = this._renderAnnounced.bind(this);

    if (_items.length === 0) {
      for (let i = 0; i < 20; i++) {
        _items.push({
          key: 'item-' + i,
          name: 'Item ' + i,
          modified: generateRandomDate(),
          modifiedby: _names[Math.floor(Math.random() * _names.length)],
          filesize: Math.floor(Math.random() * 30).toString() + ' MB'
        });
      }
    }

    this.state = {
      items: _items,
      columns: _columns,
      numberOfItems: 0
    };
  }

  public render(): JSX.Element {
    const { items, columns } = this.state;

    return (
      <Stack gap={10}>
        <Text>Turn on Narrator and drag and drop the items.</Text>
        <Text>
          Note: This example is to showcase the concept of copying, uploading, or moving many items and not fully illustrative of the real
          world scenario.
        </Text>
        {this._renderAnnounced()}
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            setKey={'items'}
            items={items}
            columns={columns}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            onItemInvoked={this._onItemInvoked}
            onRenderItemColumn={this._onRenderItemColumn}
            dragDropEvents={this._dragDropEvents}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          />
        </MarqueeSelection>
      </Stack>
    );
  }

  private _renderAnnounced(): JSX.Element | undefined {
    const { numberOfItems } = this.state;

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
        // return string is the css classes that will be added to the entering element.
        return dragEnterClass;
      },
      onDragLeave: (item?: any, event?: DragEvent) => {
        return;
      },
      onDrop: (item?: any, event?: DragEvent) => {
        if (this._draggedItem) {
          this._insertBeforeItem(item);
        }
      },
      onDragStart: (item?: any, itemIndex?: number, selectedItems?: any[], event?: MouseEvent) => {
        this._draggedItem = item;
        this._draggedIndex = itemIndex!;
      },
      onDragEnd: (item?: any, event?: DragEvent) => {
        this._draggedItem = undefined;
        this._draggedIndex = -1;
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

  private _insertBeforeItem(item: IFileExampleItem): void {
    const draggedItems = this._selection.isIndexSelected(this._draggedIndex)
      ? (this._selection.getSelection() as IFileExampleItem[])
      : [this._draggedItem!];

    const items = this.state.items.filter(currentItem => draggedItems.indexOf(currentItem) === -1);
    let insertIndex = items.indexOf(item);

    // if dragging/dropping on itself, index will be 0.
    if (insertIndex === -1) {
      insertIndex = 0;
    }

    items.splice(insertIndex, 0, ...draggedItems);

    this.setState({ items: items, numberOfItems: draggedItems.length });
  }
}
