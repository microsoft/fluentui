import * as React from 'react';

import { Label, Checkbox, Button } from '@fluentui/react-components';

import { Combobox, Option, OptionGroup } from '@fluentui/react-components/unstable';

import { Scenario } from './utils';

export const FavoritesComboboxes: React.FunctionComponent = () => {
  const [isVegetarianSelected, setIsVegetarianSelected] = React.useState(false);

  return (
    <Scenario pageTitle="Comboboxes in questionnaire about your favorites">
      <h1>Questionnaire about your favorites</h1>
      <form>
        <Label htmlFor="color">Most favorite color</Label>
        <Combobox id="color">
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

        <Label htmlFor="food">Which food do you like?</Label>
        <Combobox id="food" multiselect placeholder="You can select multiple items">
          <OptionGroup label="Fruit and vegetables" />
          <Option>Apple</Option>
          <Option>Orange</Option>
          <Option>Banana</Option>
          <Option>Carrot</Option>
          <Option>Cucumber</Option>
          <Option>Tomato</Option>
          <OptionGroup label="Meat" />
          <Option disabled={isVegetarianSelected}>Beef</Option>
          <Option disabled={isVegetarianSelected}>Poultry</Option>
          <Option disabled={isVegetarianSelected}>Pork</Option>
          <OptionGroup label="Legume" />
          <Option>Beans</Option>
          <Option>Lentils</Option>
        </Combobox>

        <Button type="submit">Submit</Button>
      </form>
    </Scenario>
  );
};
