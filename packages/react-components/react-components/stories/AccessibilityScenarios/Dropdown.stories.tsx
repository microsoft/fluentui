import * as React from 'react';

import { Label, Checkbox, Button } from '@fluentui/react-components';

import { Dropdown, Option, OptionGroup } from '@fluentui/react-components/unstable';

import { Scenario } from './utils';

export const FavoritesDropdowns: React.FunctionComponent = () => {
  const [isVegetarianSelected, setIsVegetarianSelected] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

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
    <Scenario pageTitle="Dropdowns in questionnaire about your favorites">
      <h1>Questionnaire about your favorites</h1>
      {!isSubmitted ? (
        <form onSubmit={onSubmit}>
          <Label htmlFor="colors">The most favorite color</Label>
          <Dropdown id="colors">
            <Option>White</Option>
            <Option>Yellow</Option>
            <Option>Orange</Option>
            <Option>Pink</Option>
            <Option>Violet</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Green</Option>
            <Option>Brown</Option>
            <Option>Black</Option>
          </Dropdown>

          <Checkbox
            checked={isVegetarianSelected}
            onChange={() => setIsVegetarianSelected(checked => !checked)}
            label="I am a vegetarian"
          />

          <Label htmlFor="ingredients">Which food ingredients do you like?</Label>
          <Dropdown id="ingredients" multiselect placeholder="Please choose wisely" aria-describedby="ingredientsHint">
            <OptionGroup label="Fruit and vegetables">
              <Option>Apple</Option>
              <Option>Orange</Option>
              <Option>Banana</Option>
              <Option>Carrot</Option>
              <Option>Cucumber</Option>
              <Option>Tomato</Option>
            </OptionGroup>

            <OptionGroup label="Meat">
              <Option disabled={isVegetarianSelected}>Beef</Option>
              <Option disabled={isVegetarianSelected}>Poultry</Option>
              <Option disabled={isVegetarianSelected}>Pork</Option>
            </OptionGroup>

            <OptionGroup label="Legume">
              <Option>Beans</Option>
              <Option>Peas</Option>
              <Option>Lentils</Option>
            </OptionGroup>
          </Dropdown>
          <p id="ingredientsHint">You can select more than one ingredient.</p>

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
