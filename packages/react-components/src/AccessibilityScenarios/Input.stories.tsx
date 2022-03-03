import * as React from 'react';

import { Input } from '@fluentui/react-input';
import { Label } from '@fluentui/react-label';
import { Button } from '@fluentui/react-button';

import { Scenario } from './utils';

import { useForm } from 'react-hook-form';

const regexes = {
  onlyNameChars: /^[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ -]*$/,
  // eslint-disable-next-line @fluentui/max-len
  startsAndEndsWithLetter: /^([A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ][A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ -]*[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ])?$/,
  noWhitespace: /^\S*$/,
  hasNumber: /^\S*[0-9]\S*$/,
  hasLowercaseLetter: /^\S*[a-z]\S*$/,
  hasUppercaseLetter: /^\S*[A-Z]\S*$/,
  hasSpecialChar: /^\S*[^0-9a-zA-ZÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ\s]\S*$/,
};

let errorTimeout: number;
const narrate = (id: string, priority = 'polite') => {
  window.clearTimeout(errorTimeout);
  const wrapper = document.createElement('div');
  wrapper.setAttribute(
    'style',
    'position: absolute; left: -10000px; top: auto; width: 1px; height: 1px; overflow: hidden;',
  );
  wrapper.setAttribute('aria-live', priority);
  document.body.appendChild(wrapper);

  errorTimeout = window.setTimeout(() => {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }
    const clone = element.cloneNode(true) as HTMLElement;
    clone.removeAttribute('id');
    wrapper.appendChild(clone);
  }, 1000);

  window.setTimeout(() => {
    document.body.removeChild(wrapper);
  }, 1300);
};

interface FormInputs {
  fullName: string;
  nickname: string;
  password: string;
}

export const RegistrationFormInputsAccessibilityScenario = () => {
  const { register, handleSubmit, errors, formState } = useForm<FormInputs>({
    validateCriteriaMode: 'all',
    mode: 'onBlur',
  });

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isSubmittedAndValid, setIsSubmittedAndValid] = React.useState(false);

  React.useEffect(() => {
    if (isSubmittedAndValid) {
      document.getElementById('validMessage')?.focus();
    }
  }, [isSubmittedAndValid]);

  const onSubmit = (data: FormInputs, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();
    if (formState.isValid) {
      setIsSubmittedAndValid(true);
    }
  };

  const onShowPasswordChange = (event: React.ChangeEvent) => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Scenario pageTitle="Registration form inputs">
      <h2>Registration form</h2>
      {!isSubmittedAndValid ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="fullName">Full name:</Label>
          <Input
            type="text"
            id="fullName"
            name="fullName"
            ref={register({
              required: true,
              minLength: 2,
              maxLength: 50,
              validate: {
                onlyNameChars: value => regexes.onlyNameChars.test(value),
                startsAndEndsWithLetter: value => regexes.startsAndEndsWithLetter.test(value),
                always: () => {
                  narrate('fullNameErrors');
                  return true;
                },
              },
            })}
            aria-required="true"
            aria-invalid={!!errors.fullName}
            aria-describedby="fullNameErrors"
          />
          {errors.fullName?.types && (
            <div id="fullNameErrors">
              {'required' in errors.fullName.types ? (
                <p>Full name is required.</p>
              ) : (
                <>
                  <p>Full name is invalid. It must:</p>
                  <ul>
                    {('minLength' in errors.fullName.types || 'maxLength' in errors.fullName.types) && (
                      <li>Have between 2 and 50 characters.</li>
                    )}
                    {'onlyNameChars' in errors.fullName.types && (
                      <li>Contain only lowercase or uppercase letters, spaces or hyphens.</li>
                    )}
                    {'startsAndEndsWithLetter' in errors.fullName.types && <li>Start and end wit letter.</li>}
                  </ul>
                </>
              )}
            </div>
          )}

          <Label htmlFor="nickname">Nickname:</Label>
          <Input
            type="text"
            id="nickname"
            name="nickname"
            ref={register({
              minLength: 2,
              maxLength: 20,
              validate: {
                onlyNameChars: value => regexes.onlyNameChars.test(value),
                startsAndEndsWithLetter: value => regexes.startsAndEndsWithLetter.test(value),
                always: () => {
                  narrate('nicknameErrors');
                  return true;
                },
              },
            })}
            aria-invalid={!!errors.nickname}
            aria-describedby="nicknameErrors"
          />
          {errors.nickname?.types && (
            <div id="nicknameErrors">
              <p>Nickname is invalid. It must:</p>
              <ul>
                {('minLength' in errors.nickname.types || 'maxLength' in errors.nickname.types) && (
                  <li>Have between 2 and 20 characters.</li>
                )}
                {'onlyNameChars' in errors.nickname.types && (
                  <li>Contain only lowercase or uppercase letters, spaces or hyphens.</li>
                )}
                {'startsAndEndsWithLetter' in errors.nickname.types && <li>Start and end wit letter.</li>}
              </ul>
            </div>
          )}

          <Label htmlFor="password">Password:</Label>
          <Input
            type={isPasswordVisible ? 'text' : 'password'}
            id="password"
            name="password"
            ref={register({
              required: true,
              minLength: 8,
              maxLength: 20,
              validate: {
                hasLowercaseLetter: value => regexes.hasLowercaseLetter.test(value),
                hasUppercaseLetter: value => regexes.hasUppercaseLetter.test(value),
                hasNumber: value => regexes.hasNumber.test(value),
                hasSpecialChar: value => regexes.hasSpecialChar.test(value),
                noWhitespace: value => regexes.noWhitespace.test(value),
                always: () => {
                  narrate('passwordErrors');
                  return true;
                },
              },
            })}
            aria-required="true"
            aria-invalid={!!errors.password}
            aria-describedby="passwordErrors"
          />

          <Label htmlFor="showPassword">Show password</Label>
          <input type="checkbox" id="showPassword" name="showPassword" onChange={onShowPasswordChange} />

          {errors.password?.types && (
            <div id="passwordErrors">
              {'required' in errors.password.types ? (
                <p>Password is required.</p>
              ) : (
                <>
                  <p>Password is invalid. It must:</p>
                  <ul>
                    {('minLength' in errors.password.types || 'maxLength' in errors.password.types) && (
                      <li>Have between 8 and 20 characters.</li>
                    )}
                    {('hasLowercaseLetter' in errors.password.types ||
                      'hasUppercaseLetter' in errors.password.types ||
                      'hasSpecialChar' in errors.password.types ||
                      'hasNumber' in errors.password.types ||
                      'noWhiteSpace' in errors.password.types) && (
                      <li>
                        Contain at least one lower case letter, upper case letter, number, special character and no
                        spaces.
                      </li>
                    )}
                  </ul>
                </>
              )}
            </div>
          )}

          <Button type="submit">Register</Button>
        </form>
      ) : (
        <p id="validMessage" role="alert" tabIndex={0}>
          The form is valid and would have been submitted.
        </p>
      )}
    </Scenario>
  );
};

export default {
  title: 'Accessibility Scenarios/ Registration form inputs',
  id: 'input-accessibility-scenario',
};
