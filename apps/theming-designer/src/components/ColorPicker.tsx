import * as React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Dropdown } from '../../../../packages/office-ui-fabric-react/lib/Dropdown';

export class ColorPicker extends React.Component {
  render() {
    return (
      <>
        <span>Colors</span>
        <Stack gap={10} padding={10}>
          <Dropdown
            placeholder="Select an Option"
            label="Basic uncontrolled example:"
            ariaLabel="Basic dropdown example"
            options={[{ key: 'light', text: 'Light theme' }, { key: 'dark', text: 'Dark theme' }]}
            //componentRef={this._basicDropdown}
          />
          <span>Item Two</span>
          <span>Item Three</span>
        </Stack>
      </>
    );
  }
}
