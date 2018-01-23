import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { autobind, BaseComponent } from '../../../Utilities';
import './Dropdown.Basic.Example.scss';

export class DropdownErrorExample extends BaseComponent<{}, {}> {
  private _basicDropdown: IDropdown;

  constructor(props: {}) {
    super(props);
  }

  public render() {
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
          componentRef={ this._resolveRef('_basicDropdown') }
          errorMessage='Error message'
        />
      </div>
    );
  }
}