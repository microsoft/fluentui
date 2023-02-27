import { Property } from 'csstype';

import { pxToRem } from '../../../../utils';
import { SiteVariablesPrepared } from '@fluentui/styles';

export interface AlertVariables {
  borderStyle: string;
  borderWidth: string;
  borderRadius: string;
  backgroundColor: string;
  borderColor: string;
  color: string;
  fontWeight: Property.FontWeight;
  minHeight: string;
  padding: string;

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

  oof: boolean;
  oofColor: string;
  oofBackgroundColor: string;
  oofBorderColor: string;

  successColor: string;
  successBackgroundColor: string;
  successBorderColor: string;

  urgent: boolean;
  urgentColor: string;
  urgentBackgroundColor: string;
  urgentBorderColor: string;

  warningColor: string;
  warningBackgroundColor: string;
  warningBorderColor: string;

  headerFontWeight: Property.FontWeight;
  headerMargin: string;

  iconMargin: string;
  iconSize: string;

  dismissActionBackgroundColor: string;
  dismissActionBorderRadius: string;
  dismissActionBorderColor: string;

  dismissActionColorHover: string;
  dismissActionBackgroundColorHover: string;
  dismissActionBorderColorHover: string;

  dismissActionContentFontWeight: Property.FontWeight;

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
  const minHeight = pxToRem(28);

  return {
    borderStyle: 'solid',
    borderWidth: '1px',
    borderRadius: siteVars.borderRadiusMedium,
    backgroundColor: siteVars.colorScheme.default.background4,
    borderColor: siteVars.colorScheme.default.border2,
    color: siteVars.colorScheme.default.foreground1,
    fontWeight: siteVars.fontWeightRegular,
    minHeight,
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

    dismissActionSize: minHeight,
    dismissActionColor: undefined,
    dismissiblePadding: `0 0 0 ${pxToRem(16)}`,

    dangerColor: siteVars.colorScheme.red.foreground,
    dangerBackgroundColor: siteVars.colorScheme.red.background1,
    dangerBorderColor: siteVars.colorScheme.red.border,

    oof: false,
    oofColor: siteVars.colorScheme.pink.foreground,
    oofBackgroundColor: siteVars.colorScheme.pink.background,
    oofBorderColor: siteVars.colorScheme.pink.border,

    successColor: siteVars.colorScheme.green.foreground,
    successBackgroundColor: siteVars.colorScheme.green.background2,
    successBorderColor: siteVars.colorScheme.green.border,

    urgent: false,
    urgentColor: siteVars.colorScheme.red.foreground1,
    urgentBackgroundColor: siteVars.colorScheme.red.background3,
    urgentBorderColor: siteVars.colorScheme.red.background3,

    warningColor: siteVars.colorScheme.yellow.foreground4,
    warningBackgroundColor: siteVars.colorScheme.yellow.background3,
    warningBorderColor: siteVars.colorScheme.yellow.border,

    headerFontWeight: siteVars.fontWeightSemibold,
    headerMargin: `0 ${pxToRem(10)} 0 0`,

    iconMargin: `0 ${pxToRem(10)} 0 0`,
    iconSize: pxToRem(16),

    dismissActionBackgroundColor: 'transparent',
    dismissActionBorderRadius: siteVars.borderRadiusMedium,
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

    focusBorderRadius: siteVars.borderRadiusMedium,
    focusBorderWidth: siteVars.borderWidth,
    focusInnerBorderColor: siteVars.focusInnerBorderColor,
    focusOuterBorderColor: siteVars.focusOuterBorderColor,
    focusBorderZIndex: siteVars.zIndexes.foreground,
  };
};
