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

const exampleItems: IFileExampleItem[] = [];

const theme = getTheme();
const dragEnterClass = mergeStyles({
  backgroundColor: theme.palette.neutralLight,
});

const columns: IColumn[] = ['Name', 'Modified', 'Modified By', 'File Size'].map((name: string) => {
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

const names: string[] = [
  'Annie Lindqvist',
  'Aaron Reid',
  'Alex Lundberg',
  'Roko Kolar',
  'Christian Bergqvist',
  'Valentina Lovric',
  'Makenzie Sharett',
];

const getMockDateString = (): string => {
  return 'Thu Jan 05 2017‌';
};

const stackTokens: IStackTokens = { childrenGap: 10 };

export interface IFileExampleItem {
  key: string;
  name: string;
  modified: string;
  modifiedby: string;
  filesize: string;
}

export interface IAnnouncedBulkOperationsExampleState {
  selection: Selection;
  dragDropEvents: IDragDropEvents;
  draggedItem: IFileExampleItem | undefined;
  draggedIndex: number;
}

export const AnnouncedBulkOperationsExample: React.FunctionComponent = () => {
  const [items, setItems] = React.useState<IFileExampleItem[]>(exampleItems);
  const [numberOfItems, setNumberOfItems] = React.useState<number>(0);

  const getDragDropEvents = (): IDragDropEvents => {
    return {
      canDrop: () => true,
      canDrag: () => true,
      // return string is the css class that will be added to the entering element.
      onDragEnter: () => dragEnterClass,
      onDragLeave: () => undefined,
      onDrop: (item?: IFileExampleItem) => {
        if (state.draggedItem && item) {
          insertBeforeItem(item);
        }
      },
      onDragStart: (item?: IFileExampleItem, itemIndex?: number) => {
        state.draggedItem = item;
        state.draggedIndex = itemIndex!;
      },
      onDragEnd: () => {
        state.draggedItem = undefined;
        state.draggedIndex = -1;
      },
    };
  };

  const { current: state } = React.useRef<IAnnouncedBulkOperationsExampleState>({
    selection: new Selection(),
    dragDropEvents: getDragDropEvents(),
    draggedItem: undefined,
    draggedIndex: -1,
  });

  const renderAnnounced = (): JSX.Element | undefined => {
    if (numberOfItems > 0) {
      return (
        <Announced message={`${numberOfItems} item${numberOfItems === 1 ? '' : 's'} moved`} aria-live={'assertive'} />
      );
    }
  };

  const onItemInvoked = (item: IFileExampleItem): void => {
    alert(`Item invoked: ${item.name}`);
  };

  const onRenderItemColumn = (item: IFileExampleItem, index: number, column: IColumn): React.ReactNode => {
    if (column.key === 'name') {
      return <Link data-selection-invoke>{item[column.key]}</Link>;
    }

    return item[column.key as keyof IFileExampleItem];
  };

  const insertBeforeItem = (item: IFileExampleItem): void => {
    const draggedItems = state.selection.isIndexSelected(state.draggedIndex)
      ? (state.selection.getSelection() as IFileExampleItem[])
      : [state.draggedItem!];

    const currentItems = items.filter(currentItem => draggedItems.indexOf(currentItem) === -1);
    let insertIndex = currentItems.indexOf(item);

    // if dragging/dropping on itself, index will be 0.
    if (insertIndex === -1) {
      insertIndex = 0;
    }

    currentItems.splice(insertIndex, 0, ...draggedItems);
    setItems(currentItems);
    setNumberOfItems(draggedItems.length);
  };

  if (exampleItems.length === 0) {
    for (let i = 0; i < 20; i++) {
      exampleItems.push({
        key: 'item-' + i,
        name: 'Item ' + i,
        modified: getMockDateString(),
        modifiedby: names[Math.floor(Math.random() * names.length)],
        filesize: Math.floor(Math.random() * 30).toString() + ' MB',
      });
    }
  }

  return (
    <Stack tokens={stackTokens}>
      <Text>Turn on Narrator and drag and drop the items.</Text>
      <Text>
        Note: This example is to showcase the concept of copying, uploading, or moving many items and not fully
        illustrative of the real world scenario.
      </Text>
      {renderAnnounced()}
      <MarqueeSelection selection={state.selection}>
        <DetailsList
          setKey="items"
          items={items}
          columns={columns}
          selection={state.selection}
          selectionPreservedOnEmptyClick
          onItemInvoked={onItemInvoked}
          onRenderItemColumn={onRenderItemColumn}
          dragDropEvents={state.dragDropEvents}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        />
      </MarqueeSelection>
    </Stack>
  );
};
