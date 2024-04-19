import * as React from 'react';

import { Button, Input, Label, makeStyles } from '@fluentui/react-components';

import { useForm, Controller, OnSubmit } from 'react-hook-form';
import { usePubSub, PubSubProvider, Handler } from '@cactuslab/usepubsub';

const useStyles = makeStyles({
  formsButton: {
    marginTop: '5px !important',
  },
});

const regexes = {
  onlyNameChars: /^[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ -]*$/,
  // eslint-disable-next-line @fluentui/max-len
  startsAndEndsWithLetter:
    /^(([A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ][A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ -]*[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ])|[A-Za-zÀ-ÖØ-öø-ÿěščřžďťňůĚŠČŘŽĎŤŇŮ])?$/,
  // eslint-disable-next-line @fluentui/max-len
  validEmail:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
};

interface FormInputs {
  fullName: string;
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

interface FormExampleProps {
  variant: string;
}

const FormExample: React.FC<FormExampleProps> = ({ variant }) => {
  const fullNameId = `${variant}-fullName`;
  const emailId = `${variant}-email`;
  const styles = useStyles();

  const { control, handleSubmit, errors, formState } = useForm<FormInputs>({
    validateCriteriaMode: 'all',
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const formValidation = useFormValidation(handleSubmit);

  const [isSubmittedAndValid, setIsSubmittedAndValid] = React.useState(false);

  React.useEffect(() => {
    // If the form is submitting and has errors, focus the first error fiel, otherwise do nothing
    if (!formState.isSubmitting || formState.isValid) {
      return;
    }
    const firstErrorName = Object.keys(errors)[0] as keyof FormInputs;
    const firstErrorField = document.getElementById(`${variant}-${firstErrorName}`);
    if (firstErrorField) {
      setTimeout(() => firstErrorField.focus(), 500);
    }
  }, [variant, errors, formState, formValidation]);

  React.useEffect(() => {
    if (isSubmittedAndValid) {
      document.getElementById(`${variant}-validMessage`)?.focus();
    }
  }, [variant, isSubmittedAndValid]);

  const onSubmit = (data: FormInputs, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();
    if (formState.isValid) {
      setIsSubmittedAndValid(true);
    }
  };

  return (
    <>
      {!isSubmittedAndValid ? (
        <form onSubmit={formValidation.handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor={fullNameId}>Full name</Label>
            <Controller
              name="fullName"
              control={control}
              as={
                <Input
                  type="text"
                  id={fullNameId}
                  aria-required="true"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={variant === 'bad' ? undefined : `${fullNameId}Errors`}
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
                      formValidation.onFieldValidated(fullNameId);
                    }
                    return true;
                  },
                },
              }}
            />
          </div>
          {errors.fullName?.types && (
            <ValidationMessage id={fullNameId} formValidation={formValidation}>
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

          <div>
            <Label htmlFor={emailId}>E-mail</Label>
            <Controller
              name="email"
              control={control}
              as={
                <Input
                  type="text"
                  id={emailId}
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={variant === 'bad' ? undefined : `${emailId}Errors`}
                />
              }
              rules={{
                required: true,
                validate: {
                  validEmail: value => regexes.validEmail.test(value),
                  always: () => {
                    if (!formState.isSubmitting) {
                      formValidation.onFieldValidated(emailId);
                    }
                    return true;
                  },
                },
              }}
            />
          </div>
          {errors.email?.types && (
            <ValidationMessage id={emailId} formValidation={formValidation}>
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

          <Button type="submit" className={styles.formsButton}>
            Subscribe
          </Button>
        </form>
      ) : (
        <p id={`${variant}-validMessage`} role="alert" tabIndex={-1}>
          The form is valid and would have been submitted.
        </p>
      )}
    </>
  );
};

export const FormErrorLabelBad = () => (
  <PubSubProvider>
    <FormExample variant="bad" />
  </PubSubProvider>
);

export const FormErrorLabelGood = () => (
  <PubSubProvider>
    <FormExample variant="good" />
  </PubSubProvider>
);
