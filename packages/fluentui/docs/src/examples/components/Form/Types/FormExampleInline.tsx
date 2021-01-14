import * as React from 'react';
import { Form, Input } from '@fluentui/react-northstar';

const FormExample = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted');
    }}
  >
    {/* TODO: Remove these Form.Field as soon inline is fixed in Form.Input */}
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
    <Form.Checkbox label="I agree to the Terms and Conditions" id="conditions-inline" />
    <Form.Button content="Submit" />
  </Form>
);

export default FormExample;
