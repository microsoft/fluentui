import * as React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Screener from 'screener-storybook/src/screener';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentMeta } from '@storybook/react';
import { Attachment } from '@fluentui/react-northstar';
import screenerSteps from './commonScreenerSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';
import { MoreIcon, TableIcon } from '@fluentui/react-icons-northstar';

const handleClick = message => e => {
  alert(`'${message}' was clicked`);
  e.stopPropagation();
};

const AttachmentActionableExampleShorthand = () => (
  <Attachment
    actionable
    icon={<TableIcon />}
    header="Document.docx"
    description="800 Kb"
    action={{ icon: <MoreIcon />, onClick: handleClick('More Action'), title: 'More Action' }}
    progress={33}
    onClick={handleClick('Attachment')}
  />
);

export default {
  component: Attachment,
  title: 'Attachment',
  decorators: [story => <Screener steps={screenerSteps}>{story()}</Screener>],
} as ComponentMeta<typeof Attachment>;

const AttachmentActionableExampleShorthandTeams = getThemeStoryVariant(AttachmentActionableExampleShorthand, 'teamsV2');

const AttachmentActionableExampleShorthandTeamsDark = getThemeStoryVariant(
  AttachmentActionableExampleShorthand,
  'teamsDarkV2',
);

const AttachmentActionableExampleShorthandTeamsHighContrast = getThemeStoryVariant(
  AttachmentActionableExampleShorthand,
  'teamsHighContrast',
);

export {
  AttachmentActionableExampleShorthand,
  AttachmentActionableExampleShorthandTeams,
  AttachmentActionableExampleShorthandTeamsDark,
  AttachmentActionableExampleShorthandTeamsHighContrast,
};
