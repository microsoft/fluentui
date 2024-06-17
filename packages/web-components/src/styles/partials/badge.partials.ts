import { css } from '@microsoft/fast-element';
import { display } from '../../utils/index.js';
import {
  borderRadiusCircular,
  colorBrandBackground,
  colorBrandBackground2,
  colorBrandForeground1,
  colorBrandForeground2,
  colorBrandStroke2,
  colorNeutralBackground1,
  colorNeutralBackground4,
  colorNeutralBackground5,
  colorNeutralForeground1,
  colorNeutralForeground1Static,
  colorNeutralForeground3,
  colorNeutralForegroundInverted,
  colorNeutralForegroundOnBrand,
  colorNeutralForegroundStaticInverted,
  colorNeutralStroke2,
  colorNeutralStrokeAccessible,
  colorPaletteDarkOrangeBackground1,
  colorPaletteDarkOrangeBackground3,
  colorPaletteDarkOrangeBorder1,
  colorPaletteDarkOrangeForeground1,
  colorPaletteDarkOrangeForeground3,
  colorPaletteGreenBackground1,
  colorPaletteGreenBackground3,
  colorPaletteGreenBorder2,
  colorPaletteGreenForeground1,
  colorPaletteGreenForeground2,
  colorPaletteGreenForeground3,
  colorPaletteRedBackground1,
  colorPaletteRedBackground3,
  colorPaletteRedBorder1,
  colorPaletteRedForeground1,
  colorPaletteRedForeground3,
  colorPaletteYellowBackground1,
  colorPaletteYellowBackground3,
  colorPaletteYellowBorder1,
  colorPaletteYellowForeground2,
  colorTransparentStroke,
  fontFamilyBase,
  fontSizeBase100,
  fontSizeBase200,
  fontWeightSemibold,
  lineHeightBase100,
  lineHeightBase200,
  spacingHorizontalSNudge,
  spacingHorizontalXS,
  spacingHorizontalXXS,
  strokeWidthThin,
} from '../../theme/design-tokens.js';
import {
  dangerState,
  extraLargeState,
  extraSmallState,
  ghostState,
  importantState,
  informativeState,
  largeState,
  outlineState,
  severeState,
  smallState,
  subtleState,
  successState,
  tintState,
  tinyState,
  warningState,
} from '../states/index.js';

const textPadding = spacingHorizontalXXS;

export const badgeBaseStyles = css.partial`
  ${display('inline-flex')} :host {
    position: relative;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    font-family: ${fontFamilyBase};
    font-weight: ${fontWeightSemibold};
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    min-width: 20px;
    height: 20px;
    padding-inline: calc(${spacingHorizontalXS} + ${textPadding});
    border-radius: ${borderRadiusCircular};
    border-color: ${colorTransparentStroke};
    background-color: ${colorBrandBackground};
    color: ${colorNeutralForegroundOnBrand};
    contain: content;
  }

  ::slotted(svg) {
    font-size: 12px;
  }

  :host(:not(${ghostState}))::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    border-style: solid;
    border-width: ${strokeWidthThin};
    border-color: inherit;
    border-radius: inherit;
  }
`;

/**
 * @public
 * The badge's size styles
 */
export const badgeSizeStyles = css.partial`
  :host(${tinyState}) {
    width: 6px;
    height: 6px;
    font-size: 4px;
    line-height: 4px;
    padding-inline: 0;
    min-width: unset;
  }
  :host(${tinyState}) ::slotted(svg) {
    font-size: 6px;
  }
  :host(${extraSmallState}) {
    width: 10px;
    height: 10px;
    font-size: 6px;
    line-height: 6px;
    padding-inline: 0;
    min-width: unset;
  }
  :host(${extraSmallState}) ::slotted(svg) {
    font-size: 10px;
  }
  :host(${smallState}) {
    min-width: 16px;
    height: 16px;
    font-size: ${fontSizeBase100};
    line-height: ${lineHeightBase100};
    padding-inline: calc(${spacingHorizontalXXS} + ${textPadding});
  }
  :host(${smallState}) ::slotted(svg) {
    font-size: 12px;
  }
  :host(${largeState}) {
    min-width: 24px;
    height: 24px;
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    padding-inline: calc(${spacingHorizontalXS} + ${textPadding});
  }
  :host(${largeState}) ::slotted(svg) {
    font-size: 16px;
  }
  :host(${extraLargeState}) {
    min-width: 32px;
    height: 32px;
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    padding-inline: calc(${spacingHorizontalSNudge} + ${textPadding});
  }
  :host(${extraLargeState}) ::slotted(svg) {
    font-size: 20px;
  }
`;

