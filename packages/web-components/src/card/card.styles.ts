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
  shadow4,
  shadow8,
  spacingHorizontalL,
  spacingHorizontalM,
  spacingHorizontalS,
  spacingVerticalL,
  spacingVerticalM,
  spacingVerticalS,
  strokeWidthThin,
} from '../theme/design-tokens.js';

/** Card styles
 * @public
 */
export const styles = css`
  ${display('grid')}

  :host {
    font-family: ${fontFamilyBase};
    background: ${colorNeutralBackground1};
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    border-radius: ${borderRadiusMedium};
    position: relative;
    max-width: 100%;
    height: fit-content;
    margin: auto;
    overflow: hidden;
    box-shadow: ${shadow4};
    row-gap: ${spacingVerticalM};
    column-gap: ${spacingHorizontalM};
    padding: ${spacingVerticalM} ${spacingHorizontalM};
    row-gap: 12px;
    column-gap: 12px;
    padding: 12px;
    box-sizing: border-box;
  }

  :host([aria-disabled='true']) {
    background: ${colorNeutralBackgroundDisabled};
    border: ${strokeWidthThin} solid ${colorTransparentStrokeDisabled};
    shadow: ${shadow4};
    cursor: not-allowed;
    pointer-events: none;
  }
  :host([aria-selected='true']) {
    background: ${colorNeutralBackground1Selected};
    border: ${strokeWidthThin} solid ${colorTransparentStrokeInteractive};
    cursor: pointer;
  }

  :host([control-size='small']) {
    row-gap: ${spacingVerticalS};
    column-gap: ${spacingHorizontalS};
    padding: ${spacingVerticalS} ${spacingHorizontalS};
  }
  :host([control-size='large']) {
    row-gap: ${spacingVerticalL};
    column-gap: ${spacingHorizontalL};
    padding: ${spacingVerticalL} ${spacingHorizontalL};
  }

  :host([orientation='horizontal']) {
    grid-template-rows: unset;
    grid-template-columns: min-content 1fr;
  }

  :host([interactive]) {
    cursor: pointer;
  }
  :host([interactive]:active) {
    background: ${colorNeutralBackground1Pressed};
    border: ${strokeWidthThin} solid ${colorTransparentStrokeInteractive};
  }
  :host([interactive]:hover:not([appearance='subtle'])) {
    background: ${colorNeutralBackground1Hover};
    border: ${strokeWidthThin} solid ${colorTransparentStrokeInteractive};
    box-shadow: ${shadow8};
  }

  :host([appearance='filled-alternative']) {
    background: ${colorNeutralBackground2};
  }

  :host([appearance='filled-alternative'][aria-selected='true']) {
    background: ${colorNeutralBackground2Selected};
    border: ${strokeWidthThin} solid ${colorTransparentStrokeInteractive};
  }
  :host([interactive][appearance='filled-alternative']:hover) {
    background: ${colorNeutralBackground2Hover};
    border: ${strokeWidthThin} solid ${colorTransparentStrokeInteractive};
  }
  :host([interactive][appearance='filled-alternative']:active) {
    background: ${colorNeutralBackground2Pressed};
    border: ${strokeWidthThin} solid ${colorTransparentStrokeInteractive};
  }

  :host([appearance='outline']) {
    background: ${colorTransparentBackground};
    border: ${strokeWidthThin} solid ${colorNeutralStroke1};
  }

  :host([appearance='outline'][aria-selected='true']) {
    background: ${colorTransparentBackgroundSelected};
    border: ${strokeWidthThin} solid ${colorNeutralStroke1Selected};
  }
  :host([interactive][appearance='outline']:hover) {
    background: ${colorTransparentBackgroundHover};
    border: ${strokeWidthThin} solid ${colorNeutralStroke1Hover};
  }
  :host([interactive][appearance='outline']:active) {
    background: ${colorTransparentBackgroundPressed};
    border: ${strokeWidthThin} solid ${colorNeutralStroke1Pressed};
  }

  :host([appearance='subtle']) {
    background: ${colorSubtleBackground};
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    box-shadow: none;
  }

  :host([appearance='subtle'][aria-selected='true']) {
    background: ${colorSubtleBackgroundSelected};
    border: ${strokeWidthThin} solid ${colorNeutralStroke1Selected};
  }
  :host([interactive][appearance='subtle']:hover) {
    background: ${colorSubtleBackgroundHover};
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
  }
  :host([interactive][appearance='subtle']:active) {
    background: ${colorSubtleBackgroundPressed};
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
  }
  .floating-action {
    position: absolute;
    top: 0;
    right: 0;
  }
`;
