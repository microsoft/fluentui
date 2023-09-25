import * as React from 'react';
import { StoryWright } from 'storywright';
import { ComponentMeta } from '@storybook/react';
import { Attachment } from '@fluentui/react-northstar';
import { CloseIcon, MoreIcon } from '@fluentui/react-icons-northstar';
import StoryWrightSteps from './commonStoryWrightSteps';
import { getThemeStoryVariant } from '../utilities/getThemeStoryVariant';

const handleClick = action => () => alert(`'${action}' was clicked`);

const AttachmentActionExampleShorthand = () => (
  <div>
    <Attachment
      header="Picture.jpg"
      actionable
      action={{ icon: <CloseIcon />, onClick: handleClick('Remove'), title: 'Close' }}
    />
    <Attachment
      header="Document.docx"
      actionable
      action={{ icon: <MoreIcon />, onClick: handleClick('Show more'), title: 'Show more' }}
    />
  </div>
);

export default {
  component: Attachment,
  title: 'Attachment',
  decorators: [story => <StoryWright steps={StoryWrightSteps}>{story()}</StoryWright>],
} as ComponentMeta<typeof Attachment>;

const AttachmentActionExampleShorthandTeams = getThemeStoryVariant(AttachmentActionExampleShorthand, 'teamsV2');

const AttachmentActionExampleShorthandTeamsDark = getThemeStoryVariant(AttachmentActionExampleShorthand, 'teamsDarkV2');

const AttachmentActionExampleShorthandTeamsHighContrast = getThemeStoryVariant(
  AttachmentActionExampleShorthand,
  'teamsHighContrast',
);

export {
  AttachmentActionExampleShorthand,
  AttachmentActionExampleShorthandTeams,
  AttachmentActionExampleShorthandTeamsDark,
  AttachmentActionExampleShorthandTeamsHighContrast,
};
