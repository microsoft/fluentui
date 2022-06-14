import * as React from 'react';

import { Label } from '@fluentui/react-label';
import { Textarea } from '@fluentui/react-textarea';
import { Checkbox, CheckboxOnChangeData } from '@fluentui/react-checkbox';
import { Button } from '@fluentui/react-button';

import { Scenario } from './utils';

export const QuestionnaireAboutCustomerExperienceAccessibilityScenario: React.FunctionComponent = () => {
  const [isProblemNotSolvedSelected, setIsProblemSolvedSelected] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const onProblemNotSolvedChange = (event: React.ChangeEvent, data: CheckboxOnChangeData) => {
    setIsProblemSolvedSelected(!!data.checked);
  };

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
    <Scenario pageTitle="Textareas in questionnaire about customer experience">
      <h1>Questionnaire about telepohne customer experience</h1>
      <p>
        Please answer the questions below regarding your last experience as a customer of our telephone banking
        services.
      </p>
      {!isSubmitted ? (
        <form onSubmit={onSubmit}>
          <div>
            <Label htmlFor="knowledgeTextarea">Describe the knowledge of the problem by the operator</Label>
            <Textarea id="knowledgeTextarea" required />
          </div>

          <div>
            <Label htmlFor="effortTextarea">
              Describe the kindness and effort to solve your problem by the operator
            </Label>
            <Textarea id="effortTextarea" required />
          </div>

          <div>
            <Checkbox
              checked={isProblemNotSolvedSelected}
              onChange={onProblemNotSolvedChange}
              label="My problem has not been solved."
            />
          </div>

          <div>
            <Label htmlFor="problemNotSolvedTextarea">Tell us why your problem has not been solved</Label>
            <Textarea id="problemNotSolvedTextarea" disabled={!isProblemNotSolvedSelected} />
          </div>

          <div>
            <Label htmlFor="otherCommentsTextarea">
              Anything else you want to tell us about your last telephone experience
            </Label>
            <Textarea id="otherCommentsTextarea" />
          </div>

          <div>
            <Label htmlFor="satisfactionTextarea">
              Extra question: How satisfied are you otherwise with our services?
            </Label>
            <Textarea
              id="satisfactionTextarea"
              placeholder="Try to be concise, not using more than three sentences..."
            />
          </div>

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

export default {
  title: 'Accessibility Scenarios / Textareas in questionnaire about customer experience',
  id: 'textarea-accessibility-scenario',
};
