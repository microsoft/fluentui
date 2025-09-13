import { css } from '@microsoft/fast-element';
import {
  typographyBody1Styles,
  typographyBody2Styles,
  typographyCaption1Styles,
} from '../styles/partials/typography.partials.js';
import { flipBlockState, openState, placeholderShownState } from '../styles/states/index.js';
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
  colorStrokeFocus1,
  colorStrokeFocus2,
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

  :host([size='small']) .control {
    column-gap: ${spacingHorizontalXXS};
    padding: ${spacingVerticalXS} ${spacingHorizontalSNudge};
    ${typographyCaption1Styles}
  }

  :host([size='large']) .control {
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

  :host([size='small']) :where(slot[name='indicator'] > *, ::slotted([slot='indicator'])) {
    width: 16px;
  }

  :host([size='large']) :where(slot[name='indicator'] > *, ::slotted([slot='indicator'])) {
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

  /**
  * focus-ring style uses lingering :focus-within selector due to platform limitations
  * TODO: Convert selector to \`:host(:has(:focus-visible)) .control\` when browser support increases
  * ISSUE: https://issues.chromium.org/issues/40062355
  */
  :host(:where(:focus-within)) .control {
    border-radius: ${borderRadiusMedium};
    box-shadow: inset 0 0 0 1px ${colorStrokeFocus1};
    outline: ${strokeWidthThick} solid ${colorStrokeFocus2};
  }

  :host(:where(${openState}, :focus-within)) .control::after {
    scale: 1 1;
    transition-duration: ${durationNormal};
    transition-timing-function: ${curveAccelerateMid};
  }

  :host(:where([appearance='outline'], [appearance='transparent'])) .control::before {
    background-color: ${colorNeutralStrokeAccessible};
  }

  :host([appearance='transparent']) .control {
    --control-border-color: ${colorTransparentStrokeInteractive};
    background-color: ${colorTransparentBackground};
    border-radius: ${borderRadiusNone};
  }

  :host([appearance='outline']) .control {
    --control-border-color: ${colorNeutralStroke1};
  }

  :host([appearance='outline']) .control:hover {
    --control-border-color: ${colorNeutralStroke1Hover};
  }

  :host(:where([appearance='outline'], [appearance='transparent'])) .control:hover::before {
    background-color: ${colorNeutralStrokeAccessibleHover};
  }

  :host([appearance='outline']) .control:hover::after {
    background-color: ${colorCompoundBrandBackgroundHover};
  }

  :host([appearance='outline']) .control:active {
    --control-border-color: ${colorNeutralStroke1Pressed};
  }

  :host(:where([appearance='outline'], [appearance='transparent'])) .control:active::before {
    background-color: ${colorNeutralStrokeAccessiblePressed};
  }

  :host(:where([appearance='outline'], [appearance='transparent'])) .control:active::after {
    background-color: ${colorCompoundBrandBackgroundPressed};
  }

  :host([appearance='filled-darker']) .control {
    background-color: ${colorNeutralBackground3};
  }

  :host(:where([appearance='filled-lighter'], [appearance='filled-darker'])) .control {
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

  ::slotted([popover]:not(:popover-open)) {
    display: none;
  }

  @supports not (anchor-name: --anchor) {
    :host {
      --listbox-max-height: 50vh;
      --margin-offset: calc(${lineHeightBase300} + (${spacingVerticalSNudge} * 2) + ${strokeWidthThin});
    }

    :host([size='small']) {
      --margin-offset: calc(${lineHeightBase200} + (${spacingVerticalXS} * 2) + ${strokeWidthThin});
    }

    :host([size='large']) {
      --margin-offset: calc(${lineHeightBase400} + (${spacingVerticalS} * 2) + ${strokeWidthThin});
    }
  }
`;
