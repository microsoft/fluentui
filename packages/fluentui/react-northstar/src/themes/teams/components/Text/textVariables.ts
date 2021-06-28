import { ItemType } from '../../../../themes/types';
import { TeamsSchemeMappingWithAreas } from '../../types';
import { stringLiteralsArray } from '../../../../utils';
import { pickValuesFromColorScheme } from '../../../colorUtils';

export const textColorAreas = stringLiteralsArray('foreground');
export type TextColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof textColorAreas>>;

export interface TextVariables {
  colorScheme: TextColorSchemeMapping;

  importantColor: string;
  timestampColor: string;

  disabledColor: string;
  errorColor: string;
  successColor: string;

  fontSizeSmallest: string;
  fontSizeSmaller: string;
  fontSizeSmall: string;
  fontSizeMedium: string;
  fontSizeLarge: string;
  fontSizeLarger: string;
  fontSizeLargest: string;

  fontLineHeightSmallest: number;
  fontLineHeightSmaller: number;
  fontLineHeightSmall: number;
  fontLineHeightMedium: number;
  fontLineHeightLarge: number;
  fontLineHeightLarger: number;
  fontLineHeightLargest: number;

  fontWeightLight: number;
  fontWeightSemilight: number;
  fontWeightRegular: number;
  fontWeightSemibold: number;
  fontWeightBold: number;

  atMentionMeColor: string;
  atMentionOtherColor: string;
  atMentionMeFontWeight: number;
  importantWeight: number;
}

export const textVariables = (siteVariables): TextVariables => {
  return {
    colorScheme: pickValuesFromColorScheme(siteVariables.colorScheme, textColorAreas),

    fontSizeSmallest: siteVariables.fontSizes.smallest,
    fontLineHeightSmallest: siteVariables.lineHeightSmallest,

    fontSizeSmaller: siteVariables.fontSizes.smaller,
    fontLineHeightSmaller: siteVariables.lineHeightSmaller,

    fontSizeSmall: siteVariables.fontSizes.small,
    fontLineHeightSmall: siteVariables.lineHeightSmall,

    fontSizeMedium: siteVariables.fontSizes.medium,
    fontLineHeightMedium: siteVariables.lineHeightMedium,

    fontSizeLarge: siteVariables.fontSizes.large,
    fontLineHeightLarge: siteVariables.lineHeightLarge,

    fontSizeLarger: siteVariables.fontSizes.larger,
    fontLineHeightLarger: siteVariables.lineHeightLarger,

    fontSizeLargest: siteVariables.fontSizes.largest,
    fontLineHeightLargest: siteVariables.lineHeightLargest,

    fontWeightLight: siteVariables.fontWeightLight,
    fontWeightSemilight: siteVariables.fontWeightSemilight,
    fontWeightRegular: siteVariables.fontWeightRegular,
    fontWeightSemibold: siteVariables.fontWeightSemibold,
    fontWeightBold: siteVariables.fontWeightBold,
    atMentionOtherColor: siteVariables.colors.brand[600],
    atMentionMeColor: siteVariables.colors.orange[400],
    atMentionMeFontWeight: siteVariables.fontWeightBold,
    disabledColor: siteVariables.colors.grey[250],
    errorColor: siteVariables.colorScheme.red.foreground,
    importantWeight: siteVariables.fontWeightBold,
    importantColor: siteVariables.colors.red[400],
    successColor: siteVariables.colors.green[600],
    timestampColor: siteVariables.colorScheme.default.foreground1,
  };
};
