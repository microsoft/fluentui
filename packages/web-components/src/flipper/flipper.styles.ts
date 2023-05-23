import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import type { ElementStyles } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorNeutralBackground1,
  colorNeutralBackground1Hover,
  colorNeutralBackground1Pressed,
  colorNeutralBackgroundDisabled,
  colorNeutralForeground1,
  colorNeutralForeground1Hover,
  colorNeutralForeground1Pressed,
  colorNeutralForegroundDisabled,
  colorStrokeFocus2,
  colorSubtleBackground,
  colorSubtleBackgroundHover,
  colorSubtleBackgroundPressed,
  colorTransparentBackground,
  curveEasyEase,
  durationFaster,
  shadow4,
  strokeWidthThin,
} from '../theme/design-tokens.js';

/**
 * Styles for a basic flipper
 * @param context -
 * @param definition -
 * @returns
 */
export const styles: ElementStyles = css`
  ${display('inline-flex')} :host {
    align-items: center;
    justify-content: center;
    background: ${colorNeutralBackground1};
    box-shadow: ${shadow4};
    color: ${colorNeutralForeground1};
    border: ${strokeWidthThin} solid transparent;
    border-radius: ${borderRadiusMedium};
    fill: currentcolor;
    height: 32px;
    width: 16px;
    outline: none;
    transition-duration: ${durationFaster};
    transition-property: background, border, color;
    transition-timing-function: ${curveEasyEase};
    cursor: pointer;
  }

  :host([size='large']) {
    height: 48px;
    width: 24px;
  }

  ::slotted(svg),
  svg {
    height: 16px;
    width: 16px;
  }

  :host([size='large']) ::slotted(svg),
  :host([size='large']) svg {
    height: 20px;
    width: 20px;
  }

  :host([disabled]) {
    background: ${colorNeutralBackgroundDisabled};
    color: ${colorNeutralForegroundDisabled};
    cursor: not-allowed;
    pointer-events: none;
  }

  .next,
  .previous {
    display: flex;
  }

  :host(:not([disabled]):hover) {
    background: ${colorNeutralBackground1Hover};
    color: ${colorNeutralForeground1Hover};
  }

  :host(:not([disabled]):active) {
    background: ${colorNeutralBackground1Pressed};
    color: ${colorNeutralForeground1Pressed};
  }

  :host(:focus-visible) {
    border-color: ${colorStrokeFocus2};
    box-shadow: unset;
  }

  :host(:not([disabled])[inline]) {
    background: ${colorSubtleBackground};
    box-shadow: unset;
  }

  :host(:not([disabled])[inline]:hover) {
    background: ${colorSubtleBackgroundHover};
  }

  :host(:not([disabled])[inline]:active) {
    background: ${colorSubtleBackgroundPressed};
  }

  :host([disabled][inline]) {
    background: ${colorTransparentBackground};
  }
`;
