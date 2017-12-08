import * as React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { autobind, BaseComponent } from '../../../Utilities';
import './Dropdown.Basic.Example.scss';

const states: String[] = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
];

export class DropdownTypeaheadExample extends BaseComponent<any, any> {
  constructor() {
    super();
  }

  public render() {
    return (
      <div className='DropdownBasicExample'>
        <Dropdown
          className='Dropdown-example'
          placeHolder='Type an Option'
          label='Typeahead example:'
          id='Typeaheaddrop1'
          ariaLabel='Dropdown with typeahead example'
          options={
            states.map((name) => {
              return {
                key: name,
                text: name
              }
            })
          }
          isTypeAheadEnabled={ true }
        />
      </div>

    );
  }
}
