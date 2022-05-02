import * as React from 'react';

import { Input } from '@fluentui/react-input';
import { Label } from '@fluentui/react-label';
import { Button } from '@fluentui/react-button';

import { Scenario } from './utils';

import { useForm, Controller, OnSubmit } from 'react-hook-form';
import { usePubSub, PubSubProvider, Handler } from '@cactuslab/usepubsub';

const regexes = {
  onlyNameChars: /^[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ -]*$/,
  // eslint-disable-next-line @fluentui/max-len
  startsAndEndsWithLetter: /^(([A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ][A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ -]*[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ])|[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ])?$/,
  noWhitespace: /^\S*$/,
  hasNumber: /^\S*[0-9]\S*$/,
  hasLowercaseLetter: /^\S*[a-z]\S*$/,
  hasUppercaseLetter: /^\S*[A-Z]\S*$/,
  hasSpecialChar: /^\S*[^0-9a-zA-ZÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ\s]\S*$/,
};

interface FormInputs {
  fullName: string;
  nickname: string;
  password: string;
}

interface FormValidation {
  subscribe: (channel: string, handler: Handler) => () => void;
  unsubscribe: (channel: string, handler: Handler) => void;
}

interface ValidationMessageProps {
  id: string;
  formValidation: FormValidation;
}
const ValidationMessage: React.FC<ValidationMessageProps> = ({ id, formValidation, children }) => {
  const [isAlerting, setIsAlerting] = React.useState(true);

  const alert = React.useCallback(() => {
    setIsAlerting(false);
    setTimeout(() => setIsAlerting(true), 200);
  }, [setIsAlerting]);

  React.useEffect(() => {
    formValidation.subscribe(id, alert);
    return () => formValidation.unsubscribe(id, alert);
  }, [formValidation, alert, id]);
  return (
    <div role={isAlerting ? 'alert' : undefined} style={{ color: isAlerting ? 'red' : 'green' }} id={`${id}Errors`}>
      {children}
    </div>
  );
};

const useFormValidation = (
  handleSubmit: (callback: OnSubmit<FormInputs>) => (e?: React.BaseSyntheticEvent) => Promise<void>,
) => {
  const pubSub = usePubSub();
  const isSubmitting = React.useRef(false);

  const wrappedHandleSubmit = React.useCallback(
    (callback: OnSubmit<FormInputs>) => {
      const handler = handleSubmit(callback);
      return async (e: React.BaseSyntheticEvent) => {
        isSubmitting.current = true;
        const result = await handler(e);
        isSubmitting.current = false;
        return result;
      };
    },
    [isSubmitting, handleSubmit],
  );

  const onFieldValidated = React.useCallback(
    (field: string) => {
      if (!isSubmitting.current) {
        pubSub.publish(field, 'validate');
      }
      return true;
    },
    [isSubmitting, pubSub],
  );

  const notifyFormFieldError = React.useCallback(
    (field: string) => {
      pubSub.publish(field, 'validate');
      return true;
    },
    [pubSub],
  );

  return {
    subscribe: pubSub.subscribe,
    unsubscribe: pubSub.unsubscribe,
    onFieldValidated,
    handleSubmit: wrappedHandleSubmit,
    notifyFormFieldError,
  };
};

const RegistrationFormInputsAccessibility = () => {
  const { control, handleSubmit, errors, formState } = useForm<FormInputs>({
    validateCriteriaMode: 'all',
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const formValidation = useFormValidation(handleSubmit);

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isSubmittedAndValid, setIsSubmittedAndValid] = React.useState(false);

  React.useEffect(() => {
    // If the form is submitted and has errors, focus the first error fiel, otherwise do nothing
    if (!formState.isSubmitting || formState.isValid) {
      return;
    }
    const firstErrorName = Object.keys(errors)[0] as keyof FormInputs;
    const firstErrorField = document.getElementById(firstErrorName);

    setTimeout(() => formValidation.notifyFormFieldError(firstErrorName), 200);

    if (firstErrorField) {
      firstErrorField.focus();
    }
  }, [errors, formState, formValidation]);

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
        <form onSubmit={formValidation.handleSubmit(onSubmit)}>
          <Label htmlFor="fullName">Full name:</Label>
          <Controller
            name="fullName"
            control={control}
            as={
              <Input
                type="text"
                id="fullName"
                name="fullName"
                aria-required="true"
                aria-invalid={!!errors.fullName}
                aria-describedby="fullNameErrors"
              />
            }
            rules={{
              required: true,
              minLength: 2,
              maxLength: 50,
              validate: {
                onlyNameChars: value => regexes.onlyNameChars.test(value),
                startsAndEndsWithLetter: value => regexes.startsAndEndsWithLetter.test(value),
                always: () => {
                  if (!formState.isSubmitting) {
                    formValidation.onFieldValidated('fullName');
                  }
                  return true;
                },
              },
            }}
          />
          {errors.fullName?.types && (
            <ValidationMessage id="fullName" formValidation={formValidation}>
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
            </ValidationMessage>
          )}

          <Label htmlFor="nickname">Nickname:</Label>
          <Controller
            name="nickname"
            control={control}
            as={
              <Input
                type="text"
                id="nickname"
                name="nickname"
                aria-invalid={!!errors.nickname}
                aria-describedby="nicknameErrors"
              />
            }
            rules={{
              minLength: 2,
              maxLength: 20,
              validate: {
                onlyNameChars: value => regexes.onlyNameChars.test(value),
                startsAndEndsWithLetter: value => regexes.startsAndEndsWithLetter.test(value),
                always: () => {
                  if (!formState.isSubmitting) {
                    formValidation.onFieldValidated('nickname');
                  }
                  return true;
                },
              },
            }}
          />
          {errors.nickname?.types && (
            <ValidationMessage id="nickname" formValidation={formValidation}>
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
            </ValidationMessage>
          )}

          <Label htmlFor="password">Password:</Label>
          <Controller
            name="password"
            control={control}
            as={
              <Input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                aria-required="true"
                aria-invalid={!!errors.password}
                aria-describedby="passwordErrors"
              />
            }
            rules={{
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
                  if (!formState.isSubmitting) {
                    formValidation.onFieldValidated('password');
                  }
                  return true;
                },
              },
            }}
          />

          <Label htmlFor="showPassword">Show password</Label>
          <input type="checkbox" id="showPassword" name="showPassword" onChange={onShowPasswordChange} />

          {errors.password?.types && (
            <ValidationMessage id="password" formValidation={formValidation}>
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
            </ValidationMessage>
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

export const RegistrationFormInputsAccessibilityScenario = () => (
  <PubSubProvider>
    <RegistrationFormInputsAccessibility />
  </PubSubProvider>
);

export default {
  title: 'Accessibility Scenarios/ Registration form inputs',
  id: 'input-accessibility-scenario',
};
