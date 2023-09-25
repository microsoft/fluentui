import { ChatMessageVariables } from '../../../teams/components/Chat/chatMessageVariables';

export const chatMessageVariables = (siteVars): Partial<ChatMessageVariables> => ({
  authorColor: siteVars.colorScheme.default.foreground2,
  authorFontWeight: siteVars.fontWeightRegular,
});
