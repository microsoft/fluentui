import { ChatMessageTimestampVariables } from '../../../teams/components/Chat/chatMessageTimestampVariables';

export const chatMessageTimestampVariables = (siteVars): Partial<ChatMessageTimestampVariables> => ({
  timestampColor: siteVars.colorScheme.default.foreground2,
});
