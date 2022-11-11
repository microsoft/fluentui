import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Toolbar, toolbarItemClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import ToolbarExamplePopupShorthand from '../../examples/components/Toolbar/Content/ToolbarExamplePopup.shorthand';

export default {
  component: Toolbar,
  title: 'Toolbar',
  decorators: [
    story => (
      <Screener
        steps={new Steps()
          .click(`.${toolbarItemClassName}:nth-child(1)`)
          .snapshot('Shows first popup')
          .click(`.${toolbarItemClassName}:nth-child(2)`)
          .snapshot('Shows second popup')
          .end()}
      >
        {story()}
      </Screener>
    ),
  ],
} as ComponentMeta<typeof Toolbar>;

const ToolbarExamplePopupShorthandTeams = getThemeStoryVariant(ToolbarExamplePopupShorthand, 'teamsV2');

const ToolbarExamplePopupShorthandTeamsDark = getThemeStoryVariant(ToolbarExamplePopupShorthand, 'teamsDarkV2');

const ToolbarExamplePopupShorthandTeamsHighContrast = getThemeStoryVariant(
  ToolbarExamplePopupShorthand,
  'teamsHighContrast',
);

export {
  ToolbarExamplePopupShorthand,
  ToolbarExamplePopupShorthandTeams,
  ToolbarExamplePopupShorthandTeamsDark,
  ToolbarExamplePopupShorthandTeamsHighContrast,
};
