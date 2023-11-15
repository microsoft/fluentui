import { css } from '@microsoft/fast-element';
import { display, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation/utilities.js';
import {
  borderRadiusCircular,
  colorCompoundBrandBackground,
  colorCompoundBrandBackgroundHover,
  colorCompoundBrandBackgroundPressed,
  colorNeutralBackgroundDisabled,
  colorNeutralForeground1,
  colorNeutralForeground3,
  colorNeutralForeground3Hover,
  colorNeutralForeground3Pressed,
  colorNeutralForegroundDisabled,
  colorNeutralForegroundInverted,
  colorNeutralForegroundInvertedHover,
  colorNeutralForegroundInvertedPressed,
  colorNeutralStrokeAccessible,
  colorNeutralStrokeAccessibleHover,
  colorNeutralStrokeAccessiblePressed,
  colorNeutralStrokeDisabled,
  colorStrokeFocus2,
  colorTransparentBackground,
  colorTransparentStroke,
  curveEasyEase,
  durationNormal,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  shadow4,
  spacingHorizontalS,
  spacingHorizontalXS,
  spacingHorizontalXXS,
  spacingVerticalS,
  spacingVerticalXS,
  strokeWidthThick,
} from '../theme/design-tokens.js';

export const styles = css`
  ${display('inline-flex')}

  :host {
    align-items: center;
    flex-direction: row-reverse;
    outline: none;
    user-select: none;
    contain: content;
  }
  :host([label-position='before']) {
    flex-direction: row;
  }
  :host([label-position='above']) {
    flex-direction: column;
    align-items: flex-start;
  }
  :host([disabled]) .label,
  :host([readonly]) .label,
  :host([readonly]) .switch,
  :host([disabled]) .switch {
    cursor: not-allowed;
  }
  .label {
    position: relative;
    color: ${colorNeutralForeground1};
    line-height: ${lineHeightBase300};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    font-family: ${fontFamilyBase};
    padding: ${spacingVerticalXS} ${spacingHorizontalXS};
    cursor: pointer;
  }
  .label__hidden {
    display: none;
  }
  .switch {
    display: flex;
    align-items: center;
    padding: 0 ${spacingHorizontalXXS};
    box-sizing: border-box;
    width: 40px;
    height: 20px;
    background-color: ${colorTransparentBackground};
    border: 1px solid ${colorNeutralStrokeAccessible};
    border-radius: ${borderRadiusCircular};
    outline: none;
    cursor: pointer;
    margin: ${spacingVerticalS} ${spacingHorizontalS};
  }
  :host(:hover) .switch {
    background: none;
    border-color: ${colorNeutralStrokeAccessibleHover};
  }
  :host(:active) .switch {
    border-color: ${colorNeutralStrokeAccessiblePressed};
  }
  :host([disabled]) .switch,
  :host([readonly]) .switch {
    border: 1px solid ${colorNeutralStrokeDisabled};
    background-color: none;
    pointer: default;
  }
  :host([aria-checked='true']) .switch {
    background: ${colorCompoundBrandBackground};
  }
  :host([aria-checked='true']:hover) .switch {
    background: ${colorCompoundBrandBackgroundHover};
    border-color: ${colorCompoundBrandBackgroundHover};
  }
  :host([aria-checked='true']:active) .switch {
    background: ${colorCompoundBrandBackgroundPressed};
    border-color: ${colorCompoundBrandBackgroundPressed};
  }
  :host([aria-checked='true'][disabled]) .switch {
    background: ${colorNeutralBackgroundDisabled};
    border-color: ${colorNeutralStrokeDisabled};
  }
  .checked-indicator {
    height: 14px;
    width: 14px;
    border-radius: 50%;
    margin-inline-start: 0;
    background-color: ${colorNeutralForeground3};
    transition-duration: ${durationNormal};
    transition-timing-function: ${curveEasyEase};
    transition-property: margin-inline-start;
  }
  :host([aria-checked='true']) .checked-indicator {
    background-color: ${colorNeutralForegroundInverted};
    margin-inline-start: calc(100% - 14px);
  }
  :host([aria-checked='true']:hover) .checked-indicator {
    background: ${colorNeutralForegroundInvertedHover};
  }
  :host([aria-checked='true']:active) .checked-indicator {
    background: ${colorNeutralForegroundInvertedPressed};
  }
  :host(:hover) .checked-indicator {
    background-color: ${colorNeutralForeground3Hover};
  }
  :host(:active) .checked-indicator {
    background-color: ${colorNeutralForeground3Pressed};
  }
  :host([disabled]) .checked-indicator,
  :host([readonly]) .checked-indicator {
    background: ${colorNeutralForegroundDisabled};
  }
  :host([aria-checked='true'][disabled]) .checked-indicator {
    background: ${colorNeutralForegroundDisabled};
  }

  :host(:focus-visible) {
    border-color: ${colorTransparentStroke};
    outline: ${strokeWidthThick} solid ${colorTransparentStroke};
    box-shadow: ${shadow4}, 0 0 0 2px ${colorStrokeFocus2};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    .switch {
      border-color: InactiveBorder;
    }
    :host([aria-checked='true']) .switch,
    :host([aria-checked='true']:active) .switch,
    :host([aria-checked='true']:hover) .switch {
      background: Highlight;
      border-color: Highlight;
    }
    .checked-indicator,
    :host(:hover) .checked-indicator,
    :host(:active) .checked-indicator {
      background-color: ActiveCaption;
    }
    :host([aria-checked='true']) .checked-indicator,
    :host([aria-checked='true']:hover) .checked-indicator,
    :host([aria-checked='true']:active) .checked-indicator {
      background-color: ButtonFace;
    }
  `),
);
