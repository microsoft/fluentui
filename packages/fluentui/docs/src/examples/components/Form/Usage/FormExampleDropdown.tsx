import * as React from 'react';
import { Form, Dropdown, Button, FormField } from '@fluentui/react-northstar';

const labelId = 'choose-friend-label';

const FormExample = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted');
    }}
  >
    <FormField
      label={{ content: `Your best friend's name is:`, id: labelId }}
      control={{
        as: Dropdown,
        items: ['John Doe', 'Dohn Joe', 'John Joe', 'Dohn Doe'],
        'aria-labelledby': labelId,
        search: true,
        placeholder: 'Choose a friend',
      }}
      name="chooseFriend"
    />
    <FormField control={{ as: Button, content: 'Submit' }} />
  </Form>
);

export default FormExample;
