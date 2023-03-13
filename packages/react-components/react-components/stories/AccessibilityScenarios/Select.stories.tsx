import * as React from 'react';

import { Label, Checkbox, Button, Select } from '@fluentui/react-components';

import { Scenario } from './utils';

export const FavoritesSelects: React.FunctionComponent = () => {
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
    <Scenario pageTitle="Selects in questionnaire about your favorites">
      <h1>Questionnaire about your favorites</h1>
      {!isSubmitted ? (
        <form onSubmit={onSubmit}>
          <Label htmlFor="colors">The most favorite color</Label>
          <Select id="colors">
            <option>White</option>
            <option>Yellow</option>
            <option>Orange</option>
            <option>Pink</option>
            <option>Violet</option>
            <option>Red</option>
            <option>Blue</option>
            <option>Green</option>
            <option>Brown</option>
            <option>Black</option>
          </Select>

          <Checkbox
            checked={isVegetarianSelected}
            onChange={() => setIsVegetarianSelected(checked => !checked)}
            label="I am a vegetarian"
          />

          <Label htmlFor="ingredients">Which food ingredient do you like the most?</Label>
          <Select id="ingredients" placeholder="Please choose wisely" aria-describedby="ingredientsHint">
            <optgroup label="Fruit and vegetables">
              <option>Apple</option>
              <option>Orange</option>
              <option>Banana</option>
              <option>Carrot</option>
              <option>Cucumber</option>
              <option>Tomato</option>
            </optgroup>

            <optgroup label="Meat">
              <option disabled={isVegetarianSelected}>Beef</option>
              <option disabled={isVegetarianSelected}>Poultry</option>
              <option disabled={isVegetarianSelected}>Pork</option>
            </optgroup>

            <optgroup label="Legume">
              <option>Beans</option>
              <option>Peas</option>
              <option>Lentils</option>
            </optgroup>
          </Select>
          <p id="ingredientsHint">The available options depend on whether you are a vegetarian or not.</p>

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
