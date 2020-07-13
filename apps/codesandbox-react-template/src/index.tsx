import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  Fabric,
  Checkbox,
  ChoiceGroup,
  Dropdown,
  DropdownMenuItemType,
  Slider,
  Stack,
  TextField,
  Toggle,
} from '@fluentui/react';

let _rootDiv: HTMLElement;
const choicegroupOptions = [
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C', disabled: true },
  { key: 'D', text: 'Option D' },
];
const dropdownOptions = [
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
const dropdownStyles = {
  dropdown: { width: 300 },
};

function start(): void {
  if (!_rootDiv) {
    _rootDiv = document.createElement('div');
    document.body.appendChild(_rootDiv);
  }

  ReactDOM.render(
    <Fabric>
      <Stack gap={8}>
        <Checkbox label="Unchecked checkbox (uncontrolled)" />
        <ChoiceGroup defaultSelectedKey="B" options={choicegroupOptions} label="Pick One" required />
        <Slider label="Snapping slider example" min={0} max={50} step={10} defaultValue={20} showValue snapToStep />
        <TextField label="Standard" />
        <Toggle label="Enabled and checked" defaultChecked onText="On" offText="Off" />
        <Dropdown
          placeholder="Select an option"
          label="Basic uncontrolled example"
          options={dropdownOptions}
          styles={dropdownStyles}
        />
      </Stack>
    </Fabric>,
    _rootDiv,
  );
}

// Start the application.
start();
