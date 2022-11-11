import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Toolbar, toolbarItemWrapperClassName, toolbarMenuItemClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant, keys } from '../utilities';
import ToolbarExampleMenuWithSubmenuShorthand from '../../examples/components/Toolbar/Content/ToolbarExampleMenuWithSubmenu.shorthand';

export default {
  component: Toolbar,
  title: 'Toolbar',
  decorators: [
    story => (
      <Screener
        steps={new Steps()
          .click(`.${toolbarItemWrapperClassName} button`)
          .snapshot('Shows menu')
          .keys(`.${toolbarMenuItemClassName}#ToolbarExampleMenuWithSubmenu_Play`, keys.rightArrow)
          .snapshot('Opens first submenu')
          .click(`.${toolbarMenuItemClassName}#ToolbarExampleMenuWithSubmenu_Appearance`)
          .snapshot('Opens second submenu')
          .end()}
      >
        {story()}
      </Screener>
    ),
  ],
} as ComponentMeta<typeof Toolbar>;

const ToolbarExampleMenuWithSubmenuShorthandTeams = getThemeStoryVariant(
  ToolbarExampleMenuWithSubmenuShorthand,
  'teamsV2',
);

const ToolbarExampleMenuWithSubmenuShorthandTeamsDark = getThemeStoryVariant(
  ToolbarExampleMenuWithSubmenuShorthand,
  'teamsDarkV2',
);

const ToolbarExampleMenuWithSubmenuShorthandTeamsHighContrast = getThemeStoryVariant(
  ToolbarExampleMenuWithSubmenuShorthand,
  'teamsHighContrast',
);

export {
  ToolbarExampleMenuWithSubmenuShorthand,
  ToolbarExampleMenuWithSubmenuShorthandTeams,
  ToolbarExampleMenuWithSubmenuShorthandTeamsDark,
  ToolbarExampleMenuWithSubmenuShorthandTeamsHighContrast,
};
