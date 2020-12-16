import { LabelVariables } from '../../../teams/components/Label/labelVariables';
import { SiteVariablesPrepared } from '@fluentui/styles';

export const labelVariables = (siteVars: SiteVariablesPrepared): Partial<LabelVariables> => {
  return {
    foreground: 'rgb(255, 255, 255)',
    background: 'rgb(0, 0, 0)',

    blackForeground: siteVars.colorScheme.black.foreground1,
    blackBackground: siteVars.colorScheme.black.background1,

    whiteForeground: siteVars.colorScheme.white.foreground1,
    whiteBackground: siteVars.colorScheme.white.background1,

    brandForeground: siteVars.colorScheme.brand.foreground4,
    brandBackground: siteVars.colorScheme.brand.background,

    greyForeground: siteVars.colorScheme.grey.foreground1,
    greyBackground: siteVars.colorScheme.grey.background1,

    orangeForeground: siteVars.colorScheme.orange.foreground2,
    orangeBackground: siteVars.colorScheme.orange.background1,

    redForeground: siteVars.colorScheme.red.foreground1,
    redBackground: siteVars.colorScheme.red.background,

    greenForeground: siteVars.colorScheme.green.foreground1,
    greenBackground: siteVars.colorScheme.green.background,

    yellowForeground: siteVars.colorScheme.yellow.foreground1,
    yellowBackground: siteVars.colorScheme.yellow.background,
  };
};
