import { ComponentMeta } from '@storybook/react';
import { TextArea } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import TextAreaExampleInverted from '../../examples/components/TextArea/Variations/TextAreaExampleInverted.shorthand';

export default {
  component: TextArea,
  title: 'TextArea',
} as ComponentMeta<typeof TextArea>;

const TextAreaExampleInvertedTeams = getThemeStoryVariant(TextAreaExampleInverted, 'teamsV2');

const TextAreaExampleInvertedTeamsDark = getThemeStoryVariant(TextAreaExampleInverted, 'teamsDarkV2');

const TextAreaExampleInvertedTeamsHighContrast = getThemeStoryVariant(TextAreaExampleInverted, 'teamsHighContrast');

export {
  TextAreaExampleInverted,
  TextAreaExampleInvertedTeams,
  TextAreaExampleInvertedTeamsDark,
  TextAreaExampleInvertedTeamsHighContrast,
};
