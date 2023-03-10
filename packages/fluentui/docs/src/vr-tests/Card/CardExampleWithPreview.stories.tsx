import { ComponentMeta } from '@storybook/react';
import { Card } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import CardExampleWithPreview from '../../examples/components/Card/Usage/CardExampleWithPreview';

export default {
  component: Card,
  title: 'Card',
} as ComponentMeta<typeof Card>;

const CardExampleWithPreviewTeams = getThemeStoryVariant(CardExampleWithPreview, 'teamsV2');

const CardExampleWithPreviewTeamsDark = getThemeStoryVariant(CardExampleWithPreview, 'teamsDarkV2');

const CardExampleWithPreviewTeamsHighContrast = getThemeStoryVariant(CardExampleWithPreview, 'teamsHighContrast');

export {
  CardExampleWithPreview,
  CardExampleWithPreviewTeams,
  CardExampleWithPreviewTeamsDark,
  CardExampleWithPreviewTeamsHighContrast,
};
