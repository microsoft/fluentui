import { ChatMessageVariables } from '../../../teams/components/Chat/chatMessageVariables';

export const chatMessageVariables = (siteVars: any): Partial<ChatMessageVariables> => {
  return {
    backgroundColor: siteVars.colors.black,
    backgroundColorMine: siteVars.colors.black,
    authorColor: siteVars.colors.white,
    contentColor: siteVars.colors.white,
    color: siteVars.colors.white,
    border: `1px solid ${siteVars.colors.white}`,
    hasMentionColor: siteVars.accessibleYellow,
    hasMentionNubbinColor: siteVars.accessibleYellow,
    isImportantColor: siteVars.accessibleYellow,
    badgeTextColor: siteVars.colors.black,
    timestampColorMine: siteVars.colors.white,
    reactionGroupBorderColor: siteVars.colors.white,
  };
};
