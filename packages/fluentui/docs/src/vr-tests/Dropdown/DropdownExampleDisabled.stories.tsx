import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Dropdown, dropdownSlotClassNames, dropdownSearchInputSlotClassNames } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import DropdownExampleDisabled from '../../examples/components/Dropdown/State/DropdownExampleDisabled.shorthand';

const selectors = {
  triggerButton: `.${dropdownSlotClassNames.triggerButton}`,
  input: `.${dropdownSearchInputSlotClassNames.input}`,
};

export default {
  component: Dropdown,
  title: 'Dropdown',
  decorators: [
    story => (
      <Screener steps={new Steps().hover(selectors.triggerButton).snapshot('Mouse hover on trigger').end()}>
        {story()}
      </Screener>
    ),
    story => (
      <Screener steps={new Steps().hover(selectors.input).snapshot('Mouse hover on input').end()}>{story()}</Screener>
    ),
  ],
} as ComponentMeta<typeof Dropdown>;

const DropdownExampleDisabledTeams = getThemeStoryVariant(DropdownExampleDisabled, 'teamsV2');

const DropdownExampleDisabledTeamsDark = getThemeStoryVariant(DropdownExampleDisabled, 'teamsDarkV2');

const DropdownExampleDisabledTeamsHighContrast = getThemeStoryVariant(DropdownExampleDisabled, 'teamsHighContrast');

export {
  DropdownExampleDisabled,
  DropdownExampleDisabledTeams,
  DropdownExampleDisabledTeamsDark,
  DropdownExampleDisabledTeamsHighContrast,
};
