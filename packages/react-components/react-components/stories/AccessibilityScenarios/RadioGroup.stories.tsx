import * as React from 'react';

import { Button, Label, RadioGroup, Radio, RadioGroupOnChangeData } from '@fluentui/react-components';

import { Scenario } from './utils';

export const QuestionnaireAboutTransportationRadios: React.FunctionComponent = () => {
  const [isDrivingAllowed, setIsDrivingAllowed] = React.useState(true);
  const [isMotor, setIsMotor] = React.useState(false);
  const [preferredMeans, setPreferredMeans] = React.useState('bicycle');
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const onAgeChange = (event: React.BaseSyntheticEvent, data: RadioGroupOnChangeData) => {
    if (data.value === 'ageClass1') {
      setIsDrivingAllowed(false);
      if (['car', 'motorbike'].includes(preferredMeans)) {
        setPreferredMeans('bicycle');
      }
    } else {
      setIsDrivingAllowed(true);
    }
  };

  const onPreferredMeansChange = (event: React.BaseSyntheticEvent, data: RadioGroupOnChangeData) => {
    setPreferredMeans(data.value);
    setIsMotor(['car', 'motorbike'].includes(data.value));
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

          <Label id="preferredMeansLabel">The most preferred transportation means as a driver/rider:</Label>
          <RadioGroup value={preferredMeans} onChange={onPreferredMeansChange} aria-labelledby="preferredMeansLabel">
            <Radio value="bicycle" label="Bicycle" />
            <Radio value="scooter" label="Scooter" />
            <Radio value="rollerSkates" label="Roller-skates" />
            <Radio value="car" disabled={!isDrivingAllowed} label="Car" />
            <Radio value="motorbike" disabled={!isDrivingAllowed} label="Motorbike" />
          </RadioGroup>

          <Label id="preferredTypeLabel">The most preferred type of motor vehicle:</Label>
          <RadioGroup defaultValue="gasoline" disabled={!isMotor} aria-labelledby="preferredTypeLabel">
            <Radio value="gasoline" label="Gasoline" />
            <Radio value="diesel" label="Diesel" />
            <Radio value="electric" label="Electric" />
          </RadioGroup>

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
