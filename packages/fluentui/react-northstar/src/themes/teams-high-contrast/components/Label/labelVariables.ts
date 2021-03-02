import { LabelVariables } from '../../../teams/components/Label/labelVariables';
import { SiteVariablesPrepared } from '@fluentui/styles';

export const labelVariables = (siteVars: SiteVariablesPrepared): Partial<LabelVariables> => {
  return {
    foreground: 'rgb(0, 0, 0)',
    background: 'rgb(255, 255, 255)',

    blackForeground: siteVars.colorScheme.black.foreground1,
    blackBackground: siteVars.colorScheme.black.background1,

    whiteForeground: siteVars.colorScheme.white.foreground1,
    whiteBackground: siteVars.colorScheme.white.background1,

    brandForeground: siteVars.colorScheme.brand.foreground5,
    brandBackground: siteVars.colorScheme.brand.background6,

    greyForeground: siteVars.colorScheme.grey.foreground1,
    greyBackground: siteVars.colorScheme.grey.background1,

    orangeForeground: siteVars.colorScheme.orange.foreground2,
    orangeBackground: siteVars.colorScheme.orange.background1,

    redForeground: siteVars.colorScheme.red.foreground1,
    redBackground: siteVars.colorScheme.red.background,

    greenForeground: siteVars.colorScheme.green.foreground3,
    greenBackground: siteVars.colorScheme.green.background1,

    yellowForeground: siteVars.colorScheme.yellow.foreground3,
    yellowBackground: siteVars.colorScheme.yellow.background,
  };
};
