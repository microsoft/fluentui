import * as React from 'react';
import { Keys, StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Toolbar, toolbarItemWrapperClassName, toolbarMenuItemClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import ToolbarExampleMenuWithSubmenuShorthand from '../../examples/components/Toolbar/Content/ToolbarExampleMenuWithSubmenu.shorthand';

export default {
  component: Toolbar,
  title: 'Toolbar',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .click(`.${toolbarItemWrapperClassName} button`)
          .snapshot('Shows menu')
          .keys(`.${toolbarMenuItemClassName}#ToolbarExampleMenuWithSubmenu_Play`, Keys.rightArrow)
          .snapshot('Opens first submenu')
          .click(`.${toolbarMenuItemClassName}#ToolbarExampleMenuWithSubmenu_Appearance`)
          .snapshot('Opens second submenu')
          .end()}
      >
        {story()}
      </StoryWright>
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
