import { css } from '@microsoft/fast-element';
import {
  display,
  focusVisible,
} from '@microsoft/fast-foundation';
import { tokens } from "@fluentui/react-theme";

// TODO replace these spacing constants with theme values once they're on the theme
const spacingHorizontalS = '8px';
const spacingHorizontalM = '12px';

// The indicator size is used by the indicator and label styles
const indicatorSize = '16px';

export const radioStyles = css`
${display('inline-flex')} :host {
  font-family: ${tokens.fontFamilyBase};
  align-items: center;
  outline: none;
  ${
    /*
     * Chromium likes to select label text or the default slot when
     * the radio button is clicked. Maybe there is a better solution here?
     */ ''
  } user-select: none;
  position: relative;
  flex-direction: row;
  gap: ${spacingHorizontalM};
  padding: 6px;
  font-size: ${tokens.fontSizeBase300};
  line-height: ${tokens.lineHeightBase300};
  color: ${tokens.colorNeutralForeground3};
  transition: all 0.2s ease-in-out;
}

::slotted(*) {
  display: inline-flex;
  flex-direction: column;
}

:host(:not.readonly),
:host(:not([disabled])) {
  cursor: pointer;
}

.control {
  position: relative;
  width: ${indicatorSize};
  height: ${indicatorSize};
  font-size: 12px;
  box-sizing: border-box;
  border-radius: 50%;
  border: ${tokens.strokeWidthThin} solid ${tokens.colorNeutralStrokeAccessible};
  /* background: none; */
  outline: none;
}

.control,
slot[name='checked-indicator'] {
  flex-shrink: 0;
}

slot[name='checked-indicator'] {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  fill: currentColor;
  opacity: 0;
  pointer-events: none;
}

:host(:not([disabled]):hover) {
  color: ${tokens.colorNeutralForeground2};
}

:host(:not([disabled]):hover) .control {
  border-color: ${tokens.colorNeutralStrokeAccessibleHover};
}

:host(:not([disabled]):active) .control {
  border-color: ${tokens.colorNeutralStrokeAccessiblePressed};
}

:host([aria-checked="true"]:not([disabled])) {
  color: ${tokens.colorNeutralForeground1};
}

:host([aria-checked="true"]:not([disabled])) slot[name='checked-indicator'] {
  opacity: 1;
}

/* need focus styles
  :host(:${focusVisible}) .control {}
*/

:host([aria-checked="true"]) .control {
  border-color: ${tokens.colorCompoundBrandStroke};
  color: ${tokens.colorCompoundBrandForeground1};
}

:host([aria-checked="true"]:not([disabled]):hover) {
  color: ${tokens.colorNeutralForeground1};
}

:host([aria-checked="true"]:not([disabled]):hover) .control {
  border-color: ${tokens.colorCompoundBrandStrokeHover};
  color: ${tokens.colorCompoundBrandForeground1Hover};
}

:host([aria-checked="true"]:not([disabled]):active) .control {
  border-color: ${tokens.colorCompoundBrandStrokePressed};
  color: ${tokens.colorCompoundBrandForeground1Pressed};
}

:host([aria-checked="true"]) slot[name='checked-indicator'] {
  opacity: 1;
}

:host([disabled]) {
  color: ${tokens.colorNeutralForegroundDisabled};
}

:host([disabled]) .control {
  border-color: ${tokens.colorNeutralStrokeDisabled};
  color: ${tokens.colorNeutralForegroundDisabled};
}
  `