import * as React from 'react';
import { Form, FormDatepicker, FormButton } from '@fluentui/react-northstar';

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
      <FormDatepicker
        label="Select a date"
        errorMessage={errorMessage}
        onDateChangeError={errorMessageHandler}
        onDateChange={successMessageHandler}
      />
      <FormButton content="Submit" />
    </Form>
  );
};

export default FormExampleDatepicker;
