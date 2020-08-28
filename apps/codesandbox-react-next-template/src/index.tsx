import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DefaultCustomizations } from '@uifabric/theme-samples';
import {
  initializeIcons,
  Checkbox,
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption,
  SearchBox,
  Slider,
  SpinButton,
  Stack,
  TextField,
  ThemeProvider,
  Toggle,
} from '@fluentui/react-next';

initializeIcons();
let _rootDiv: HTMLElement;
const dropdownOptions: IDropdownOption[] = [
  {
    key: 'fruitsHeader',
    text: 'Fruits',
    itemType: DropdownMenuItemType.Header,
  },
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'orange', text: 'Orange', disabled: true },
  { key: 'grape', text: 'Grape' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  {
    key: 'vegetablesHeader',
    text: 'Vegetables',
    itemType: DropdownMenuItemType.Header,
  },
  { key: 'broccoli', text: 'Broccoli' },
  { key: 'carrot', text: 'Carrot' },
  { key: 'lettuce', text: 'Lettuce' },
];
const dropdownStyles = {
  dropdown: { width: 300 },
};

const theme = {
  tokens: DefaultCustomizations.settings.theme,
};

function start(): void {
  if (!_rootDiv) {
    _rootDiv = document.createElement('div');
    document.body.appendChild(_rootDiv);
  }

  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Stack gap={8}>
        <Checkbox label="Unchecked checkbox (uncontrolled)" />
        <Slider
          label="Snapping slider example"
          min={0}
          max={50}
          step={10}
          defaultValue={20}
          showValue={true}
          snapToStep={true}
        />
        <SearchBox placeholder="Search" />
        <SpinButton
          defaultValue="0"
          label="Basic SpinButton"
          min={0}
          max={100}
          step={1}
          incrementButtonAriaLabel="Increase value by 1"
          decrementButtonAriaLabel="Decrease value by 1"
          iconProps={{ iconName: 'IncreaseIndentLegacy' }}
        />
        <TextField label="Standard TextField" />
        <Toggle label="Enabled and checked" defaultChecked={true} onText="On" offText="Off" />
        <Dropdown
          placeholder="Select an option"
          label="Basic uncontrolled example"
          options={dropdownOptions}
          styles={dropdownStyles}
        />
      </Stack>
    </ThemeProvider>,
    _rootDiv,
  );
}

// Start the application.
start();
