import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

let _rootDiv: HTMLElement;
let choicegroupOptions = [
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C', disabled: true },
  { key: 'D', text: 'Option D' },
];
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
      <Stack gap={8}>
        <Checkbox label="Unchecked checkbox (uncontrolled)" />
        <ChoiceGroup defaultSelectedKey="B" options={choicegroupOptions} label="Pick One" required={true} />
        <Slider
          label="Snapping slider example"
          min={0}
          max={50}
          step={10}
          defaultValue={20}
          showValue={true}
          snapToStep={true}
        />
        <TextField label="Standard" />
        <Toggle label="Enabled and checked" defaultChecked={true} onText="On" offText="Off" />
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
