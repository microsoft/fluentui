import * as React from 'react';
import { Form, Button } from '@fluentui/react-northstar';

const FormExampleDatepicker = () => {
  const [errorMessage, setErrorMessage] = React.useState(null);
  const errorMessageHandler = (e, v) => {
    setErrorMessage(v.error);
  };
  const successMessageHandler = (e, v) => {
    setErrorMessage(null);
  };
  return (
    <Form
      onSubmit={() => {
        alert('Form was submitted');
      }}
    >
      <Form.Datepicker
        label="Select a date"
        errorMessage={errorMessage}
        onDateChangeError={errorMessageHandler}
        onDateChange={successMessageHandler}
      />
      <Form.Field>
        <Button>Submit</Button>
      </Form.Field>
    </Form>
  );
};

export default FormExampleDatepicker;
