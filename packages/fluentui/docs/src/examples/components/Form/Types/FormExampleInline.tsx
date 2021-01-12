import * as React from 'react';
import { Form, Button, Checkbox, Input } from '@fluentui/react-northstar';

const FormExample = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted');
    }}
  >
    <Form.Field
      label="First name"
      name="firstName"
      id="first-name-inline"
      inline
      required
      control={{
        as: Input,
        showSuccessIndicator: false,
      }}
    />
    <Form.Field
      label="Last name"
      name="lastName"
      id="last-name-inline"
      inline
      required
      control={{
        as: Input,
        showSuccessIndicator: false,
      }}
    />
    <Form.Field control={{ as: Checkbox, label: 'I agree to the Terms and Conditions' }} id="conditions-inline" />
    <Form.Field control={{ as: Button, content: 'Submit' }} />
  </Form>
);

export default FormExample;
