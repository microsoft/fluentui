import * as React from 'react';
import { Keys, StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Dropdown, dropdownSlotClassNames, dropdownSearchInputSlotClassNames } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
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
      <StoryWright steps={new Steps().click(selectors.triggerButton).snapshot('List with loading state').end()}>
        {story()}
      </StoryWright>
    ),
    story => (
      <StoryWright
        steps={new Steps().keys(selectors.input, Keys.upArrow).snapshot('showing loading in the bottom').end()}
      >
        {story()}
      </StoryWright>
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
