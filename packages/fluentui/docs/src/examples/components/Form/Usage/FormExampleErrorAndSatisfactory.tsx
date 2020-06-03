import * as React from 'react';
import { Form, Button, Input } from '@fluentui/react-northstar';
import { PresenceAvailableIcon } from '@fluentui/react-icons-northstar';

const FormExampleErrorAndSatisfactory = () => (
  <Form
    onSubmit={() => {
      alert('Form submitted');
    }}
  >
    <Form.Field>
      <Form.Label htmlFor="firstname">First Name*</Form.Label>
      <Input error name="first-name" id="firstname" />
      <Form.Message error>Error Message</Form.Message>
    </Form.Field>
    <Form.Field
      label="Middle name"
      name="MiddleName"
      id="Middle-name-shorthand"
      errorMessage={'ERROR'}
      required={true}
    />
    <Form.Field
      label="Last name"
      name="lastName"
      id="last-name-shorthand"
      successIndicator={<PresenceAvailableIcon />}
      required={true}
    />
    <Form.Field>
      <Form.Label htmlFor="email">E-mail*</Form.Label>
      <Input successIndicator={<PresenceAvailableIcon />} required name="email-field" id="email" />
    </Form.Field>
    <Form.Field control={{ as: Button, content: 'Submit' }} />
  </Form>
);

export default FormExampleErrorAndSatisfactory;
