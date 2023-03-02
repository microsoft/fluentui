import * as React from 'react';

import { Label, Checkbox, Button } from '@fluentui/react-components';

import { Combobox, Option, OptionGroup } from '@fluentui/react-components/unstable';

import { Scenario } from './utils';

export const FavoritesComboboxes: React.FunctionComponent = () => {
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
    <Scenario pageTitle="Comboboxes in questionnaire about your favorites">
      <h1>Questionnaire about your favorites</h1>
      {!isSubmitted ? (
        <form onSubmit={onSubmit}>
          <Label htmlFor="colors">The most favorite color</Label>
          <Combobox id="colors" required>
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
          </Combobox>

          <Checkbox
            checked={isVegetarianSelected}
            onChange={() => setIsVegetarianSelected(checked => !checked)}
            label="I am a vegetarian"
          />

          <Label htmlFor="ingredients">Which food ingredients do you like?</Label>
          <Combobox id="ingredients" multiselect placeholder="Please choose wisely" aria-describedby="ingredientsHint">
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
          </Combobox>
          <p id="ingredientsHint">You can select more than one ingredient.</p>

          <Label htmlFor="animals">Which animals do you like to pet the most?</Label>
          <Combobox id="animals" freeform placeholder="Please choose wisely" aria-describedby="animalsHint">
            <Option>Cats</Option>
            <Option>Dog</Option>
            <Option>Fish</Option>
            <Option>Hamster</Option>
            <Option>Lion</Option>
            <Option>Mouse</Option>
            <Option>Parrot</Option>
            <Option>Snake</Option>
            <Option>Turtle</Option>
          </Combobox>
          <p id="animalsHint">Please select one of the options or type your own animal.</p>

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
