import type { ElementStyles } from '@microsoft/fast-element';
import { css } from '@microsoft/fast-element';
import {
  borderRadiusMedium,
  colorCompoundBrandStroke,
  colorNeutralBackground1,
  colorNeutralBackground3,
  colorNeutralBackgroundInverted,
  colorNeutralForeground1,
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
  colorPaletteRedBorder2,
  colorTransparentBackground,
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
  shadow2,
  spacingHorizontalM,
  spacingHorizontalMNudge,
  spacingHorizontalSNudge,
  spacingHorizontalXXS,
  spacingVerticalS,
  spacingVerticalSNudge,
  spacingVerticalXS,
  strokeWidthThin,
} from '../theme/design-tokens.js';
import { display } from '../utils/display.js';
import {
  autoResizeState,
  blockState,
  displayShadowState,
  filledDarkerState,
  filledLighterState,
  largeState,
  placeholderShownState,
  resizeBothState,
  resizedState,
  resizeHorizontalState,
  resizeState,
  resizeVerticalState,
  smallState,
} from '../styles/states/index.js';

/**
 * Styles for the TextArea component.
 *
 * @public
 */
export const styles: ElementStyles = css`
  ${display('inline-grid')}

  :host {
    /* typography */
    --font-size: ${fontSizeBase300};
    --line-height: ${lineHeightBase300};

    /* sizing and spacing */
    --padding-inline: ${spacingHorizontalMNudge};
    --padding-block: ${spacingVerticalSNudge};
    --min-block-size: 52px;
    --max-block-size: 260px;
    --max-inline-size: 100%;
    --block-size: auto;
    --inline-size: 18rem;
    --border-width: ${strokeWidthThin};
    --textbox-padding-inline: ${spacingHorizontalXXS};
    --textbox-block-size: auto;
    --textbox-inline-size: auto;

    /* colors */
    --color: ${colorNeutralForeground1};
    --background-color: ${colorNeutralBackground1};
    --border-color: ${colorNeutralStroke1};
    --border-block-end-color: ${colorNeutralStrokeAccessible};
    --placeholder-color: transparent;
    --resize-color: var(--color);

    /* elevations */
    --box-shadow: none;

    background-color: var(--background-color);
    border: var(--border-width) solid var(--border-color);
    border-block-end-color: var(--border-block-end-color);
    border-radius: ${borderRadiusMedium};
    box-sizing: border-box;
    box-shadow: var(--box-shadow);
    color: var(--color);
    font-family: ${fontFamilyBase};
    font-size: var(--font-size);
    font-weight: ${fontWeightRegular};
    grid-template: 1fr / 1fr;
    line-height: var(--line-height);
    max-inline-size: var(--max-inline-size);
    min-block-size: var(--min-block-size);
    max-block-size: var(--max-block-size);
    inline-size: var(--inline-size);
    block-size: var(--block-size);
    padding: var(--padding-block) var(--padding-inline);
    position: relative;
  }

  :host(:hover) {
    --border-color: ${colorNeutralStroke1Hover};
    --border-block-end-color: ${colorNeutralStrokeAccessibleHover};
  }

  :host(:active) {
    --border-color: ${colorNeutralStroke1Pressed};
    --border-block-end-color: ${colorNeutralStrokeAccessiblePressed};
  }

  :host(:focus-within) {
    outline: transparent solid 2px;
  }

  :host(${blockState}) {
    display: grid;
    inline-size: auto;
  }

  :host(${smallState}) {
    --font-size: ${fontSizeBase200};
    --line-height: ${lineHeightBase200};
    --min-block-size: 40px;
    --max-block-size: 200px;
    --padding-block: ${spacingVerticalXS};
    --padding-inline: ${spacingHorizontalSNudge};
    --textbox-padding-inline: ${spacingHorizontalXXS};
  }

  :host(${largeState}) {
    --font-size: ${fontSizeBase400};
    --line-height: ${lineHeightBase400};
    --min-block-size: 64px;
    --max-block-size: 320px;
    --padding-block: ${spacingVerticalS};
    --padding-inline: ${spacingHorizontalM};
    --textbox-padding-inline: ${spacingHorizontalSNudge};
  }

  :host(${resizeState}) {
    --max-block-size: none;
  }

  :host(${resizedState}) {
    --max-inline-size: none;
    --inline-size: auto;
    --max-block-size: none;
  }

  :host(${autoResizeState}) {
    --max-block-size: none;
  }

  :host(${filledDarkerState}) {
    --background-color: ${colorNeutralBackground3};
    --border-color: var(--background-color);
    --border-block-end-color: var(--border-color);
  }

  :host(${filledLighterState}) {
    --border-color: var(--background-color);
    --border-block-end-color: var(--border-color);
  }

  /* TODO */
  :host(${filledDarkerState}${displayShadowState}),
  :host(${filledLighterState}${displayShadowState}) {
    --box-shadow: ${shadow2};
  }

  :host(${placeholderShownState}) {
    --placeholder-color: ${colorNeutralForeground4};
  }

  :host(:invalid) {
    --border-color: ${colorPaletteRedBorder2};
    --border-block-end-color: ${colorPaletteRedBorder2};
  }

  :host(:disabled) {
    --color: ${colorNeutralForegroundDisabled};
    --background-color: ${colorTransparentBackground};
    --border-color: ${colorNeutralStrokeDisabled};
    --border-block-end-color: var(--border-color);
    --box-shadow: none;
    --placeholder-color: ${colorNeutralForegroundDisabled};
    --resize-color: ${colorNeutralStrokeDisabled};

    cursor: no-drop;
    user-select: none;
  }

  :host::after {
    border-bottom: 2px solid ${colorCompoundBrandStroke};
    border-radius: 0 0 ${borderRadiusMedium} ${borderRadiusMedium};
    box-sizing: border-box;
    clip-path: inset(calc(100% - 2px) 1px 0px);
    content: '';
    height: max(2px, ${borderRadiusMedium});
    inset: auto -1px -1px;
    position: absolute;
    transform: scaleX(0);
    transition-delay: ${curveAccelerateMid};
    transition-duration: ${durationUltraFast};
    transition-property: transform;
  }

  :host(:focus-within)::after {
    transform: scaleX(1);
    transition-property: transform;
    transition-duration: ${durationNormal};
    transition-delay: ${curveDecelerateMid};
  }

  :host([readonly])::after,
  :host(:disabled)::after {
    content: none;
  }

  ::selection {
    color: ${colorNeutralForegroundInverted};
    background-color: ${colorNeutralBackgroundInverted};
  }

  .textbox,
  .placeholder {
    box-sizing: border-box;
    grid-column: 1 / -1;
    grid-row: 1 / -1;
    block-size: var(--textbox-block-size);
    inline-size: var(--textbox-inline-size);
    padding-inline: var(--textbox-padding-inline);
    overflow-wrap: break-word; /* Needed for Firefox */
  }

  .textbox {
    overflow: auto;
    outline: 0;
  }

  .placeholder {
    color: var(--placeholder-color);
  }

  .resize {
    --tooth-rotate: -45deg;
    --tooth-left-offset-factor: 1;

    appearance: none;
    background: transparent;
    border: 0;
    display: none;
    padding: 0;
    position: absolute;
    inset-block-end: 0;
    inset-inline-end: 0;
    block-size: 1rem;
    inline-size: 1rem;
    touch-action: none;
  }

  .resize:disabled {
    pointer-events: none;
  }

  :host(:dir(rtl)) .resize {
    --tooth-rotate: 45deg;
    --tooth-left-offset-factor: -1;
  }

  .resize::before,
  .resize::after {
    background-color: var(--resize-color);
    content: '';
    height: 1px;
    position: absolute;
    transform: translate(-50%, -50%) rotate(var(--tooth-rotate));
  }

  .resize::before {
    top: calc(50% + 1px);
    left: calc(50% + 1px * var(--tooth-left-offset-factor));
    width: 10px;
  }

  .resize::after {
    top: calc(50% + 3px);
    left: calc(50% + 3px * var(--tooth-left-offset-factor));
    width: 6px;
  }

  :host(${resizeState}) .resize {
    display: block;
  }

  :host(${resizeBothState}) .resize:not(:disabled) {
    cursor: nwse-resize;
  }

  :host(${resizeBothState}:dir(rtl)) .resize:not(:disabled) {
    cursor: nesw-resize;
  }

  :host(${resizeHorizontalState}) .resize:not(:disabled) {
    cursor: ew-resize;
  }

  :host(${resizeVerticalState}) .resize:not(:disabled) {
    cursor: ns-resize;
  }
`;
