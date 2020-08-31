import * as React from 'react';
import { Form, Datepicker, Button } from '@fluentui/react-northstar';

const labelId = 'choose-friend-label';

const FormExample = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted');
    }}
  >
    <Form.Field
      label={{ content: `Selecte a date:`, id: labelId }}
      control={{
        as: Datepicker,
        'aria-labelledby': labelId,
      }}
      name="chooseDate"
      id="date-with-error"
      errorMessage="Please select a date"
      required
    />
    <Form.Field control={{ as: Button, content: 'Submit' }} />
  </Form>
);

export default FormExample;
