import * as React from 'react';

import { Button, Checkbox, Input, Label } from '@fluentui/react-components';

import { Scenario } from './utils';

import { useForm, Controller, OnSubmit } from 'react-hook-form';
import { usePubSub, PubSubProvider, Handler } from '@cactuslab/usepubsub';

const validations = {
  onlyNameChars: (value: string) => /^[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ -]*$/.test(value),
  startsAndEndsWithLetter: (value: string) =>
    /^(([A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ].*[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ])|[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ])?$/.test(
      value,
    ),
  noWhitespace: (value: string) => /^\S*$/.test(value),
  hasNumber: (value: string) => /^\S*[0-9]\S*$/.test(value),
  hasLowercaseLetter: (value: string) => /^\S*[a-z]\S*$/.test(value),
  hasUppercaseLetter: (value: string) => /^\S*[A-Z]\S*$/.test(value),
  hasSpecialChar: (value: string) => /^\S*[^0-9a-zA-ZÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ\s]\S*$/.test(value),
  validDate: (value: string) => /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/.test(value),
  validEmail: (value: string) =>
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      value,
    ),
};

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
  return <>{isAlerting ? <div role="alert">{children}</div> : <div>{children}</div>}</>;
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
  const { control, handleSubmit, errors, formState, unregister } = useForm<FormInputs>({
    validateCriteriaMode: 'all',
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const formValidation = useFormValidation(handleSubmit);

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isSendNewsletter, setIsSendNewsletter] = React.useState(false);
  const [isSubmittedAndValid, setIsSubmittedAndValid] = React.useState(false);

  const securityCode = React.useMemo((): string => {
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
  }, []);

  React.useEffect(() => {
    // If the form is submitting and has errors, focus the first error fiel, otherwise do nothing
    if (!formState.isSubmitting || formState.isValid) {
      return;
    }
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
    <Scenario pageTitle="Registration form inputs">
      <h1>Registration form</h1>
      {!isSubmittedAndValid ? (
        <form onSubmit={formValidation.handleSubmit(onSubmit)}>
          <Label htmlFor="fullName">Full name</Label>
          <Controller
            name="fullName"
            control={control}
            as={
              <Input
                type="text"
                id="fullName"
                aria-required="true"
                aria-invalid={!!errors.fullName}
                aria-describedby="fullNameRequiredError fullNameInvalidError fullNameLengthError fullNameOnlyNameCharsError fullNameStartsAndEndsWithLetterError"
              />
            }
            rules={{
              required: true,
              minLength: 2,
              maxLength: 50,
              validate: {
                onlyNameChars: value => validations.onlyNameChars(value),
                startsAndEndsWithLetter: value => validations.startsAndEndsWithLetter(value),
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
                <p id="fullNameRequiredError">Full name is required.</p>
              ) : (
                <>
                  <p id="fullNameInvalidError">Full name is invalid. It must:</p>
                  <ul>
                    {('minLength' in errors.fullName.types || 'maxLength' in errors.fullName.types) && (
                      <li id="fullNameLengthError">Have between 2 and 50 characters.</li>
                    )}
                    {'onlyNameChars' in errors.fullName.types && (
                      <li id="fullNameOnlyNameCharsError">
                        Contain only lowercase or uppercase letters, spaces or hyphens.
                      </li>
                    )}
                    {'startsAndEndsWithLetter' in errors.fullName.types && (
                      <li id="fullNameStartsAndEndsWithLetterError">Start and end wit letter.</li>
                    )}
                  </ul>
                </>
              )}
            </ValidationMessage>
          )}

          <Label htmlFor="nickname">Nickname</Label>
          <Controller
            name="nickname"
            control={control}
            as={
              <Input
                type="text"
                id="nickname"
                aria-invalid={!!errors.nickname}
                aria-describedby="nicknameInvalidError nicknameLengthError nicknameOnlyNameCharsError nicknameStartsAndEndsWithLetterError"
              />
            }
            rules={{
              minLength: 2,
              maxLength: 20,
              validate: {
                onlyNameChars: value => validations.onlyNameChars(value),
                startsAndEndsWithLetter: value => validations.startsAndEndsWithLetter(value),
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
              <p id="nicknameInvalidError">Nickname is invalid. It must:</p>
              <ul>
                {('minLength' in errors.nickname.types || 'maxLength' in errors.nickname.types) && (
                  <li id="nicknameLengthError">Have between 2 and 20 characters.</li>
                )}
                {'onlyNameChars' in errors.nickname.types && (
                  <li id="nicknameOnlyNameCharsError">
                    Contain only lowercase or uppercase letters, spaces or hyphens.
                  </li>
                )}
                {'startsAndEndsWithLetter' in errors.nickname.types && (
                  <li id="nicknameStartsAndEndsWithLetterError">Start and end wit letter.</li>
                )}
              </ul>
            </ValidationMessage>
          )}

          <Label htmlFor="password">Password</Label>
          <Controller
            name="password"
            control={control}
            as={
              <Input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                aria-required="true"
                aria-invalid={!!errors.password}
                aria-describedby="passwordRequiredError passwordInvalidError passwordLengthError passwordCharsError"
              />
            }
            rules={{
              required: true,
              minLength: 8,
              maxLength: 20,
              validate: {
                hasLowercaseLetter: value => validations.hasLowercaseLetter(value),
                hasUppercaseLetter: value => validations.hasUppercaseLetter(value),
                hasNumber: value => validations.hasNumber(value),
                hasSpecialChar: value => validations.hasSpecialChar(value),
                noWhitespace: value => validations.noWhitespace(value),
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
                <p id="passwordRequiredError">Password is required.</p>
              ) : (
                <>
                  <p id="passwordInvalidError">Password is invalid. It must:</p>
                  <ul>
                    {('minLength' in errors.password.types || 'maxLength' in errors.password.types) && (
                      <li id="passwordLengthError">Have between 8 and 20 characters.</li>
                    )}
                    {('hasLowercaseLetter' in errors.password.types ||
                      'hasUppercaseLetter' in errors.password.types ||
                      'hasSpecialChar' in errors.password.types ||
                      'hasNumber' in errors.password.types ||
                      'noWhitespace' in errors.password.types) && (
                      <li id="passwordCharsError">
                        Contain at least one lower case letter, upper case letter, number, special character and no
                        spaces.
                      </li>
                    )}
                  </ul>
                </>
              )}
            </ValidationMessage>
          )}

          <Label htmlFor="birthDate">Birth date</Label>
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
                aria-describedby="birthDateRequiredError birthDateInvalidError birthDateCharsError"
              />
            }
            rules={{
              required: true,
              validate: {
                validDate: value => validations.validDate(value),
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
                <p id="birthDateRequiredError">Birth date is required.</p>
              ) : (
                <>
                  <p id="birthDateInvalidError">Birth date is invalid. It must:</p>
                  <ul>
                    {'validDate' in errors.birthDate.types && (
                      <li id="birthDateCharsError">Be in the MM/DD/YYYY format.</li>
                    )}
                  </ul>
                </>
              )}
            </ValidationMessage>
          )}

          <Checkbox label="Send me newsletter" onChange={onSendNewsletterChange} />

          <Label htmlFor="email">E-mail</Label>
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
                aria-describedby="emailRequiredError emailInvalidError emailCharsError"
              />
            }
            rules={{
              required: isSendNewsletter,
              validate: {
                validEmail: value => !isSendNewsletter || validations.validEmail(value),
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
                <p id="emailRequiredError">E-mail is required.</p>
              ) : (
                <>
                  <p id="emailInvalidError">E-mail is invalid. It must:</p>
                  <ul>
                    {'validEmail' in errors.email.types && (
                      <li id="emailCharsError">Be a valid e-mail address, like name@example.com.</li>
                    )}
                  </ul>
                </>
              )}
            </ValidationMessage>
          )}

          <Label htmlFor="securityCode">Your security code</Label>
          <Input type="text" id="securityCode" value={securityCode} readOnly />

          <Button type="submit">Register</Button>
        </form>
      ) : (
        <p id="validMessage" role="alert" tabIndex={-1}>
          The form is valid and would have been submitted.
        </p>
      )}
    </Scenario>
  );
};

export const RegistrationFormInputs = () => (
  <PubSubProvider>
    <RegistrationFormInputsAccessibility />
  </PubSubProvider>
);
