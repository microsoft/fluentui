import React from 'react';
import { Dropdown } from 'office-ui-fabric-react';
import { storiesOf, action } from '@kadira/storybook';


storiesOf('Dropdown', module)
  .add('Basic', () => (
    <div>
      <Dropdown
        label='Basic example:'
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
        onChanged={(item) => this.setState({ selectedItem: item })}
      />
    </div>
  ))