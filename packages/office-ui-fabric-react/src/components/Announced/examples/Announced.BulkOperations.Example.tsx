import * as React from 'react';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { DetailsList, IDragDropEvents } from 'office-ui-fabric-react/lib/DetailsList';
import { Selection } from 'office-ui-fabric-react/lib/Selection';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { mergeStyles, getTheme } from 'office-ui-fabric-react/lib/Styling';

const _items: IFileExampleItem[] = [];

const theme = getTheme();
const dragEnterClass = mergeStyles({
  backgroundColor: theme.palette.neutralLight,
});

const _columns: IColumn[] = ['Name', 'Modified', 'Modified By', 'File Size'].map((name: string) => {
  const fieldName = name.replace(' ', '').toLowerCase();
  return {
    fieldName,
    name,
    key: fieldName,
    minWidth: 100,
    maxWidth: 200,
    isResizable: true,
  };
});

const _names: string[] = [
  'Annie Lindqvist',
  'Aaron Reid',
  'Alex Lundberg',
  'Roko Kolar',
  'Christian Bergqvist',
  'Valentina Lovric',
  'Makenzie Sharett',
];

function getMockDateString(): string {
  return 'Thu Jan 05 2017‌';
}

export interface IFileExampleItem {
  key: string;
  name: string;
  modified: string;
  modifiedby: string;
  filesize: string;
}

export interface IAnnouncedBulkOperationsExampleState {
  items: IFileExampleItem[];
  numberOfItems: number;
}

export class AnnouncedBulkOperationsExample extends React.Component<{}, IAnnouncedBulkOperationsExampleState> {
  private _selection: Selection;
  private _dragDropEvents: IDragDropEvents;
  private _draggedItem: IFileExampleItem | undefined;
  private _draggedIndex: number;

  constructor(props: {}) {
    super(props);

    this._selection = new Selection();
    this._dragDropEvents = this._getDragDropEvents();
    this._draggedIndex = -1;

    if (_items.length === 0) {
      for (let i = 0; i < 20; i++) {
        _items.push({
          key: 'item-' + i,
          name: 'Item ' + i,
          modified: getMockDateString(),
          modifiedby: _names[Math.floor(Math.random() * _names.length)],
          filesize: Math.floor(Math.random() * 30).toString() + ' MB',
        });
      }
    }

    this.state = {
      items: _items,
      numberOfItems: 0,
    };
  }

  public render(): JSX.Element {
    const { items } = this.state;
    const stackTokens: IStackTokens = { childrenGap: 10 };

    return (
      <Stack tokens={stackTokens}>
        <Text>Turn on Narrator and drag and drop the items.</Text>
        <Text>
          Note: This example is to showcase the concept of copying, uploading, or moving many items and not fully
          illustrative of the real world scenario.
        </Text>
        {this._renderAnnounced()}
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            setKey="items"
            items={items}
            columns={_columns}
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
      return (
        <Announced message={`${numberOfItems} item${numberOfItems === 1 ? '' : 's'} moved`} aria-live={'assertive'} />
      );
    }
  }

  private _getDragDropEvents(): IDragDropEvents {
    return {
      canDrop: () => true,
      canDrag: () => true,
      // return string is the css class that will be added to the entering element.
      onDragEnter: () => dragEnterClass,
      onDragLeave: () => undefined,
      onDrop: (item?: IFileExampleItem) => {
        if (this._draggedItem && item) {
          this._insertBeforeItem(item);
        }
      },
      onDragStart: (item?: IFileExampleItem, itemIndex?: number) => {
        this._draggedItem = item;
        this._draggedIndex = itemIndex!;
      },
      onDragEnd: () => {
        this._draggedItem = undefined;
        this._draggedIndex = -1;
      },
    };
  }

  private _onItemInvoked = (item: IFileExampleItem): void => {
    alert(`Item invoked: ${item.name}`);
  };

  private _onRenderItemColumn = (item: IFileExampleItem, index: number, column: IColumn): React.ReactNode => {
    if (column.key === 'name') {
      return <Link data-selection-invoke={true}>{item[column.key]}</Link>;
    }

    return item[column.key as keyof IFileExampleItem];
  };

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
