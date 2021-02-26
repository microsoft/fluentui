import * as React from 'react';
import { Form, FormInput, FormCheckbox, FormButton } from '@fluentui/react-northstar';

const FormExample = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted');
    }}
  >
    <FormInput label="First name" name="firstName" id="first-name" required showSuccessIndicator={false} />
    <FormInput label="Last name" name="lastName" id="last-name" required showSuccessIndicator={false} />
    <FormCheckbox label="I agree to the Terms and Conditions" id="conditions" />
    <FormButton content="Submit" />
  </Form>
);

export default FormExample;
