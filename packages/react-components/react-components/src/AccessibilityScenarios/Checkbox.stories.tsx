import * as React from 'react';

import { Checkbox, CheckboxOnChangeData } from '@fluentui/react-checkbox';
import { Button } from '@fluentui/react-button';

import { Scenario } from './utils';

export const QuestionnaireAboutFoodAccessibilityScenario: React.FunctionComponent = () => {
  const [isAppleSelected, setIsAppleSelected] = React.useState(false);
  const [isBananaSelected, setIsBananaSelected] = React.useState(false);
  const [isOrangeSelected, setIsOrangeSelected] = React.useState(false);
  const [isSpecialDietSelected, setIsSpecialDietSelected] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const getSpecialDietDisabled = () => {
    return isSpecialDietSelected ? false : true;
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
    <Scenario pageTitle="Checkboxes in questionnaire about food">
      <h1>Questionnaire about food</h1>
      {!isSubmitted ? (
        <form onSubmit={onSubmit}>
          <div role="group" aria-labelledby="selectFoodText">
            <p id="selectFoodText">Select food that you like:</p>

            <Checkbox
              checked={
                isAppleSelected && isBananaSelected && isOrangeSelected
                  ? true
                  : !(isAppleSelected || isBananaSelected || isOrangeSelected)
                  ? false
                  : 'mixed'
              }
              onChange={(event: React.ChangeEvent, data: CheckboxOnChangeData) => {
                setIsAppleSelected(!!data.checked);
                setIsBananaSelected(!!data.checked);
                setIsOrangeSelected(!!data.checked);
              }}
              label="All fruits"
            />
            <Checkbox
              checked={isAppleSelected}
              onChange={() => setIsAppleSelected(checked => !checked)}
              label="Apple"
            />
            <Checkbox
              checked={isBananaSelected}
              onChange={() => setIsBananaSelected(checked => !checked)}
              label="Banana"
            />
            <Checkbox
              checked={isOrangeSelected}
              onChange={() => setIsOrangeSelected(checked => !checked)}
              label="Orange"
            />
          </div>

          <Checkbox
            checked={isSpecialDietSelected}
            onChange={() => setIsSpecialDietSelected(checked => !checked)}
            label="I am on special diet"
          />

          <div role="group" aria-labelledby="cannotEatText">
            <p id="cannotEatText">I cannot eat the following:</p>
            <Checkbox disabled={getSpecialDietDisabled()} label="Sugar" />
            <Checkbox disabled={getSpecialDietDisabled()} label="Meat" />
            <Checkbox disabled={getSpecialDietDisabled()} label="Dairy products" />
          </div>
          <Checkbox
            required
            label={
              <>
                I accept the <a href="#">terms and conditions</a>.
              </>
            }
          />
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
  title: '  Accessibility Scenarios/ Checkboxes in questionnaire about food',
  id: 'checkbox-accessibility-scenario',
};
