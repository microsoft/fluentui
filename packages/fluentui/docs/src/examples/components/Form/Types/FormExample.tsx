import * as React from 'react';
import { Form, Button } from '@fluentui/react-northstar';

const FormExample = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted');
    }}
  >
    <Form.Field label="First name" name="firstName" id="first-name" required />
    <Form.Field label="Last name" name="lastName" id="last-name" required />
    <Form.Field label="I agree to the Terms and Conditions" control={{ as: 'input' }} type="checkbox" id="conditions" />
    <Form.Field control={{ as: Button, content: 'Submit' }} />
  </Form>
);

export default FormExample;
