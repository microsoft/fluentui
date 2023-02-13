import { ComponentMeta } from '@storybook/react';
import { Input } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import InputExample from '../../examples/components/Input/Types/InputInvertedExample.shorthand';

export default {
  component: Input,
  title: 'Input',
} as ComponentMeta<typeof Input>;

const InputExampleTeams = getThemeStoryVariant(InputExample, 'teamsV2');

const InputExampleTeamsDark = getThemeStoryVariant(InputExample, 'teamsDarkV2');

const InputExampleTeamsHighContrast = getThemeStoryVariant(InputExample, 'teamsHighContrast');

export { InputExample, InputExampleTeams, InputExampleTeamsDark, InputExampleTeamsHighContrast };
