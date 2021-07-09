import { ChatMessageDetailsVariables } from '../../../teams/components/Chat/chatMessageDetailsVariables';

export const chatMessageDetailsVariables = (siteVars): Partial<ChatMessageDetailsVariables> => ({
  detailsColor: siteVars.colorScheme.default.foreground2,
});
