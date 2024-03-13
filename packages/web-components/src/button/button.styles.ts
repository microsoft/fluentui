import { css } from '@microsoft/fast-element';
import { display, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation/utilities.js';
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

// Need to support icon hover styles
export const styles = css`
  ${display('inline-flex')}

  :host {
    --icon-spacing: var(${spacingHorizontalSNudge});
    contain: layout style;
    vertical-align: middle;
  }

  :host .control {
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: center;
    text-decoration-line: none;
    margin: 0;
    min-height: 32px;
    outline-style: none;
    background-color: var(${colorNeutralBackground1});
    color: var(${colorNeutralForeground1});
    border: var(${strokeWidthThin}) solid var(${colorNeutralStroke1});
    padding: 0 var(${spacingHorizontalM});
    min-width: 96px;
    border-radius: var(${borderRadiusMedium});
    font-size: var(${fontSizeBase300});
    font-family: var(${fontFamilyBase});
    font-weight: var(${fontWeightSemibold});
    line-height: var(${lineHeightBase300});
    transition-duration: var(${durationFaster});
    transition-property: background, border, color;
    transition-timing-function: var(${curveEasyEase});
    cursor: pointer;
  }

  .content {
    display: inherit;
  }

  :host(:hover) .control {
    background-color: var(${colorNeutralBackground1Hover});
    color: var(${colorNeutralForeground1Hover});
    border-color: var(${colorNeutralStroke1Hover});
  }

  :host(:hover:active) .control {
    background-color: var(${colorNeutralBackground1Pressed});
    border-color: var(${colorNeutralStroke1Pressed});
    color: var(${colorNeutralForeground1Pressed});
    outline-style: none;
  }

  :host .control:focus-visible {
    border-color: var(${colorTransparentStroke});
    outline: var(${strokeWidthThick}) solid var(${colorTransparentStroke});
    box-shadow: var(${shadow4}), 0 0 0 2px var(${colorStrokeFocus2});
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

  :host([icon-only]) .control {
    min-width: 32px;
    max-width: 32px;
  }

  :host([size='small']) {
    --icon-spacing: var(${spacingHorizontalXS});
  }

  :host([size='small']) .control {
    min-height: 24px;
    min-width: 64px;
    padding: 0 var(${spacingHorizontalS});
    border-radius: var(${borderRadiusSmall});
    font-size: var(${fontSizeBase200});
    line-height: var(${lineHeightBase200});
    font-weight: var(${fontWeightRegular});
  }

  :host([size='small'][icon-only]) .control {
    min-width: 24px;
    max-width: 24px;
  }

  :host([size='large']) .control {
    min-height: 40px;
    border-radius: var(${borderRadiusLarge});
    padding: 0 var(${spacingHorizontalL});
    font-size: var(${fontSizeBase400});
    line-height: var(${lineHeightBase400});
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

  :host([shape='circular']) .control,
  :host([shape='circular']) .control:focus-visible {
    border-radius: var(${borderRadiusCircular});
  }

  :host([shape='square']) .control,
  :host([shape='square']) .control:focus-visible {
    border-radius: var(${borderRadiusNone});
  }

  :host([appearance='primary']) .control {
    background-color: var(${colorBrandBackground});
    color: var(${colorNeutralForegroundOnBrand});
    border-color: transparent;
  }

  :host([appearance='primary']:hover) .control {
    background-color: var(${colorBrandBackgroundHover});
  }

  :host([appearance='primary']:hover) .control,
  :host([appearance='primary']:hover:active) .control {
    border-color: transparent;
    color: var(${colorNeutralForegroundOnBrand});
  }

  :host([appearance='primary']:hover:active) .control {
    background-color: var(${colorBrandBackgroundPressed});
  }

  :host([appearance='primary']) .control:focus-visible {
    border-color: var(${colorNeutralForegroundOnBrand});
    box-shadow: var(${shadow2}), 0 0 0 2px var(${colorStrokeFocus2});
  }

  :host(is:([disabled][appearance='primary'], [disabled-focusabale][appearance="primary"])) .control,
  :host(is:([disabled][appearance='primary'], [disabled-focusabale][appearance="primary"]):hover) .control,
  :host(is:([disabled][appearance='primary'], [disabled-focusabale][appearance="primary"]):hover:active) .control {
    border-color: transparent;
  }

  :host([appearance='outline']) .control {
    background-color: var(${colorTransparentBackground});
  }

  :host([appearance='outline']:hover) .control {
    background-color: var(${colorTransparentBackgroundHover});
  }

  :host([appearance='outline']:hover:active) .control {
    background-color: var(${colorTransparentBackgroundPressed});
  }

  :host(is:([disabled][appearance='outline'], [disabled-focusabale][appearance="outline"])) .control,
  :host(is:([disabled][appearance='outline'], [disabled-focusabale][appearance="outline"]):hover) .control,
  :host(is:([disabled][appearance='outline'], [disabled-focusabale][appearance="outline"]):hover:active) .control {
    background-color: var(${colorTransparentBackground});
  }

  :host([appearance='subtle']) .control {
    background-color: var(${colorSubtleBackground});
    color: var(${colorNeutralForeground2});
    border-color: transparent;
  }

  :host([appearance='subtle']:hover) .control {
    background-color: var(${colorSubtleBackgroundHover});
    color: var(${colorNeutralForeground2Hover});
    border-color: transparent;
  }

  :host([appearance='subtle']:hover:active) .control {
    background-color: var(${colorSubtleBackgroundPressed});
    color: var(${colorNeutralForeground2Pressed});
    border-color: transparent;
  }

  :host(is:([disabled][appearance='subtle'], [disabled-focusabale][appearance="subtle"])) .control,
  :host(is:([disabled][appearance='subtle'], [disabled-focusabale][appearance="subtle"]):hover) .control,
  :host(is:([disabled][appearance='subtle'], [disabled-focusabale][appearance="subtle"]):hover:active) .control {
    background-color: var(${colorTransparentBackground});
    border-color: transparent;
  }

  :host([appearance='subtle']:hover) ::slotted(svg) {
    fill: var(${colorNeutralForeground2BrandHover});
  }

  :host([appearance='subtle']:hover:active) ::slotted(svg) {
    fill: var(${colorNeutralForeground2BrandPressed});
  }

  :host([appearance='transparent']) .control {
    background-color: var(${colorTransparentBackground});
    color: var(${colorNeutralForeground2});
  }

  :host([appearance='transparent']:hover) .control {
    background-color: var(${colorTransparentBackgroundHover});
    color: var(${colorNeutralForeground2BrandHover});
  }

  :host([appearance='transparent']:hover:active) .control {
    background-color: var(${colorTransparentBackgroundPressed});
    color: var(${colorNeutralForeground2BrandPressed});
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
    background-color: var(${colorTransparentBackground});
  }

  :host(:is([disabled], [disabled-focusable], [appearance][disabled], [appearance][disabled-focusable])) .control,
  :host(:is([disabled], [disabled-focusable], [appearance][disabled], [appearance][disabled-focusable]):hover) .control,
  :host(:is([disabled], [disabled-focusable], [appearance][disabled], [appearance][disabled-focusable]):hover:active)
    .control {
    background-color: var(${colorNeutralBackgroundDisabled});
    border-color: var(${colorNeutralStrokeDisabled});
    color: var(${colorNeutralForegroundDisabled});
    cursor: not-allowed;
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host([appearance='transparent']:hover) .control {
      border-color: Highlight;
    }
  `),
);
