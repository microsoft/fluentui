import { ComponentMeta } from '@storybook/react';
import { Chat } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import ChatExampleCompact from '../../examples/components/Chat/Types/ChatExampleCompact.shorthand';

export default {
  component: Chat,
  title: 'Chat',
} as ComponentMeta<typeof Chat>;

const ChatExampleCompactTeams = getThemeStoryVariant(ChatExampleCompact, 'teamsV2');

const ChatExampleCompactTeamsDark = getThemeStoryVariant(ChatExampleCompact, 'teamsDarkV2');

const ChatExampleCompactTeamsHighContrast = getThemeStoryVariant(ChatExampleCompact, 'teamsHighContrast');

export {
  ChatExampleCompact,
  ChatExampleCompactTeams,
  ChatExampleCompactTeamsDark,
  ChatExampleCompactTeamsHighContrast,
};
