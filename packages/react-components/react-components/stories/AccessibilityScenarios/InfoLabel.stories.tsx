import * as React from 'react';

import { InfoLabel } from '@fluentui/react-components/unstable';
import { Input, Button } from '@fluentui/react-components';

import { Scenario } from './utils';

export const RegistrationFormInfoLabels: React.FunctionComponent = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (isSubmitted) {
      document.getElementById('formSubmittedText')?.focus();
    }
  }, [isSubmitted]);

  const onSubmit = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <Scenario pageTitle="Registration form info labels">
      <h1>Registration form</h1>
      {!isSubmitted ? (
        <form onSubmit={onSubmit}>
          <InfoLabel
            htmlFor="name"
            required
            infoButton={{
              id: 'name-infoButton',
              'aria-label': 'Why we need your name?',
              'aria-labelledby': 'name-infoButton',
            }}
            info={<p>This is for us to know how to call you.</p>}
          >
            Name:
          </InfoLabel>
          <Input type="text" id="name" name="name" aria-required="true" />
          <InfoLabel
            htmlFor="email"
            required
            infoButton={{
              id: 'email-infoButton',
              'aria-label': 'Why we need your email?',
              'aria-labelledby': 'email-infoButton',
            }}
            info={
              <p>
                We will use this only to send you account related information and updates to our terms and conditions.
              </p>
            }
          >
            Email:
          </InfoLabel>
          <Input type="email" id="email" name="email" aria-required="true" />
          <InfoLabel htmlFor="password" required>
            Password:
          </InfoLabel>
          <Input type="password" id="password" name="password" aria-required="true" />
          <Button type="submit">Submit</Button>
        </form>
      ) : (
        <p id="formSubmittedText" tabIndex={-1}>
          The form would have been submitted.
        </p>
      )}
    </Scenario>
  );
};
