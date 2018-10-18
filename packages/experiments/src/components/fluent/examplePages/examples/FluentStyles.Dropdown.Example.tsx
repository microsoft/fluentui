import * as React from 'react';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';

// tslint:disable-next-line:no-any
const style = require('./FluentStyles.Example.scss') as any;

export class FluentStylesDropdownExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className={style.sidebyside}>
        <Dropdown
          label="Basic"
          placeHolder="Select an Option"
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
        />
        <Dropdown
          label="Disabled"
          placeHolder="Select an Option"
          disabled={true}
          options={[
            { key: 'A', text: 'Option a' },
            { key: 'B', text: 'Option b' },
            { key: 'C', text: 'Option c' },
            { key: 'D', text: 'Option d' },
            { key: 'E', text: 'Option e' },
            { key: 'F', text: 'Option f' },
            { key: 'G', text: 'Option g' }
          ]}
        />
        <Dropdown
          placeHolder="Select options"
          label="Multi-choice"
          defaultSelectedKeys={['Apple', 'Banana', 'Orange']}
          multiSelect
          options={[
            { key: 'Header2', text: 'Fruits', itemType: DropdownMenuItemType.Header },
            { key: 'Apple', text: 'apple' },
            { key: 'Banana', text: 'banana' },
            { key: 'Orange', text: 'orange', disabled: true },
            { key: 'Grape', text: 'grape', disabled: true },
            { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
            { key: 'Header3', text: 'Languages', itemType: DropdownMenuItemType.Header },
            { key: 'English', text: 'english' },
            { key: 'French', text: 'french' },
            { key: 'Germany', text: 'germany' }
          ]}
        />
        <Dropdown
          placeHolder="Select an Option"
          label="Error"
          errorMessage="Error message"
          options={[
            { key: 'A', text: 'Option a' },
            { key: 'B', text: 'Option b' },
            { key: 'C', text: 'Option c' },
            { key: 'D', text: 'Option d' },
            { key: 'E', text: 'Option e' }
          ]}
        />
      </div>
    );
  }
}
