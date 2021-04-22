import { pxToRem } from '../../../../utils';

export interface TreeTitleVariables {
  color: string;
  indicatorColor: string;
  paddingRight: string;
  paddingLeft: string;

  padding: string;
  selectionIndicatorMargin: string;
  borderColor: string;
  borderStyle: string;
  borderRadius: string;
  borderWidth: string;
  background: string;
  hoverBackground: string;

  checkedBackground: string;
  checkedBorderColor: string;
  checkedIndicatorColor: string;

  disabledBackground: string;
  disabledBackgroundChecked: string;
  disabledBorderColor: string;
  disabledCheckedIndicatorColor: string;
}

export const treeTitleVariables = (siteVars: any): TreeTitleVariables => {
  return {
    color: siteVars.colorScheme.default.foreground,
    padding: `${pxToRem(1)} 0`,

    paddingRight: pxToRem(20),
    paddingLeft: pxToRem(20),
    borderColor: siteVars.colorScheme.default.foreground1,
    borderStyle: 'solid',
    borderRadius: siteVars.borderRadiusMedium,
    borderWidth: pxToRem(1),
    indicatorColor: 'transparent',
    selectionIndicatorMargin: `0 0 0 0`,
    background: 'transparent',
    hoverBackground: siteVars.colorScheme.default.background1,

    checkedBackground: siteVars.colorScheme.brand.backgroundActive1,
    checkedBorderColor: siteVars.colorScheme.brand.backgroundActive1,
    checkedIndicatorColor: siteVars.colorScheme.default.background,

    disabledBackground: siteVars.colorScheme.default.background,
    disabledBackgroundChecked: siteVars.colorScheme.default.backgroundDisabled,
    disabledBorderColor: siteVars.colorScheme.default.foregroundDisabled1,
    disabledCheckedIndicatorColor: siteVars.colorScheme.default.foregroundDisabled,
  };
};
