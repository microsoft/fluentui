import { css } from '@microsoft/fast-element';
import {
  typographyBody1Styles,
  typographyBody2Styles,
  typographyCaption1Styles,
} from '../styles/partials/typography.partials.js';
import {
  filledDarkerState,
  filledLighterState,
  flipBlockState,
  largeState,
  openState,
  outlineState,
  placeholderShownState,
  smallState,
  transparentState,
} from '../styles/states/index.js';
import {
  borderRadiusMedium,
  borderRadiusNone,
  colorCompoundBrandBackgroundHover,
  colorCompoundBrandBackgroundPressed,
  colorCompoundBrandStroke,
  colorNeutralBackground1,
  colorNeutralBackground3,
  colorNeutralBackgroundDisabled,
  colorNeutralForeground1,
  colorNeutralForeground3,
  colorNeutralForeground4,
  colorNeutralForegroundDisabled,
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
  lineHeightBase200,
  lineHeightBase300,
  lineHeightBase400,
  spacingHorizontalM,
  spacingHorizontalMNudge,
  spacingHorizontalS,
  spacingHorizontalSNudge,
  spacingHorizontalXXS,
  spacingVerticalS,
  spacingVerticalSNudge,
  spacingVerticalXS,
  strokeWidthThick,
  strokeWidthThin,
} from '../theme/design-tokens.js';
import { display } from '../utils/display.js';

/**
 * Styles for the {@link (Dropdown:class)} component.
 *
 * @public
 */
export const styles = css`
  ${display('inline-flex')}

  :host {
    anchor-name: --dropdown-trigger;
    box-sizing: border-box;
    color: ${colorNeutralForeground1};
    cursor: pointer;
  }

  :host(${placeholderShownState}) {
    color: ${colorNeutralForeground4};
  }

  .control {
    appearance: none;
    background-color: ${colorNeutralBackground1};
    border-radius: ${borderRadiusMedium};
    border: none;
    box-shadow: inset 0 0 0 ${strokeWidthThin} var(--control-border-color);
    box-sizing: border-box;
    color: inherit;
    column-gap: ${spacingHorizontalXXS};
    display: inline-flex;
    justify-content: space-between;
    min-width: 160px;
    overflow: hidden;
    padding: ${spacingVerticalSNudge} ${spacingHorizontalMNudge};
    position: relative;
    text-align: start;
    width: 100%;
    z-index: 1;
    ${typographyBody1Styles}
  }

  :host(${smallState}) .control {
    column-gap: ${spacingHorizontalXXS};
    padding: ${spacingVerticalXS} ${spacingHorizontalSNudge};
    ${typographyCaption1Styles}
  }

  :host(${largeState}) .control {
    column-gap: ${spacingHorizontalS};
    padding: ${spacingVerticalS} ${spacingHorizontalM};
    ${typographyBody2Styles}
  }

  ::slotted(:is(input, button)) {
    all: unset;
    flex: 1 1 auto;
  }

  ::slotted(button) {
    cursor: pointer;
  }

  ::slotted(input) {
    cursor: text;
  }

  :where(slot[name='indicator'] > *, ::slotted([slot='indicator'])) {
    all: unset;
    align-items: center;
    appearance: none;
    aspect-ratio: 1;
    color: ${colorNeutralForeground3};
    display: inline-flex;
    justify-content: center;
    width: 20px;
  }

  :host(${smallState}) :where(slot[name='indicator'] > *, ::slotted([slot='indicator'])) {
    width: 16px;
  }

  :host(${largeState}) :where(slot[name='indicator'] > *, ::slotted([slot='indicator'])) {
    width: 24px;
  }

  .control::after,
  .control::before {
    content: '' / '';
    inset: auto 0 0;
    pointer-events: none;
    position: absolute;
  }

  .control::before {
    height: ${strokeWidthThin};
  }

  .control::after {
    background-color: ${colorCompoundBrandStroke};
    height: ${strokeWidthThick};
    scale: 0 1;
    transition: scale ${durationUltraFast} ${curveDecelerateMid};
  }

  :host(:where(${openState}, :focus-within)) .control::after {
    scale: 1 1;
    transition-duration: ${durationNormal};
    transition-timing-function: ${curveAccelerateMid};
  }

  :host(:where(${outlineState}, ${transparentState})) .control::before {
    background-color: ${colorNeutralStrokeAccessible};
  }

  :host(${transparentState}) .control {
    --control-border-color: ${colorTransparentStrokeInteractive};
    background-color: ${colorTransparentBackground};
    border-radius: ${borderRadiusNone};
  }

  :host(${outlineState}) .control {
    --control-border-color: ${colorNeutralStroke1};
  }

  :host(${outlineState}) .control:hover {
    --control-border-color: ${colorNeutralStroke1Hover};
  }

  :host(:where(${outlineState}, ${transparentState})) .control:hover::before {
    background-color: ${colorNeutralStrokeAccessibleHover};
  }

  :host(${outlineState}) .control:hover::after {
    background-color: ${colorCompoundBrandBackgroundHover};
  }

  :host(${outlineState}) .control:active {
    --control-border-color: ${colorNeutralStroke1Pressed};
  }

  :host(:where(${outlineState}, ${transparentState})) .control:active::before {
    background-color: ${colorNeutralStrokeAccessiblePressed};
  }

  :host(:where(${outlineState}, ${transparentState})) .control:active::after {
    background-color: ${colorCompoundBrandBackgroundPressed};
  }

  :host(${filledDarkerState}) .control {
    background-color: ${colorNeutralBackground3};
  }

  :host(:where(${filledLighterState}, ${filledDarkerState})) .control {
    --control-border-color: ${colorTransparentStroke};
  }

  :host(:disabled),
  :host(:disabled) ::slotted(:where(button, input)) {
    cursor: not-allowed;
  }

  :host(:disabled) .control::before,
  :host(:disabled) .control::after {
    content: none;
  }

  :host(:disabled) .control:is(*, :active, :hover),
  :host(:disabled) :where(slot[name='indicator'] > *, ::slotted([slot='indicator'])) {
    --control-border-color: ${colorNeutralStrokeDisabled};
    background-color: ${colorNeutralBackgroundDisabled};
    color: ${colorNeutralForegroundDisabled};
  }

  ::slotted([popover]) {
    inset: unset;
    position: absolute;
    position-anchor: --dropdown-trigger;
    position-area: block-end span-inline-end;
    position-try-fallbacks: flip-inline, flip-block, block-start;
    max-height: var(--listbox-max-height, calc(50vh - anchor-size(self-block)));
    min-width: anchor-size(width);
    overflow: auto;
  }

  ::slotted([popover]:not(:popover-open)) {
    display: none;
  }

  @supports not (anchor-name: --anchor) {
    ::slotted([popover]) {
      margin-block-start: calc(${lineHeightBase300} + (${spacingVerticalSNudge} * 2) + ${strokeWidthThin});
      max-height: 50vh;
    }

    :host(${smallState}) ::slotted([popover]) {
      margin-block-start: calc(${lineHeightBase200} + (${spacingVerticalXS} * 2) + ${strokeWidthThin});
    }

    :host(${largeState}) ::slotted([popover]) {
      margin-block-start: calc(${lineHeightBase400} + (${spacingVerticalS} * 2) + ${strokeWidthThin});
    }

    :host(${flipBlockState}) ::slotted([popover]) {
      margin-block-start: revert;
      transform: translate(0, -100%);
    }
  }
`;
