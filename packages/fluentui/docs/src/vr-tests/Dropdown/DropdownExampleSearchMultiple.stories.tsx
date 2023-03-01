import * as React from 'react';
import { Keys, StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Dropdown, dropdownSearchInputSlotClassNames, dropdownSlotClassNames } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import DropdownExampleSearchMultiple from '../../examples/components/Dropdown/Types/DropdownExampleSearchMultiple.shorthand';

const selectors = {
  toggleIndicator: `.${dropdownSlotClassNames.toggleIndicator}`,
  input: `.${dropdownSearchInputSlotClassNames.input}`,
  item: (itemIndex: number) => `.${dropdownSlotClassNames.itemsList} li:nth-child(${itemIndex})`,
  selectedItem: (itemIndex: number) => `.${dropdownSlotClassNames.selectedItems} span:nth-child(${itemIndex})`,
};

export default {
  component: Dropdown,
  title: 'Dropdown',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .click(selectors.toggleIndicator)
          .click(selectors.item(2))
          .click(selectors.toggleIndicator)
          .click(selectors.item(2))
          .keys(selectors.input, Keys.leftArrow)
          .snapshot('Selects last selected element')
          .hover(selectors.selectedItem(1))
          .snapshot('Hovers first selected element')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Dropdown>;

const DropdownExampleSearchMultipleTeams = getThemeStoryVariant(DropdownExampleSearchMultiple, 'teamsV2');

const DropdownExampleSearchMultipleTeamsDark = getThemeStoryVariant(DropdownExampleSearchMultiple, 'teamsDarkV2');

const DropdownExampleSearchMultipleTeamsHighContrast = getThemeStoryVariant(
  DropdownExampleSearchMultiple,
  'teamsHighContrast',
);

export {
  DropdownExampleSearchMultiple,
  DropdownExampleSearchMultipleTeams,
  DropdownExampleSearchMultipleTeamsDark,
  DropdownExampleSearchMultipleTeamsHighContrast,
};
