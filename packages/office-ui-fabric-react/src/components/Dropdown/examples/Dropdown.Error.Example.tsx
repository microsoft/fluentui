import * as React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { BaseComponent } from '../../../Utilities';
import './Dropdown.Basic.Example.scss';

export class DropdownErrorExample extends BaseComponent<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className='docs-DropdownExample'>
        <Dropdown
          placeHolder='Select an Option'
          label='Error message example:'
          id='Errormessagedrop1'
          ariaLabel='Error message dropdown example'
          options={
            [
              { key: 'A', text: 'Option a' },
              { key: 'B', text: 'Option b' },
              { key: 'C', text: 'Option c' },
              { key: 'D', text: 'Option d' },
              { key: 'E', text: 'Option e' },
            ]
          }
          errorMessage='Error message'
        />
      </div>
    );
  }
}