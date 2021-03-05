import * as React from 'react';
import { Announced } from '@fluentui/react/lib/Announced';
import { useConst } from '@fluentui/react-hooks';
import { DetailsList, DetailsListLayoutMode, IColumn } from '@fluentui/react/lib/DetailsList';
import { Selection } from '@fluentui/react/lib/Selection';
import { Text } from '@fluentui/react/lib/Text';
import { IStackTokens, Stack } from '@fluentui/react/lib/Stack';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { createArray } from '@fluentui/react/lib/Utilities';

interface IExampleItem {
  key: string;
  name: string;
}

const columns: IColumn[] = [
  {
    name: 'Name',
    fieldName: 'name',
    key: 'name',
    minWidth: 100,
    maxWidth: 200,
  },
];

const stackTokens: IStackTokens = { childrenGap: 10 };

export const AnnouncedBulkOperationsExample: React.FunctionComponent = () => {
  const selection = useConst(() => new Selection());
  const [items, setItems] = React.useState<IExampleItem[]>(() =>
    createArray(20, i => ({
      key: 'item-' + i,
      name: 'Item ' + i,
    })),
  );
  const [deletedCount, setDeletedCount] = React.useState<number>(0);

  const onDelete = React.useCallback(() => {
    setDeletedCount(selection.count);
    setItems(prevItems => {
      const selectedIndices = selection.getSelectedIndices();
      return prevItems.filter((item, i) => selectedIndices.indexOf(i) === -1);
    });
  }, [selection]);

  return (
    <Stack tokens={stackTokens}>
      <Text>Turn on Narrator, select items, and use the button to delete them.</Text>
      <Text>
        Note: This example is to showcase the concept of deleting, copying, uploading, or moving many items and not
        fully illustrative of the real-world scenario.
      </Text>
      <Stack.Item align="start">
        <PrimaryButton onClick={onDelete}>Delete selected items</PrimaryButton>
      </Stack.Item>
      {deletedCount > 0 && (
        <Announced message={`${deletedCount} item${deletedCount === 1 ? '' : 's'} deleted`} aria-live={'assertive'} />
      )}
      <DetailsList
        setKey="items"
        items={items}
        columns={columns}
        selection={selection}
        selectionPreservedOnEmptyClick
        layoutMode={DetailsListLayoutMode.fixedColumns}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
      />
    </Stack>
  );
};
