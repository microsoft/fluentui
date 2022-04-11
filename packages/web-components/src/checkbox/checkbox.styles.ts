import { css } from '@microsoft/fast-element';
import {
  display,
  focusVisible,
} from '@microsoft/fast-foundation';
import { tokens } from "@fluentui/react-theme";

// TODO replace these spacing constants with theme values once they're on the theme
const spacingHorizontalM = '12px';

// The indicator size is used by the indicator and label styles
const indicatorSizeMedium = '16px';
const indicatorSizeLarge = '20px';

export const checkboxStyles = css`
    ${display('inline-flex')} :host {
      align-items: center;
      height: 32px;
      outline: none;
      ${
        /*
         * Chromium likes to select label text or the default slot when
         * the checkbox is clicked. Maybe there is a better solution here?
         */ ''
      } user-select: none;
      cursor: pointer;
    }

    :host([size="medium"]) .control {
        width: ${indicatorSizeMedium};
        height: ${indicatorSizeMedium};
    }

    :host([size="large"]) .control {
        width: ${indicatorSizeLarge};
        height: ${indicatorSizeLarge};
    }

    .control {
      position: relative;
      box-sizing: border-box;
      border-radius: ${tokens.borderRadiusSmall};
      border: ${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible};
      outline: none;
    }

    ::slotted(*) {
      font-family: ${tokens.fontFamilyBase};
      color: ${tokens.colorNeutralForeground3};
      margin-inline-start: ${spacingHorizontalM};
      font-size: ${tokens.fontSizeBase300};
      line-height: ${tokens.lineHeightBase300};
      cursor: pointer;
    }

    :host(:hover) ::slotted(*) {
        color: ${tokens.colorNeutralForeground2};
    }

    slot[name='checked-indicator'],
    slot[name='indeterminate-indicator'] {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      opacity: 0;
      fill: currentColor;
      pointer-events: none;
    }

    :host([aria-checked="true"][size="medium"]) slot[name='checked-indicator'] {
        width: 12px;
        height: 12px;
    }

    :host(.indeterminate) .control {
        border-color: ${tokens.colorCompoundBrandStroke};
    }

    :host(.indeterminate) slot[name='indeterminate-indicator'] {
        opacity: 1;
    }

    :host slot[name='indeterminate-indicator'] {
        position: absolute;
        top: 0;
        color: ${tokens.colorCompoundBrandForeground1};
    }

    :host(:hover) slot[name='indeterminate-indicator'] {
        border-color: ${tokens.colorCompoundBrandStrokeHover};
        color: ${tokens.colorCompoundBrandForeground1Hover};
    }

    :host(:active) slot[name='indeterminate-indicator'] {
        border-color: ${tokens.colorCompoundBrandStrokePressed};
        color: ${tokens.colorCompoundBrandForeground1Pressed};
    }

    :host(:not(.disabled):hover) .control {
        border-color: ${tokens.colorNeutralStrokeAccessibleHover};
    }

    :host(:not(.disabled):active) ::slotted(*) {
      color: ${tokens.colorNeutralForeground1};
    }

    :host(:not(.disabled):hover) .control {
        border-color: ${tokens.colorNeutralStrokeAccessiblePressed};
    }

    /*
    NEED TO ADD FOCUS STYLES
    :host(:${focusVisible}) .control {} */
    /* Checked Styles */
    :host([aria-checked="true"]) slot[name='checked-indicator'],
    :host([aria-checked="true"]) slot[name='indeterminate-indicator'] {
        fill: ${tokens.colorNeutralForegroundOnBrand};
    }

    :host([aria-checked="true"]) ::slotted(*) {
        color: ${tokens.colorNeutralForeground1};
    }

    :host([aria-checked="true"]:not([disabled])) .control {
      background: ${tokens.colorCompoundBrandBackground};
      border-color: ${tokens.colorCompoundBrandBackground};
    }

    :host([aria-checked="true"]) slot[name='checked-indicator'] {
        opacity: 1;
    }

    :host([aria-checked="true"].indeterminate) slot[name='indeterminate-indicator'] {
        opacity: 0;
    }

    /* Checked Disabled */
    :host([aria-checked="true"]:not([disabled]):hover) .control {
      background: ${tokens.colorCompoundBrandBackgroundHover};
      border-color: ${tokens.colorCompoundBrandBackgroundHover};
    }

    :host([aria-checked="true"]:not([disabled]):active) .control {
      background: ${tokens.colorCompoundBrandBackgroundPressed};
      border-color: ${tokens.colorCompoundBrandBackgroundPressed};
    }

    :host([readonly]),
    :host([disabled]),
    :host([disabled]) ::slotted(*),
    :host([readonly]) ::slotted(*), {
      cursor: default;
    }

    :host([disabled]) .control,
    :host([disabled]) ::slotted(*),
    :host([disabled]) slot[name="indeterminate-indicator"],
    :host([disabled]) slot[name="checked-indicator"] {
      border-color: ${tokens.colorNeutralStrokeDisabled};
      color: ${tokens.colorNeutralForegroundDisabled};
      fill: currentColor;
    }

    :host([label-before]) {
        flex-direction: row-reverse;
    }
    
    :host([label-before]) ::slotted(*) {
        margin-inline-start: 0;
        margin-inline-end: ${spacingHorizontalM};
    }
  `