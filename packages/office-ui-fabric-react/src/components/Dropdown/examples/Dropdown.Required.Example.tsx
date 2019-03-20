import * as React from 'react';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';

export class DropdownRequiredExample extends BaseComponent<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className="docs-DropdownExample">
        <Dropdown
          placeholder="Select an Option"
          label="Required dropdown example:"
          options={[
            { key: 'Header', text: 'Actions', itemType: DropdownMenuItemType.Header },
            { key: 'A', text: 'Option a', title: 'I am option a.' },
            { key: 'B', text: 'Option b' },
            { key: 'C', text: 'Option c', disabled: true },
            { key: 'D', text: 'Option d' },
            { key: 'E', text: 'Option e' },
            { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
            { key: 'Header2', text: 'People', itemType: DropdownMenuItemType.Header },
            { key: 'F', text: 'Option f' },
            { key: 'G', text: 'Option g' },
            { key: 'H', text: 'Option h' },
            { key: 'I', text: 'Option i' },
            { key: 'J', text: 'Option j' }
          ]}
          required={true}
        />
      </div>
    );
  }
}
