import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusMedium,
  colorNeutralBackground1,
  colorNeutralBackground1Hover,
  colorNeutralBackground1Pressed,
  colorNeutralBackground1Selected,
  colorNeutralBackground2,
  colorNeutralBackground2Hover,
  colorNeutralBackground2Pressed,
  colorNeutralBackground2Selected,
  colorNeutralBackgroundDisabled,
  colorNeutralStroke1,
  colorNeutralStroke1Hover,
  colorNeutralStroke1Pressed,
  colorNeutralStroke1Selected,
  colorStrokeFocus2,
  colorSubtleBackground,
  colorSubtleBackgroundHover,
  colorSubtleBackgroundPressed,
  colorSubtleBackgroundSelected,
  colorTransparentBackground,
  colorTransparentBackgroundHover,
  colorTransparentBackgroundPressed,
  colorTransparentBackgroundSelected,
  colorTransparentStroke,
  colorTransparentStrokeDisabled,
  colorTransparentStrokeInteractive,
  fontFamilyBase,
  shadow2,
  shadow4,
  shadow8,
  spacingHorizontalL,
  spacingHorizontalM,
  spacingHorizontalS,
  spacingVerticalL,
  spacingVerticalM,
  spacingVerticalS,
  strokeWidthThick,
  strokeWidthThin,
} from '../theme/design-tokens.js';

/** Card styles
 * @public
 */
export const styles = css`
  ${display('inline-block')}

  :host {
    font-family: ${fontFamilyBase};
    background: ${colorTransparentBackground};
    border-radius: ${borderRadiusMedium};
    position: relative;
    max-width: 100%;
    height: fit-content;
    overflow: hidden;
    box-shadow: ${shadow4};
    box-sizing: border-box;
    width: var(--card-width, 360px);
    height: var(--card-height, fit-content);
    z-index: var(--card-elevation, 1);
  }

  :host .card:focus-visible::after {
    content: '';
    position: absolute;
    inset: 2px;
    border-color: ${colorTransparentStroke};
    outline: ${strokeWidthThick} solid ${colorTransparentStroke};
    box-shadow: ${shadow4}, 0 0 0 2px ${colorStrokeFocus2};
  }

  .control {
    position: absolute;
    z-index: 2;
    top: 5px;
    right: 5px;
  }

  .content {
    display: grid;
    row-gap: ${spacingVerticalM};
    column-gap: ${spacingHorizontalM};
    padding: ${spacingVerticalM} ${spacingHorizontalM};
  }

  .card {
    background: ${colorNeutralBackground1};
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
  }

  :host([size='small']) .content {
    row-gap: ${spacingVerticalS};
    column-gap: ${spacingHorizontalS};
    padding: ${spacingVerticalS} ${spacingHorizontalS};
  }
  :host([size='large']) .content {
    row-gap: ${spacingVerticalL};
    column-gap: ${spacingHorizontalL};
    padding: ${spacingVerticalL} ${spacingHorizontalL};
  }

  :host([orientation='horizontal']) .content {
    grid-template-rows: unset;
    row-gap: unset;
    grid-template-columns: auto 1fr;
    align-items: center;
  }

  :host([appearance='filled-alternative']) .card {
    background: ${colorNeutralBackground2};
  }
  :host([appearance='outline']) .card {
    background: ${colorTransparentBackground};
    border-color: ${colorNeutralStroke1};
    box-shadow: none;
  }
  :host([appearance='subtle']) .card {
    background: ${colorSubtleBackground};
    border-color: ${colorTransparentStroke};
    box-shadow: none;
  }

  :host([selectable]) {
    cursor: pointer;
    user-select: none;
  }
  :host([selectable]:hover) .card {
    background: ${colorNeutralBackground1Hover};
    border-color: ${colorTransparentStrokeInteractive};
    box-shadow: ${shadow8};
  }
  :host([selectable]:active) .card {
    background: ${colorNeutralBackground1Pressed};
    border-color: ${colorTransparentStrokeInteractive};
  }
  :host([selectable][appearance='filled-alternative']:hover) .card {
    background: ${colorNeutralBackground2Hover};
  }
  :host([selectable][appearance='filled-alternative']:active) .card {
    background: ${colorNeutralBackground2Pressed};
  }
  :host([selectable][appearance='outline']:hover) .card {
    background: ${colorTransparentBackgroundHover};
    border-color: ${colorNeutralStroke1Hover};
    box-shadow: none;
  }
  :host([selectable][appearance='outline']:active) .card {
    background: ${colorTransparentBackgroundPressed};
    border-color: ${colorNeutralStroke1Pressed};
  }
  :host([selectable][appearance='subtle']:hover) .card {
    background: ${colorSubtleBackgroundHover};
    border-color: ${colorTransparentStrokeInteractive};
    box-shadow: none;
  }
  :host([selectable][appearance='subtle']:active) .card {
    background: ${colorSubtleBackgroundPressed};
  }

  .card[aria-selected='true'] {
    background: ${colorNeutralBackground1Selected};
    border-color: ${colorTransparentStrokeInteractive};
    cursor: pointer;
  }
  :host([appearance='subtle']) .card[aria-selected='true'] {
    background: ${colorSubtleBackgroundSelected};
    border-color: ${colorNeutralStroke1Selected};
  }
  :host([appearance='outline']) .card[aria-selected='true'] {
    background: ${colorTransparentBackgroundSelected};
    border-color: ${colorNeutralStroke1Selected};
  }
  :host([appearance='filled-alternative']) .card[aria-selected='true'] {
    background: ${colorNeutralBackground2Selected};
  }

  :host([aria-disabled='true']) .card {
    background: ${colorNeutralBackgroundDisabled};
    border-color: ${colorTransparentStrokeDisabled};
    cursor: not-allowed;
    pointer-events: none;
    box-shadow: ${shadow2};
  }
  :host([appearance='subtle']) .card[aria-disabled='true'],
  :host([appearance='outline']) .card[aria-disabled='true'] {
    box-shadow: none;
  }
  :host([appearance='outline']) .card[aria-disabled='true'] {
    background: ${colorTransparentBackground};
  }
`;
