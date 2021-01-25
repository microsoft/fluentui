import * as React from 'react';
import { Form, Button, Input, FormField, FormLabel, FormMessage } from '@fluentui/react-northstar';
import { PresenceAvailableIcon } from '@fluentui/react-icons-northstar';

const FormExampleErrorAndSatisfactory = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted');
    }}
  >
    <FormField>
      <FormLabel htmlFor="firstname-with-error" id="first-name-label">
        First Name*
      </FormLabel>
      <Input error name="first-name" aria-labelledby="first-name-label message-id" id="firstname-with-error" />
      <FormMessage id="message-id" role="alert" error>
        Error Message
      </FormMessage>
    </FormField>
    <FormField
      label="Last name"
      name="LastName"
      id="last-name-shorthand-with-error"
      errorMessage="You can not fix this error"
      required
    />
    <FormField>
      <FormLabel id="email-label" htmlFor="email-field">
        E-mail*
      </FormLabel>
      <Input successIndicator={<PresenceAvailableIcon />} required name="email-field" id="email-field" />
    </FormField>
    <FormField>
      <Button>Submit</Button>
    </FormField>
  </Form>
);

export default FormExampleErrorAndSatisfactory;
