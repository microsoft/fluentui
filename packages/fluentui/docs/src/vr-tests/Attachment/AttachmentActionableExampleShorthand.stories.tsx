import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Attachment } from '@fluentui/react-northstar';
import screenerSteps from './commonScreenerSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import AttachmentActionableExampleShorthand from '../../examples/components/Attachment/Variations/AttachmentActionableExample.shorthand';

export default {
  component: Attachment,
  title: 'Attachment',
  decorators: [story => <Screener steps={screenerSteps}>{story()}</Screener>],
} as ComponentMeta<typeof Attachment>;

const AttachmentActionableExampleShorthandTeams = getThemeStoryVariant(
  (AttachmentActionableExampleShorthand as unknown) as ComponentStory<any>,
  'teamsV2',
);

const AttachmentActionableExampleShorthandTeamsDark = getThemeStoryVariant(
  (AttachmentActionableExampleShorthand as unknown) as ComponentStory<any>,
  'teamsDarkV2',
);

const AttachmentActionableExampleShorthandTeamsHighContrast = getThemeStoryVariant(
  (AttachmentActionableExampleShorthand as unknown) as ComponentStory<any>,
  'teamsHighContrast',
);

export {
  AttachmentActionableExampleShorthand,
  AttachmentActionableExampleShorthandTeams,
  AttachmentActionableExampleShorthandTeamsDark,
  AttachmentActionableExampleShorthandTeamsHighContrast,
};
