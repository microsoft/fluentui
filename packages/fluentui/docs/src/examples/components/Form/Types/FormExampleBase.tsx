import * as React from 'react';
import { Form } from '@fluentui/react-northstar';

const FormExample = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted');
    }}
  >
    <Form.Input label="First name" name="firstName" id="first-name" required showSuccessIndicator={false} />
    <Form.Input label="Last name" name="lastName" id="last-name" required showSuccessIndicator={false} />
    <Form.Checkbox label="I agree to the Terms and Conditions" id="conditions" />
    <Form.Button content="Submit" />
  </Form>
);

export default FormExample;
