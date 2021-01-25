import * as React from 'react';
import { Form, Input, FormField, FormCheckbox, FormButton } from '@fluentui/react-northstar';

const FormExample = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted');
    }}
  >
    {/* TODO: Remove these FormField as soon inline is fixed in FormInput */}
    <FormField
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
    <FormField
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
    <FormCheckbox label="I agree to the Terms and Conditions" id="conditions-inline" />
    <FormButton content="Submit" />
  </Form>
);

export default FormExample;
