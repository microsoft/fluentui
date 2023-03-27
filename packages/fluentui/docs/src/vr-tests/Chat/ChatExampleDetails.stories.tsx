import { ComponentMeta } from '@storybook/react';
import { Chat } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import ChatExampleDetails from '../../examples/components/Chat/Types/ChatExampleDetails.shorthand';

export default {
  component: Chat,
  title: 'Chat',
} as ComponentMeta<typeof Chat>;

const ChatExampleDetailsTeams = getThemeStoryVariant(ChatExampleDetails, 'teamsV2');

const ChatExampleDetailsTeamsDark = getThemeStoryVariant(ChatExampleDetails, 'teamsDarkV2');

const ChatExampleDetailsTeamsHighContrast = getThemeStoryVariant(ChatExampleDetails, 'teamsHighContrast');

export {
  ChatExampleDetails,
  ChatExampleDetailsTeams,
  ChatExampleDetailsTeamsDark,
  ChatExampleDetailsTeamsHighContrast,
};
