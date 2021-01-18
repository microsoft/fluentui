import * as React from 'react';
import { Form } from '@fluentui/react-northstar';

const FormExampleSlider = () => (
  <Form onSubmit={() => alert('Form submitted')}>
    <Form.Slider label="Age" id="age" />
    <Form.Button content="Submit" />
  </Form>
);

export default FormExampleSlider;
