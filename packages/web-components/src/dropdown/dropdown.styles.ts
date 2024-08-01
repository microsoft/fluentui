import { css } from '@microsoft/fast-element';
import { typographyBody1Styles, typographyCaption1Styles } from '../styles/partials/typography.partials.js';
import {
  filledDarkerState,
  filledLighterState,
  largeState,
  mediumState,
  outlineState,
  placeholderVisibleState,
  smallState,
  transparentState,
} from '../styles/states/index.js';
import {
  borderRadiusMedium,
  colorCompoundBrandBackgroundHover,
  colorCompoundBrandBackgroundPressed,
  colorCompoundBrandStroke,
  colorNeutralBackground1,
  colorNeutralBackground3,
  colorNeutralForeground1,
  colorNeutralForeground3,
  colorNeutralForeground4,
  colorNeutralStroke1,
  colorNeutralStroke1Hover,
  colorNeutralStroke1Pressed,
  colorNeutralStrokeAccessible,
  colorNeutralStrokeAccessibleHover,
  colorNeutralStrokeAccessiblePressed,
  colorTransparentBackground,
  colorTransparentStroke,
  curveAccelerateMid,
  curveDecelerateMid,
  durationNormal,
  durationUltraFast,
  shadow16,
  spacingHorizontalM,
  spacingHorizontalMNudge,
  spacingHorizontalSNudge,
  spacingHorizontalXS,
  spacingHorizontalXXS,
  spacingVerticalSNudge,
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
    color: ${colorNeutralForeground1};
    box-sizing: border-box;
    position: relative;
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
    overflow: hidden;
    box-sizing: border-box;
    color: inherit;
    column-gap: ${spacingHorizontalXXS};
    cursor: pointer;
    display: inline-flex;
    min-height: 32px;
    justify-content: space-between;
    width: 100%;
    padding-inline: ${spacingHorizontalMNudge};
    padding-block: ${spacingVerticalSNudge};
    position: relative;
    text-align: start;
    ${typographyBody1Styles}
  }

  .control:hover {
    --control-border-color: ${colorNeutralStroke1Hover};
  }

  .control:active {
    --control-border-color: ${colorNeutralStroke1Pressed};
  }

  .control:focus-visible {
    outline: none;
  }

  .control::after,
  .control::before {
    content: '' / '';
    height: 100%;
    inset: auto 0 0;
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
    transition: scale ${durationUltraFast} ${curveAccelerateMid};
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

  :host(${outlineState}) .control:active::after {
    background-color: ${colorCompoundBrandBackgroundPressed};
  }

  :host(:focus-within) .control::after,
  .control:focus::after {
    scale: 1 1;
    transition-duration: ${durationNormal};
    transition-delay: ${curveDecelerateMid};
  }

  .indicator {
    color: ${colorNeutralForeground3};
  }

  .indicator * {
    fill: currentColor;
  }

  ::slotted([slot='indicator']),
  slot[name='indicator'] > * {
    flex: 0 0 auto;
    height: 20px;
    margin-inline-start: auto;
    width: 20px;
  }

  :host(${smallState}) .control {
    ${typographyCaption1Styles}
    height: 24px;
    padding-inline: ${spacingHorizontalSNudge};
    padding-block: ${spacingVerticalSNudge};
  }

  :host(${largeState}) .control {
    column-gap: ${spacingHorizontalMNudge};
    ${typographyBody1Styles}
    height: 40px;
    padding-inline: ${spacingHorizontalM};
    padding-block: ${spacingVerticalSNudge};
  }

  :host(${smallState}) ::slotted([slot='indicator']),
  :host(${smallState}) slot[name='indicator'] > * {
    aspect-ratio: 1;
    width: 16px;
  }

  :host(${smallState}) .indicator > *:not(.chevron-down-16-regular),
  :host(${largeState}) .indicator > *:not(.chevron-down-24-regular),
  :host(${mediumState}) .indicator > *:not(.chevron-down-20-regular) {
    display: none !important;
  }

  .listbox[popover] {
    background-color: ${colorNeutralBackground1};
    border-radius: ${borderRadiusMedium};
    border: none;
    box-shadow: ${shadow16};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    inset: unset;
    margin: 0;
    max-height: var(--menu-max-height, auto);
    min-width: 160px;
    padding: ${spacingHorizontalXS};
    position: absolute;
    row-gap: ${spacingHorizontalXXS};
    z-index: 1;
  }

  .listbox:not(:popover-open) {
    display: none;
  }

  .listbox:popover-open {
    inset-area: block-end span-inline-end;
    position-anchor: --dropdown-trigger;
    position-try-options: flip-inline, flip-block, inset-area(block-start);
    width: anchor-size(width);
  }

  @supports not (position-anchor: --dropdown-trigger) {
    .listbox:popover-open {
      margin-block-start: 32px;
    }
  }

  :host(${placeholderVisibleState}) .control {
    color: ${colorNeutralForeground4};
  }

  :host(${filledDarkerState}) .control {
    background-color: ${colorNeutralBackground3};
  }

  :host(${filledLighterState}) .control {
    background-color: ${colorNeutralBackground1};
  }

  :host(${transparentState}) .control {
    --control-border-color: ${colorTransparentStroke};
    background-color: ${colorTransparentBackground};
    border-radius: 0;
  }
`;
