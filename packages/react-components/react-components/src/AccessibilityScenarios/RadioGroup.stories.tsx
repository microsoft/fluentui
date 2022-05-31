import * as React from 'react';

import { Label } from '@fluentui/react-label';
import { RadioGroup, Radio, RadioGroupOnChangeData } from '@fluentui/react-components';
import { Button } from '@fluentui/react-button';

import { Scenario } from './utils';

export const QuestionnaireAboutTransportationAccessibilityScenario: React.FunctionComponent = () => {
  const [isDrivingAllowed, setIsDrivingAllowed] = React.useState(true);
  const [mostPreferred, setMostPreferred] = React.useState('bicycle');
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const onAgeChange = (event: React.BaseSyntheticEvent, data: RadioGroupOnChangeData) => {
    if (data.value === 'ageClass1') {
      setIsDrivingAllowed(false);
      if (['car', 'motorbike'].includes(mostPreferred)) {
        setMostPreferred('bicycle');
      }
    } else {
      setIsDrivingAllowed(true);
    }
  };

  const onMostPreferredChange = (event: React.BaseSyntheticEvent, data: RadioGroupOnChangeData) => {
    setMostPreferred(data.value);
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
          <RadioGroup defaultValue="ageClass2" onChange={onAgeChange} aria-labelledby="ageLabel">
            <Radio value="ageClass1" label="Under 16" />
            <Radio value="ageClass2" label="Between 16 and 50" />
            <Radio value="ageClass3" label="Over 50" />
          </RadioGroup>

          <Label id="mostPreferredLabel">Transportation mean that you prefer the most as a driver/rider:</Label>
          <RadioGroup value={mostPreferred} onChange={onMostPreferredChange} aria-labelledby="mostPreferredLabel">
            <Radio value="bicycle" label="Bicycle" />
            <Radio value="scooter" label="Scooter" />
            <Radio value="rollerSkates" label="Roller-skates" />
            <Radio value="car" disabled={!isDrivingAllowed} label="Car" />
            <Radio value="motorbike" disabled={!isDrivingAllowed} label="Motorbike" />
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
