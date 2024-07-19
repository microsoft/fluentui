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
  resizeHorizontalState,
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

    /* layout */
    --padding-inline: ${spacingHorizontalMNudge};
    --padding-block: ${spacingVerticalSNudge};
    --min-block-size: 52px;
    --block-size: var(--min-block-size);
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

    /* elevations */
    --box-shadow: none;

    --contain-size: size;

    background-color: var(--background-color);
    border: var(--border-width) solid var(--border-color);
    border-block-end-color: var(--border-block-end-color);
    border-radius: ${borderRadiusMedium};
    box-sizing: border-box;
    box-shadow: var(--box-shadow);
    color: var(--color);
    contain: paint layout style var(--contain-size);
    font-family: ${fontFamilyBase};
    font-size: var(--font-size);
    font-weight: ${fontWeightRegular};
    grid-template: 1fr / 1fr;
    line-height: var(--line-height);
    inline-size: var(--inline-size);
    min-block-size: var(--min-block-size);
    block-size: var(--block-size);
    overflow: hidden;
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
    --padding-block: ${spacingVerticalXS};
    --padding-inline: ${spacingHorizontalSNudge};
    --textbox-padding-inline: ${spacingHorizontalXXS};
  }

  :host(${largeState}) {
    --font-size: ${fontSizeBase400};
    --line-height: ${lineHeightBase400};
    --min-block-size: 64px;
    --padding-block: ${spacingVerticalS};
    --padding-inline: ${spacingHorizontalM};
    --textbox-padding-inline: ${spacingHorizontalSNudge};
  }

  :host(${resizeBothState}:not(:disabled)) {
    resize: both;
  }

  :host(${resizeHorizontalState}:not(:disabled)) {
    resize: horizontal;
  }

  :host(${resizeVerticalState}:not(:disabled)) {
    resize: vertical;
  }

  :host(${autoResizeState}) {
    --block-size: auto;
    --contain-size: inline-size;
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
    inset: auto -1px 0;
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
`;
