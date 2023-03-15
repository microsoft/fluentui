import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
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

const buttonSpacingSmall = '3px';
const buttonSpacingSmallWithIcon = '1px';
const buttonSpacingMedium = '5px';
const buttonSpacingLarge = '8px';
const buttonSpacingLargeWithIcon = '7px';

// Need to support icon hover styles
export const styles = css`
  ${display('inline-flex')}

  :host {
    --icon-spacing: ${spacingHorizontalSNudge};
    contain: layout style;
  }

  :host .control {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
    text-decoration-line: none;
    margin: 0;
    outline-style: none;
    background-color: ${colorNeutralBackground1};
    color: ${colorNeutralForeground1};
    border: ${strokeWidthThin} solid ${colorNeutralStroke1};
    padding: ${buttonSpacingMedium} ${spacingHorizontalM};
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
  }

  .content {
    display: inherit;
  }

  :host(:hover) .control {
    background-color: ${colorNeutralBackground1Hover};
    color: ${colorNeutralForeground1Hover};
    border-color: ${colorNeutralStroke1Hover};
  }

  :host(:hover:active) .control {
    background-color: ${colorNeutralBackground1Pressed};
    border-color: ${colorNeutralStroke1Pressed};
    color: ${colorNeutralForeground1Pressed};
    outline-style: none;
  }

  :host .control:focus-visible {
    border-color: ${colorTransparentStroke};
    border-radius: ${borderRadiusMedium};
    outline: ${strokeWidthThick} solid ${colorTransparentStroke};
    box-shadow: ${shadow4}, 0 0 0 2px ${colorStrokeFocus2};
    z-index: 1;
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

  ::slotted([slot='start']) {
    margin-inline-end: var(--icon-spacing);
  }

  ::slotted([slot='end']) {
    margin-inline-start: var(--icon-spacing);
  }

  :host([icon-only]) .control {
    min-width: 32px;
    max-width: 32px;
  }

  :host([size='small']) .control:focus-visible {
    border-radius: ${borderRadiusSmall};
  }

  :host([size='large']) .control:focus-visible {
    border-radius: ${borderRadiusLarge};
  }

  :host([shape='circular']) .control,
  :host([shape='circular']) .control:focus-visible {
    border-radius: ${borderRadiusCircular};
  }

  :host([shape='square']) .control,
  :host([shape='square']) .control:focus-visible {
    border-radius: ${borderRadiusNone};
  }

  :host([size='small']) {
    --icon-spacing: ${spacingHorizontalXS};
  }

  :host([size='small']) .control {
    min-width: 64px;
    padding: ${buttonSpacingSmall} ${spacingHorizontalS};
    border-radius: ${buttonSpacingSmall};
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    font-weight: ${fontWeightRegular};
  }

  :host([size='small'][icon-only]) .control {
    min-width: 24px;
    max-width: 24px;
  }

  :host([size='small'][icon]) .control,
  :host([size='small'][icon-only]) .control {
    padding-block: ${buttonSpacingSmallWithIcon};
  }

  :host([size='large'][icon]) .control,
  :host([size='large'][icon-only]) .control {
    padding-block: ${buttonSpacingLargeWithIcon};
  }

  :host([size='large']) .control {
    padding: ${buttonSpacingLarge} ${spacingHorizontalL};
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
  }

  :host([size='large'][icon-only]) .control {
    min-width: 40px;
    max-width: 40px;
  }

  :host([size='large']) ::slotted(svg) {
    font-size: 24px;
    height: 24px;
    width: 24px;
  }

  :host([appearance='primary']) .control {
    background-color: ${colorBrandBackground};
    color: ${colorNeutralForegroundOnBrand};
    border-color: transparent;
  }

  :host([appearance='primary']:hover) .control {
    background-color: ${colorBrandBackgroundHover};
  }

  :host([appearance='primary']:hover) .control,
  :host([appearance='primary']:hover:active) .control {
    border-color: transparent;
    color: ${colorNeutralForegroundOnBrand};
  }

  :host([appearance='primary']:hover:active) .control {
    background-color: ${colorBrandBackgroundPressed};
  }

  :host([appearance='primary']) .control:focus-visible {
    border-color: ${colorNeutralForegroundOnBrand};
    box-shadow: ${shadow2}, 0 0 0 2px ${colorStrokeFocus2};
  }

  :host([disabled][appearance='primary']) .control,
  :host([disabled][appearance='primary']:hover) .control,
  :host([disabled][appearance='primary']:hover:active) .control,
  :host([disabled-focusable][appearance='primary']) .control,
  :host([disabled-focusable][appearance='primary']:hover) .control,
  :host([disabled-focusable][appearance='primary']:hover:active) .control {
    border-color: transparent;
  }

  :host([appearance='outline']) .control {
    background-color: ${colorTransparentBackground};
  }

  :host([appearance='outline']:hover) .control {
    background-color: ${colorTransparentBackgroundHover};
  }

  :host([appearance='outline']:hover:active) .control {
    background-color: ${colorTransparentBackgroundPressed};
  }

  :host([disabled][appearance='outline']) .control,
  :host([disabled][appearance='outline']:hover) .control,
  :host([disabled][appearance='outline']:hover:active) .control {
    background-color: ${colorTransparentBackground};
  }

  :host([appearance='subtle']) .control {
    background-color: ${colorSubtleBackground};
    color: ${colorNeutralForeground2};
    border-color: transparent;
  }

  :host([appearance='subtle']:hover) .control {
    background-color: ${colorSubtleBackgroundHover};
    color: ${colorNeutralForeground2Hover};
    border-color: transparent;
  }

  :host([appearance='subtle']:hover:active) .control {
    background-color: ${colorSubtleBackgroundPressed};
    color: ${colorNeutralForeground2Pressed};
    border-color: transparent;
  }

  :host([disabled][appearance='subtle']) .control,
  :host([disabled][appearance='subtle']:hover) .control,
  :host([disabled][appearance='subtle']:hover:active) .control,
  :host([disabled-focusable][appearance='subtle']) .control,
  :host([disabled-focusable][appearance='subtle']:hover) .control,
  :host([disabled-focusable][appearance='subtle']:hover:active) .control {
    background-color: ${colorTransparentBackground};
    border-color: transparent;
  }

  :host([appearance='subtle']:hover) ::slotted(svg) {
    color: ${colorNeutralForeground2BrandHover};
  }

  :host([appearance='subtle']:hover:active) ::slotted(svg) {
    color: ${colorNeutralForeground2BrandPressed};
  }

  :host([appearance='transparent']) .control {
    background-color: ${colorTransparentBackground};
    color: ${colorNeutralForeground2};
  }

  :host([appearance='transparent']:hover) .control {
    background-color: ${colorTransparentBackgroundHover};
    color: ${colorNeutralForeground2BrandHover};
  }

  :host([appearance='transparent']:hover:active) .control {
    background-color: ${colorTransparentBackgroundPressed};
    color: ${colorNeutralForeground2BrandPressed};
  }

  :host([appearance='transparent']) .control,
  :host([appearance='transparent']:hover) .control,
  :host([appearance='transparent']:hover:active) .control {
    border-color: transparent;
  }

  :host(is:([disabled][appearance='transparent'], [disabled-focusabale][appearance="transparent"])) .control,
  :host(is:([disabled][appearance='transparent'], [disabled-focusabale][appearance="transparent"]):hover) .control,
  :host(is:([disabled][appearance='transparent'], [disabled-focusabale][appearance="transparent"]):hover:active) .control {
    border-color: transparent;
    background-color: ${colorTransparentBackground};
  }

  :host(:is([disabled], [disabled-focusable], [appearance][disabled], [appearance][disabled-focusable])) .control,
  :host(:is([disabled], [disabled-focusable], [appearance][disabled], [appearance][disabled-focusable]):hover) .control,
  :host(:is([disabled], [disabled-focusable], [appearance][disabled], [appearance][disabled-focusable]):hover:active)
    .control {
    background-color: ${colorNeutralBackgroundDisabled};
    border-color: ${colorNeutralStrokeDisabled};
    color: ${colorNeutralForegroundDisabled};
    cursor: not-allowed;
  }
`;
