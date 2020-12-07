import { LabelVariables, labelColorAreas } from '../../../teams/components/Label/labelVariables';
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils';
import { SiteVariablesPrepared } from '@fluentui/styles';

export const labelVariables = (siteVars: SiteVariablesPrepared): Partial<LabelVariables> => {
  return {
    colorScheme: pickValuesFromColorScheme(
      extendColorScheme(siteVars.colorScheme, {
        default: {
          background: 'rgb(255, 255, 255)',
          foreground: 'rgba(0, 0, 0, 1)',
        },
        black: {
          foreground: siteVars.colorScheme.black.foreground1,
          background: siteVars.colorScheme.black.background1,
        },
        white: {
          foreground: siteVars.colorScheme.white.foreground1,
          background: siteVars.colorScheme.white.background1,
        },
        brand: {
          foreground: siteVars.colorScheme.brand.foreground4,
          background: siteVars.colorScheme.brand.background,
        },
        grey: {
          foreground: siteVars.colorScheme.grey.foreground1,
          background: siteVars.colorScheme.grey.background1,
        },
        orange: {
          foreground: siteVars.colorScheme.orange.foreground2,
          background: siteVars.colorScheme.orange.background1,
        },
        red: {
          foreground: siteVars.colorScheme.red.foreground1,
          background: siteVars.colorScheme.red.background,
        },
        green: {
          foreground: siteVars.colorScheme.green.foreground1,
          background: siteVars.colorScheme.green.background,
        },
        yellow: {
          foreground: siteVars.colorScheme.yellow.foreground1,
          background: siteVars.colorScheme.yellow.background,
        },
      }),
      labelColorAreas,
    ),
  };
};
