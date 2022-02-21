import * as React from 'react';

import { Input, InputOnChangeData } from '@fluentui/react-input';
import { Label } from '@fluentui/react-label';
import { Button } from '@fluentui/react-button';

import { Scenario } from './utils';

type InputValidation = {
  type: string;
  regexes: RegExp[];
};

const validations: Record<string, InputValidation> = {
  fullName: {
    type: 'field',
    regexes: [/^[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ -]{2,50}$/],
  },
  nickname: {
    type: 'field',
    regexes: [/^[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ -]{2,20}$|^$/],
  },
  password: {
    type: 'password',
    regexes: [
      /^[^ ]{8,30}$/,
      /^[^ ]*[0-9][^ ]*$/,
      /^[^ ]*[A-Z][^ ]*$/,
      /^[^ ]*[a-z][^ ]*$/,
      /^[^ ]*[^A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ ][^ ]*$/,
    ],
  },
};

const getAriaDescribedby = (name: string, isVisible: boolean) => {
  if (!isVisible) {
    return '';
  }
  return `${name}Error`;
};

let errorTimeout: number;
const narrate = (element: HTMLElement, priority = 'polite') => {
  window.clearTimeout(errorTimeout);
  const wrapper = document.createElement('div');
  wrapper.setAttribute(
    'style',
    'position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden;',
  );
  wrapper.setAttribute('aria-live', priority);
  document.body.appendChild(wrapper);

  errorTimeout = window.setTimeout(() => {
    const clone = element.cloneNode(true) as HTMLElement;
    clone.removeAttribute('id');
    wrapper.appendChild(clone);
  }, 1000);

  window.setTimeout(() => {
    document.body.removeChild(wrapper);
  }, 1300);
};

export const RegistrationFormInputsAccessibilityScenario = () => {
  const [values, setValues] = React.useState<Record<string, string>>({
    fullName: '',
    nickname: '',
    password: '',
  });
  const [invalids, setInvalids] = React.useState<Record<string, boolean>>({
    fullName: false,
    nickname: false,
    password: false,
  });
  const [isErrorMessageVisible, setIsErrorMessageVisible] = React.useState<Record<string, boolean>>({
    fullName: false,
    nickname: false,
    password: false,
  });
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  // const testError: React.ReactElement = <b>hello world</b>;

  const handleControlChange = (event: React.FormEvent, data: InputOnChangeData, name: string) => {
    const stateUpdate = { [name]: data.value };
    setValues({ ...values, ...stateUpdate });
  };
  const handleShowPasswordChange = (event: React.ChangeEvent) => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleControlBlur = (event: React.FormEvent, name: string) => {
    validateControl(name);
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
    const validation = validations[name];
    const value = values[name];
    let isInvalid = false;
    let stateUpdate;
    if (validation.type === 'field' || validation.type === 'password') {
      for (let i = 0; i < validation.regexes.length; i++) {
        if (!validation.regexes[i].exec(value)) {
          isInvalid = true;
          break;
        }
      }
    }

    // If the control value is invalid, show the error, narrate it and set the aria-invalid attribute
    if (isInvalid) {
      stateUpdate = { [name]: true };
      setIsErrorMessageVisible({ ...isErrorMessageVisible, ...stateUpdate });
      const error = document.getElementById(`${name}Error`);
      if (error) {
        narrate(error, 'assertive');
      }
      stateUpdate = { [name]: isInvalid };
      setInvalids({ ...invalids, ...stateUpdate });
      return false;
    } else {
      // Otherwise, hide the error message
      stateUpdate = { [name]: false };
      setIsErrorMessageVisible({ ...isErrorMessageVisible, ...stateUpdate });
    }
    return true;
  };

  return (
    <Scenario pageTitle="Registration form inputs">
      <h2>Registration form</h2>
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
            onBlur={(event: React.FocusEvent) => {
              handleControlBlur(event, 'fullName');
            }}
            aria-required="true"
            aria-invalid={invalids.fullName}
            aria-describedby={getAriaDescribedby('fullName', isErrorMessageVisible.fullName)}
          />
          <ErrorMessage controlName="fullName" isVisible={isErrorMessageVisible.fullName}>
            <p>Full name is invalid. It must</p>
            <ul>
              <li>have between 2 and 50 characters,</li>
              <li>contain only lowercase or uppercase letters, spaces or hyphens.</li>
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
            onBlur={(event: React.FocusEvent) => {
              handleControlBlur(event, 'nickname');
            }}
            aria-invalid={invalids.nickname}
            aria-describedby={getAriaDescribedby('nickname', isErrorMessageVisible.nickname)}
          />
          <ErrorMessage controlName="nickname" isVisible={isErrorMessageVisible.nickname}>
            <p>Nickname is invalid. If entered, it must</p>
            <ul>
              <li>have between 2 and 20 characters,</li>
              <li>contain only lowercase or uppercase letters, spaces or hyphens.</li>
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
            onBlur={(event: React.FocusEvent) => {
              handleControlBlur(event, 'password');
            }}
            aria-required="true"
            aria-invalid={invalids.password}
            aria-describedby={getAriaDescribedby('password', isErrorMessageVisible.password)}
          />
          <Label htmlFor="showPassword">Show password</Label>
          <input type="checkbox" id="showPassword" name="showPassword" onChange={handleShowPasswordChange} />
          <ErrorMessage controlName="password" isVisible={isErrorMessageVisible.password}>
            <p>Password is invalid. It must</p>
            <ul>
              <li>have between 8 and 30 characters,</li>
              <li>contain at least one lower case letter, upper case letter, number and special character.</li>
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
  controlName: string;
  isVisible: boolean;
  children: React.ReactNode;
}
const ErrorMessage = (props: ErrorMessageProps) => {
  const { controlName: controlId, isVisible, children } = props;
  const id = `${controlId}Error`;
  const styles = {
    display: isVisible ? 'block' : 'none',
  };

  return (
    <div id={id} style={styles}>
      {children}
    </div>
  );
};

export default {
  title: 'Accessibility Scenarios/ Registration form inputs',
  id: 'input-accessibility-scenario',
};
