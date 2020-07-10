import { LabelVariables, labelColorAreas } from '../../../teams/components/Label/labelVariables';
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils';
import { SiteVariablesPrepared } from '@fluentui/styles';

export const labelVariables = (siteVars: SiteVariablesPrepared): Partial<LabelVariables> => {
  return {
    colorScheme: pickValuesFromColorScheme(
      extendColorScheme(siteVars.colorScheme, {
        brand: {
          background: siteVars.colorScheme.brand.foreground4,
        },
        red: {
          background: siteVars.colorScheme.red.foreground1,
        },
      }),
      labelColorAreas,
    ),
  };
};
