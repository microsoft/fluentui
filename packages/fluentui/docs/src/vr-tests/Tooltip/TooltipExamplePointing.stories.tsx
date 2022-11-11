import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Tooltip, buttonClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant, keys } from '../utilities';
import TooltipExamplePointing from '../../examples/components/Tooltip/Types/TooltipExamplePointing.shorthand';

export default {
  component: Tooltip,
  title: 'Tooltip',
  decorators: [
    story => (
      <Screener steps={new Steps().hover(`.${buttonClassName}`).snapshot('Shows tooltip').end()}>{story()}</Screener>
    ),
    story => (
      <Screener
        steps={new Steps()
          .keys('body', keys.tab)
          .snapshot('Has outline on keyboard')
          .click(`.${buttonClassName}`)
          .snapshot('No outline after click')
          .end()}
      >
        {story()}
      </Screener>
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
