import * as React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import './Dropdown.Basic.Example.scss';

export class DropdownBasicExample extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      selectedItem: null,
      pageSize: 10,
    };
  }

  public render() {
    let { selectedItem } = this.state;

    return (
      <div className='ms-DropdownBasicExample'>

        <Dropdown
          label='Basic uncontrolled example:'
          id='Basicdrop1'
          ariaLabel='Basic dropdown example'
          options={
            [
              { key: 'A', text: 'Option a' },
              { key: 'B', text: 'Option b' },
              { key: 'C', text: 'Option c' },
              { key: 'D', text: 'Option d' },
              { key: 'E', text: 'Option e' },
              { key: 'F', text: 'Option f' },
              { key: 'G', text: 'Option g' },
              { key: 'H', text: 'Option h' },
              { key: 'I', text: 'Option i' },
              { key: 'J', text: 'Option j' },
            ]
          }
        />

        <Dropdown
          label='Disabled uncontrolled example with defaultSelectedKey:'
          defaultSelectedKey='D'
          options={
            [
              { key: 'A', text: 'Option a' },
              { key: 'B', text: 'Option b' },
              { key: 'C', text: 'Option c' },
              { key: 'D', text: 'Option d' },
              { key: 'E', text: 'Option e' },
              { key: 'F', text: 'Option f' },
              { key: 'G', text: 'Option g' },
            ]
          }
          disabled={ true }
        />

        <Dropdown
          label='Controlled example:'
          selectedKey={ selectedItem && selectedItem.key }
          onChanged={ (item) => this.setState({ selectedItem: item }) }
          options={
            [
              { key: 'A', text: 'Option a' },
              { key: 'B', text: 'Option b' },
              { key: 'C', text: 'Option c' },
              { key: 'D', text: 'Option d' },
              { key: 'E', text: 'Option e' },
              { key: 'F', text: 'Option f' },
              { key: 'G', text: 'Option g' },
            ]
          }
        />

        <Dropdown
          label="Paginated dropdown sample:"
          pageSize={ this.state.pageSize }
          options={
            [
              { key: 'A', text: 'Option a' },
              { key: 'B', text: 'Option b' },
              { key: 'C', text: 'Option c' },
              { key: 'D', text: 'Option d' },
              { key: 'E', text: 'Option e' },
              { key: 'F', text: 'Option f' },
              { key: 'G', text: 'Option g' },
              { key: 'H', text: 'Option h' },
              { key: 'I', text: 'Option i' },
              { key: 'J', text: 'Option j' },
              { key: 'K', text: 'Option k' },
              { key: 'L', text: 'Option l' },
              { key: 'M', text: 'Option m' },
              { key: 'N', text: 'Option n' },
              { key: 'O', text: 'Option o' },
              { key: 'P', text: 'Option p' },
              { key: 'Q', text: 'Option q' },
              { key: 'R', text: 'Option r' },
              { key: 'S', text: 'Option s' },
              { key: 'T', text: 'Option t' },
              { key: 'U', text: 'Option u' },
              { key: 'V', text: 'Option v' },
              { key: 'W', text: 'Option w' },
              { key: 'X', text: 'Option x' },
              { key: 'Y', text: 'Option y' },
              { key: 'Z', text: 'Option z' }
            ]
          }
        />

        <Slider
          label='Set page size:'
          min={ 1 }
          max={ 26 }
          step={ 1 }
          defaultValue={ this.state.pageSize }
          showValue={ true }
          onChange={ (value) => this.setState({ pageSize: value }) }
        />
      </div>

    );
  }

}
