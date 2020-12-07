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
      background: 'rgb(232, 232, 232)',
      foreground: 'rgba(0, 0, 0, 0.6)',
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
      foreground: siteVars.colorScheme.grey.foreground2,
      background: siteVars.colorScheme.grey.background3,
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
      foreground: siteVars.colorScheme.green.foreground1,
      background: siteVars.colorScheme.green.background,
    },
    yellow: {
      foreground: siteVars.colorScheme.yellow.foreground3,
      background: siteVars.colorScheme.yellow.background,
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
