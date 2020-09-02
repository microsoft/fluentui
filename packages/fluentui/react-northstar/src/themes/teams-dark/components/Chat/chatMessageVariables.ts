import { ChatMessageVariables } from '../../../teams/components/Chat/chatMessageVariables';

export const chatMessageVariables = (siteVars: any): Partial<ChatMessageVariables> => {
  return {
    backgroundColor: siteVars.colors.grey[600],
    backgroundColorMine: siteVars.colors.brand[900],
    authorColor: siteVars.colors.grey[250],
    contentColor: siteVars.colors.white,
    color: siteVars.colors.white,
    timestampColorMine: siteVars.colors.grey[250],
    hasMentionNubbinColor: siteVars.colors.orange[300],
    isImportantColor: siteVars.colors.red[300],
  };
};
