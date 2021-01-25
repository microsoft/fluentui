import * as React from 'react';
import { Form, Button, Checkbox, Input, FormField } from '@fluentui/react-northstar';

const FormExampleCheckbox = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted');
    }}
  >
    <FormField
      label="Email"
      name="email"
      id="email-inline-shorthand"
      key="email"
      required
      inline
      control={{
        as: Input,
        showSuccessIndicator: false,
      }}
    />
    <FormField
      control={{
        as: Checkbox,
        label: 'Subscribe to newsletter',
      }}
      key="newsletter"
      id="newsletter-inline-shorthand"
    />
    <FormField
      control={{
        as: Button,
        content: 'Submit',
      }}
      key="submit"
    />
  </Form>
);

export default FormExampleCheckbox;
