import { pxToRem, stringLiteralsArray } from '../../../../utils';
import { ItemType } from '../../../types';
import { TeamsSchemeMappingWithAreas } from '../../types';
import { pickValuesFromColorScheme } from '../../../colorUtils';

export type IconSizeModifier = 'x' | 'xx';
export const iconColorAreas = stringLiteralsArray('foreground');
export type IconColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof iconColorAreas>>;

export interface SvgIconVariables {
  color: string;
  borderColor: string;
  backgroundColor: string;
  disabledColor: string;
  horizontalSpace: string;

  smallestSize: string;
  smallerSize: string;
  smallSize: string;
  mediumSize: string;
  largeSize: string;
  largerSize: string;
  largestSize: string;

  colorScheme: IconColorSchemeMapping;
  brandColor: string;
  secondaryColor: string;
  redColor: string;

  sizeModifier?: IconSizeModifier;
}

export const svgIconVariables = (siteVars): SvgIconVariables => ({
  colorScheme: pickValuesFromColorScheme(siteVars.colorScheme, iconColorAreas),
  color: undefined,
  borderColor: undefined,
  backgroundColor: undefined,
  brandColor: siteVars.brandColor,
  secondaryColor: siteVars.colors.white,
  redColor: siteVars.colors.red[400],
  disabledColor: siteVars.colors.grey[250],

  smallestSize: pxToRem(11),
  smallerSize: pxToRem(14),
  smallSize: pxToRem(16),
  mediumSize: pxToRem(20),
  largeSize: pxToRem(24),
  largerSize: pxToRem(36),
  largestSize: pxToRem(44),

  horizontalSpace: pxToRem(10),
});
