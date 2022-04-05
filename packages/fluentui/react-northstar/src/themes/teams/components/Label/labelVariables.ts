import { pxToRem } from '../../../../utils';
import { SiteVariablesPrepared } from '@fluentui/styles';

export interface LabelVariables {
  circularRadius: string;
  iconSize: string;
  padding: string;
  startPaddingLeft: string;
  endPaddingRight: string;
  height: string;
  foreground: string;
  background: string;
  blackForeground: string;
  blackBackground: string;
  whiteForeground: string;
  whiteBackground: string;
  brandForeground: string;
  brandBackground: string;
  greyForeground: string;
  greyBackground: string;
  orangeForeground: string;
  orangeBackground: string;
  redForeground: string;
  redBackground: string;
  greenForeground: string;
  greenBackground: string;
  yellowForeground: string;
  yellowBackground: string;
}

export const labelVariables = (siteVars: SiteVariablesPrepared): LabelVariables => {
  return {
    circularRadius: pxToRem(9999),
    iconSize: pxToRem(16),
    padding: `0 ${pxToRem(4)} 0 ${pxToRem(4)}`,
    startPaddingLeft: '0px',
    endPaddingRight: '0px',
    height: pxToRem(20),

    foreground: 'rgba(0, 0, 0, 0.6)',
    background: 'rgb(232, 232, 232)',

    blackForeground: siteVars.colorScheme.black.foreground1,
    blackBackground: siteVars.colorScheme.black.background1,

    whiteForeground: siteVars.colorScheme.white.foreground1,
    whiteBackground: siteVars.colorScheme.white.background1,

    brandForeground: siteVars.colorScheme.brand.foreground5,
    brandBackground: siteVars.colorScheme.brand.background6,

    greyForeground: siteVars.colorScheme.grey.foreground2,
    greyBackground: siteVars.colorScheme.grey.background3,

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
