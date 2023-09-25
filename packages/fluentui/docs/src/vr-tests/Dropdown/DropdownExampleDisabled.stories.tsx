import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
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
      <StoryWright steps={new Steps().hover(selectors.triggerButton).snapshot('Mouse hover on trigger').end()}>
        {story()}
      </StoryWright>
    ),
    story => (
      <StoryWright steps={new Steps().hover(selectors.input).snapshot('Mouse hover on input').end()}>
        {story()}
      </StoryWright>
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
