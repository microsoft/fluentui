import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Dropdown, dropdownSlotClassNames, dropdownSearchInputSlotClassNames } from '@fluentui/react-northstar';
import { getThemeStoryVariant, keys } from '../utilities';
import DropdownExampleLoading from '../../examples/components/Dropdown/State/DropdownExampleLoading.shorthand';

const selectors = {
  triggerButton: `.${dropdownSlotClassNames.toggleIndicator}`,
  input: `.${dropdownSearchInputSlotClassNames.input}`,
};

export default {
  component: Dropdown,
  title: 'Dropdown',
  decorators: [
    story => (
      <Screener steps={new Steps().click(selectors.triggerButton).snapshot('List with loading state').end()}>
        {story()}
      </Screener>
    ),
    story => (
      <Screener steps={new Steps().keys(selectors.input, keys.upArrow).snapshot('showing loading in the bottom').end()}>
        {story()}
      </Screener>
    ),
  ],
} as ComponentMeta<typeof Dropdown>;

const DropdownExampleLoadingTeams = getThemeStoryVariant(DropdownExampleLoading, 'teamsV2');

const DropdownExampleLoadingTeamsDark = getThemeStoryVariant(DropdownExampleLoading, 'teamsDarkV2');

const DropdownExampleLoadingTeamsHighContrast = getThemeStoryVariant(DropdownExampleLoading, 'teamsHighContrast');

export {
  DropdownExampleLoading,
  DropdownExampleLoadingTeams,
  DropdownExampleLoadingTeamsDark,
  DropdownExampleLoadingTeamsHighContrast,
};
