import { pxToRem } from '../../../../utils';

export interface ChatMessageTimestampVariables {
  hasReducedHorizontalSpace: boolean;
  headerMarginBottom: string;
  compactSpacing: string;
  fontSizeSmall: string;
  fontLineHeightSmall: number;
  timestampColor: string;
}

export const chatMessageTimestampVariables = (siteVariables): ChatMessageTimestampVariables => ({
  hasReducedHorizontalSpace: false,
  headerMarginBottom: pxToRem(2),
  compactSpacing: pxToRem(12),
  fontSizeSmall: siteVariables.fontSizes.small,
  fontLineHeightSmall: siteVariables.lineHeightSmall,
  timestampColor: siteVariables.colorScheme.default.foreground1,
});
