import * as React from 'react';
import { Form, Button, Input } from '@fluentui/react-northstar';

const fields = [
  {
    label: 'First name',
    name: 'firstName',
    id: 'first-name-error',
    key: 'first-name',
    errorMessage: 'You can not fix this error',
    required: true,
  },
  {
    label: 'Last name',
    name: 'lastName',
    id: 'last-name-satisfactory',
    key: 'last-name',
    control: {
      as: Input,
      showSuccessIndicator: true,
      required: true,
    },
  },
  { control: { as: Button, content: 'Submit' }, key: 'submit' },
];

const FormExampleErrorAndSatisfactory = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted');
    }}
    fields={fields}
  />
);

export default FormExampleErrorAndSatisfactory;
