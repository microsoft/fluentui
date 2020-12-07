import { LabelVariables, labelColorAreas } from '../../../teams/components/Label/labelVariables';
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils';
import { SiteVariablesPrepared } from '@fluentui/styles';

export const labelVariables = (siteVars: SiteVariablesPrepared): Partial<LabelVariables> => {
  return {
    colorScheme: pickValuesFromColorScheme(
      extendColorScheme(siteVars.colorScheme, {
        default: {
          background: 'rgb(255, 255, 255)',
          foreground: 'rgba(45, 44, 44, 1)',
        },
        black: {
          foreground: siteVars.colorScheme.black.foreground1,
          background: siteVars.colorScheme.black.background,
        },
        white: {
          foreground: siteVars.colorScheme.white.foreground,
          background: siteVars.colorScheme.white.background1,
        },
        brand: {
          foreground: siteVars.colorScheme.brand.foreground5,
          background: siteVars.colorScheme.brand.background5,
        },
        grey: {
          foreground: siteVars.colorScheme.grey.foreground7,
          background: siteVars.colorScheme.grey.background6,
        },
        orange: {
          foreground: siteVars.colorScheme.orange.foreground2,
          background: siteVars.colorScheme.orange.background,
        },
        red: {
          foreground: siteVars.colorScheme.red.foreground1,
          background: siteVars.colorScheme.red.background,
        },
        green: {
          foreground: siteVars.colorScheme.green.foreground3,
          background: siteVars.colorScheme.green.background,
        },
        yellow: {
          foreground: siteVars.colorScheme.yellow.foreground3,
          background: siteVars.colorScheme.yellow.background,
        },
      }),
      labelColorAreas,
    ),
  };
};
