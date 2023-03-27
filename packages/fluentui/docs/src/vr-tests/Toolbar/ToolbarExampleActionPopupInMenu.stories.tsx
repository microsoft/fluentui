import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Toolbar, toolbarItemWrapperClassName, toolbarMenuItemClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import ToolbarExampleActionPopupInMenu from '../../examples/components/Toolbar/Usage/ToolbarExampleActionPopupInMenu.shorthand';

export default {
  component: Toolbar,
  title: 'Toolbar',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .click(`.${toolbarItemWrapperClassName} button`)
          .snapshot('Shows menu')
          .click(`.${toolbarMenuItemClassName}:nth-child(1)`)
          .snapshot('Shows popup')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Toolbar>;

const ToolbarExampleActionPopupInMenuTeams = getThemeStoryVariant(ToolbarExampleActionPopupInMenu, 'teamsV2');

const ToolbarExampleActionPopupInMenuTeamsDark = getThemeStoryVariant(ToolbarExampleActionPopupInMenu, 'teamsDarkV2');

const ToolbarExampleActionPopupInMenuTeamsHighContrast = getThemeStoryVariant(
  ToolbarExampleActionPopupInMenu,
  'teamsHighContrast',
);

export {
  ToolbarExampleActionPopupInMenu,
  ToolbarExampleActionPopupInMenuTeams,
  ToolbarExampleActionPopupInMenuTeamsDark,
  ToolbarExampleActionPopupInMenuTeamsHighContrast,
};