/**
 * The badge's `filled` appearance styles
 * Filled appearance is default so do not
 * Include that attribute as it's not present by default
 * @public
 */
export const badgeFilledStyles = css.partial`
  :host(${dangerState}) {
    background-color: ${colorPaletteRedBackground3};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host(${importantState}) {
    background-color: ${colorNeutralForeground1};
    color: ${colorNeutralBackground1};
  }

  :host(${informativeState}) {
    background-color: ${colorNeutralBackground5};
    color: ${colorNeutralForeground3};
  }

  :host(${severeState}) {
    background-color: ${colorPaletteDarkOrangeBackground3};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host(${subtleState}) {
    background-color: ${colorNeutralBackground1};
    color: ${colorNeutralForeground1};
  }

  :host(${successState}) {
    background-color: ${colorPaletteGreenBackground3};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host(${warningState}) {
    background-color: ${colorPaletteYellowBackground3};
    color: ${colorNeutralForeground1Static};
  }
`;

/**
 * The badge's `ghost` appearance styles
 * @public
 */
export const badgeGhostStyles = css.partial`
  :host(${ghostState}) {
    color: ${colorBrandForeground1};
    background-color: initial;
  }

  :host(${ghostState}${dangerState}) {
    color: ${colorPaletteRedForeground3};
  }

  :host(${ghostState}${importantState}) {
    color: ${colorNeutralForeground1};
  }

  :host(${ghostState}${informativeState}) {
    color: ${colorNeutralForeground3};
  }

  :host(${ghostState}${severeState}) {
    color: ${colorPaletteDarkOrangeForeground3};
  }

  :host(${ghostState}${subtleState}) {
    color: ${colorNeutralForegroundInverted};
  }

  :host(${ghostState}${successState}) {
    color: ${colorPaletteGreenForeground3};
  }

  :host(${ghostState}${warningState}) {
    color: ${colorPaletteYellowForeground2};
  }
`;

/**
 * The badge's `outline` appearance styles
 * @public
 */
export const badgeOutlineStyles = css.partial`
  :host(${outlineState}) {
    border-color: currentColor;
    color: ${colorBrandForeground1};
    background-color: initial;
  }

  :host(${outlineState}${dangerState}) {
    color: ${colorPaletteRedForeground3};
  }

  :host(${outlineState}${importantState}) {
    color: ${colorNeutralForeground3};
    border-color: ${colorNeutralStrokeAccessible};
  }

  :host(${outlineState}${informativeState}) {
    color: ${colorNeutralForeground3};
    border-color: ${colorNeutralStroke2};
  }

  :host(${outlineState}${severeState}) {
    color: ${colorPaletteDarkOrangeForeground3};
  }

  :host(${outlineState}${subtleState}) {
    color: ${colorNeutralForegroundStaticInverted};
  }

  :host(${outlineState}${successState}) {
    color: ${colorPaletteGreenForeground2};
  }

  :host(${outlineState}${warningState}) {
    color: ${colorPaletteYellowForeground2};
  }
`;

/**
 * The badge's `tint` appearance styles
 * @public
 */
export const badgeTintStyles = css.partial`
  :host(${tintState}) {
    background-color: ${colorBrandBackground2};
    color: ${colorBrandForeground2};
    border-color: ${colorBrandStroke2};
  }

  :host(${tintState}${dangerState}) {
    background-color: ${colorPaletteRedBackground1};
    color: ${colorPaletteRedForeground1};
    border-color: ${colorPaletteRedBorder1};
  }

  :host(${tintState}${importantState}) {
    background-color: ${colorNeutralForeground3};
    color: ${colorNeutralBackground1};
    border-color: ${colorTransparentStroke};
  }

  :host(${tintState}${informativeState}) {
    background-color: ${colorNeutralBackground4};
    color: ${colorNeutralForeground3};
    border-color: ${colorNeutralStroke2};
  }

  :host(${tintState}${severeState}) {
    background-color: ${colorPaletteDarkOrangeBackground1};
    color: ${colorPaletteDarkOrangeForeground1};
    border-color: ${colorPaletteDarkOrangeBorder1};
  }

  :host(${tintState}${subtleState}) {
    background-color: ${colorNeutralBackground1};
    color: ${colorNeutralForeground3};
    border-color: ${colorNeutralStroke2};
  }

  :host(${tintState}${successState}) {
    background-color: ${colorPaletteGreenBackground1};
    color: ${colorPaletteGreenForeground1};
    border-color: ${colorPaletteGreenBorder2};
  }

  :host(${tintState}${warningState}) {
    background-color: ${colorPaletteYellowBackground1};
    color: ${colorPaletteYellowForeground2};
    border-color: ${colorPaletteYellowBorder1};
  }
`;
