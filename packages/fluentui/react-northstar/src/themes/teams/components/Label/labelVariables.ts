import { pxToRem, stringLiteralsArray } from '../../../../utils';
import { ItemType } from '../../../types';
import { TeamsSchemeMappingWithAreas } from '../../types';
import { extendColorScheme, pickValuesFromColorScheme } from '../../../colorUtils';
import { SiteVariablesPrepared } from '@fluentui/styles';

export const labelColorAreas = stringLiteralsArray('foreground', 'background');
export type LabelColorSchemeMapping = TeamsSchemeMappingWithAreas<ItemType<typeof labelColorAreas>>;

export interface LabelVariables {
  colorScheme: LabelColorSchemeMapping;
  circularRadius: string;
  iconSize: string;
  padding: string;
  startPaddingLeft: string;
  endPaddingRight: string;
  height: string;
}

export const labelVariables = (siteVars: SiteVariablesPrepared): LabelVariables => {
  const colorScheme = extendColorScheme(siteVars.colorScheme, {
    default: {
      background: 'rgba(0, 0, 0, 0.6)',
      foreground: 'rgb(232, 232, 232)',
    },
    brand: {
      background: siteVars.colorScheme.brand.foreground4,
    },
    red: {
      background: siteVars.colorScheme.red.foreground1,
    },
  });

  return {
    colorScheme: pickValuesFromColorScheme(colorScheme, labelColorAreas),
    circularRadius: pxToRem(9999),
    iconSize: pxToRem(16),
    padding: `0 ${pxToRem(4)} 0 ${pxToRem(4)}`,
    startPaddingLeft: '0px',
    endPaddingRight: '0px',
    height: pxToRem(20),
  };
};
