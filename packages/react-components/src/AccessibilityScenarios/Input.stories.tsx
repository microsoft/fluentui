import * as React from 'react';

extractComponentArgTypes; // https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Input, InputOnChangeData } from '@fluentui/react-input';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Label } from '@fluentui/react-label';

// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Button } from '@fluentui/react-button';

import { Scenario } from './utils';
import { extractComponentArgTypes } from '@storybook/addon-docs';

export const RegistrationFormInputsAccessibilityScenario = () => {
  const validations: Record<string, any> = {
    fullName: {
      type: 'field',
      regexes: [/^[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ -]{1,50}$/],
    },
    nickName: {
      type: 'field',
      regexes: [/^[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ -]{0,20}$/],
    },
    password: {
      type: 'password',
      regexes: [
        /^[^ ]{8,20}$/,
        /^[^ ]*[0-9][^ ]*$/,
        /^[^ ]*[A-Z][^ ]*$/,
        /^[^ ]*[a-z][^ ]*$/,
        /^[^ ]*[^A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ ][^ ]*$/,
      ],
    },
  };

  const [values, setValues] = React.useState<Record<string, string>>({
    fullName: '',
    nickname: '',
    password: '',
  });
  const [invalids, setInvalids] = React.useState<Record<string, boolean>>({
    fullName: false,
    nikname: false,
    password: false,
  });
  const [isErrorMessageVisible, setIsErrorMessageVisible] = React.useState<Record<string, boolean>>({
    fullName: false,
    nickname: false,
    password: false,
  });
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleControlChange = (event: React.FormEvent<HTMLInputElement>, data: InputOnChangeData, name: string) => {
    const stateUpdate = { [name]: data.value };
    setValues({ ...values, ...stateUpdate });
  };
  const handleShowPasswordChange = (event: React.ChangeEvent) => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const validateForm = () => {
    for (const name in validations) {
      if (!validateControl(name)) {
        // Set the focus to the invalid control
        const validation = validations[name];
        let invalidControl;
        if (validation.type === 'field' || validation.type === 'password') {
          invalidControl = document.getElementById(name);
        }
        invalidControl?.focus();
        return false;
      }
    }
    return true;
  };

  const validateControl = (name: string) => {
    // First hide the error message if exists
    const validation = validations[name];
    let stateUpdate = { [name]: false };
    setIsErrorMessageVisible({ ...isErrorMessageVisible, ...stateUpdate });

    // If the control value is invalid, show the error and set the aria-invalid attribute
    const value = values[name];
    let isInvalid = false;
    if (validation.type === 'field' || validation.type === 'password') {
      for (let i = 0; i < validation.regexes.length; i++) {
        if (!validation.regexes[i].exec(value)) {
          isInvalid = true;
          break;
        }
      }
    }
    if (isInvalid) {
      // Set some timeout to give the element with role="alert" a chance to speak
      setTimeout(() => {
        stateUpdate = { [name]: true };
        setIsErrorMessageVisible({ ...isErrorMessageVisible, ...stateUpdate });
      }, 400);
      stateUpdate = { [name]: isInvalid };
      setInvalids({ ...invalids, ...stateUpdate });
      return false;
    }
    return true;
  };

  return (
    <Scenario pageTitle="Registration form inputs">
      <h1>Registration form</h1>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <Label htmlFor="fullName">Full name:</Label>
          <Input
            type="text"
            id="fullName"
            name="fullName"
            onChange={(event, data) => {
              handleControlChange(event, data, 'fullName');
            }}
            aria-required="true"
            aria-describedby="fullNameHint fullNameHint1 fullNameHint2"
          />
          <ErrorMessage isVisible={isErrorMessageVisible.fullName}>
            <p id="fullNameHint">Full name is invalid. It must</p>
            <ul>
              <li id="fullNameHint1">have at maximum 50 characters,</li>
              <li id="fullNameHint2">contain only lowercase or uppercase letters, spaces or hyphens.</li>
            </ul>
          </ErrorMessage>

          <Label htmlFor="nickname">Nickname:</Label>
          <Input
            type="text"
            id="nickname"
            name="nickname"
            onChange={(event, data) => {
              handleControlChange(event, data, 'nickname');
            }}
            aria-describedby="nicknameHint nicknameHint1 nicknameHint2"
          />
          <ErrorMessage isVisible={isErrorMessageVisible.nickname}>
            <p id="nicknameHint">Nickname is invalid. It must</p>
            <ul>
              <li id="nicknameHint1">have between 8 and 20 characters,</li>
              <li id="nicknameHint2">contain only lowercase or uppercase letters, spaces or hyphens.</li>
            </ul>
          </ErrorMessage>

          <Label htmlFor="password">Password:</Label>
          <Input
            type={isPasswordVisible ? 'text' : 'password'}
            id="password"
            name="password"
            onChange={(event, data) => {
              handleControlChange(event, data, 'password');
            }}
            aria-required="true"
            aria-describedby="passwordHint passwordHint1 passwordHint2"
          />
          <Label htmlFor="showPassword">Show password</Label>
          <input type="checkbox" id="showPassword" name="showPassword" onChange={handleShowPasswordChange} />
          <ErrorMessage isVisible={isErrorMessageVisible.password}>
            <p id="passwordHint">Password is invalid. It must</p>
            <ul>
              <li id="passwordHint1">have between 8 and 20 characters,</li>
              <li id="passwordHint2">
                contain at least one lower case letter, upper case letter, number and special character.
              </li>
            </ul>
          </ErrorMessage>

          <Button type="submit">Register</Button>
        </form>
      ) : (
        <p role="alert">The form is valid and would have been submitted.</p>
      )}
    </Scenario>
  );
};

interface ErrorMessageProps {
  isVisible: boolean;
  children: React.ReactNode;
}
const ErrorMessage = (props: ErrorMessageProps) => {
  const { isVisible, children } = props;

  return <div role="alert">{isVisible ? children : null}</div>;
};

export default {
  title: 'Accessibility Scenarios/ Registration form inputs',
  id: 'input-accessibility-scenario',
};
