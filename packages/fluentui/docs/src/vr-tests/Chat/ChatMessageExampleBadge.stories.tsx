import { Meta } from '@storybook/react';
import { Chat } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import ChatMessageExampleBadge from '../../examples/components/Chat/Types/ChatMessageExampleBadge.shorthand';

export default {
  component: Chat,
  title: 'Chat',
} as Meta<typeof Chat>;

const ChatMessageExampleBadgeTeams = getThemeStoryVariant(ChatMessageExampleBadge, 'teamsV2');

const ChatMessageExampleBadgeTeamsDark = getThemeStoryVariant(ChatMessageExampleBadge, 'teamsDarkV2');

const ChatMessageExampleBadgeTeamsHighContrast = getThemeStoryVariant(ChatMessageExampleBadge, 'teamsHighContrast');

export {
  ChatMessageExampleBadge,
  ChatMessageExampleBadgeTeams,
  ChatMessageExampleBadgeTeamsDark,
  ChatMessageExampleBadgeTeamsHighContrast,
};
