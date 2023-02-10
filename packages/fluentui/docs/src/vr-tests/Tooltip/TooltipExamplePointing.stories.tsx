import * as React from 'react';
import { Keys, StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Tooltip, buttonClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import TooltipExamplePointing from '../../examples/components/Tooltip/Types/TooltipExamplePointing.shorthand';

export default {
  component: Tooltip,
  title: 'Tooltip',
  decorators: [
    story => (
      <StoryWright steps={new Steps().hover(`.${buttonClassName}`).snapshot('Shows tooltip').end()}>
        {story()}
      </StoryWright>
    ),
    story => (
      <StoryWright
        steps={new Steps()
          .keys('body', Keys.tab)
          .snapshot('Has outline on keyboard')
          .click(`.${buttonClassName}`)
          .snapshot('No outline after click')
          .end()}
      >
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Tooltip>;

const TooltipExamplePointingTeams = getThemeStoryVariant(TooltipExamplePointing, 'teamsV2');

const TooltipExamplePointingTeamsDark = getThemeStoryVariant(TooltipExamplePointing, 'teamsDarkV2');

const TooltipExamplePointingTeamsHighContrast = getThemeStoryVariant(TooltipExamplePointing, 'teamsHighContrast');

export {
  TooltipExamplePointing,
  TooltipExamplePointingTeams,
  TooltipExamplePointingTeamsDark,
  TooltipExamplePointingTeamsHighContrast,
};
