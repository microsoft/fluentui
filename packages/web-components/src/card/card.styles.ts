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
  ${display('flex')}

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
    box-sizing: border-box;
  }

  .root {
    display: grid;
    row-gap: ${spacingVerticalM};
    column-gap: ${spacingHorizontalM};
    padding: ${spacingVerticalM} ${spacingHorizontalM};
  }

  .control {
    position: absolute;
    top: 5px;
    right: 5px;
  }

  :host([disabled]) {
    background: ${colorNeutralBackgroundDisabled};
    border: ${strokeWidthThin} solid ${colorTransparentStrokeDisabled};
    shadow: ${shadow4};
    cursor: not-allowed;
    pointer-events: none;
  }
  :host([selected]) {
    background: ${colorNeutralBackground1Selected};
    border: ${strokeWidthThin} solid ${colorTransparentStrokeInteractive};
    cursor: pointer;
  }

  :host([size='small']) .root {
    row-gap: ${spacingVerticalS};
    column-gap: ${spacingHorizontalS};
    padding: ${spacingVerticalS} ${spacingHorizontalS};
  }
  :host([size='large']) .root {
    row-gap: ${spacingVerticalL};
    column-gap: ${spacingHorizontalL};
    padding: ${spacingVerticalL} ${spacingHorizontalL};
  }

  :host([orientation='horizontal']) .root {
    grid-template-rows: unset;
    row-gap: unset;
    grid-template-columns: min-content auto;
    align-items: center;
    padding: 0 var(--card-size) 0 0;
    width: 100%;
  }

  :host([interactive]) {
    cursor: pointer;
  }
  :host([interactive]:active) {
    background: ${colorNeutralBackground1Pressed};
    border: ${strokeWidthThin} solid ${colorTransparentStrokeInteractive};
  }
  :host([interactive]:hover) {
    background: ${colorNeutralBackground1Hover};
    border: ${strokeWidthThin} solid ${colorTransparentStrokeInteractive};
    box-shadow: ${shadow8};
  }

  :host([appearance='filled-alternative']) {
    background: ${colorNeutralBackground2};
  }

  :host([appearance='filled-alternative'][selected]) {
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

  :host([appearance='outline'][selected]) {
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

  :host([appearance='subtle'][selected]) {
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
`;
