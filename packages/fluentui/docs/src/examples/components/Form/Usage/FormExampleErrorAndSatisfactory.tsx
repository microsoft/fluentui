import * as React from 'react';
import { Form, Button } from '@fluentui/react-northstar';
import { PresenceAvailableIcon } from '@fluentui/react-icons-northstar';

const FormExampleErrorAndSatisfactory = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted');
    }}
  >
    <Form.Field label="First name" name="firstName" id="first-name-shorthand" errorMessage={'ERROR'} required={true} />
    <Form.Field
      label="Last name"
      name="lastName"
      id="last-name-shorthand"
      satisfactoryIndicator={<PresenceAvailableIcon />}
      required={true}
    />
    <Form.Field control={{ as: Button, content: 'Submit' }} />
  </Form>
);

export default FormExampleErrorAndSatisfactory;
