import * as React from 'react';

import { Button, Checkbox, Input, Label } from '@fluentui/react-components';

import { Scenario } from './utils';

import { useForm, Controller, OnSubmit } from 'react-hook-form';
import { usePubSub, PubSubProvider, Handler } from '@cactuslab/usepubsub';

const regexes = {
  onlyNameChars: /^[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ -]*$/,
  startsAndEndsWithLetter:
    /^(([A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ][A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ -]*[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ])|[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ])?$/,
  noWhitespace: /^\S*$/,
  hasNumber: /^\S*[0-9]\S*$/,
  hasLowercaseLetter: /^\S*[a-z]\S*$/,
  hasUppercaseLetter: /^\S*[A-Z]\S*$/,
  hasSpecialChar: /^\S*[^0-9a-zA-ZÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ\s]\S*$/,
  validDate: /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/,
  validEmail:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
};

const generateTicketNumber = (): string => {
  let char;
  let hash = 0;
  const random = Math.random().toString();
  for (let i = 0; i < random.length; i++) {
    char = random.charCodeAt(i);
    //eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + char;
    //eslint-disable-next-line no-bitwise
    hash |= 0; // Convert to 32bit integer
  }
  hash += 2147483647; // Convert to positive integer
  return hash.toString().padStart(8, '0').substring(2);
};

let isSubmitting = false;

interface FormInputs {
  fullName: string;
  nickname: string;
  password: string;
  birthDate: string;
  email: string;
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
    <>
      {isAlerting ? (
        <div role="alert" style={{ color: 'red' }} id={`${id}Errors`}>
          {children}
        </div>
      ) : (
        <div style={{ color: 'green' }} id={`${id}Errors`}>
          {children}
        </div>
      )}
    </>
  );
};

const useFormValidation = (
  handleSubmit: (callback: OnSubmit<FormInputs>) => (e?: React.BaseSyntheticEvent) => Promise<void>,
) => {
  const pubSub = usePubSub();
  const isHandlingSubmit = React.useRef(false);

  const wrappedHandleSubmit = React.useCallback(
    (callback: OnSubmit<FormInputs>) => {
      const handler = handleSubmit(callback);
      return async (e: React.BaseSyntheticEvent) => {
        isHandlingSubmit.current = true;
        const result = await handler(e);
        isHandlingSubmit.current = false;
        return result;
      };
    },
    [isHandlingSubmit, handleSubmit],
  );

  const onFieldValidated = React.useCallback(
    (field: string) => {
      if (!isHandlingSubmit.current) {
        pubSub.publish(field, 'validate');
      }
      return true;
    },
    [isHandlingSubmit, pubSub],
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

const TicketOrderFormInputsAccessibility = () => {
  const { control, handleSubmit, errors, formState, unregister } = useForm<FormInputs>({
    validateCriteriaMode: 'all',
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const formValidation = useFormValidation(handleSubmit);

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isSendNewsletter, setIsSendNewsletter] = React.useState(false);
  const [isSubmittedAndValid, setIsSubmittedAndValid] = React.useState(false);

  React.useEffect(() => {
    if (formState.isSubmitting) {
      isSubmitting = true;
    }
  }, [formState]);

  React.useEffect(() => {
    // If the form is submitting and has errors, focus the first error fiel, otherwise do nothing
    if (!isSubmitting || !formState.isSubmitted || formState.isValid) {
      return;
    }
    isSubmitting = false;

    const firstErrorName = Object.keys(errors)[0] as keyof FormInputs;
    const firstErrorField = document.getElementById(firstErrorName);
    if (firstErrorField) {
      setTimeout(() => firstErrorField.focus(), 500);
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

  const onSendNewsletterChange = (event: React.ChangeEvent) => {
    unregister('email');
    setIsSendNewsletter(!isSendNewsletter);
  };

  return (
    <Scenario pageTitle="Ticket order form inputs">
      <h1>Ticket order form</h1>
      {!isSubmittedAndValid ? (
        <>
          <p>Please fill the following form to order your ticket.</p>
          <form onSubmit={formValidation.handleSubmit(onSubmit)}>
            <Label htmlFor="ticketNumber">Your ticket number:</Label>
            <Input
              type="text"
              id="ticketNumber"
              value={generateTicketNumber()}
              readOnly
              aria-describedby="ticketNumberHint"
            />
            <p id="ticketNumberHint">Please remember the ticket number. You will need it for identification.</p>

            <Label htmlFor="fullName">Full name:</Label>
            <Controller
              name="fullName"
              control={control}
              as={
                <Input
                  type="text"
                  id="fullName"
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
                <Input type="text" id="nickname" aria-invalid={!!errors.nickname} aria-describedby="nicknameErrors" />
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

            <Checkbox label="Show password" onChange={onShowPasswordChange} />

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

            <Label htmlFor="birthDate">Birth date:</Label>
            <Controller
              name="birthDate"
              control={control}
              as={
                <Input
                  type="text"
                  id="birthDate"
                  placeholder="E.g. 3/21/1995"
                  aria-required="true"
                  aria-invalid={!!errors.birthDate}
                  aria-describedby="birthDateErrors"
                />
              }
              rules={{
                required: true,
                validate: {
                  validDate: value => regexes.validDate.test(value),
                  always: () => {
                    if (!formState.isSubmitting) {
                      formValidation.onFieldValidated('birthDate');
                    }
                    return true;
                  },
                },
              }}
            />
            {errors.birthDate?.types && (
              <ValidationMessage id="birthDate" formValidation={formValidation}>
                {'required' in errors.birthDate.types ? (
                  <p>Birth date is required.</p>
                ) : (
                  <>
                    <p>Birth date is invalid. It must:</p>
                    <ul>{'validDate' in errors.birthDate.types && <li>Be in the MM/DD/YYYY format.</li>}</ul>
                  </>
                )}
              </ValidationMessage>
            )}

            <Checkbox label="Send me newsletter" onChange={onSendNewsletterChange} />

            <Label htmlFor="email">E-mail:</Label>
            <Controller
              name="email"
              control={control}
              as={
                <Input
                  type="text"
                  id="email"
                  disabled={!isSendNewsletter}
                  aria-required={isSendNewsletter}
                  aria-invalid={!!errors.email}
                  aria-describedby="emailErrors"
                />
              }
              rules={{
                required: isSendNewsletter,
                validate: {
                  validEmail: value => !isSendNewsletter || regexes.validEmail.test(value),
                  always: () => {
                    if (!formState.isSubmitting) {
                      formValidation.onFieldValidated('email');
                    }
                    return true;
                  },
                },
              }}
            />
            {errors.email?.types && (
              <ValidationMessage id="email" formValidation={formValidation}>
                {'required' in errors.email.types ? (
                  <p>E-mail is required.</p>
                ) : (
                  <>
                    <p>E-mail is invalid. It must:</p>
                    <ul>
                      {'validEmail' in errors.email.types && <li>Be a valid e-mail address, like name@example.com.</li>}
                    </ul>
                  </>
                )}
              </ValidationMessage>
            )}

            <Button type="submit">Order ticket</Button>
          </form>
        </>
      ) : (
        <p id="validMessage" role="alert" tabIndex={-1}>
          The form is valid and would have been submitted.
        </p>
      )}
    </Scenario>
  );
};

export const TicketOrderFormInputs = () => (
  <PubSubProvider>
    <TicketOrderFormInputsAccessibility />
  </PubSubProvider>
);
