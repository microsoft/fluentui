import * as React from 'react';
import {
  BaseButton,
  DefaultButton,
  PrimaryButton,
  DetailsRow,
  DetailsRowBase,
  IDropdownOption,
  IColumn,
  Toggle,
  Selection,
  SelectionMode,
  createTheme,
  DocumentCardTitle
} from 'office-ui-fabric-react';
import { Actionable, Button as NewButton, MenuButton, SplitButton, Toggle as NewToggle } from '@uifabric/experiments';

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

const alertClicked = (): void => {
  alert('Clicked');
};
const menuProps = {
  items: [
    {
      key: 'emailMessage',
      text: 'Email message',
      iconProps: { iconName: 'Mail' }
    },
    {
      key: 'calendarEvent',
      text: 'Calendar event',
      iconProps: { iconName: 'Calendar' }
    }
  ]
};

export const Scenarios: IDropdownOption[] = [
  { key: 'defbutton', text: 'DefaultButton', data: { timing: [], content: <DefaultButton text="I am a button" /> } },
  { key: 'pributton', text: 'PrimaryButton', data: { timing: [], content: <PrimaryButton text="I am a button" /> } },
  { key: 'menubutton', text: 'MenuButton', data: { timing: [], content: <DefaultButton text="I am a button" menuProps={menuProps} /> } },
  {
    key: 'splitbutton',
    text: 'SplitButton',
    data: {
      timing: [],
      content: <DefaultButton split={true} text="I am a button" onClick={alertClicked} menuProps={menuProps} />
    }
  },
  { key: 'basebutton', text: 'BaseButton', data: { timing: [], content: <BaseButton text="I am a button" /> } },
  { key: 'newdefbutton', text: 'NewDefaultButton', data: { timing: [], content: <NewButton content="I am a button" /> } },
  { key: 'newpributton', text: 'NewPrimaryButton', data: { timing: [], content: <NewButton primary content="I am a button" /> } },
  { key: 'newmenubutton', text: 'NewMenuButton', data: { timing: [], content: <MenuButton content="I am a button" menu={menuProps} /> } },
  {
    key: 'newsplitbutton',
    text: 'NewSplitButton',
    data: { timing: [], content: <SplitButton content="I am a button" menu={menuProps} /> }
  },
  { key: 'actionable', text: 'Actionable', data: { timing: [], content: <Actionable>I am a button</Actionable> } },
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
  { key: 'newtoggles', text: 'NewToggle', data: { timing: [], content: <NewToggle checked /> } },
  {
    key: 'documentcardtitle',
    text: 'DocumentCardTitle with truncation',
    data: {
      timing: [],
      content: <DocumentCardTitle title="This is the Title of a Very Interesting Document That Everyone Wnats to Read" shouldTruncate />
    }
  }
];
