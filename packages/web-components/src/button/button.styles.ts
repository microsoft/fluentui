import { css } from '@microsoft/fast-element';
import { display, forcedColorsStylesheetBehavior } from '../utils/index.js';
import {
  borderRadiusCircular,
  borderRadiusLarge,
  borderRadiusMedium,
  borderRadiusNone,
  borderRadiusSmall,
  colorBrandBackground,
  colorBrandBackgroundHover,
  colorBrandBackgroundPressed,
  colorNeutralBackground1,
  colorNeutralBackground1Hover,
  colorNeutralBackground1Pressed,
  colorNeutralBackgroundDisabled,
  colorNeutralForeground1,
  colorNeutralForeground1Hover,
  colorNeutralForeground1Pressed,
  colorNeutralForeground2,
  colorNeutralForeground2BrandHover,
  colorNeutralForeground2BrandPressed,
  colorNeutralForeground2Hover,
  colorNeutralForeground2Pressed,
  colorNeutralForegroundDisabled,
  colorNeutralForegroundOnBrand,
  colorNeutralStroke1,
  colorNeutralStroke1Hover,
  colorNeutralStroke1Pressed,
  colorNeutralStrokeDisabled,
  colorStrokeFocus2,
  colorSubtleBackground,
  colorSubtleBackgroundHover,
  colorSubtleBackgroundPressed,
  colorTransparentBackground,
  colorTransparentBackgroundHover,
  colorTransparentBackgroundPressed,
  colorTransparentStroke,
  curveEasyEase,
  durationFaster,
  fontFamilyBase,
  fontSizeBase200,
  fontSizeBase300,
  fontSizeBase400,
  fontWeightRegular,
  fontWeightSemibold,
  lineHeightBase200,
  lineHeightBase300,
  lineHeightBase400,
  shadow2,
  shadow4,
  spacingHorizontalL,
  spacingHorizontalM,
  spacingHorizontalS,
  spacingHorizontalSNudge,
  spacingHorizontalXS,
  strokeWidthThick,
  strokeWidthThin,
} from '../theme/design-tokens.js';

