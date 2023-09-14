import { ComponentMeta } from '@storybook/react';
import { Divider } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import DividerExampleContent from '../../examples/components/Divider/Types/DividerExampleContent.shorthand';

export default {
  component: Divider,
  title: 'Divider',
} as ComponentMeta<typeof Divider>;

const DividerExampleContentTeams = getThemeStoryVariant(DividerExampleContent, 'teamsV2');

const DividerExampleContentTeamsDark = getThemeStoryVariant(DividerExampleContent, 'teamsDarkV2');

const DividerExampleContentTeamsHighContrast = getThemeStoryVariant(DividerExampleContent, 'teamsHighContrast');

export {
  DividerExampleContent,
  DividerExampleContentTeams,
  DividerExampleContentTeamsDark,
  DividerExampleContentTeamsHighContrast,
};
