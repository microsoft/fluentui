import * as React from 'react';
import { Form, FormInput, FormCheckbox, FormButton } from '@fluentui/react-northstar';

const FormExampleRtl = () => (
  <Form>
    <FormInput label="الاسم الاول" name="firstName" id="first-name" showSuccessIndicator={false} required />
    <FormInput label="الكنية" name="lastName" id="last-name" required showSuccessIndicator={false} />
    <FormCheckbox label="أوافق على الشروط" id="conditions" />
    <FormButton content="خضع" />
  </Form>
);

export default FormExampleRtl;
