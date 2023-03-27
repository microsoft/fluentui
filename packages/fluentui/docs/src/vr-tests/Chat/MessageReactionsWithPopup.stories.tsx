import { ComponentMeta } from '@storybook/react';
import { Chat } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import MessageReactionsWithPopup from '../../examples/components/Chat/Content/ChatExampleReactionGroupMeReacting.shorthand';

export default {
  component: Chat,
  title: 'Chat',
} as ComponentMeta<typeof Chat>;

const MessageReactionsWithPopupTeams = getThemeStoryVariant(MessageReactionsWithPopup, 'teamsV2');

const MessageReactionsWithPopupTeamsDark = getThemeStoryVariant(MessageReactionsWithPopup, 'teamsDarkV2');

const MessageReactionsWithPopupTeamsHighContrast = getThemeStoryVariant(MessageReactionsWithPopup, 'teamsHighContrast');

export {
  MessageReactionsWithPopup,
  MessageReactionsWithPopupTeams,
  MessageReactionsWithPopupTeamsDark,
  MessageReactionsWithPopupTeamsHighContrast,
};
