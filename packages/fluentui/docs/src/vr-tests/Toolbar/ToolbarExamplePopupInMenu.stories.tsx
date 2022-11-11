import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Toolbar, toolbarItemClassName, toolbarMenuItemClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import ToolbarExamplePopupInMenu from '../../examples/components/Toolbar/Usage/ToolbarExamplePopupInMenu.shorthand';

export default {
  component: Toolbar,
  title: 'Toolbar',
  decorators: [
    story => (
      <Screener
        steps={new Steps()
          .click(`.${toolbarItemClassName}:nth-child(1)`)
          .snapshot('Shows menu')
          .click(`.${toolbarMenuItemClassName}:nth-child(1)`)
          .snapshot('Shows popup')
          .end()}
      >
        {story()}
      </Screener>
    ),
  ],
} as ComponentMeta<typeof Toolbar>;

const ToolbarExamplePopupInMenuTeams = getThemeStoryVariant(ToolbarExamplePopupInMenu, 'teamsV2');

const ToolbarExamplePopupInMenuTeamsDark = getThemeStoryVariant(ToolbarExamplePopupInMenu, 'teamsDarkV2');

const ToolbarExamplePopupInMenuTeamsHighContrast = getThemeStoryVariant(ToolbarExamplePopupInMenu, 'teamsHighContrast');

export {
  ToolbarExamplePopupInMenu,
  ToolbarExamplePopupInMenuTeams,
  ToolbarExamplePopupInMenuTeamsDark,
  ToolbarExamplePopupInMenuTeamsHighContrast,
};
