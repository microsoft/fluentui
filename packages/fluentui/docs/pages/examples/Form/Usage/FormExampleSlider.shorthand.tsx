import * as React from 'react';
import { Form, Slider, Button } from '@fluentui/react-northstar';

const FormExampleFormExampleSliderShorthand = () => (
  <Form
    onSubmit={() => alert('Form submitted')}
    fields={[
      { label: 'Age', control: { as: Slider }, id: 'age', key: 'age' },
      { control: { as: Button, content: 'Submit' }, key: 'submit' },
    ]}
  />
);

export default FormExampleFormExampleSliderShorthand;
