import { css } from '@microsoft/fast-element';
import {
  colorBrandBackground,
  colorBrandBackground2,
  colorBrandForeground1,
  colorBrandForeground2,
  colorBrandStroke2,
  colorNeutralBackground1,
  colorNeutralBackground4,
  colorNeutralBackground5,
  colorNeutralForeground1,
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
  fontSizeBase100,
  lineHeightBase100,
  spacingHorizontalSNudge,
  spacingHorizontalXS,
  spacingHorizontalXXS,
} from '../../theme/design-tokens.js';

const textPadding = spacingHorizontalXXS;

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
  }
  :host([size='tiny']) ::slotted(svg) {
    font-size: 6px;
  }
  :host([size='extra-small']) {
    width: 10px;
    height: 10px;
    font-size: 6px;
    line-height: 6px;
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
    font-size: 10px;
  }
  :host([size='medium']) {
    min-width: 20px;
    height: 20px;
    font-size: ${fontSizeBase100};
    line-height: ${lineHeightBase100};
    padding-inline: calc(${spacingHorizontalXS} + ${textPadding});
  }
  :host([size='medium']) ::slotted(svg) {
    font-size: 10px;
  }
  :host([size='large']) {
    min-width: 24px;
    height: 24px;
    font-size: ${fontSizeBase100};
    line-height: ${lineHeightBase100};
    padding-inline: calc(${spacingHorizontalXS} + ${textPadding});
  }
  :host([size='large']) ::slotted(svg) {
    font-size: 10px;
  }
  :host([size='extra-large']) {
    min-width: 32px;
    height: 32px;
    font-size: ${fontSizeBase100};
    line-height: ${lineHeightBase100};
    padding-inline: calc(${spacingHorizontalSNudge} + ${textPadding});
  }
  :host([size='extra-large']) ::slotted(svg) {
    font-size: 20px;
  }
`;

/**
 * The badge's `filled` appearance styles
 * @public
 */
export const badgeFilledStyles = css.partial`
  :host([appearance='filled']) {
    border-color: ${colorTransparentStroke};
  }

  :host([appearance='filled'][color='brand']) {
    background-color: ${colorBrandBackground};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host([appearance='filled'][color='danger']) {
    background-color: ${colorPaletteRedBackground3};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host([appearance='filled'][color='important']) {
    background-color: ${colorNeutralForeground1};
    color: ${colorNeutralBackground1};
  }

  :host([appearance='filled'][color='informative']) {
    background-color: ${colorNeutralBackground5};
    color: ${colorNeutralForeground3};
  }

  :host([appearance='filled'][color='severe']) {
    background-color: ${colorPaletteDarkOrangeBackground3};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host([appearance='filled'][color='subtle']) {
    background-color: ${colorNeutralBackground1};
    color: ${colorNeutralForeground1};
  }

  :host([appearance='filled'][color='success']) {
    background-color: ${colorPaletteGreenBackground3};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host([appearance='filled'][color='warning']) {
    background-color: ${colorPaletteYellowBackground3};
    color: ${colorNeutralForeground1};
  }
`;

/**
 * The badge's `ghost` appearance styles
 * @public
 */
export const badgeGhostStyles = css.partial`
  :host([appearance='ghost'][color='brand']) {
    color: ${colorBrandBackground};
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
  }

  :host([appearance='outline'][color='brand']) {
    color: ${colorBrandForeground1};
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
  :host([appearance='tint'][color='brand']) {
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
