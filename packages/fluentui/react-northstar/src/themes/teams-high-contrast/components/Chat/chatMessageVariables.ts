import { ChatMessageVariables } from '../../../teams/components/Chat/chatMessageVariables';

export const chatMessageVariables = (siteVars: any): Partial<ChatMessageVariables> => ({
  border: `solid ${siteVars.borderWidth} ${siteVars.colorScheme.default.border}`,
  compactHoverBorder: `solid ${siteVars.borderWidth} ${siteVars.accessibleYellow}`,
  hasMentionColor: siteVars.accessibleYellow,
  isImportantColor: siteVars.accessibleYellow,
  reactionGroupBorderColor: siteVars.colorScheme.default.border,
});
