import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation/utilities.js';
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
    font-family: var(${fontFamilyBase});
    font-weight: var(${fontWeightSemibold});
    font-size: var(${fontSizeBase200});
    line-height: var(${lineHeightBase200});
    min-width: 20px;
    height: 20px;
    padding-inline: calc(var(${spacingHorizontalXS}) + var(${textPadding}));
    border-radius: var(${borderRadiusCircular});
    border-color: var(${colorTransparentStroke});
    background-color: var(${colorBrandBackground});
    color: var(${colorNeutralForegroundOnBrand});
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
    border-width: var(${strokeWidthThin});
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
    font-size: var(${fontSizeBase100});
    line-height: var(${lineHeightBase100});
    padding-inline: calc(var(${spacingHorizontalXXS}) + var(${textPadding}));
  }
  :host([size='small']) ::slotted(svg) {
    font-size: 12px;
  }
  :host([size='large']) {
    min-width: 24px;
    height: 24px;
    font-size: var(${fontSizeBase200});
    line-height: var(${lineHeightBase200});
    padding-inline: calc(var(${spacingHorizontalXS}) + var(${textPadding}));
  }
  :host([size='large']) ::slotted(svg) {
    font-size: 16px;
  }
  :host([size='extra-large']) {
    min-width: 32px;
    height: 32px;
    font-size: var(${fontSizeBase200});
    line-height: var(${lineHeightBase200});
    padding-inline: calc(var(${spacingHorizontalSNudge}) + var(${textPadding}));
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
    background-color: var(${colorPaletteRedBackground3});
    color: var(${colorNeutralForegroundOnBrand});
  }

  :host([color='important']) {
    background-color: var(${colorNeutralForeground1});
    color: var(${colorNeutralBackground1});
  }

  :host([color='informative']) {
    background-color: var(${colorNeutralBackground5});
    color: var(${colorNeutralForeground3});
  }

  :host([color='severe']) {
    background-color: var(${colorPaletteDarkOrangeBackground3});
    color: var(${colorNeutralForegroundOnBrand});
  }

  :host([color='subtle']) {
    background-color: var(${colorNeutralBackground1});
    color: var(${colorNeutralForeground1});
  }

  :host([color='success']) {
    background-color: var(${colorPaletteGreenBackground3});
    color: var(${colorNeutralForegroundOnBrand});
  }

  :host([color='warning']) {
    background-color: var(${colorPaletteYellowBackground3});
    color: var(${colorNeutralForeground1Static});
  }
`;

/**
 * The badge's `ghost` appearance styles
 * @public
 */
export const badgeGhostStyles = css.partial`
  :host([appearance='ghost']) {
    color: var(${colorBrandForeground1});
    background-color: initial;
  }

  :host([appearance='ghost'][color='danger']) {
    color: var(${colorPaletteRedForeground3});
  }

  :host([appearance='ghost'][color='important']) {
    color: var(${colorNeutralForeground1});
  }

  :host([appearance='ghost'][color='informative']) {
    color: var(${colorNeutralForeground3});
  }

  :host([appearance='ghost'][color='severe']) {
    color: var(${colorPaletteDarkOrangeForeground3});
  }

  :host([appearance='ghost'][color='subtle']) {
    color: var(${colorNeutralForegroundInverted});
  }

  :host([appearance='ghost'][color='success']) {
    color: var(${colorPaletteGreenForeground3});
  }

  :host([appearance='ghost'][color='warning']) {
    color: var(${colorPaletteYellowForeground2});
  }
`;

/**
 * The badge's `outline` appearance styles
 * @public
 */
export const badgeOutlineStyles = css.partial`
  :host([appearance='outline']) {
    border-color: currentColor;
    color: var(${colorBrandForeground1});
    background-color: initial;
  }

  :host([appearance='outline'][color='danger']) {
    color: var(${colorPaletteRedForeground3});
  }

  :host([appearance='outline'][color='important']) {
    color: var(${colorNeutralForeground3});
    border-color: var(${colorNeutralStrokeAccessible});
  }

  :host([appearance='outline'][color='informative']) {
    color: var(${colorNeutralForeground3});
    border-color: var(${colorNeutralStroke2});
  }

  :host([appearance='outline'][color='severe']) {
    color: var(${colorPaletteDarkOrangeForeground3});
  }

  :host([appearance='outline'][color='subtle']) {
    color: var(${colorNeutralForegroundStaticInverted});
  }

  :host([appearance='outline'][color='success']) {
    color: var(${colorPaletteGreenForeground2});
  }

  :host([appearance='outline'][color='warning']) {
    color: var(${colorPaletteYellowForeground2});
  }
`;

/**
 * The badge's `tint` appearance styles
 * @public
 */
export const badgeTintStyles = css.partial`
  :host([appearance='tint']) {
    background-color: var(${colorBrandBackground2});
    color: var(${colorBrandForeground2});
    border-color: var(${colorBrandStroke2});
  }

  :host([appearance='tint'][color='danger']) {
    background-color: var(${colorPaletteRedBackground1});
    color: var(${colorPaletteRedForeground1});
    border-color: var(${colorPaletteRedBorder1});
  }

  :host([appearance='tint'][color='important']) {
    background-color: var(${colorNeutralForeground3});
    color: var(${colorNeutralBackground1});
    border-color: var(${colorTransparentStroke});
  }

  :host([appearance='tint'][color='informative']) {
    background-color: var(${colorNeutralBackground4});
    color: var(${colorNeutralForeground3});
    border-color: var(${colorNeutralStroke2});
  }

  :host([appearance='tint'][color='severe']) {
    background-color: var(${colorPaletteDarkOrangeBackground1});
    color: var(${colorPaletteDarkOrangeForeground1});
    border-color: var(${colorPaletteDarkOrangeBorder1});
  }

  :host([appearance='tint'][color='subtle']) {
    background-color: var(${colorNeutralBackground1});
    color: var(${colorNeutralForeground3});
    border-color: var(${colorNeutralStroke2});
  }

  :host([appearance='tint'][color='success']) {
    background-color: var(${colorPaletteGreenBackground1});
    color: var(${colorPaletteGreenForeground1});
    border-color: var(${colorPaletteGreenBorder2});
  }

  :host([appearance='tint'][color='warning']) {
    background-color: var(${colorPaletteYellowBackground1});
    color: var(${colorPaletteYellowForeground2});
    border-color: var(${colorPaletteYellowBorder1});
  }
`;
