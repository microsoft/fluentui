import * as React from 'react';
import { Form, Input, Text } from '@fluentui/react-northstar';

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
  {
    name: 'pizza',
    key: 'Custom',
    label: (
      <Text>
        Choose your own
        <Input
          input={{
            tabIndex: 0,
          }}
          inline
          styles={{
            fontSize: '12px',
            '& .ui-input__input': {
              padding: '2px 8px',
            },
          }}
          placeholder="flavour"
        />
      </Text>
    ),
    value: 'custom',
    'aria-label': 'Press Tab to change flavour',
  },
];

const FormComponents = () => (
  <Form>
    <Form.Input label="First name" name="firstName" id="first-name-inline" required />
    <Form.Dropdown label="City" id="cities-id" items={['prague', 'new york']} />
    <Form.RadioGroup label="Pizza" vertical defaultCheckedValue="prosciutto" items={items} />
    <Form.Slider />
    <Form.Checkbox label="I agree to the Terms and Conditions" id="conditions-inline" />
    <Form.Button content="Submit" />
  </Form>
);

export default FormComponents;
