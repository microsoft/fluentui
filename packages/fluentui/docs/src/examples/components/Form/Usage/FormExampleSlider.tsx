import * as React from 'react';
import { Form, FormSlider, FormButton } from '@fluentui/react-northstar';

const FormExampleSlider = () => (
  <Form onSubmit={() => alert('Form submitted')}>
    <FormSlider label="Age" id="age" />
    <FormButton content="Submit" />
  </Form>
);

export default FormExampleSlider;
