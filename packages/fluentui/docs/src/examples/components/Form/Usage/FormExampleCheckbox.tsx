import * as React from 'react';
import { Form } from '@fluentui/react-northstar';

const FormExampleCheckbox = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted');
    }}
  >
    <Form.Input
      label="Email"
      name="email"
      id="email-inline-shorthand"
      key="email"
      required
      inline
      showSuccessIndicator={false}
    />
    <Form.Checkbox label="Subscribe to newsletter" key="newsletter" id="newsletter-inline-shorthand" />
    <Form.Button content="Submit" key="submit" />
  </Form>
);

export default FormExampleCheckbox;
