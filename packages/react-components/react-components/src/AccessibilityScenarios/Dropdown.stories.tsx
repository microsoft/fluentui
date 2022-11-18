import * as React from 'react';

import { Label, Checkbox, Button } from '@fluentui/react-components';

import { Dropdown, Option, OptionGroup } from '@fluentui/react-components/unstable';

import { Scenario } from './utils';

export const FavoritesDropdowns: React.FunctionComponent = () => {
  const [isVegetarianSelected, setIsVegetarianSelected] = React.useState(false);

  return (
    <Scenario pageTitle="Dropdowns in questionnaire about your favorites">
      <h1>Questionnaire about your favorites</h1>
      <form>
        <Label htmlFor="colors">Most favorite color</Label>
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
        <Dropdown id="ingredients" multiselect placeholder="You can select multiple ingredients">
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

        <Button type="submit">Submit</Button>
      </form>
    </Scenario>
  );
};
