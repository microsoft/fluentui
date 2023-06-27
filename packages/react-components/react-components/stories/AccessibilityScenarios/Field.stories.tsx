import * as React from 'react';

import { Field, Input, Checkbox, RadioGroup, Radio, Button } from '@fluentui/react-components';

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

let isSubmitting = false;

interface FormInputs {
  fullName: string;
  nickname: string;
  password: string;
  birthDate: string;
  email: string;
  acceptTerms: boolean;
}

interface FormValidation {
  subscribe: (channel: string, handler: Handler) => () => void;
  unsubscribe: (channel: string, handler: Handler) => void;
}

interface AlertingFieldProps {
  id: string;
  formValidation: FormValidation;
  children: (isAlerting: boolean) => React.ReactElement;
}
const AlertingField: React.FC<AlertingFieldProps> = ({ id, formValidation, children }) => {
  const [isAlerting, setIsAlerting] = React.useState(true);

  const alert = React.useCallback(() => {
    setIsAlerting(false);
    setTimeout(() => setIsAlerting(true), 200);
  }, [setIsAlerting]);

  React.useEffect(() => {
    formValidation.subscribe(id, alert);
    return () => formValidation.unsubscribe(id, alert);
  }, [formValidation, alert, id]);
  return children(isAlerting);
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

interface AlertingValidationMessageProps {
  isAlerting: boolean;
}
const AlertingValidationMessage: React.FC<AlertingValidationMessageProps> = ({ isAlerting, children }) => {
  return (
    <>
      {isAlerting ? (
        <>
          {/* The following empty <div> fixes live region not alerting in Safari: */}
          <div />
          <div role="alert">{children}</div>
        </>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
};

const TicketOrderFormFieldsAccessibility = () => {
  const { control, handleSubmit, errors, formState, unregister } = useForm<FormInputs>({
    validateCriteriaMode: 'all',
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const formValidation = useFormValidation(handleSubmit);

  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isSendNewsletter, setIsSendNewsletter] = React.useState(false);
  const [isSubmittedAndValid, setIsSubmittedAndValid] = React.useState(false);

  const ticketNumber = React.useMemo((): string => {
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
    return hash.toString().padStart(8, '0');
  }, []);

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
    <Scenario pageTitle="Ticket order form fields">
      <h1>Ticket order form</h1>

      {!isSubmittedAndValid && (
        <>
          <p>Please fill the following form to order your ticket.</p>
          <form onSubmit={formValidation.handleSubmit(onSubmit)}>
            <Field
              label="Your ticket number"
              hint="Please remember the ticket number. You will need it for identification."
            >
              <Input type="text" id="ticketNumber" value={ticketNumber} readOnly />
            </Field>

            <AlertingField id="fullName" formValidation={formValidation}>
              {isAlerting => (
                <Field
                  label="Full name*"
                  aria-describedby="fullNameRequiredError fullNameInvalidError fullNameLengthError fullNameOnlyNameCharsError fullNameStartsAndEndsWithLetterError"
                  hint="Enter your name including first name, middle name and last name."
                  validationState={errors.fullName?.types ? 'error' : 'success'}
                  validationMessage={
                    <AlertingValidationMessage isAlerting={isAlerting}>
                      {!errors.fullName?.types ? undefined : 'required' in errors.fullName.types ? (
                        <p id="fullNameRequiredError">Full name is required.</p>
                      ) : (
                        <>
                          <p id="fullNameInvalidError">Full name doesn't meet these requirements: </p>
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
                    </AlertingValidationMessage>
                  }
                >
                  <Controller
                    id="fullName"
                    name="fullName"
                    control={control}
                    as={<Input type="text" aria-required="true" />}
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
                </Field>
              )}
            </AlertingField>

            <AlertingField id="nickname" formValidation={formValidation}>
              {isAlerting => (
                <Field
                  label="Nickname"
                  hint="Enter how people use to call you."
                  aria-describedby="nicknameInvalidError nicknameLengthError nicknameOnlyNameCharsError nicknameStartsAndEndsWithLetterError"
                  validationState={errors.nickname?.types ? 'error' : 'success'}
                  validationMessage={
                    <AlertingValidationMessage isAlerting={isAlerting}>
                      {!errors.nickname?.types ? undefined : (
                        <>
                          <p id="nicknameInvalidError">Nickname doesn't meet these requirements: </p>
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
                        </>
                      )}
                    </AlertingValidationMessage>
                  }
                >
                  <Controller
                    id="nickname"
                    name="nickname"
                    control={control}
                    as={<Input type="text" />}
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
                </Field>
              )}
            </AlertingField>

            <AlertingField id="password" formValidation={formValidation}>
              {isAlerting => (
                <Field
                  label="Password*"
                  hint="Use strong password."
                  aria-describedby="passwordRequiredError passwordInvalidError passwordLengthError passwordCharsError"
                  validationState={errors.password?.types ? 'error' : 'success'}
                  validationMessage={
                    <AlertingValidationMessage isAlerting={isAlerting}>
                      {!errors.password?.types ? undefined : 'required' in errors.password.types ? (
                        <p id="passwordRequiredError">Password is required.</p>
                      ) : (
                        <>
                          <p id="passwordInvalidError">Password doesn't meet these requirements: </p>
                          <ul>
                            {('minLength' in errors.password.types || 'maxLength' in errors.password.types) && (
                              <li id="passwordLengthError">Have between 8 and 50 characters.</li>
                            )}
                            {('hasLowercaseLetter' in errors.password.types ||
                              'hasUppercaseLetter' in errors.password.types ||
                              'hasSpecialChar' in errors.password.types ||
                              'hasNumber' in errors.password.types ||
                              'noWhitespace' in errors.password.types) && (
                              <li id="passwordCharsError">
                                Contain at least one lower case letter, upper case letter, number, special character and
                                no spaces.
                              </li>
                            )}
                          </ul>
                        </>
                      )}
                    </AlertingValidationMessage>
                  }
                >
                  <Controller
                    id="password"
                    name="password"
                    control={control}
                    as={<Input type={isPasswordVisible ? 'text' : 'password'} aria-required="true" />}
                    rules={{
                      required: true,
                      minLength: 8,
                      maxLength: 50,
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
                </Field>
              )}
            </AlertingField>

            <Checkbox id="showPassword" label="Show password" onChange={onShowPasswordChange} />

            <AlertingField id="birthDate" formValidation={formValidation}>
              {isAlerting => (
                <Field
                  label="Birth date*"
                  hint="We need this for special birthday offers."
                  aria-describedby="birthDateRequiredError birthDateInvalidError birthDateCharsError"
                  validationState={errors.birthDate?.types ? 'error' : 'success'}
                  validationMessage={
                    <AlertingValidationMessage isAlerting={isAlerting}>
                      {!errors.birthDate?.types ? undefined : 'required' in errors.birthDate.types ? (
                        <p id="birthDateRequiredError">Birth date is required.</p>
                      ) : (
                        <>
                          <p id="birthDateInvalidError">Birth date doesn't meet these requirements: </p>
                          <ul>
                            {'validDate' in errors.birthDate.types && (
                              <li id="birthDateCharsError">Be in the MM/DD/YYYY format.</li>
                            )}
                          </ul>
                        </>
                      )}
                    </AlertingValidationMessage>
                  }
                >
                  <Controller
                    id="birthDate"
                    name="birthDate"
                    control={control}
                    as={<Input type="text" placeholder="E.g. 3/21/1995" aria-required="true" />}
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
                </Field>
              )}
            </AlertingField>

            <Field label="Highest level of education*" hint="We need this for better product targetting.">
              <RadioGroup>
                <Radio defaultChecked={true} label="None" />
                <Radio label="Elementary school" />
                <Radio label="High school" />
                <Radio label="University or college" />
              </RadioGroup>
            </Field>

            <Field hint="We will send the newsletter approximately once a month">
              <Checkbox id="sendNewsletter" label="Send me newsletter" onChange={onSendNewsletterChange} />
            </Field>

            <AlertingField id="email" formValidation={formValidation}>
              {isAlerting => (
                <Field
                  label="E-mail"
                  aria-describedby="emailRequiredError emailInvalidError emailCharsError"
                  hint="We will send you newsletter to this e-mail."
                  validationState={errors.email?.types ? 'error' : 'success'}
                  validationMessage={
                    <AlertingValidationMessage isAlerting={isAlerting}>
                      {!errors.email?.types ? undefined : 'required' in errors.email.types ? (
                        <p id="emailRequiredError">E-mail is required.</p>
                      ) : (
                        <>
                          <p id="emailInvalidError">E-mail doesn't meet these requirements: </p>
                          <ul>
                            {'validEmail' in errors.email.types && (
                              <li id="emailCharsError">Be a valid e-mail address, like name@example.com.</li>
                            )}
                          </ul>
                        </>
                      )}
                    </AlertingValidationMessage>
                  }
                >
                  <Controller
                    id="email"
                    name="email"
                    control={control}
                    as={<Input type="text" disabled={!isSendNewsletter} aria-required={isSendNewsletter} />}
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
                </Field>
              )}
            </AlertingField>

            <AlertingField id="acceptTerms" formValidation={formValidation}>
              {isAlerting => (
                <Field
                  label="I accept terms and conditions*"
                  aria-describedby="acceptTermsRequiredError"
                  hint={
                    <>
                      Check this field to confirm you have read and understand the <a href="#">terms and conditions</a>.
                    </>
                  }
                  validationState={errors.acceptTerms?.types ? 'error' : 'success'}
                  validationMessage={
                    <AlertingValidationMessage isAlerting={isAlerting}>
                      {!errors.acceptTerms?.types
                        ? undefined
                        : 'required' in errors.acceptTerms.types && (
                            <p id="acceptTermsRequiredError">
                              You have to accept the terms and conditions in order to order your ticket.
                            </p>
                          )}
                    </AlertingValidationMessage>
                  }
                >
                  <Controller
                    id="acceptTerms"
                    name="acceptTerms"
                    control={control}
                    as={<Checkbox aria-required="true" />}
                    rules={{
                      required: true,
                      validate: {
                        always: () => {
                          if (!formState.isSubmitting) {
                            formValidation.onFieldValidated('acceptTerms');
                          }
                          return true;
                        },
                      },
                    }}
                  />
                </Field>
              )}
            </AlertingField>
            <p>Fields marked with * are required.</p>

            <Button type="submit">Order ticket</Button>
          </form>
        </>
      )}
      <div role="status" id="statusMessage">
        {isSubmittedAndValid && <p>The form is valid and would have been submitted.</p>}
      </div>
    </Scenario>
  );
};

export const TicketOrderFormFields = () => (
  <PubSubProvider>
    <TicketOrderFormFieldsAccessibility />
  </PubSubProvider>
);
