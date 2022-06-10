import { Property } from 'csstype';
import { pxToRem, stringLiteralsArray } from '../../../../utils';
import { ItemType } from '../../../types';
import { TeamsSchemeMappingWithAreas } from '../../types';
import { pickValuesFromColorScheme } from '../../../colorUtils';

export const dividerColorAreas = stringLiteralsArray('foreground');
export type DividerColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof dividerColorAreas>>;

export interface DividerVariables {
  colorScheme: DividerColorSchemeMapping;
  dividerColor: string;
  textColor: string;
  textFontSize: string;
  textLineHeight: string;
  importantFontWeight: Property.FontWeight;
  dividerPadding: string;
}

export const dividerVariables = (siteVars: any): DividerVariables => ({
  colorScheme: pickValuesFromColorScheme(siteVars.colorScheme, dividerColorAreas),
  dividerColor: siteVars.colorScheme.brand.border,
  textColor: siteVars.colors.grey[450],
  textFontSize: siteVars.fontSizeSmall,
  textLineHeight: siteVars.lineHeightSmall,
  importantFontWeight: siteVars.fontWeightBold,
  dividerPadding: pxToRem(4),
});
