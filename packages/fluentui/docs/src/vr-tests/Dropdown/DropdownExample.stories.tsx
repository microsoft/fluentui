import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { StoryWright, Steps } from 'storywright';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Dropdown, dropdownSlotClassNames } from '@fluentui/react-northstar';
import { getThemeStoryVariant, keys } from '../utilities';
import DropdownExample from '../../examples/components/Dropdown/Types/DropdownExample.shorthand';

const selectors = {
  triggerButton: `.${dropdownSlotClassNames.triggerButton}`,
  item: (itemIndex: number) => `.${dropdownSlotClassNames.itemsList} li:nth-child(${itemIndex})`,
};

export default {
  component: Dropdown,
  title: 'Dropdown',
  decorators: [
    story => (
      <StoryWright steps={new Steps().click(selectors.triggerButton).snapshot('Shows list').end()}>
        {story()}
      </StoryWright>
    ),
    story => (
      <StoryWright
        steps={new Steps()
          .click(selectors.triggerButton)
          .click(selectors.item(3))
          .snapshot('Selects an item')
          .click(selectors.triggerButton)
          .snapshot('Opens with selected item highlighted')
          .hover(selectors.item(2))
          .snapshot('Highlights another item')
          .click(selectors.triggerButton)
          .snapshot('Closes the list')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
    story => (
      <StoryWright
        steps={new Steps()
          .keys('body', keys.tab)
          .snapshot('Focuses trigger')
          .keys(selectors.triggerButton, keys.downArrow)
          .snapshot('Focuses first item')
          .keys(selectors.triggerButton, keys.downArrow)
          .snapshot('Focuses second item')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Dropdown>;

const DropdownExampleTeams = getThemeStoryVariant(DropdownExample, 'teamsV2');

const DropdownExampleTeamsDark = getThemeStoryVariant(DropdownExample, 'teamsDarkV2');

const DropdownExampleTeamsHighContrast = getThemeStoryVariant(DropdownExample, 'teamsHighContrast');

export { DropdownExample, DropdownExampleTeams, DropdownExampleTeamsDark, DropdownExampleTeamsHighContrast };
