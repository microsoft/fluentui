import { Dropdown } from '@fluentui/react-northstar';
import * as React from 'react';

const inputItems = [
  'Robert Tolbert',
  'Wanda Howard',
  'Tim Deboer',
  'Amanda Brady',
  'Ashley McCarthy',
  'Cameron Evans',
  'Carlos Slattery',
  'Carole Poland',
  'Robin Counts',
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
