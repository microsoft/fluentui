import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Menu, menuClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import MenuExampleWithSubMenuHover from '../../examples/components/Menu/Usage/MenuExampleWithSubmenuHover.shorthand';

const selectors = {
  item: (itemIndex: number) => `.${menuClassName} li:nth-child(${itemIndex}) a`,
};

export default {
  component: Menu,
  title: 'Menu',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .click(selectors.item(1))
          .snapshot('Click 1st item, open menu')
          .hover(selectors.item(3))
          .snapshot('Hovers 2nd item, open submenu')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Menu>;

const MenuExampleWithSubMenuHoverTeams = getThemeStoryVariant(MenuExampleWithSubMenuHover, 'teamsV2');

const MenuExampleWithSubMenuHoverTeamsDark = getThemeStoryVariant(MenuExampleWithSubMenuHover, 'teamsDarkV2');

const MenuExampleWithSubMenuHoverTeamsHighContrast = getThemeStoryVariant(
  MenuExampleWithSubMenuHover,
  'teamsHighContrast',
);

export {
  MenuExampleWithSubMenuHover,
  MenuExampleWithSubMenuHoverTeams,
  MenuExampleWithSubMenuHoverTeamsDark,
  MenuExampleWithSubMenuHoverTeamsHighContrast,
};
