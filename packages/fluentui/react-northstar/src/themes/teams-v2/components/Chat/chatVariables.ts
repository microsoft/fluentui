import { ChatVariables } from '../../../teams/components/Chat/chatVariables';

export const chatVariables = (siteVars): Partial<ChatVariables> => ({
  backgroundColor: siteVars.colorScheme.default.background2,
});
