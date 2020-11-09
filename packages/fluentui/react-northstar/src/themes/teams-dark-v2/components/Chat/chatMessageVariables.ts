import { ChatMessageVariables } from '../../../teams/components/Chat/chatMessageVariables';

export const chatMessageVariables = (siteVars: any): Partial<ChatMessageVariables> => {
  return {
    backgroundColor: siteVars.colorScheme.default.background,
    backgroundColorMine: siteVars.colorScheme.brand.background1,
    authorColor: siteVars.colorScheme.default.foreground2,
    authorFontWeight: siteVars.fontWeightRegular,
    contentColor: siteVars.colors.white,
    color: siteVars.colors.white,
    timestampColorMine: siteVars.colorScheme.default.foreground2,
    hasMentionNubbinColor: siteVars.colors.orange[300],
    isImportantColor: siteVars.colors.red[300],
  };
};
