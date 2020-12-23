import { useBooleanKnob } from '@fluentui/docs-components';
import * as React from 'react';
import { Form } from '@fluentui/react-northstar';

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

const FormExampleComponents = () => {
  const [visible1, setVisible1] = useBooleanKnob({ name: 'visible1', initialValue: false });
  const [visible2, setVisible2] = useBooleanKnob({ name: 'visible2', initialValue: false });

  const setError1 = e => {
    if (e.keyCode === 65) {
      setVisible1(true);
      return;
    }
    setVisible1(false);
  };

  const setError2 = e => {
    if (e.keyCode === 65) {
      setVisible2(true);
      return;
    }
    setVisible2(false);
  };

  return (
    <Form>
      <Form.Input
        onKeyDown={e => setError1(e)}
        label="First name"
        name="firstName"
        required
        errorMessage={visible1 && 'input error message'}
      />
      <Form.Dropdown
        label="City"
        items={['prague', 'new york']}
        errorMessage={visible2 && 'input error message'}
        onKeyDown={e => setError2(e)}
      />
      <Form.RadioGroup
        label="Pizza"
        errorMessage="error radioGroup"
        vertical
        defaultCheckedValue="prosciutto"
        items={items}
      />
      <Form.Slider label="Bid the price" errorMessage="error slider" />
      <Form.Checkbox errorMessage="error checkbox" label="I agree to the Terms and Conditions" />
      <Form.Datepicker label="Select a date" errorMessage="You can not fix this error" />
      <Form.Button content="Submit" />
    </Form>
  );
};

export default FormExampleComponents;
