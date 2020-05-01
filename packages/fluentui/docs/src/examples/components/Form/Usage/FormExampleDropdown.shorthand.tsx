import * as React from 'react';
import { Form, Dropdown, Button } from '@fluentui/react-northstar';

const labelId = 'choose-friend-label';
const fields = [
  {
    label: { content: `Your best friend's name is:`, id: labelId },
    name: 'chooseFriend',
    key: 'choose-friend',
    id: 'choose-friend-shorthand',
    control: {
      as: Dropdown,
      items: ['John Doe', 'Dohn Joe', 'John Joe', 'Dohn Doe'],
      'aria-labelledby': labelId,
      search: true,
      placeholder: 'Choose a friend',
      searchInput: {
        id: 'choose-friend-shorthand', // id needs to end up on the search input.
      },
      id: undefined, // not on the main wrapper element.
    },
  },
  { control: { as: Button, content: 'Submit' }, key: 'submit' },
];

const FormExample = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted');
    }}
    fields={fields}
  />
);

export default FormExample;
