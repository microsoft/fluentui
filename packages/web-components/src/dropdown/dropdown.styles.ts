import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusMedium,
  borderRadiusNone,
  colorCompoundBrandBackground,
  colorCompoundBrandStroke,
  colorNeutralBackground1,
  colorNeutralBackground3,
  colorNeutralForeground1,
  colorNeutralForeground2,
  colorNeutralForeground3,
  colorNeutralForegroundDisabled,
  colorNeutralForegroundInverted,
  colorNeutralStroke1,
  colorNeutralStrokeAccessible,
  colorTransparentBackground,
  colorTransparentStroke,
  curveAccelerateMid,
  curveDecelerateMid,
  durationNormal,
  durationUltraFast,
  fontFamilyBase,
  fontSizeBase200,
  fontSizeBase300,
  fontSizeBase400,
  fontWeightRegular,
  lineHeightBase200,
  lineHeightBase300,
  lineHeightBase400,
  shadow16,
  shadow2,
  spacingHorizontalM,
  spacingHorizontalS,
  spacingHorizontalSNudge,
  spacingHorizontalXS,
  spacingHorizontalXXS,
  spacingVerticalXS,
  spacingVerticalXXS,
  strokeWidthThick,
  strokeWidthThin,
} from '../theme/design-tokens.js';

/** Dropdown styles
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

  :host {
    background: ${colorNeutralBackground1};
    border-radius: ${borderRadiusMedium};
    border: ${strokeWidthThin} solid ${colorNeutralStroke1};
    border-bottom-color: ${colorNeutralStrokeAccessible};
    color: ${colorNeutralForeground1};
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-weight: ${fontWeightRegular};
    height: 32px;
    position: relative;
    user-select: none;
    outline: none;
    vertical-align: middle;
    min-width: 250px;
  }
  :host([disabled]) {
    color: ${colorNeutralForegroundDisabled};
    background: ${colorTransparentBackground};
  }

  :host([disabled]) .selected-value {
    color: ${colorNeutralForegroundDisabled};
  }

  :host .control::after {
    content: '';
    position: absolute;
    left: -1px;
    bottom: 0px;
    right: -1px;
    height: max(${strokeWidthThick}, ${borderRadiusMedium});
    border-radius: 0 0 ${borderRadiusMedium} ${borderRadiusMedium};
    border-bottom: ${strokeWidthThick} solid ${colorCompoundBrandStroke};
    clip-path: inset(calc(100% - 2px) 1px 0px);
    transform: scaleX(0);
    transition-property: transform;
    transition-duration: ${durationUltraFast};
    transition-delay: ${curveAccelerateMid};
  }
  :host(:focus-within) .control::after {
    transform: scaleX(1);
    transition-property: transform;
    transition-duration: ${durationNormal};
    transition-delay: ${curveDecelerateMid};
  }
  :host([multiple])::not([size]) .listbox {
    height: fit-content;
  }
  :host([size='0']) .listbox {
    height: fit-content;
  }

  :host ::slotted(fluent-option) {
    padding-inline: ${spacingHorizontalS};
  }

  :host([control-size='small']) {
    height: 24px;
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    --icon-size: 16px;
  }
  :host([control-size='small']) ::slotted(fluent-option) {
    height: 24px;
    padding-inline: ${spacingHorizontalSNudge};
  }

  :host([control-size='large']) {
    height: 40px;
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
    --icon-size: 24px;
    --large-content-padding: 0 ${spacingHorizontalSNudge};
  }
  :host([control-size='large']) ::slotted(fluent-option) {
    height: 40px;
    padding-inline: ${spacingHorizontalM};
  }

  .listbox {
    box-sizing: border-box;
    border: none;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    position: fixed;
    top: 5px;
    z-index: 1;
    height: var(--height, fit-content);
    overflow-y: auto;
    padding: ${spacingVerticalXS} ${spacingHorizontalXS};
    box-shadow: ${shadow16};
    border-radius: ${borderRadiusMedium};
    background: ${colorNeutralBackground1};
    min-width: 160px;
    row-gap: ${spacingVerticalXXS};
  }
  .selected-value {
    flex: 1 1 auto;
    font-family: inherit;
    overflow: hidden;
    text-align: start;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: ${spacingHorizontalXS};
    color: var(--placeholder-visible, ${colorNeutralForeground1});
  }
  .indicator {
    display: flex;
    color: ${colorNeutralForeground3};
  }
  .control {
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    min-height: 100%;
    width: 100%;
    padding: 0 var(--spacingHorizontalSNudge);
  }
  .control + .listbox {
    max-height: 300px;
  }
  .listbox[hidden] {
    display: none;
  }

  :host([style-sizes='small']) {
    height: 24px;
    padding: 0 ${spacingHorizontalSNudge};
    font-size: ${fontSizeBase200};
    line-height: ${lineHeightBase200};
    font: ${fontSizeBase200} / ${lineHeightBase200} ${fontFamilyBase};
  }

  :host([style-sizes='small']) .selected-value {
    padding: 0 ${spacingHorizontalXXS};
  }

  :host([appearance='underline']) {
    background: ${colorTransparentBackground};
    border-color: ${colorTransparentStroke};
    border-bottom-color: ${colorNeutralStroke1};
    border-radius: ${borderRadiusNone};
  }

  :host([appearance='underline'])::after {
    height: 0;
  }

  :host([appearance='filled-darker']) {
    background: ${colorNeutralBackground3};
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    border-bottom: ${strokeWidthThin} solid ${colorNeutralStroke1};
    box-shadow: ${shadow2};
  }

  :host([appearance='filled-lighter']) {
    background: ${colorNeutralBackground1};
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    box-shadow: ${shadow2};
  }

  :host([size='0']) .listbox {
    max-height: none;
  }

  :host([disabled]) {
    cursor: auto;
    user-select: none;
  }

  :host(:not([multiple])) {
    --checkmark-border: 0 none;
    --checkmark-size: ${fontSizeBase400};
    --checkmark-color: ${colorNeutralForeground2};
    --checkmark-background: ${colorTransparentBackground};
    --checkmark-selected-background: ${colorTransparentBackground};
  }

  :host([multiple]) {
    --checkmark-border: 1px solid ${colorNeutralStrokeAccessible};
    --checkmark-size: ${fontSizeBase300};
    --checkmark-color: ${colorNeutralForegroundInverted};
    --checkmark-background: ${colorTransparentBackground};
    --checkmark-selected-background: ${colorCompoundBrandBackground};
  }
`;
