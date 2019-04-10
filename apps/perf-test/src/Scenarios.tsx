import * as React from 'react';
import {
  BaseButton,
  PrimaryButton,
  DetailsRow,
  DetailsRowBase,
  IDropdownOption,
  IColumn,
  Toggle,
  Selection,
  SelectionMode,
  createTheme
} from 'office-ui-fabric-react';
import { Button as NewButton, Toggle as NewToggle } from '@uifabric/experiments';

const defaultTheme = createTheme({});

// tslint:disable-next-line:typedef
const Items = Array.from({ length: 10 }, (n, i) => ({
  key: `Item ${i}`,
  name: `Item ${i}`,
  modified: new Date().toString(),
  shared: 'Private',
  size: `${Math.round(Math.random() * 1000) / 10}KB`
}));

const Columns: IColumn[] = [
  { key: 'a', name: 'Name', fieldName: 'name', minWidth: 200, maxWidth: 400 },
  { key: 'b', name: 'Last modified', fieldName: 'modified', minWidth: 200, maxWidth: 400 },
  { key: 'c', name: 'Shared', fieldName: 'shared', minWidth: 300, maxWidth: 300 },
  { key: 'c', name: 'Size', fieldName: 'size', minWidth: 300, maxWidth: 300 }
];

const selection = new Selection();
selection.setItems(Items);

export const Scenarios: IDropdownOption[] = [
  { key: 'pributton', text: 'PrimaryButton', data: { timing: [], content: <PrimaryButton text="I am a button" /> } },
  { key: 'basebutton', text: 'BaseButton', data: { timing: [], content: <BaseButton text="I am a button" /> } },
  { key: 'newbutton', text: 'NewButton', data: { timing: [], content: <NewButton>I am a button</NewButton> } },
  { key: 'button', text: 'button', data: { timing: [], content: <button>I am a button</button> } },
  {
    key: 'rowsnostyles',
    text: 'DetailsRows without styles',
    data: {
      timing: [] as number[],
      content: (
        <DetailsRowBase
          theme={defaultTheme}
          itemIndex={0}
          item={Items[0]}
          columns={Columns}
          selection={selection}
          selectionMode={SelectionMode.single}
        />
      )
    }
  },
  {
    key: 'rows',
    text: 'DetailsRows',
    data: {
      timing: [] as number[],
      content: <DetailsRow itemIndex={0} item={Items[0]} columns={Columns} selection={selection} selectionMode={SelectionMode.single} />
    }
  },
  { key: 'toggles', text: 'Toggles', data: { timing: [], content: <Toggle checked /> } },
  { key: 'newtoggles', text: 'NewToggle', data: { timing: [], content: <NewToggle checked /> } }
];
