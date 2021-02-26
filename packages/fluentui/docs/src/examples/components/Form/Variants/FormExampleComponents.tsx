import * as React from 'react';
import {
  Form,
  FormInput,
  FormDropdown,
  FormRadioGroup,
  FormSlider,
  FormCheckbox,
  FormDatepicker,
  FormButton,
  FormTextArea,
} from '@fluentui/react-northstar';

const items = [
  {
    name: 'pizza',
    key: 'Capricciosa',
    label: 'Capricciosa',
    value: 'capricciosa',
  },
  {
    name: 'pizza',
    key: 'Prosciutto',
    label: 'Prosciutto',
    value: 'prosciutto',
    disabled: true,
  },
  {
    name: 'pizza',
    key: 'Pepperoni',
    label: 'Pepperoni',
    value: 'pepperoni',
  },
];

const FormExampleComponents = () => (
  <Form>
    <FormInput label="First name" name="firstName" required />
    <FormTextArea label="Bio" name="bio" />
    <FormDropdown label="City" items={['prague', 'new york']} />
    <FormRadioGroup label="Pizza" vertical defaultCheckedValue="prosciutto" items={items} />
    <FormSlider label="Bid the price" />
    <FormCheckbox label="I agree to the Terms and Conditions" />
    <FormDatepicker label="Select a date" />
    <FormButton content="Submit" />
  </Form>
);

export default FormExampleComponents;
