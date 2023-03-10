import { pxToRem } from '../../../../utils';

export interface ChatMessageVariables {
  actionMenuBoxShadow: string;
  actionMenuPositionRight: string;
  actionMenuPositionTop: string;
  authorColor: string;
  authorColorMineCompact: string;
  authorFontWeight: number;
  authorFontWeightCompact: number;
  authorMarginRight: string;
  authorMarginRightCompact: string;
  backgroundColor: string;
  backgroundColorMine: string;
  badgeShadow: string;
  badgeTextColor: string;
  border: string;
  borderRadius: string;
  compactBorder: string;
  compactHoverBackground: string;
  compactHoverBorder: string;
  compactSpacing: string;
  contentColor: string;
  hasMention: boolean;
  hasMentionColor: string;
  hasMentionNubbinColor: string;
  headerMarginBottom: string;
  isImportant: boolean;
  isImportantColor: string;
  linkColor: string;
  linkColorMine: string;
  offset: string;
  overlayZIndex: number;
  padding: string;
  paddingCompact: string;
  reactionGroupBorderColor: string;
  reactionGroupMarginLeft: string;
  showActionMenu?: boolean;
  zIndex: number;
  hasReducedHorizontalSpace: boolean;
}

export const chatMessageVariables = (siteVars): ChatMessageVariables => ({
  actionMenuBoxShadow: siteVars.shadow8,
  actionMenuPositionRight: pxToRem(5),
  actionMenuPositionTop: pxToRem(-30),
  authorColor: siteVars.colorScheme.default.foreground,
  authorColorMineCompact: siteVars.colorScheme.brand.foreground,
  authorFontWeight: siteVars.fontWeightSemibold,
  authorFontWeightCompact: siteVars.fontWeightSemibold,
  authorMarginRight: pxToRem(12),
  authorMarginRightCompact: pxToRem(8),
  backgroundColor: siteVars.colorScheme.default.background,
  backgroundColorMine: siteVars.colorScheme.brand.background1,
  badgeShadow: siteVars.shadowLevel1Dark,
  badgeTextColor: siteVars.colorScheme.brand.foreground4,
  border: 'none',
  borderRadius: siteVars.borderRadiusMedium,
  compactBorder: `solid ${siteVars.borderWidth} transparent`,
  compactHoverBackground: siteVars.colorScheme.default.backgroundHover3,
  compactHoverBorder: `solid ${siteVars.borderWidth} ${siteVars.colorScheme.default.backgroundHover3}`,
  compactSpacing: pxToRem(12),
  contentColor: siteVars.colorScheme.default.foreground,
  hasMention: false,
  hasMentionColor: siteVars.colors.orange[300],
  hasMentionNubbinColor: siteVars.colorScheme.orange.background,
  headerMarginBottom: pxToRem(2),
  isImportant: false,
  isImportantColor: siteVars.colorScheme.red.background,
  linkColor: siteVars.colorScheme.brand.foreground1,
  linkColorMine: siteVars.colorScheme.brand.foreground2,
  offset: pxToRem(100),
  overlayZIndex: siteVars.zIndexes.overlay,
  padding: pxToRem(16),
  paddingCompact: pxToRem(3),
  reactionGroupBorderColor: 'transparent',
  reactionGroupMarginLeft: pxToRem(12),
  showActionMenu: undefined,
  zIndex: siteVars.zIndexes.foreground,
  hasReducedHorizontalSpace: false,
});
