import { Dropdown } from '@fluentui/react-northstar';
import * as React from 'react';

const inputItems = [
  'Bruce Wayne',
  'Natasha Romanoff',
  'Steven Strange',
  'Alfred Pennyworth',
  `Scarlett O'Hara`,
  'Imperator Furiosa',
  'Bruce Banner',
  'Peter Parker',
  'Selina Kyle',
];

const DropdownExampleRender: React.FC = () => (
  <Dropdown
    multiple
    search
    items={inputItems}
    placeholder="Start typing a name"
    renderItem={(Item: typeof Dropdown.Item, props) => <Item {...props} header={`${props.header} (active)`} />}
    renderSelectedItem={(SelectedItem: typeof Dropdown.SelectedItem, props) => (
      <SelectedItem {...props} header={`${props.header} (selected)`} />
    )}
  />
);

export default DropdownExampleRender;
