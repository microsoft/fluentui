import { css } from '@microsoft/fast-element';
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
import { display } from '../../utils/display.js';
import { state } from '../../utils/states.js';

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
    padding-inline: calc(${spacingHorizontalXS} + ${spacingHorizontalXXS});
    border-radius: ${borderRadiusCircular};
    border-color: ${colorTransparentStroke};
    background-color: ${colorBrandBackground};
    color: ${colorNeutralForegroundOnBrand};
    contain: content;
  }

  ::slotted(svg) {
    font-size: 12px;
  }

  :host(:not(${state('ghost')}))::after {
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
  :host(${state('tiny')}) {
    width: 6px;
    height: 6px;
    font-size: 4px;
    line-height: 4px;
    padding-inline: 0;
    min-width: unset;
  }
  :host(${state('tiny')}) ::slotted(svg) {
    font-size: 6px;
  }
  :host(${state('extra-small')}) {
    width: 10px;
    height: 10px;
    font-size: 6px;
    line-height: 6px;
    padding-inline: 0;
    min-width: unset;
  }
  :host(${state('extra-small')}) ::slotted(svg) {
    font-size: 10px;
  }
  :host(${state('small')}) {
    min-width: 16px;
    height: 16px;
    font-size: ${fontSizeBase100};
    line-height: ${lineHeightBase100};
    padding-inline: calc(${spacingHorizontalXXS} + ${spacingHorizontalXXS});
  }
  :host(${state('small')}) ::slotted(svg) {
    font-size: 12px;
  }
  :host(${state('large')}) {
    min-width: 24px;
    height: 24px;
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    padding-inline: calc(${spacingHorizontalXS} + ${spacingHorizontalXXS});
  }
  :host(${state('large')}) ::slotted(svg) {
    font-size: 16px;
  }
  :host(${state('extra-large')}) {
    min-width: 32px;
    height: 32px;
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    padding-inline: calc(${spacingHorizontalSNudge} + ${spacingHorizontalXXS});
  }
  :host(${state('extra-large')}) ::slotted(svg) {
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
  :host(${state('danger')}) {
    background-color: ${colorPaletteRedBackground3};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host(${state('important')}) {
    background-color: ${colorNeutralForeground1};
    color: ${colorNeutralBackground1};
  }

  :host(${state('informative')}) {
    background-color: ${colorNeutralBackground5};
    color: ${colorNeutralForeground3};
  }

  :host(${state('severe')}) {
    background-color: ${colorPaletteDarkOrangeBackground3};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host(${state('subtle')}) {
    background-color: ${colorNeutralBackground1};
    color: ${colorNeutralForeground1};
  }

  :host(${state('success')}) {
    background-color: ${colorPaletteGreenBackground3};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host(${state('warning')}) {
    background-color: ${colorPaletteYellowBackground3};
    color: ${colorNeutralForeground1Static};
  }
`;

/**
 * The badge's `ghost` appearance styles
 * @public
 */
export const badgeGhostStyles = css.partial`
  :host(${state('ghost')}) {
    color: ${colorBrandForeground1};
    background-color: initial;
  }

  :host(${state('ghost')}${state('danger')}) {
    color: ${colorPaletteRedForeground3};
  }

  :host(${state('ghost')}${state('important')}) {
    color: ${colorNeutralForeground1};
  }

  :host(${state('ghost')}${state('informative')}) {
    color: ${colorNeutralForeground3};
  }

  :host(${state('ghost')}${state('severe')}) {
    color: ${colorPaletteDarkOrangeForeground3};
  }

  :host(${state('ghost')}${state('subtle')}) {
    color: ${colorNeutralForegroundInverted};
  }

  :host(${state('ghost')}${state('success')}) {
    color: ${colorPaletteGreenForeground3};
  }

  :host(${state('ghost')}${state('warning')}) {
    color: ${colorPaletteYellowForeground2};
  }
`;

/**
 * The badge's `outline` appearance styles
 * @public
 */
export const badgeOutlineStyles = css.partial`
  :host(${state('outline')}) {
    border-color: currentColor;
    color: ${colorBrandForeground1};
    background-color: initial;
  }

  :host(${state('outline')}${state('danger')}) {
    color: ${colorPaletteRedForeground3};
  }

  :host(${state('outline')}${state('important')}) {
    color: ${colorNeutralForeground3};
    border-color: ${colorNeutralStrokeAccessible};
  }

  :host(${state('outline')}${state('informative')}) {
    color: ${colorNeutralForeground3};
    border-color: ${colorNeutralStroke2};
  }

  :host(${state('outline')}${state('severe')}) {
    color: ${colorPaletteDarkOrangeForeground3};
  }

  :host(${state('outline')}${state('subtle')}) {
    color: ${colorNeutralForegroundStaticInverted};
  }

  :host(${state('outline')}${state('success')}) {
    color: ${colorPaletteGreenForeground2};
  }

  :host(${state('outline')}${state('warning')}) {
    color: ${colorPaletteYellowForeground2};
  }
`;

/**
 * The badge's `tint` appearance styles
 * @public
 */
export const badgeTintStyles = css.partial`
  :host(${state('tint')}) {
    background-color: ${colorBrandBackground2};
    color: ${colorBrandForeground2};
    border-color: ${colorBrandStroke2};
  }

  :host(${state('tint')}${state('danger')}) {
    background-color: ${colorPaletteRedBackground1};
    color: ${colorPaletteRedForeground1};
    border-color: ${colorPaletteRedBorder1};
  }

  :host(${state('tint')}${state('important')}) {
    background-color: ${colorNeutralForeground3};
    color: ${colorNeutralBackground1};
    border-color: ${colorTransparentStroke};
  }

  :host(${state('tint')}${state('informative')}) {
    background-color: ${colorNeutralBackground4};
    color: ${colorNeutralForeground3};
    border-color: ${colorNeutralStroke2};
  }

  :host(${state('tint')}${state('severe')}) {
    background-color: ${colorPaletteDarkOrangeBackground1};
    color: ${colorPaletteDarkOrangeForeground1};
    border-color: ${colorPaletteDarkOrangeBorder1};
  }

  :host(${state('tint')}${state('subtle')}) {
    background-color: ${colorNeutralBackground1};
    color: ${colorNeutralForeground3};
    border-color: ${colorNeutralStroke2};
  }

  :host(${state('tint')}${state('success')}) {
    background-color: ${colorPaletteGreenBackground1};
    color: ${colorPaletteGreenForeground1};
    border-color: ${colorPaletteGreenBorder2};
  }

  :host(${state('tint')}${state('warning')}) {
    background-color: ${colorPaletteYellowBackground1};
    color: ${colorPaletteYellowForeground2};
    border-color: ${colorPaletteYellowBorder1};
  }
`;
