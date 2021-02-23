import * as React from 'react';
import { Form, FormInput, FormCheckbox, FormButton } from '@fluentui/react-northstar';

const FormExampleCheckbox = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted');
    }}
  >
    <FormInput
      label="Email"
      name="email"
      id="email-inline-shorthand"
      key="email"
      required
      inline
      showSuccessIndicator={false}
    />
    <FormCheckbox label="Subscribe to newsletter" key="newsletter" id="newsletter-inline-shorthand" />
    <FormButton content="Submit" key="submit" />
  </Form>
);

export default FormExampleCheckbox;
