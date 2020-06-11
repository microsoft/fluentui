import * as React from 'react';
import { Form, Button, Checkbox } from '@fluentui/react-northstar';

const fields = [
  {
    label: 'Email',
    name: 'email',
    id: 'email-inline-shorthand',
    key: 'email',
    inline: true,
  },
  {
    control: {
      as: Checkbox,
      label: 'Subscribe to newsletter',
    },
    key: 'newsletter',
    id: 'newsletter-inline-shorthand',
  },
  {
    control: {
      as: Button,
      content: 'Submit',
    },
    key: 'submit',
  },
];

const FormExampleCheckbox = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted');
    }}
    fields={fields}
  />
);

export default FormExampleCheckbox;
