import { Meta, ComponentStory } from '@storybook/react';
import { Divider } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import DividerExampleSize from '../../examples/components/Divider/Variations/DividerExampleSize.shorthand';

export default {
  component: Divider,
  title: 'Divider',
} as Meta<typeof Divider>;

const DividerExampleSizeTeams = getThemeStoryVariant(DividerExampleSize as unknown as ComponentStory<any>, 'teamsV2');

const DividerExampleSizeTeamsDark = getThemeStoryVariant(
  DividerExampleSize as unknown as ComponentStory<any>,
  'teamsDarkV2',
);

const DividerExampleSizeTeamsHighContrast = getThemeStoryVariant(
  DividerExampleSize as unknown as ComponentStory<any>,
  'teamsHighContrast',
);

export {
  DividerExampleSize,
  DividerExampleSizeTeams,
  DividerExampleSizeTeamsDark,
  DividerExampleSizeTeamsHighContrast,
};
