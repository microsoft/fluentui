import { css } from '@microsoft/fast-element';
import {
  typographyBody1Styles,
  typographyBody2Styles,
  typographyCaption1Styles,
} from '../styles/partials/typography.partials.js';
import { largeState, openState, smallState } from '../styles/states/index.js';
import {
  borderRadiusMedium,
  colorCompoundBrandBackgroundHover,
  colorCompoundBrandStroke,
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorNeutralStroke1,
  colorNeutralStroke1Hover,
  colorNeutralStroke1Pressed,
  colorNeutralStrokeAccessible,
  colorNeutralStrokeAccessibleHover,
  colorNeutralStrokeAccessiblePressed,
  curveAccelerateMid,
  curveDecelerateMid,
  durationNormal,
  durationUltraFast,
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
    box-sizing: border-box;
    color: ${colorNeutralForeground1};
    cursor: pointer;
    position: relative;
  }

  .popover {
    background: transparent;
    border: none;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    inset: unset;
    margin: 0;
    min-width: 160px;
    overflow: visible;
    padding: 0;
    position: absolute;
    z-index: 1;
  }

  .popover:not(:popover-open) {
    display: none;
  }

  .popover:popover-open {
    position-anchor: --dropdown-trigger;
    position-area: block-end span-inline-end;
    position-try-fallbacks: flip-inline, flip-block, block-start;
    width: anchor-size(width);
  }

  @supports not (position-anchor: --dropdown-trigger) {
    .popover:popover-open {
      margin-block-start: 32px;
    }
  }

  .control {
    --bottom-border-color: ${colorNeutralStrokeAccessible};
    --control-border-color: ${colorNeutralStroke1};
    align-items: center;
    anchor-name: --dropdown-trigger;
    appearance: none;
    background: ${colorNeutralBackground1};
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
    cursor: default;
    flex: 1;
  }

  ::slotted(button) {
    cursor: pointer;
  }

  .control:hover {
    --control-border-color: ${colorNeutralStroke1Hover};
  }

  .control:active {
    --control-border-color: ${colorNeutralStroke1Pressed};
  }

  .control::after,
  .control::before {
    content: '' / '';
    height: 100%;
    inset: auto 0 0;
    pointer-events: none;
    position: absolute;
  }

  .control::before {
    background-color: var(--bottom-border-color);
    height: ${strokeWidthThin};
  }

  .control::after {
    background-color: ${colorCompoundBrandStroke};
    height: ${strokeWidthThick};
    scale: 0 1;
    transition: scale ${durationUltraFast} ${curveDecelerateMid};
  }

  .control:hover::before {
    background-color: ${colorNeutralStrokeAccessibleHover};
  }

  .control:hover::after {
    background-color: ${colorCompoundBrandBackgroundHover};
  }

  .control:active::before {
    background-color: ${colorNeutralStrokeAccessiblePressed};
  }

  .control:active::after {
    scale: 0.5 1;
  }

  :host(:is(${openState}, :focus-within)) .control::after {
    scale: 1 1;
    transition-duration: ${durationNormal};
    transition-timing-function: ${curveAccelerateMid};
  }

  ::slotted([slot='indicator']) {
    all: unset;
    appearance: none;
    border: none;
    background: transparent;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    aspect-ratio: 1;
  }

  :host(${smallState}) ::slotted([slot='indicator']) {
    width: 16px;
  }

  :host(${largeState}) ::slotted([slot='indicator']) {
    width: 24px;
  }
`;
