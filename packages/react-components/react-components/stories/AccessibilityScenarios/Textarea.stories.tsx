import * as React from 'react';

import { Button, Textarea, Checkbox, Label } from '@fluentui/react-components';

import { Scenario } from './utils';

import { useForm, Controller, OnSubmit } from 'react-hook-form';
import { usePubSub, PubSubProvider, Handler } from '@cactuslab/usepubsub';

const generateCustomerId = (): string => {
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
  return hash.toString().padStart(10, '0').substring(2);
};

let isSubmitting = false;

interface FormTextareas {
  knowledge: string;
  effort: string;
  problemNotSolved: string;
  otherComments: string;
  satisfaction: string;
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
  handleSubmit: (callback: OnSubmit<FormTextareas>) => (e?: React.BaseSyntheticEvent) => Promise<void>,
) => {
  const pubSub = usePubSub();
  const isHandlingSubmit = React.useRef(false);

  const wrappedHandleSubmit = React.useCallback(
    (callback: OnSubmit<FormTextareas>) => {
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

const QuestionnaireAboutCustomerExperienceAccessibility = () => {
  const { control, handleSubmit, errors, formState, unregister } = useForm<FormTextareas>({
    validateCriteriaMode: 'all',
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const formValidation = useFormValidation(handleSubmit);

  const [isProblemNotSolved, setIsProblemNotSolved] = React.useState(false);
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

    const firstErrorName = Object.keys(errors)[0] as keyof FormTextareas;
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

  const onSubmit = (data: FormTextareas, event?: React.BaseSyntheticEvent) => {
    event?.preventDefault();
    if (formState.isValid) {
      setIsSubmittedAndValid(true);
    }
  };

  const onProblemNotSolvedChange = (event: React.ChangeEvent) => {
    unregister('problemNotSolved');
    setIsProblemNotSolved(!isProblemNotSolved);
  };

  return (
    <Scenario pageTitle="Textareas in questionnaire about customer experience">
      <h1>Questionnaire about telepohne customer experience</h1>
      {!isSubmittedAndValid ? (
        <>
          <p>
            Please answer the questions below regarding your last experience as a customer of our telephone banking
            services.
          </p>
          <form onSubmit={formValidation.handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="knowledge">Describe the knowledge of the problem by the operator</Label>
              <Controller
                name="knowledge"
                control={control}
                as={
                  <Textarea
                    id="knowledge"
                    aria-required="true"
                    aria-invalid={!!errors.knowledge}
                    aria-describedby="knowledgeErrors"
                  />
                }
                rules={{
                  required: true,
                  minLength: 20,
                  validate: {
                    always: () => {
                      if (!formState.isSubmitting) {
                        formValidation.onFieldValidated('knowledge');
                      }
                      return true;
                    },
                  },
                }}
              />
            </div>
            {errors.knowledge?.types && (
              <ValidationMessage id="knowledge" formValidation={formValidation}>
                {'required' in errors.knowledge.types ? (
                  <p>This field is required.</p>
                ) : (
                  <>
                    <p>This field is invalid. It must:</p>
                    <ul>{'minLength' in errors.knowledge.types && <li>Have at least 20 characters.</li>}</ul>
                  </>
                )}
              </ValidationMessage>
            )}

            <div>
              <Label htmlFor="effort">Describe the kindness and effort to solve your problem by the operator</Label>
              <Controller
                name="effort"
                control={control}
                as={
                  <Textarea
                    id="effort"
                    aria-required="true"
                    aria-invalid={!!errors.effort}
                    aria-describedby="effortErrors"
                  />
                }
                rules={{
                  required: true,
                  minLength: 20,
                  validate: {
                    always: () => {
                      if (!formState.isSubmitting) {
                        formValidation.onFieldValidated('effort');
                      }
                      return true;
                    },
                  },
                }}
              />
            </div>
            {errors.effort?.types && (
              <ValidationMessage id="effort" formValidation={formValidation}>
                {'required' in errors.effort.types ? (
                  <p>This field is required.</p>
                ) : (
                  <>
                    <p>This field is invalid. It must:</p>
                    <ul>{'minLength' in errors.effort.types && <li>Have at least 20 characters.</li>}</ul>
                  </>
                )}
              </ValidationMessage>
            )}

            <div>
              <Checkbox
                checked={isProblemNotSolved}
                onChange={onProblemNotSolvedChange}
                label="My problem has not been solved."
              />
            </div>

            <div>
              <Label htmlFor="problemNotSolved">Tell us why your problem has not been solved</Label>
              <Controller
                name="problemNotSolved"
                control={control}
                as={
                  <Textarea
                    id="problemNotSolved"
                    disabled={!isProblemNotSolved}
                    aria-required={isProblemNotSolved}
                    aria-invalid={!!errors.problemNotSolved}
                    aria-describedby="problemNotSolvedErrors"
                  />
                }
                rules={{
                  required: isProblemNotSolved,
                  minLength: isProblemNotSolved ? 20 : 0,
                  validate: {
                    always: () => {
                      if (!formState.isSubmitting) {
                        formValidation.onFieldValidated('problemNotSolved');
                      }
                      return true;
                    },
                  },
                }}
              />
            </div>
            {errors.problemNotSolved?.types && (
              <ValidationMessage id="problemNotSolved" formValidation={formValidation}>
                {'required' in errors.problemNotSolved.types ? (
                  <p>This field is required.</p>
                ) : (
                  <>
                    <p>This field is invalid. It must:</p>
                    <ul>{'minLength' in errors.problemNotSolved.types && <li>Have at least 20 characters.</li>}</ul>
                  </>
                )}
              </ValidationMessage>
            )}

            <div>
              <Label htmlFor="otherComments">
                Anything else you want to tell us about your last telephone experience
              </Label>
              <Textarea id="otherComments" />
            </div>

            <div>
              <Label htmlFor="satisfaction">Extra question: How satisfied are you otherwise with our services?</Label>
              <Controller
                name="satisfaction"
                control={control}
                as={
                  <Textarea
                    id="satisfaction"
                    placeholder="Try to be concise, not to use more than three sentences..."
                    aria-invalid={!!errors.satisfaction}
                    aria-describedby="satisfactionErrors"
                  />
                }
                rules={{
                  maxLength: 150,
                  validate: {
                    always: () => {
                      if (!formState.isSubmitting) {
                        formValidation.onFieldValidated('satisfaction');
                      }
                      return true;
                    },
                  },
                }}
              />
            </div>
            {errors.satisfaction?.types && (
              <ValidationMessage id="satisfaction" formValidation={formValidation}>
                <p>This field is invalid. It must:</p>
                <ul>{'maxLength' in errors.satisfaction.types && <li>Have not more than150 characters.</li>}</ul>
              </ValidationMessage>
            )}

            <div>
              <Label htmlFor="customerId">Your customer id:</Label>
              <Textarea
                id="customerId"
                defaultValue={generateCustomerId()}
                readOnly
                aria-describedby="customerIdHint"
              />
            </div>

            <p id="customerIdHint">We will use the customer id to track your feedback.</p>

            <Button type="submit">Submit</Button>
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

export const QuestionnaireAboutCustomerExperienceTextareas: React.FunctionComponent = () => (
  <PubSubProvider>
    <QuestionnaireAboutCustomerExperienceAccessibility />
  </PubSubProvider>
);
