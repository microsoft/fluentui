import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
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
      <Screener
        steps={new Steps()
          .click(selectors.item(1))
          .snapshot('Click 1st item, open menu')
          .hover(selectors.item(3))
          .snapshot('Hovers 2nd item, open submenu')
          .end()}
      >
        {story()}
      </Screener>
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
