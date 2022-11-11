import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener, { Steps } from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Tooltip, buttonClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import TooltipExample from '../../examples/components/Tooltip/Types/TooltipExample.shorthand';

export default {
  component: Tooltip,
  title: 'Tooltip',
  decorators: [
    story => (
      <Screener steps={new Steps().hover(`.${buttonClassName}`).snapshot('Shows tooltip').end()}>{story()}</Screener>
    ),
  ],
} as ComponentMeta<typeof Tooltip>;

const TooltipExampleTeams = getThemeStoryVariant(TooltipExample, 'teamsV2');

const TooltipExampleTeamsDark = getThemeStoryVariant(TooltipExample, 'teamsDarkV2');

const TooltipExampleTeamsHighContrast = getThemeStoryVariant(TooltipExample, 'teamsHighContrast');

export { TooltipExample, TooltipExampleTeams, TooltipExampleTeamsDark, TooltipExampleTeamsHighContrast };
