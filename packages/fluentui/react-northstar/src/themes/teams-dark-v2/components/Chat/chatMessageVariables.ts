import { ChatMessageVariables } from '../../../teams/components/Chat/chatMessageVariables';

export const chatMessageVariables = (siteVars: any): Partial<ChatMessageVariables> => ({
  authorColor: siteVars.colorScheme.default.foreground2,
  authorFontWeight: siteVars.fontWeightRegular,
  backgroundColor: siteVars.colorScheme.default.background,
});
