import { pxToRem } from '../../../../utils';

export interface ChatMessageVariables {
  actionMenuBoxShadow: string;
  actionMenuPositionRight: string;
  actionMenuPositionTop: string;
  backgroundColor: string;
  backgroundColorMine: string;
  borderRadius: string;
  color: string;
  offset: string;
  padding: string;
  paddingCompact: string;
  authorMarginRight: string;
  authorMarginRightCompact: string;
  authorColor: string;
  authorColorCompact: string;
  authorFontWeight: number;
  headerMarginBottom: string;
  compactHoverBackground: string;
  compactSpacing: string;
  contentColor: string;
  linkColor: string;
  linkColorMine: string;
  border: string;
  compactBorder: string;
  compactHoverBorder: string;
  badgeShadow: string;
  isImportant: boolean;
  hasMention: boolean;
  hasMentionColor: string;
  hasMentionNubbinColor: string;
  isImportantColor: string;
  badgeTextColor: string;
  reactionGroupMarginLeft: string;
  reactionGroupBorderColor: string;
  showActionMenu?: boolean;
  timestampColorCompact: string;
  timestampColorMine: string;
  zIndex: number;
  overlayZIndex: number;
}

export const chatMessageVariables = (siteVars): ChatMessageVariables => ({
  actionMenuBoxShadow: siteVars.shadowLevel1,
  actionMenuPositionRight: pxToRem(5),
  actionMenuPositionTop: pxToRem(-30),
  backgroundColor: siteVars.colors.white,
  backgroundColorMine: siteVars.colors.brand[100],
  borderRadius: siteVars.borderRadiusMedium,
  color: 'rgb(64, 64, 64)',
  offset: pxToRem(100),
  padding: pxToRem(16),
  paddingCompact: pxToRem(3),
  authorMarginRight: pxToRem(12),
  authorMarginRightCompact: pxToRem(8),
  authorColor: siteVars.colorScheme.default.foreground,
  authorColorCompact: siteVars.colorScheme.brand.foreground,
  authorFontWeight: siteVars.fontWeightSemibold,
  headerMarginBottom: pxToRem(2),
  compactHoverBackground: siteVars.colorScheme.default.backgroundHover3,
  compactSpacing: pxToRem(12),
  contentColor: siteVars.colors.grey[750],
  linkColor: siteVars.colorScheme.brand.foreground1,
  linkColorMine: siteVars.colorScheme.brand.foreground2,
  border: 'none',
  compactBorder: `solid 1px transparent`,
  compactHoverBorder: `solid 1px ${siteVars.colorScheme.default.backgroundHover3}`,
  badgeShadow: siteVars.shadowLevel1Dark,
  isImportant: false,
  hasMention: false,
  hasMentionColor: siteVars.colors.orange[300],
  hasMentionNubbinColor: siteVars.colors.orange[400],
  isImportantColor: siteVars.colors.red[400],
  badgeTextColor: siteVars.colors.white,
  reactionGroupMarginLeft: pxToRem(12),
  reactionGroupBorderColor: 'transparent',
  showActionMenu: undefined,
  timestampColorCompact: siteVars.colorScheme.default.foreground2,
  timestampColorMine: siteVars.colorScheme.default.foreground1,
  zIndex: siteVars.zIndexes.foreground,
  overlayZIndex: siteVars.zIndexes.overlay,
});
