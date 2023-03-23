import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusMedium,
  colorCompoundBrandStroke,
  colorCompoundBrandStrokePressed,
  colorNeutralBackground1,
  colorNeutralBackground3,
  colorNeutralBackgroundInverted,
  colorNeutralForeground1,
  colorNeutralForeground3,
  colorNeutralForeground4,
  colorNeutralForegroundDisabled,
  colorNeutralForegroundInverted,
  colorNeutralStroke1,
  colorNeutralStroke1Hover,
  colorNeutralStroke1Pressed,
  colorNeutralStrokeAccessible,
  colorNeutralStrokeAccessibleHover,
  colorNeutralStrokeAccessiblePressed,
  colorNeutralStrokeDisabled,
  colorTransparentBackground,
  colorTransparentStroke,
  colorTransparentStrokeInteractive,
  curveAccelerateMid,
  curveDecelerateMid,
  durationNormal,
  durationUltraFast,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  shadow2,
  spacingHorizontalMNudge,
  spacingHorizontalXS,
  spacingHorizontalXXS,
  spacingVerticalS,
  spacingVerticalXS,
  strokeWidthThick,
  strokeWidthThin,
} from '../theme/design-tokens.js';

/** TextInput styles
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

  :host {
    align-items: center;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .label {
    line-height: ${lineHeightBase300};
    font-size: ${fontSizeBase300};
    font-family: ${fontFamilyBase};
    font-weight: ${fontWeightRegular};
    color: ${colorNeutralForeground1};
    padding-bottom: ${spacingVerticalXS};
  }
  .root {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    flex-direction: row;
    border: ${strokeWidthThin} solid ${colorNeutralStroke1};
    border-bottom-color: ${colorNeutralStrokeAccessible};
    border-radius: ${borderRadiusMedium};
    gap: ${spacingHorizontalXXS};
    padding: 0 ${spacingHorizontalMNudge};
    width: 100%;
    position: relative;
  }
  .control {
    box-sizing: border-box;
    height: 32px;
    vertical-align: center;
    background: transparent;
    color: ${colorNeutralForeground1};
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    border-radius: ${borderRadiusMedium};
    background: ${colorTransparentBackground};
    border: none;
    width: 100%;
  }
  .control:focus-visible {
    outline: 0;
    border: 0;
  }
  .control::placeholder {
    color: ${colorNeutralForeground4};
  }
  :host ::slotted([slot='start']) {
    padding-right: ${spacingHorizontalXXS};
  }
  :host ::slotted([slot='end']) {
    padding-left: ${spacingHorizontalXXS};
    gap: ${spacingHorizontalXS};
  }
  :host ::slotted([slot='start']),
  :host ::slotted([slot='end']) {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colorNeutralForeground3};
  }

  :host(:hover) .root {
    border-color: ${colorNeutralStroke1Hover};
    border-bottom-color: ${colorNeutralStrokeAccessibleHover};
  }
  :host(:active) .root {
    border-color: ${colorNeutralStroke1Pressed};
  }

  :host(:focus-within:not([disabled])) .control {
    color: ${colorNeutralForeground1};
  }
  :host(:focus-within:not([disabled])) .root {
    border: ${strokeWidthThin} solid ${colorNeutralStroke1};
    border-bottom-width: ${strokeWidthThick};
  }

  .root::after {
    box-sizing: border-box;
    content: '';
    position: absolute;
    left: -1px;
    bottom: -1px;
    right: -1px;
    height: max(2px, ${borderRadiusMedium});
    border-bottom-left-radius: ${borderRadiusMedium};
    border-bottom-right-radius: ${borderRadiusMedium};
    border-bottom: 2px solid ${colorCompoundBrandStroke};
    clip-path: inset(calc(100% - 2px) 0px 0px);
    transform: scaleX(0);
    transition-property: transform;
    transition-duration: ${durationUltraFast};
    transition-delay: ${curveAccelerateMid};
  }

  .root:focus-within::after {
    transform: scaleX(1);
    transition-property: transform;
    transition-duration: ${durationNormal};
    transition-delay: ${curveDecelerateMid};
  }

  .root:focus-within:active::after {
    border-bottom-color: ${colorCompoundBrandStrokePressed};
  }

  :host([layout='inline']) {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
  }
  :host([layout='inline']) .root,
  :host([layout='inline']) .control {
    width: fit-content;
  }
  :host([layout='inline']) .label {
    padding-inline-end: 12px;
  }

  :host([appearance='underline']) .root {
    background: ${colorTransparentBackground};
    border: 0;
    border-bottom: ${strokeWidthThin} solid ${colorNeutralStrokeAccessible};
  }
  :host([appearance='underline']:hover) .root {
    border-bottom: ${strokeWidthThin} solid ${colorNeutralStrokeAccessibleHover};
  }
  :host([appearance='underline']:active) .root {
    border-bottom: ${strokeWidthThin} solid ${colorNeutralStrokeAccessiblePressed};
  }
  :host([appearance='underline']:focus-within) .root {
    border: 0;
    border-bottom: ${strokeWidthThin} solid ${colorNeutralStrokeAccessiblePressed};
  }
  :host([appearance='underline'][disabled]) .root {
    border-bottom-color: ${strokeWidthThin} solid ${colorNeutralStrokeDisabled};
  }

  :host([appearance='filledLighter']) .root {
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    background: ${colorNeutralBackground1};
    box-shadow: ${shadow2};
  }
  :host([appearance='filledLighter']:hover):not(:active) .root {
    border-color: ${colorTransparentStrokeInteractive};
  }
  :host([appearance='filledLighter']:active) .root {
    border-color: ${colorTransparentStrokeInteractive};
  }

  :host([appearance='filledDarker']) .root {
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    background: ${colorNeutralBackground3};
    box-shadow: ${shadow2};
  }
  :host([appearance='filledDarker']:hover):not(:active) .root {
    border-color: ${colorTransparentStrokeInteractive};
  }
  :host([appearance='filledDarker']:active) .root {
    border-color: ${colorTransparentStrokeInteractive};
    background: ${colorNeutralBackground3};
  }

  :host([disabled]) .root {
    background: ${colorTransparentBackground};
    border: ${strokeWidthThin} solid ${colorNeutralStrokeDisabled};
  }
  :host([disabled]) .control::placeholder {
    color: ${colorNeutralForegroundDisabled};
  }
  :host([disabled]) .control::placeholder,
  :host([disabled]) ::slotted([slot='start']),
  :host([disabled]) ::slotted([slot='end']) {
    color: ${colorNeutralForegroundDisabled};
  }

  ::selection {
    color: ${colorNeutralForegroundInverted};
    background-color: ${colorNeutralBackgroundInverted};
  }
`;
