import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Attachment } from '@fluentui/react-northstar';
import screenerSteps from './commonScreenerSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import AttachmentActionExampleShorthand from '../../examples/components/Attachment/Slots/AttachmentActionExample.shorthand';

export default {
  component: Attachment,
  title: 'Attachment',
  decorators: [story => <Screener steps={screenerSteps}>{story()}</Screener>],
} as ComponentMeta<typeof Attachment>;

const AttachmentTeams = getThemeStoryVariant(Attachment, 'teamsV2');

const AttachmentTeamsDark = getThemeStoryVariant(Attachment, 'teamsDarkV2');

const AttachmentTeamsHighContrast = getThemeStoryVariant(Attachment, 'teamsHighContrast');

export { AttachmentTeams, AttachmentTeamsDark, AttachmentTeamsHighContrast, AttachmentActionExampleShorthand };
