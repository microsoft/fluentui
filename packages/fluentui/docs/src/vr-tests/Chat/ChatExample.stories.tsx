import { ComponentMeta } from '@storybook/react';
import { Chat } from '@fluentui/react-northstar';
import { getThemeStoryVariant } from '../utilities';
import ChatExample from '../../examples/components/Chat/Types/ChatExample.shorthand';

export default {
  component: Chat,
  title: 'Chat',
} as ComponentMeta<typeof Chat>;

const ChatExampleTeams = getThemeStoryVariant(ChatExample, 'teamsV2');

const ChatExampleTeamsDark = getThemeStoryVariant(ChatExample, 'teamsDarkV2');

const ChatExampleTeamsHighContrast = getThemeStoryVariant(ChatExample, 'teamsHighContrast');

export { ChatExample, ChatExampleTeams, ChatExampleTeamsDark, ChatExampleTeamsHighContrast };
