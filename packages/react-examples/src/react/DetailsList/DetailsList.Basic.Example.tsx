import * as React from 'react';
import { Announced } from '@fluentui/react/lib/Announced';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { DetailsList, DetailsListLayoutMode, Selection, ISelection, IColumn } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { Text } from '@fluentui/react/lib/Text';

const exampleChildClass = mergeStyles({
  display: 'block',
  marginBottom: '10px',
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px' } };

interface IDetailsListBasicExampleItem {
  key: number;
  name: string;
  value: number;
}

// Populate with items for demos.
const allItems: IDetailsListBasicExampleItem[] = [...Array(200)].map((_, i) => ({
  key: i,
  name: `Item ${i}`,
  value: i,
}));

const columns: IColumn[] = [
  { key: 'column1', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
  { key: 'column2', name: 'Value', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
];

const getSelectionDetails = (selection: ISelection): string => {
  const selectionCount = selection.getSelectedCount();

  switch (selectionCount) {
    case 0:
      return 'No items selected';
    case 1:
      return '1 item selected: ' + (selection.getSelection()[0] as IDetailsListBasicExampleItem).name;
    default:
      return `${selectionCount} items selected`;
  }
};

export const DetailsListBasicExample = () => {
  const [items, setItems] = React.useState(allItems);
  const [selectionDetails, setSelectionDetails] = React.useState('');

  const selection: ISelection = React.useMemo(
    () =>
      new Selection({
        onSelectionChanged: () => setSelectionDetails(getSelectionDetails(selection)),
      }),
    [],
  );

  const onFilter = React.useCallback(
    (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
      setItems(text ? allItems.filter(i => i.name.toLowerCase().indexOf(text) > -1) : allItems);
    },
    [],
  );

  const onItemInvoked = React.useCallback((item: IDetailsListBasicExampleItem): void => {
    alert(`Item invoked: ${item.name}`);
  }, []);

  return (
    <div>
      <div className={exampleChildClass}>{selectionDetails}</div>
      <Text>
        Note: While focusing a row, pressing enter or double clicking will execute onItemInvoked, which in this example
        will show an alert.
      </Text>

      <Announced message={selectionDetails} />
      <TextField className={exampleChildClass} label="Filter by name:" onChange={onFilter} styles={textFieldStyles} />
      <Announced message={`Number of items after filter applied: ${items.length}.`} />

      <MarqueeSelection selection={selection}>
        <DetailsList
          items={items}
          columns={columns}
          setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
          selection={selection}
          selectionPreservedOnEmptyClick={true}
          ariaLabelForSelectionColumn="Toggle selection"
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          checkButtonAriaLabel="select row"
          onItemInvoked={onItemInvoked}
        />
      </MarqueeSelection>
    </div>
  );
};
