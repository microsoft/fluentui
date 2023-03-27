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
  fontSizeBase200,
  fontSizeBase300,
  fontSizeBase400,
  fontSizeBase600,
  fontWeightRegular,
  lineHeightBase200,
  lineHeightBase300,
  lineHeightBase400,
  shadow2,
  spacingHorizontalMNudge,
  spacingHorizontalS,
  spacingHorizontalSNudge,
  spacingHorizontalXS,
  spacingHorizontalXXS,
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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-items: flex-start;
  }

  .label {
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    color: ${colorNeutralForeground1};
    padding-bottom: ${spacingVerticalXS};
  }

  .root {
    height: 32px;
    display: inline-flex;
    align-items: center;
    flex-direction: row;
    width: 100%;
    padding: 0 ${spacingHorizontalMNudge};
    position: relative;
    box-sizing: border-box;
    border: ${strokeWidthThin} solid ${colorNeutralStroke1};
    border-bottom-color: ${colorNeutralStrokeAccessible};
    border-radius: ${borderRadiusMedium};
    gap: ${spacingHorizontalXXS};
  }

  .control {
    width: 100%;
    box-sizing: border-box;
    color: ${colorNeutralForeground1};
    border-radius: ${borderRadiusMedium};
    background: ${colorTransparentBackground};
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    border: none;
    background: transparent;
    vertical-align: center;
  }

  .control:focus-visible {
    outline: 0;
    border: 0;
  }

  .control::placeholder {
    color: ${colorNeutralForeground4};
  }

  :host([input-size='small']) .control {
    font-size: ${fontSizeBase200};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase200};
  }

  :host([input-size='small']) .root {
    height: 24px;
    gap: ${spacingHorizontalXXS};
    padding: 0 ${spacingHorizontalSNudge};
  }

  :host([input-size='small']) ::slotted([slot='start']),
  :host([input-size='small']) ::slotted([slot='end']) {
    font-size: ${fontSizeBase400};
  }

  :host([input-size='large']) .control {
    font-size: ${fontSizeBase400};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase400};
  }

  :host([input-size='large']) .root {
    height: 40px;
    gap: ${spacingHorizontalS};
    padding: 0 ${spacingHorizontalMNudge};
  }

  :host([input-size='large']) ::slotted([slot='start']),
  :host([input-size='large']) ::slotted([slot='end']) {
    font-size: ${fontSizeBase600};
  }

  :host ::slotted([slot='start']),
  :host ::slotted([slot='end']) {
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colorNeutralForeground3};
  }

  :host ::slotted([slot='start']) {
    padding-right: ${spacingHorizontalXXS};
  }

  :host ::slotted([slot='end']) {
    padding-left: ${spacingHorizontalXXS};
    gap: ${spacingHorizontalXS};
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
    border-radius: 0;
    border-bottom: ${strokeWidthThin} solid ${colorNeutralStrokeAccessible};
  }
  :host([appearance='underline']:hover) .root {
    border-bottom: ${strokeWidthThin} solid ${colorNeutralStrokeAccessibleHover};
  }
  :host([appearance='underline']:active) .root {
    border-bottom: ${strokeWidthThin} solid ${colorNeutralStrokeAccessiblePressed};
  }
  :host([appearance='underline']):focus-within .root {
    border: 0;
    border-bottom: ${strokeWidthThin} solid ${colorNeutralStrokeAccessiblePressed};
  }
  :host([appearance='underline'][disabled]) .root {
    border-bottom-color: ${strokeWidthThin} solid ${colorNeutralStrokeDisabled};
  }

  :host([appearance='filledLighter']) .root,
  :host([appearance='filledDarker']) .root {
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    box-shadow: ${shadow2};
  }
  :host([appearance='filledLighter']) .root {
    background: ${colorNeutralBackground1};
  }
  :host([appearance='filledDarker']) .root {
    background: ${colorNeutralBackground3};
  }
  :host([appearance='filledLighter']):hover:not(:active) .root,
  :host([appearance='filledDarker']):hover:not(:active) .root {
    border-color: ${colorTransparentStrokeInteractive};
  }
  :host([appearance='filledLighter']):active .root,
  :host([appearance='filledDarker']):active .root {
    border-color: ${colorTransparentStrokeInteractive};
    background: ${colorNeutralBackground3};
  }

  :host([disabled]) .root {
    background: ${colorTransparentBackground};
    border: ${strokeWidthThin} solid ${colorNeutralStrokeDisabled};
  }
  :host([disabled]) .control::placeholder,
  :host([disabled]) ::slotted([slot='start']),
  :host([disabled]) ::slotted([slot='end']) {
    color: ${colorNeutralForegroundDisabled};
  }

  :host(:focus-within) .root::after {
    transform: scaleX(1);
    transition: transform ${durationNormal} ${curveDecelerateMid};
  }

  :host(:focus-within:active) .root::after {
    border-bottom-color: ${colorCompoundBrandStrokePressed};
  }

  ::selection {
    color: ${colorNeutralForegroundInverted};
    background-color: ${colorNeutralBackgroundInverted};
  }
`;
