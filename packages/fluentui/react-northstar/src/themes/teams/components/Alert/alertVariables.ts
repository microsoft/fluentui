import { FontWeightProperty } from 'csstype';

import { pxToRem } from '../../../../utils';
import { SiteVariablesPrepared } from '@fluentui/styles';

export interface AlertVariables {
  borderStyle: string;
  borderWidth: string;
  borderRadius: string;
  backgroundColor: string;
  borderColor: string;
  color: string;
  fontWeight: FontWeightProperty;
  padding: string;
  heightValue: string;

  hoverBorderColor: string;
  hoverBackgroundColor: string;
  focusBackgroundColor: string;

  dismissActionHoverBorderRadius: string;
  dismissActionHoverBorderWidth: string;
  dismissActionHoverInnerBorderColor: string;
  dismissActionHoverOuterBorderColor: string;
  dismissActionHoverZIndex: string;

  actionsMargin: string;

  dismissActionSize: string;
  dismissActionColor: string;
  dismissiblePadding: string;

  dangerColor: string;
  dangerBackgroundColor: string;
  dangerBorderColor: string;

  warningColor: string;
  warningBackgroundColor: string;
  warningBorderColor: string;

  oof: boolean;
  oofColor: string;
  oofBackgroundColor: string;
  oofBorderColor: string;

  infoColor: string;
  infoBackgroundColor: string;
  infoBorderColor: string;

  urgent: boolean;
  urgentColor: string;
  urgentBackgroundColor: string;
  urgentBorderColor: string;

  headerFontWeight: FontWeightProperty;
  headerMargin: string;

  iconMargin: string;
  iconSize: string;

  dismissActionBackgroundColor: string;
  dismissActionBorderRadius: string;
  dismissActionBorderColor: string;

  dismissActionColorHover: string;
  dismissActionBackgroundColorHover: string;
  dismissActionBorderColorHover: string;

  dismissActionContentFontWeight: FontWeightProperty;

  dismissActionBackgroundColorFocus: string;
  dismissActionBorderColorFocus: string;
  dismissActionColorFocus: string;

  dismissActionColorDisabled: string;
  dismissActionBackgroundColorDisabled: string;
  dismissActionBorderColorDisabled: string;

  dismissActionIndicatorSize: string;

  focusBorderRadius: string;
  focusBorderWidth: string;
  focusInnerBorderColor: string;
  focusOuterBorderColor: string;
  focusBorderZIndex: string;
}

export const alertVariables = (siteVars: SiteVariablesPrepared): AlertVariables => {
  const heightValue = pxToRem(28);

  return {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: pxToRem(3),
    backgroundColor: siteVars.colors.grey[50], // $app-white
    borderColor: siteVars.colors.grey[250],
    color: siteVars.colors.grey[500],
    fontWeight: siteVars.fontWeightRegular,
    heightValue,
    padding: `0 ${pxToRem(16)}`,

    actionsMargin: pxToRem(5),

    hoverBorderColor: undefined,
    hoverBackgroundColor: undefined,
    focusBackgroundColor: undefined,

    dismissActionHoverBorderRadius: undefined,
    dismissActionHoverBorderWidth: undefined,
    dismissActionHoverInnerBorderColor: undefined,
    dismissActionHoverOuterBorderColor: undefined,
    dismissActionHoverZIndex: undefined,

    dismissActionSize: heightValue,
    dismissActionColor: undefined,
    dismissiblePadding: `0 0 0 ${pxToRem(16)}`,

    dangerColor: siteVars.colorScheme.red.foreground,
    dangerBackgroundColor: siteVars.colorScheme.red.background1,
    dangerBorderColor: siteVars.colorScheme.red.border,

    warningColor: siteVars.colorScheme.red.foreground,
    warningBackgroundColor: siteVars.colorScheme.red.background1,
    warningBorderColor: siteVars.colorScheme.red.border,

    oof: false,
    oofColor: siteVars.colors.pink[600],
    oofBackgroundColor: siteVars.colors.pink[50],
    oofBorderColor: siteVars.colors.pink[100],

    infoColor: siteVars.colors.grey[500],
    infoBackgroundColor: siteVars.colors.grey[150],
    infoBorderColor: siteVars.colors.grey[200],

    urgent: false,
    urgentColor: siteVars.colors.white,
    urgentBackgroundColor: siteVars.colors.red[400],
    urgentBorderColor: siteVars.colors.red[400],

    headerFontWeight: siteVars.fontWeightBold,
    headerMargin: `0 ${pxToRem(10)} 0 0`,

    iconMargin: `0 ${pxToRem(10)} 0 0`,
    iconSize: pxToRem(16),

    dismissActionBackgroundColor: 'transparent',
    dismissActionBorderRadius: siteVars.borderRadius,
    dismissActionBorderColor: 'transparent',

    dismissActionColorHover: siteVars.colorScheme.brand.foregroundHover,
    dismissActionBackgroundColorHover: siteVars.colorScheme.default.backgroundHover2,
    dismissActionBorderColorHover: siteVars.colorScheme.default.borderHover,

    dismissActionContentFontWeight: siteVars.fontWeightSemibold,

    dismissActionBackgroundColorFocus: undefined,
    dismissActionBorderColorFocus: undefined,
    dismissActionColorFocus: undefined,

    dismissActionColorDisabled: siteVars.colorScheme.brand.foregroundDisabled,
    dismissActionBackgroundColorDisabled: siteVars.colorScheme.default.backgroundDisabled,
    dismissActionBorderColorDisabled: 'transparent',

    dismissActionIndicatorSize: pxToRem(16),

    focusBorderRadius: siteVars.borderRadius,
    focusBorderWidth: siteVars.borderWidth,
    focusInnerBorderColor: siteVars.focusInnerBorderColor,
    focusOuterBorderColor: siteVars.focusOuterBorderColor,
    focusBorderZIndex: siteVars.zIndexes.foreground,
  };
};
