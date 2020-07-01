import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Fabric,
  Checkbox,
  Dropdown,
  DropdownMenuItemType,
  SearchBox,
  Slider,
  SpinButton,
  TextField,
  Toggle,
} from '@fluentui/react-next';

let _rootDiv: HTMLElement;
let dropdownOptions = [
  { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
  { key: 'apple', text: 'Apple' },
  { key: 'banana', text: 'Banana' },
  { key: 'orange', text: 'Orange', disabled: true },
  { key: 'grape', text: 'Grape' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
  { key: 'broccoli', text: 'Broccoli' },
  { key: 'carrot', text: 'Carrot' },
  { key: 'lettuce', text: 'Lettuce' },
];
let dropdownStyles = {
  dropdown: { width: 300 },
};

function start(): void {
  if (!_rootDiv) {
    _rootDiv = document.createElement('div');
    document.body.appendChild(_rootDiv);
  }

  ReactDOM.render(
    <Fabric>
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
        min={0}
        max={100}
        step={1}
        incrementButtonAriaLabel="Increase value by 1"
        decrementButtonAriaLabel="Decrease value by 1"
      />
      <TextField label="Standard" />
      <Toggle label="Enabled and checked" defaultChecked={true} onText="On" offText="Off" />
      <Dropdown
        placeholder="Select an option"
        label="Basic uncontrolled example"
        options={dropdownOptions}
        styles={dropdownStyles}
      />
    </Fabric>,
    _rootDiv,
  );
}

// Start the application.
start();
