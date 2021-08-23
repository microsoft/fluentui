import { pxToRem, stringLiteralsArray } from '../../../../utils';
import { pickValuesFromColorScheme } from '../../../colorUtils';
import type { FontWeightProperty } from 'csstype';
import type { ItemType } from '../../../types';
import type { TeamsSchemeMappingWithAreas } from '../../types';

export const dividerColorAreas = stringLiteralsArray('foreground');
export type DividerColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof dividerColorAreas>>;

export interface DividerVariables {
  colorScheme: DividerColorSchemeMapping;
  dividerColor: string;
  textColor: string;
  textFontSize: string;
  textLineHeight: string;
  importantFontWeight: FontWeightProperty;
  dividerPadding: string;
}

export const dividerVariables = (siteVars: any): DividerVariables => ({
  colorScheme: pickValuesFromColorScheme(siteVars.colorScheme, dividerColorAreas),
  dividerColor: siteVars.colors.grey[150],
  textColor: siteVars.colors.grey[450],
  textFontSize: siteVars.fontSizeSmall,
  textLineHeight: siteVars.lineHeightSmall,
  importantFontWeight: siteVars.fontWeightBold,
  dividerPadding: pxToRem(4),
});
