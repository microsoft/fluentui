import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Toolbar, toolbarItemClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import ToolbarExamplePopupShorthand from '../../examples/components/Toolbar/Content/ToolbarExamplePopup.shorthand';

export default {
  component: Toolbar,
  title: 'Toolbar',
  decorators: [
    story => (
      <StoryWright
        steps={new Steps()
          .click(`.${toolbarItemClassName}:nth-child(1)`)
          .snapshot('Shows first popup')
          .click(`.${toolbarItemClassName}:nth-child(2)`)
          .snapshot('Shows second popup')
          .end()}
      >
        {story()}
      </StoryWright>
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
