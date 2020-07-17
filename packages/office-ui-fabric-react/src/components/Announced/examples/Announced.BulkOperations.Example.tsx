import * as React from 'react';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import { useConst } from '@uifabric/react-hooks';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { DetailsList, IDragDropEvents } from 'office-ui-fabric-react/lib/DetailsList';
import { Selection } from 'office-ui-fabric-react/lib/Selection';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { mergeStyles, getTheme } from 'office-ui-fabric-react/lib/Styling';

interface IFileExampleItem {
  key: string;
  name: string;
  modified: string;
  modifiedby: string;
  filesize: string;
}

interface IDragState {
  draggedItem: IFileExampleItem | undefined;
  draggedIndex: number;
}

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

const onItemInvoked = (item: IFileExampleItem): void => {
  alert(`Item invoked: ${item.name}`);
};

const onRenderItemColumn = (item: IFileExampleItem, index: number, column: IColumn): React.ReactNode => {
  if (column.key === 'name') {
    return <Link data-selection-invoke>{item[column.key]}</Link>;
  }

  return item[column.key as keyof IFileExampleItem];
};

const stackTokens: IStackTokens = { childrenGap: 10 };

export const AnnouncedBulkOperationsExample: React.FunctionComponent = () => {
  const selection = useConst(() => new Selection());
  const exampleItems = useConst(() => {
    const itemsList: IFileExampleItem[] = [];
    for (let i = 0; i < 20; i++) {
      itemsList.push({
        key: 'item-' + i,
        name: 'Item ' + i,
        modified: getMockDateString(),
        modifiedby: names[Math.floor(Math.random() * names.length)],
        filesize: Math.floor(Math.random() * 30).toString() + ' MB',
      });
    }
    return itemsList;
  });

  const [items, setItems] = React.useState<IFileExampleItem[]>(exampleItems);
  const [numberOfMovedItems, setNumberOfMovedItems] = React.useState<number>(0);

  const getDragDropEvents = (): IDragDropEvents => {
    return {
      canDrop: () => true,
      canDrag: () => true,
      // return string is the css class that will be added to the entering element.
      onDragEnter: () => dragEnterClass,
      onDragLeave: () => undefined,
      onDrop: (item?: IFileExampleItem) => {
        if (internalDragState.draggedItem && item) {
          insertBeforeItem(item);
        }
      },
      onDragStart: (item?: IFileExampleItem, itemIndex?: number) => {
        internalDragState.draggedItem = item;
        internalDragState.draggedIndex = itemIndex!;
      },
      onDragEnd: () => {
        internalDragState.draggedItem = undefined;
        internalDragState.draggedIndex = -1;
      },
    };
  };

  const { current: internalDragState } = React.useRef<IDragState>({
    draggedItem: undefined,
    draggedIndex: -1,
  });

  const insertBeforeItem = (item: IFileExampleItem): void => {
    const draggedItems = selection.isIndexSelected(internalDragState.draggedIndex)
      ? (selection.getSelection() as IFileExampleItem[])
      : [internalDragState.draggedItem!];

    const currentItems = items.filter(currentItem => draggedItems.indexOf(currentItem) === -1);
    let insertIndex = currentItems.indexOf(item);

    // if dragging/dropping on itself, index will be 0.
    if (insertIndex === -1) {
      insertIndex = 0;
    }

    currentItems.splice(insertIndex, 0, ...draggedItems);
    setItems(currentItems);
    setNumberOfMovedItems(draggedItems.length);
  };

  return (
    <Stack tokens={stackTokens}>
      <Text>Turn on Narrator and drag and drop the items.</Text>
      <Text>
        Note: This example is to showcase the concept of copying, uploading, or moving many items and not fully
        illustrative of the real world scenario.
      </Text>
      {numberOfMovedItems > 0 && (
        <Announced
          message={`${numberOfMovedItems} item${numberOfMovedItems === 1 ? '' : 's'} moved`}
          aria-live={'assertive'}
        />
      )}
      <MarqueeSelection selection={selection}>
        <DetailsList
          setKey="items"
          items={items}
          columns={columns}
          selection={selection}
          selectionPreservedOnEmptyClick
          onItemInvoked={onItemInvoked}
          onRenderItemColumn={onRenderItemColumn}
          dragDropEvents={getDragDropEvents()}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        />
      </MarqueeSelection>
    </Stack>
  );
};
