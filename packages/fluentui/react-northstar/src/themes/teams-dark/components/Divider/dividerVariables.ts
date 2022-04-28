import { DividerVariables, dividerColorAreas } from '../../../teams/components/Divider/dividerVariables';
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils';

export const dividerVariables = (siteVars: any): Partial<DividerVariables> => ({
  colorScheme: pickValuesFromColorScheme(
    extendColorScheme(siteVars.colorScheme, {
      brand: {
        foreground: siteVars.colors.brand[400],
        border: siteVars.colors.brand[400],
      },
    }),
    dividerColorAreas,
  ),
  textColor: siteVars.colors.grey[250],
});
