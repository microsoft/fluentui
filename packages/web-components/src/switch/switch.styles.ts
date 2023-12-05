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
    color: var(${colorNeutralForeground1});
    line-height: var(${lineHeightBase300});
    font-size: var(${fontSizeBase300});
    font-weight: var(${fontWeightRegular});
    font-family: var(${fontFamilyBase});
    padding: var(${spacingVerticalXS}) var(${spacingHorizontalXS});
    cursor: pointer;
  }
  .label__hidden {
    display: none;
  }
  .switch {
    display: flex;
    align-items: center;
    padding: 0 var(${spacingHorizontalXXS});
    box-sizing: border-box;
    width: 40px;
    height: 20px;
    background-color: var(${colorTransparentBackground});
    border: 1px solid var(${colorNeutralStrokeAccessible});
    border-radius: var(${borderRadiusCircular});
    outline: none;
    cursor: pointer;
    margin: var(${spacingVerticalS}) var(${spacingHorizontalS});
  }
  :host(:hover) .switch {
    background: none;
    border-color: var(${colorNeutralStrokeAccessibleHover});
  }
  :host(:active) .switch {
    border-color: var(${colorNeutralStrokeAccessiblePressed});
  }
  :host([disabled]) .switch,
  :host([readonly]) .switch {
    border: 1px solid var(${colorNeutralStrokeDisabled});
    background-color: none;
    pointer: default;
  }
  :host([aria-checked='true']) .switch {
    background: var(${colorCompoundBrandBackground});
  }
  :host([aria-checked='true']:hover) .switch {
    background: var(${colorCompoundBrandBackgroundHover});
    border-color: var(${colorCompoundBrandBackgroundHover});
  }
  :host([aria-checked='true']:active) .switch {
    background: var(${colorCompoundBrandBackgroundPressed});
    border-color: var(${colorCompoundBrandBackgroundPressed});
  }
  :host([aria-checked='true'][disabled]) .switch {
    background: var(${colorNeutralBackgroundDisabled});
    border-color: var(${colorNeutralStrokeDisabled});
  }
  .checked-indicator {
    height: 14px;
    width: 14px;
    border-radius: 50%;
    margin-inline-start: 0;
    background-color: var(${colorNeutralForeground3});
    transition-duration: var(${durationNormal});
    transition-timing-function: var(${curveEasyEase});
    transition-property: margin-inline-start;
  }
  :host([aria-checked='true']) .checked-indicator {
    background-color: var(${colorNeutralForegroundInverted});
    margin-inline-start: calc(100% - 14px);
  }
  :host([aria-checked='true']:hover) .checked-indicator {
    background: var(${colorNeutralForegroundInvertedHover});
  }
  :host([aria-checked='true']:active) .checked-indicator {
    background: var(${colorNeutralForegroundInvertedPressed});
  }
  :host(:hover) .checked-indicator {
    background-color: var(${colorNeutralForeground3Hover});
  }
  :host(:active) .checked-indicator {
    background-color: var(${colorNeutralForeground3Pressed});
  }
  :host([disabled]) .checked-indicator,
  :host([readonly]) .checked-indicator {
    background: var(${colorNeutralForegroundDisabled});
  }
  :host([aria-checked='true'][disabled]) .checked-indicator {
    background: var(${colorNeutralForegroundDisabled});
  }

  :host(:focus-visible) {
    border-color: var(${colorTransparentStroke});
    outline: var(${strokeWidthThick}) solid var(${colorTransparentStroke});
    box-shadow: var(${shadow4}), 0 0 0 2px var(${colorStrokeFocus2});
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
