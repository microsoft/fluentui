import * as React from 'react';
import { Form, Button, Input, FormProps } from '@fluentui/react-northstar';

const fields: FormProps['fields'] = [
  {
    label: 'First name',
    name: 'firstName',
    id: 'first-name-shorthand',
    key: 'first-name',
    required: true,
    control: {
      as: Input,
      showSuccessIndicator: false,
    },
  },
  {
    label: 'Last name',
    name: 'lastName',
    id: 'last-name-shorthand',
    key: 'last-name',
    required: true,
    control: {
      as: Input,
      showSuccessIndicator: false,
    },
  },
  {
    label: 'I agree to the Terms and Conditions',
    control: { as: 'input' as const },
    type: 'checkbox',
    id: 'conditions-shorthand',
    key: 'conditions',
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
