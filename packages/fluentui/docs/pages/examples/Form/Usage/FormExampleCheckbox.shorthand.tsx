import * as React from 'react';
import { Form, Button, Checkbox, Input } from '@fluentui/react-northstar';

const fields = [
  {
    label: 'Email',
    name: 'email',
    id: 'email-inline-shorthand',
    key: 'email',
    required: true,
    inline: true,
    control: {
      as: Input,
      showSuccessIndicator: false,
    },
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
