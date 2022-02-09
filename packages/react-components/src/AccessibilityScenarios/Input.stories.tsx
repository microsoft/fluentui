import * as React from 'react';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Input } from '@fluentui/react-input';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Label } from '@fluentui/react-label';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from '@fluentui/react-button';

import { Scenario } from './utils';

export const RegistrationFormInputsAccessibilityScenario: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Registration form inputs">
      <h1>Registration form</h1>

      <Label htmlFor="name">Name:</Label>
      <Input type="text" id="name" name="name" />

      <Label htmlFor="password">Password:</Label>
      <Input type="password" id="password" name="password" />

      <Label htmlFor="confirmPassword">Confirm password:</Label>
      <Input type="password" id="confirmPassword" name="confirmPassword" />

      <Button>Submit</Button>
    </Scenario>
  );
};

export default {
  title: 'Accessibility Scenarios/ Registration form inputs',
  id: 'input-accessibility-scenario',
};
