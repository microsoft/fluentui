import * as React from 'react';
import { Form, Slider, Button } from '@fluentui/react-northstar';

const FormExampleSlider = () => (
  <Form onSubmit={() => alert('Form submitted')}>
    <Form.Field label="Age" control={{ as: Slider }} id="age" />
    <Form.Field control={{ as: Button, content: 'Submit' }} />
  </Form>
);

export default FormExampleSlider;
