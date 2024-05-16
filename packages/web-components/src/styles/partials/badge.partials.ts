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

  :host(:not([appearance='ghost']))::after {
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
  :host([size='tiny']) {
    width: 6px;
    height: 6px;
    font-size: 4px;
    line-height: 4px;
    padding-inline: 0;
    min-width: unset;
  }
  :host([size='tiny']) ::slotted(svg) {
    font-size: 6px;
  }
  :host([size='extra-small']) {
    width: 10px;
    height: 10px;
    font-size: 6px;
    line-height: 6px;
    padding-inline: 0;
    min-width: unset;
  }
  :host([size='extra-small']) ::slotted(svg) {
    font-size: 10px;
  }
  :host([size='small']) {
    min-width: 16px;
    height: 16px;
    font-size: ${fontSizeBase100};
    line-height: ${lineHeightBase100};
    padding-inline: calc(${spacingHorizontalXXS} + ${textPadding});
  }
  :host([size='small']) ::slotted(svg) {
    font-size: 12px;
  }
  :host([size='large']) {
    min-width: 24px;
    height: 24px;
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    padding-inline: calc(${spacingHorizontalXS} + ${textPadding});
  }
  :host([size='large']) ::slotted(svg) {
    font-size: 16px;
  }
  :host([size='extra-large']) {
    min-width: 32px;
    height: 32px;
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    padding-inline: calc(${spacingHorizontalSNudge} + ${textPadding});
  }
  :host([size='extra-large']) ::slotted(svg) {
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
  :host([color='danger']) {
    background-color: ${colorPaletteRedBackground3};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host([color='important']) {
    background-color: ${colorNeutralForeground1};
    color: ${colorNeutralBackground1};
  }

  :host([color='informative']) {
    background-color: ${colorNeutralBackground5};
    color: ${colorNeutralForeground3};
  }

  :host([color='severe']) {
    background-color: ${colorPaletteDarkOrangeBackground3};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host([color='subtle']) {
    background-color: ${colorNeutralBackground1};
    color: ${colorNeutralForeground1};
  }

  :host([color='success']) {
    background-color: ${colorPaletteGreenBackground3};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host([color='warning']) {
    background-color: ${colorPaletteYellowBackground3};
    color: ${colorNeutralForeground1Static};
  }
`;

/**
 * The badge's `ghost` appearance styles
 * @public
 */
export const badgeGhostStyles = css.partial`
  :host([appearance='ghost']) {
    color: ${colorBrandForeground1};
    background-color: initial;
  }

  :host([appearance='ghost'][color='danger']) {
    color: ${colorPaletteRedForeground3};
  }

  :host([appearance='ghost'][color='important']) {
    color: ${colorNeutralForeground1};
  }

  :host([appearance='ghost'][color='informative']) {
    color: ${colorNeutralForeground3};
  }

  :host([appearance='ghost'][color='severe']) {
    color: ${colorPaletteDarkOrangeForeground3};
  }

  :host([appearance='ghost'][color='subtle']) {
    color: ${colorNeutralForegroundInverted};
  }

  :host([appearance='ghost'][color='success']) {
    color: ${colorPaletteGreenForeground3};
  }

  :host([appearance='ghost'][color='warning']) {
    color: ${colorPaletteYellowForeground2};
  }
`;

/**
 * The badge's `outline` appearance styles
 * @public
 */
export const badgeOutlineStyles = css.partial`
  :host([appearance='outline']) {
    border-color: currentColor;
    color: ${colorBrandForeground1};
    background-color: initial;
  }

  :host([appearance='outline'][color='danger']) {
    color: ${colorPaletteRedForeground3};
  }

  :host([appearance='outline'][color='important']) {
    color: ${colorNeutralForeground3};
    border-color: ${colorNeutralStrokeAccessible};
  }

  :host([appearance='outline'][color='informative']) {
    color: ${colorNeutralForeground3};
    border-color: ${colorNeutralStroke2};
  }

  :host([appearance='outline'][color='severe']) {
    color: ${colorPaletteDarkOrangeForeground3};
  }

  :host([appearance='outline'][color='subtle']) {
    color: ${colorNeutralForegroundStaticInverted};
  }

  :host([appearance='outline'][color='success']) {
    color: ${colorPaletteGreenForeground2};
  }

  :host([appearance='outline'][color='warning']) {
    color: ${colorPaletteYellowForeground2};
  }
`;

/**
 * The badge's `tint` appearance styles
 * @public
 */
export const badgeTintStyles = css.partial`
  :host([appearance='tint']) {
    background-color: ${colorBrandBackground2};
    color: ${colorBrandForeground2};
    border-color: ${colorBrandStroke2};
  }

  :host([appearance='tint'][color='danger']) {
    background-color: ${colorPaletteRedBackground1};
    color: ${colorPaletteRedForeground1};
    border-color: ${colorPaletteRedBorder1};
  }

  :host([appearance='tint'][color='important']) {
    background-color: ${colorNeutralForeground3};
    color: ${colorNeutralBackground1};
    border-color: ${colorTransparentStroke};
  }

  :host([appearance='tint'][color='informative']) {
    background-color: ${colorNeutralBackground4};
    color: ${colorNeutralForeground3};
    border-color: ${colorNeutralStroke2};
  }

  :host([appearance='tint'][color='severe']) {
    background-color: ${colorPaletteDarkOrangeBackground1};
    color: ${colorPaletteDarkOrangeForeground1};
    border-color: ${colorPaletteDarkOrangeBorder1};
  }

  :host([appearance='tint'][color='subtle']) {
    background-color: ${colorNeutralBackground1};
    color: ${colorNeutralForeground3};
    border-color: ${colorNeutralStroke2};
  }

  :host([appearance='tint'][color='success']) {
    background-color: ${colorPaletteGreenBackground1};
    color: ${colorPaletteGreenForeground1};
    border-color: ${colorPaletteGreenBorder2};
  }

  :host([appearance='tint'][color='warning']) {
    background-color: ${colorPaletteYellowBackground1};
    color: ${colorPaletteYellowForeground2};
    border-color: ${colorPaletteYellowBorder1};
  }
`;
