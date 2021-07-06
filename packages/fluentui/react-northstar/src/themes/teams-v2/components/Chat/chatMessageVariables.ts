import { ChatMessageVariables } from '../../../teams/components/Chat/chatMessageVariables';

export const chatMessageVariables = (siteVars): Partial<ChatMessageVariables> => ({
  backgroundColor: siteVars.colorScheme.default.background,
  backgroundColorMine: siteVars.colorScheme.brand.background1,
  authorColor: siteVars.colorScheme.default.foreground2,
  authorFontWeight: siteVars.fontWeightRegular,
  timestampColor: siteVars.colorScheme.default.foreground2,
  timestampColorMine: siteVars.colorScheme.default.foreground2,
});
