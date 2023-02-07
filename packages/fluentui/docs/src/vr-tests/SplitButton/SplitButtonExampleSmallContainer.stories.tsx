import { ComponentMeta } from '@storybook/react';
import { SplitButton } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import SplitButtonExampleSmallContainer from '../../examples/components/SplitButton/Visual/SplitButtonExampleSmallContainer';

export default {
  component: SplitButton,
  title: 'SplitButton',
} as ComponentMeta<typeof SplitButton>;

const SplitButtonExampleSmallContainerTeams = getThemeStoryVariant(SplitButtonExampleSmallContainer, 'teamsV2');

const SplitButtonExampleSmallContainerTeamsDark = getThemeStoryVariant(SplitButtonExampleSmallContainer, 'teamsDarkV2');

const SplitButtonExampleSmallContainerTeamsHighContrast = getThemeStoryVariant(
  SplitButtonExampleSmallContainer,
  'teamsHighContrast',
);

export {
  SplitButtonExampleSmallContainer,
  SplitButtonExampleSmallContainerTeams,
  SplitButtonExampleSmallContainerTeamsDark,
  SplitButtonExampleSmallContainerTeamsHighContrast,
};
