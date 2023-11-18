import { Property } from 'csstype';
import { pxToRem } from '../../../../utils';

export interface ListItemVariables {
  minHeight: string;
  rootPadding: string;

  headerLineHeight: string;
  headerFontSize: string;
  gap: string;
  zIndex: number;

  // Header Media
  headerMediaFontSize: string;
  // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
  headerMediaLineHeight: string;

  importantFontWeight: Property.FontWeight;

  // Content
  contentFontSize: string;
  contentLineHeight: string;

  // Content media
  contentMediaFontSize: string;
  contentMediaLineHeight: string;

  // Selectable
  selectableFocusHoverColor: string;
  selectableFocusHoverBackgroundColor: string;
  selectedColor: string;
  selectedBackgroundColor: string;
}

export const listItemVariables = (siteVariables: any): ListItemVariables => {
  return {
    minHeight: pxToRem(48),
    rootPadding: `0 ${pxToRem(18)} 0 ${pxToRem(20)}`,
    gap: pxToRem(8),
    zIndex: siteVariables.zIndexes.foreground,

    // Header
    // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
    headerLineHeight: siteVariables.lineHeightSmall,
    headerFontSize: siteVariables.fontSizes.medium,

    // Header Media
    headerMediaFontSize: siteVariables.fontSizes.small,
    // TODO: prod app uses 17.5px here, it should be 16px per the design guide!
    headerMediaLineHeight: siteVariables.lineHeightSmall,

    importantFontWeight: siteVariables.fontWeightBold,

    // Content
    contentFontSize: siteVariables.fontSizes.small,
    contentLineHeight: siteVariables.lineHeightSmall,

    // Content Media
    contentMediaFontSize: siteVariables.fontSizes.small,
    contentMediaLineHeight: siteVariables.lineHeightSmall,

    // Selectable
    selectableFocusHoverColor: siteVariables.colorScheme.default.foregroundHover,
    selectableFocusHoverBackgroundColor: siteVariables.colorScheme.default.backgroundHover,

    // Selected
    selectedColor: siteVariables.colorScheme.default.foregroundPressed,
    selectedBackgroundColor: siteVariables.colorScheme.default.backgroundActive1,
  };
};
