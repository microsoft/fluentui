import * as React from 'react';
import { Form } from '@fluentui/react-northstar';

const FormExampleRtl = () => (
  <Form>
    <Form.Input label="الاسم الاول" name="firstName" id="first-name" showSuccessIndicator={false} required />
    <Form.Input label="الكنية" name="lastName" id="last-name" required showSuccessIndicator={false} />
    <Form.Checkbox label="أوافق على الشروط" id="conditions" />
    <Form.Button content="خضع" />
  </Form>
);

export default FormExampleRtl;