/**
 * The styles for the Button component.
 *
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

  :host {
    --icon-spacing: ${spacingHorizontalSNudge};
    contain: layout style;
    vertical-align: middle;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
    text-decoration-line: none;
    margin: 0;
    min-height: 32px;
    outline-style: none;
    background-color: ${colorNeutralBackground1};
    color: ${colorNeutralForeground1};
    border: ${strokeWidthThin} solid ${colorNeutralStroke1};
    padding: 0 ${spacingHorizontalM};
    min-width: 96px;
    border-radius: ${borderRadiusMedium};
    font-size: ${fontSizeBase300};
    font-family: ${fontFamilyBase};
    font-weight: ${fontWeightSemibold};
    line-height: ${lineHeightBase300};
    transition-duration: ${durationFaster};
    transition-property: background, border, color;
    transition-timing-function: ${curveEasyEase};
    cursor: pointer;
    user-select: none;
  }

  .content {
    display: inherit;
  }

  :host(:hover) {
    background-color: ${colorNeutralBackground1Hover};
    color: ${colorNeutralForeground1Hover};
    border-color: ${colorNeutralStroke1Hover};
  }

  :host(:hover:active) {
    background-color: ${colorNeutralBackground1Pressed};
    border-color: ${colorNeutralStroke1Pressed};
    color: ${colorNeutralForeground1Pressed};
    outline-style: none;
  }

  :host(:focus-visible) {
    border-color: ${colorTransparentStroke};
    outline: ${strokeWidthThick}) solid ${colorTransparentStroke};
    box-shadow: ${shadow4}, 0 0 0 2px ${colorStrokeFocus2};
  }

  @media screen and (prefers-reduced-motion: reduce) {
    transition-duration: 0.01ms;
  }

  ::slotted(svg) {
    font-size: 20px;
    height: 20px;
    width: 20px;
    fill: currentColor;
  }

  [slot='start'],
  ::slotted([slot='start']) {
    margin-inline-end: var(--icon-spacing);
  }

  [slot='end'],
  ::slotted([slot='end']) {
    margin-inline-start: var(--icon-spacing);
  }

  :host([icon-only]) {
    min-width: 32px;
    max-width: 32px;
  }

  :host([size='small']) {
    --icon-spacing: ${spacingHorizontalXS};
    min-height: 24px;
    min-width: 64px;
    padding: 0 ${spacingHorizontalS};
    border-radius: ${borderRadiusSmall};
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    font-weight: ${fontWeightRegular};
  }

  :host([size='small'][icon-only]) {
    min-width: 24px;
    max-width: 24px;
  }

  :host([size='large']) {
    min-height: 40px;
    border-radius: ${borderRadiusLarge};
    padding: 0 ${spacingHorizontalL};
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
  }

  :host([size='large'][icon-only]) {
    min-width: 40px;
    max-width: 40px;
  }

  :host([size='large']) ::slotted(svg) {
    font-size: 24px;
    height: 24px;
    width: 24px;
  }

  :host([shape='circular']),
  :host([shape='circular']:focus-visible) {
    border-radius: ${borderRadiusCircular};
  }

  :host([shape='square']),
  :host([shape='square']:focus-visible) {
    border-radius: ${borderRadiusNone};
  }

  :host([appearance='primary']) {
    background-color: ${colorBrandBackground};
    color: ${colorNeutralForegroundOnBrand};
    border-color: transparent;
  }

  :host([appearance='primary']:hover) {
    background-color: ${colorBrandBackgroundHover};
  }

  :host([appearance='primary']:hover),
  :host([appearance='primary']:hover:active) {
    border-color: transparent;
    color: ${colorNeutralForegroundOnBrand};
  }

  :host([appearance='primary']:hover:active) {
    background-color: ${colorBrandBackgroundPressed};
  }

  :host([appearance='primary']:focus-visible) {
    border-color: ${colorNeutralForegroundOnBrand};
    box-shadow: ${shadow2}, 0 0 0 2px ${colorStrokeFocus2};
  }

  :host(is:([disabled][appearance='primary'], [disabled-focusabale][appearance="primary"])),
  :host(is:([disabled][appearance='primary'], [disabled-focusabale][appearance="primary"]):hover),
  :host(is:([disabled][appearance='primary'], [disabled-focusabale][appearance="primary"]):hover:active) {
    border-color: transparent;
  }

  :host([appearance='outline']) {
    background-color: ${colorTransparentBackground};
  }

  :host([appearance='outline']:hover) {
    background-color: ${colorTransparentBackgroundHover};
  }

  :host([appearance='outline']:hover:active) {
    background-color: ${colorTransparentBackgroundPressed};
  }

  :host(is:([disabled][appearance='outline'], [disabled-focusabale][appearance="outline"])),
  :host(is:([disabled][appearance='outline'], [disabled-focusabale][appearance="outline"]):hover),
  :host(is:([disabled][appearance='outline'], [disabled-focusabale][appearance="outline"]):hover:active) {
    background-color: ${colorTransparentBackground};
  }

  :host([appearance='subtle']) {
    background-color: ${colorSubtleBackground};
    color: ${colorNeutralForeground2};
    border-color: transparent;
  }

  :host([appearance='subtle']:hover) {
    background-color: ${colorSubtleBackgroundHover};
    color: ${colorNeutralForeground2Hover};
    border-color: transparent;
  }

  :host([appearance='subtle']:hover:active) {
    background-color: ${colorSubtleBackgroundPressed};
    color: ${colorNeutralForeground2Pressed};
    border-color: transparent;
  }

  :host(is:([disabled][appearance='subtle'], [disabled-focusabale][appearance="subtle"])),
  :host(is:([disabled][appearance='subtle'], [disabled-focusabale][appearance="subtle"]):hover),
  :host(is:([disabled][appearance='subtle'], [disabled-focusabale][appearance="subtle"]):hover:active) {
    background-color: ${colorTransparentBackground};
    border-color: transparent;
  }

  :host([appearance='subtle']:hover) ::slotted(svg) {
    fill: ${colorNeutralForeground2BrandHover};
  }

  :host([appearance='subtle']:hover:active) ::slotted(svg) {
    fill: ${colorNeutralForeground2BrandPressed};
  }

  :host([appearance='transparent']) {
    background-color: ${colorTransparentBackground};
    color: ${colorNeutralForeground2};
  }

  :host([appearance='transparent']:hover) {
    background-color: ${colorTransparentBackgroundHover};
    color: ${colorNeutralForeground2BrandHover};
  }

  :host([appearance='transparent']:hover:active) {
    background-color: ${colorTransparentBackgroundPressed};
    color: ${colorNeutralForeground2BrandPressed};
  }

  :host([appearance='transparent']),
  :host([appearance='transparent']:hover),
  :host([appearance='transparent']:hover:active) {
    border-color: transparent;
  }

  :host(is:([disabled][appearance='transparent'], [disabled-focusabale][appearance="transparent"])),
  :host(is:([disabled][appearance='transparent'], [disabled-focusabale][appearance="transparent"]):hover),
  :host(is:([disabled][appearance='transparent'], [disabled-focusabale][appearance="transparent"]):hover:active) {
    border-color: transparent;
    background-color: ${colorTransparentBackground};
  }

  :host(:is([disabled], [disabled-focusable], [appearance][disabled], [appearance][disabled-focusable])),
  :host(:is([disabled], [disabled-focusable], [appearance][disabled], [appearance][disabled-focusable]):hover),
  :host(:is([disabled], [disabled-focusable], [appearance][disabled], [appearance][disabled-focusable]):hover:active) {
    background-color: ${colorNeutralBackgroundDisabled};
    border-color: ${colorNeutralStrokeDisabled};
    color: ${colorNeutralForegroundDisabled};
    cursor: not-allowed;
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host([appearance='transparent']:hover) {
      border-color: Highlight;
    }
  `),
);
