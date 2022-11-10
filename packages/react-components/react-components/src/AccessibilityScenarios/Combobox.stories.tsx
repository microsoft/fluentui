import * as React from 'react';

import { Label, Checkbox, Button } from '@fluentui/react-components';

import { Combobox, Option } from '@fluentui/react-components/unstable';

import { Scenario } from './utils';

export const FavoritesComboboxes: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="Comboboxes in questionnaire about your favorites">
      <h1>Questionnaire about your favorites</h1>
      <form>
        <Combobox id="">
          <Option>Carrot</Option>
        </Combobox>
        <Button type="submit">Submit</Button>
      </form>
    </Scenario>
  );
};
