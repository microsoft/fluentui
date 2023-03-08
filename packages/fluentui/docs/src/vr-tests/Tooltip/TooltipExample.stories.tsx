import * as React from 'react';
import { StoryWright, Steps } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Tooltip, buttonClassName } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import TooltipExample from '../../examples/components/Tooltip/Types/TooltipExample.shorthand';

export default {
  component: Tooltip,
  title: 'Tooltip',
  decorators: [
    story => (
      <StoryWright steps={new Steps().hover(`.${buttonClassName}`).snapshot('Shows tooltip').end()}>
        {story()}
      </StoryWright>
    ),
  ],
} as ComponentMeta<typeof Tooltip>;

const TooltipExampleTeams = getThemeStoryVariant(TooltipExample, 'teamsV2');

const TooltipExampleTeamsDark = getThemeStoryVariant(TooltipExample, 'teamsDarkV2');

const TooltipExampleTeamsHighContrast = getThemeStoryVariant(TooltipExample, 'teamsHighContrast');

export { TooltipExample, TooltipExampleTeams, TooltipExampleTeamsDark, TooltipExampleTeamsHighContrast };
