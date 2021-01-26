import * as React from 'react';
import { Form, Button, Input, FormField } from '@fluentui/react-northstar';

const FormExample = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted');
    }}
  >
    <FormField
      label="First name"
      name="firstName"
      id="first-name"
      required
      control={{
        as: Input,
        showSuccessIndicator: false,
      }}
    />
    <FormField
      label="Last name"
      name="lastName"
      id="last-name"
      required
      control={{
        as: Input,
        showSuccessIndicator: false,
      }}
    />
    <FormField label="I agree to the Terms and Conditions" control={{ as: 'input' }} type="checkbox" id="conditions" />
    <FormField control={{ as: Button, content: 'Submit' }} />
  </Form>
);

export default FormExample;
