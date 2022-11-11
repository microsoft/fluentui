import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Attachment } from '@fluentui/react-northstar';
import screenerSteps from './commonScreenerSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import AttachmentActionExampleShorthand from '../../examples/components/Attachment/Slots/AttachmentActionExample.shorthand';

export default {
  component: Attachment,
  title: 'Attachment',
  decorators: [story => <Screener steps={screenerSteps}>{story()}</Screener>],
} as ComponentMeta<typeof Attachment>;

const AttachmentActionExampleShorthandTeams = getThemeStoryVariant(
  (AttachmentActionExampleShorthand as unknown) as ComponentStory<any>,
  'teamsV2',
);

const AttachmentActionExampleShorthandTeamsDark = getThemeStoryVariant(
  (AttachmentActionExampleShorthand as unknown) as ComponentStory<any>,
  'teamsDarkV2',
);

const AttachmentActionExampleShorthandTeamsHighContrast = getThemeStoryVariant(
  (AttachmentActionExampleShorthand as unknown) as ComponentStory<any>,
  'teamsHighContrast',
);

export {
  AttachmentActionExampleShorthand,
  AttachmentActionExampleShorthandTeams,
  AttachmentActionExampleShorthandTeamsDark,
  AttachmentActionExampleShorthandTeamsHighContrast,
};
