import { ChatMessageVariables } from '../../../teams/components/Chat/chatMessageVariables';

export const chatMessageVariables = (siteVars: any): Partial<ChatMessageVariables> => ({
  authorColor: siteVars.colorScheme.default.foreground1,
  backgroundColor: siteVars.colorScheme.default.background4,
  compactHoverBackground: siteVars.colorScheme.default.backgroundHover,
  compactHoverBorder: `solid 1px ${siteVars.colorScheme.default.backgroundHover}`,
});
