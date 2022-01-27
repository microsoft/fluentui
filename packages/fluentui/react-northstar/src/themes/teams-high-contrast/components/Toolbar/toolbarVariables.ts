import { toolbarColorAreas, ToolbarVariables } from '../../../teams/components/Toolbar/toolbarVariables';
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils';

export const toolbarVariables = (siteVars: any): Partial<ToolbarVariables> => ({
  colorScheme: pickValuesFromColorScheme(
    extendColorScheme(siteVars.colorScheme, {
      default: {
        foregroundHover: siteVars.colorScheme.brand.foregroundHover,
        foregroundActive: siteVars.accessibleYellow,

        menuItemForegroundHover: siteVars.colorScheme.default.foregroundHover,
        menuItemBackgroundHover: siteVars.colorScheme.default.backgroundHover,
      },
    }),
    toolbarColorAreas,
  ),

  borderWidth: '0',

  menuBoxShadow: undefined,
});
