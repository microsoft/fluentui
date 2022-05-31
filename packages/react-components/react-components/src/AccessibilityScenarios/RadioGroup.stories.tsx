import * as React from 'react';

import { Label } from '@fluentui/react-label';
import { RadioGroup, Radio } from '@fluentui/react-components';
import { Button } from '@fluentui/react-button';

import { Scenario } from './utils';

export const QuestionnaireAboutTransportationAccessibilityScenario: React.FunctionComponent = () => {
  const [age, setAge] = React.useState('ageClass1');
  // const [isDrivingAllowed, setIsDrivingAllowed] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const onAgeChange = (event: React.BaseSyntheticEvent) => {
    setAge('');
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
    <Scenario pageTitle="Radio groups in questionnaire about transportation">
      <h1>Questionnaire about transportation</h1>
      {!isSubmitted ? (
        <form onSubmit={onSubmit}>
          <Label id="ageLabel">Your age:</Label>
          <RadioGroup value={age} onChange={onAgeChange} aria-labelledby="ageLabel">
            <Radio value="ageClass1" label="Under 16" />
            <Radio value="ageClass2" label="Between 16 and 50" />
            <Radio value="ageClass3" label="Over 50" />
          </RadioGroup>

          <Button type="submit">Submit</Button>
        </form>
      ) : (
        <p id="formSubmittedText" tabIndex={0}>
          The form would have been submitted.
        </p>
      )}
    </Scenario>
  );
};

export default {
  title: '  Accessibility Scenarios/ Radio groups in questionnaire about transportation',
  id: 'radiogroup-accessibility-scenario',
};
