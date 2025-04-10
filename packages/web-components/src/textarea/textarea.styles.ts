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
  spacingHorizontalXS,
  spacingHorizontalXXS,
  spacingVerticalS,
  spacingVerticalSNudge,
  spacingVerticalXS,
  strokeWidthThin,
} from '../theme/design-tokens.js';
import { forcedColorsStylesheetBehavior } from '../utils/behaviors/match-media-stylesheet-behavior.js';
import { display } from '../utils/display.js';
import { userInvalidState } from '../styles/states/index.js';

/**
 * Styles for the TextArea component.
 *
 * @public
 */
export const styles: ElementStyles = css`
  ${display('inline-block')}

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
    --control-padding-inline: ${spacingHorizontalXXS};

    /* colors */
    --color: ${colorNeutralForeground1};
    --background-color: ${colorNeutralBackground1};
    --border-color: ${colorNeutralStroke1};
    --border-block-end-color: ${colorNeutralStrokeAccessible};
    --placeholder-color: ${colorNeutralForeground4};
    --focus-indicator-color: ${colorCompoundBrandStroke};

    /* elevations */
    --box-shadow: none;

    /* others */
    --contain-size: size;
    --resize: none;

    color: var(--color);
    font-family: ${fontFamilyBase};
    font-size: var(--font-size);
    font-weight: ${fontWeightRegular};
    line-height: var(--line-height);
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
    outline: none;
  }

  :host([block]:not([hidden])) {
    display: block;
  }

  :host([size='small']) {
    --font-size: ${fontSizeBase200};
    --line-height: ${lineHeightBase200};
    --min-block-size: 40px;
    --padding-block: ${spacingVerticalXS};
    --padding-inline: ${spacingHorizontalSNudge};
    --control-padding-inline: ${spacingHorizontalXXS};
  }

  :host([size='large']) {
    --font-size: ${fontSizeBase400};
    --line-height: ${lineHeightBase400};
    --min-block-size: 64px;
    --padding-block: ${spacingVerticalS};
    --padding-inline: ${spacingHorizontalM};
    --control-padding-inline: ${spacingHorizontalSNudge};
  }

  :host([resize='both']:not(:disabled)) {
    --resize: both;
  }

  :host([resize='horizontal']:not(:disabled)) {
    --resize: horizontal;
  }

  :host([resize='vertical']:not(:disabled)) {
    --resize: vertical;
  }

  :host([auto-resize]) {
    --block-size: auto;
    --contain-size: inline-size;
  }

  :host([appearance='filled-darker']) {
    --background-color: ${colorNeutralBackground3};
    --border-color: var(--background-color);
    --border-block-end-color: var(--border-color);
  }

  :host([appearance='filled-lighter']) {
    --border-color: var(--background-color);
    --border-block-end-color: var(--border-color);
  }

  :host([appearance='filled-darker'][display-shadow]),
  :host([appearance='filled-lighter'][display-shadow]) {
    --box-shadow: ${shadow2};
  }

  :host(${userInvalidState}) {
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

  .root {
    background-color: var(--background-color);
    border: var(--border-width) solid var(--border-color);
    border-block-end-color: var(--border-block-end-color);
    border-radius: ${borderRadiusMedium};
    box-sizing: border-box;
    box-shadow: var(--box-shadow);
    contain: paint layout style var(--contain-size);
    display: grid;
    grid-template: 1fr / 1fr;
    inline-size: var(--inline-size);
    min-block-size: var(--min-block-size);
    block-size: var(--block-size);
    overflow: hidden;
    padding: var(--padding-block) var(--padding-inline);
    position: relative;
    resize: var(--resize);
  }

  :host([block]) .root {
    inline-size: auto;
  }

  .root::after {
    border-bottom: 2px solid var(--focus-indicator-color);
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

  :host(:focus-within) .root::after {
    transform: scaleX(1);
    transition-property: transform;
    transition-duration: ${durationNormal};
    transition-delay: ${curveDecelerateMid};
  }

  :host([readonly]) .root::after,
  :host(:disabled) .root::after {
    content: none;
  }

  label {
    color: var(--color);
    display: flex;
    inline-size: fit-content;
    padding-block-end: ${spacingVerticalXS};
    padding-inline-end: ${spacingHorizontalXS};
  }

  :host(:empty) label,
  label[hidden] {
    display: none;
  }

  .auto-sizer,
  .control {
    box-sizing: border-box;
    font: inherit;
    grid-column: 1 / -1;
    grid-row: 1 / -1;
    letter-space: inherit;
    padding: 0 var(--control-padding-inline);
  }

  .auto-sizer {
    display: none;
    padding-block-end: 2px; /* avoid scroll bar in Firefox */
    pointer-events: none;
    visibility: hidden;
    white-space: pre-wrap;
  }

  :host([auto-resize]) .auto-sizer {
    display: block;
  }

  .control {
    appearance: none;
    background-color: transparent;
    border: 0;
    color: inherit;
    field-sizing: content;
    max-block-size: 100%;
    outline: 0;
    resize: none;
    text-align: inherit;
  }

  .control:disabled {
    cursor: inherit;
  }

  .control::placeholder {
    color: var(--placeholder-color);
  }

  ::selection {
    color: ${colorNeutralForegroundInverted};
    background-color: ${colorNeutralBackgroundInverted};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host {
      --border-color: FieldText;
      --border-block-end-color: FieldText;
      --focus-indicator-color: Highlight;
      --placeholder-color: FieldText;
    }

    :host(:hover),
    :host(:active),
    :host(:focus-within) {
      --border-color: Highlight;
      --border-block-end-color: Highlight;
    }

    :host(:disabled) {
      --color: GrayText;
      --border-color: GrayText;
      --border-block-end-color: GrayText;
      --placeholder-color: GrayText;
    }
  `),
);
