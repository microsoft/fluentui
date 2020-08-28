import * as React from 'react';
import { Form, Button, Checkbox, Input } from '@fluentui/react-northstar';

const FormExampleCheckbox = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted');
    }}
  >
    <Form.Field
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
    <Form.Field
      control={{
        as: Checkbox,
        label: 'Subscribe to newsletter',
      }}
      key="newsletter"
      id="newsletter-inline-shorthand"
    />
    <Form.Field
      control={{
        as: Button,
        content: 'Submit',
      }}
      key="submit"
    />
  </Form>
);

export default FormExampleCheckbox;
