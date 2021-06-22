import { ChatMessageVariables } from '../../../teams/components/Chat/chatMessageVariables';

export const chatMessageVariables = (siteVars: any): Partial<ChatMessageVariables> => {
  return {
    backgroundColor: siteVars.colorScheme.default.background,
    backgroundColorMine: siteVars.colorScheme.brand.background1,
    authorColor: siteVars.colorScheme.default.foreground2,
    authorFontWeight: siteVars.fontWeightRegular,
    timestampColorMine: siteVars.colorScheme.default.foreground2,
    compactHoverBackground: siteVars.colorScheme.default.backgroundHover,
  };
};
