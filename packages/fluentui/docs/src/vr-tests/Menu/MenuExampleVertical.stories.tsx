import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Menu, menuClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import MenuExampleVertical from '../../examples/components/Menu/Variations/MenuExampleVerticalPrimary.shorthand';

const selectors = {
  menu: `.${menuClassName}`,
  item: (itemIndex: number) => `.${menuClassName} li:nth-child(${itemIndex}) a`,
};

export default {
  component: Menu,
  title: 'Menu',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .hover(selectors.item(4))
          .snapshot('Hovers 4th item (hover state styles)')
          .click(selectors.item(4))
          .snapshot('Clicks on 4th item (opens submenu)')
          .hover(selectors.item(1))
          .snapshot('Hovers 1st item (hover state styles)')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Menu>;

const MenuExampleVerticalTeams = getThemeStoryVariant(MenuExampleVertical, 'teamsV2');

const MenuExampleVerticalTeamsDark = getThemeStoryVariant(MenuExampleVertical, 'teamsDarkV2');

const MenuExampleVerticalTeamsHighContrast = getThemeStoryVariant(MenuExampleVertical, 'teamsHighContrast');

export {
  MenuExampleVertical,
  MenuExampleVerticalTeams,
  MenuExampleVerticalTeamsDark,
  MenuExampleVerticalTeamsHighContrast,
};
