import { css } from '@microsoft/fast-element';
import { styles as ButtonStyles } from '../button/button.styles.js';
import {
  colorBrandBackgroundHover,
  colorBrandBackgroundPressed,
  colorBrandBackgroundSelected,
  colorNeutralBackground1Hover,
  colorNeutralBackground1Pressed,
  colorNeutralBackground1Selected,
  colorNeutralForeground1,
  colorNeutralForeground2BrandHover,
  colorNeutralForeground2BrandPressed,
  colorNeutralForeground2BrandSelected,
  colorNeutralForeground2Hover,
  colorNeutralForeground2Pressed,
  colorNeutralForeground2Selected,
  colorNeutralForegroundOnBrand,
  colorNeutralStroke1,
  colorNeutralStroke1Hover,
  colorNeutralStroke1Pressed,
  colorSubtleBackgroundHover,
  colorSubtleBackgroundPressed,
  colorSubtleBackgroundSelected,
  colorTransparentBackgroundHover,
  colorTransparentBackgroundPressed,
  colorTransparentBackgroundSelected,
  strokeWidthThin,
} from '../theme/design-tokens.js';
import { forcedColorsStylesheetBehavior } from '../utils/behaviors/match-media-stylesheet-behavior.js';
import { pressedState } from '../styles/states/index.js';

/**
 * The styles for the ToggleButton component.
 *
 * @public
 * @privateRemarks
 * TODO: Need to support icon hover styles
 */
export const styles = css`
  ${ButtonStyles}

  :host(${pressedState}) {
    border-color: ${colorNeutralStroke1};
    background-color: ${colorNeutralBackground1Selected};
    color: ${colorNeutralForeground1};
    border-width: ${strokeWidthThin};
  }

  :host(${pressedState}:hover) {
    border-color: ${colorNeutralStroke1Hover};
    background-color: ${colorNeutralBackground1Hover};
  }

  :host(${pressedState}:active) {
    border-color: ${colorNeutralStroke1Pressed};
    background-color: ${colorNeutralBackground1Pressed};
  }

  :host(${pressedState}[appearance='primary']:not(:focus-visible)) {
    border-color: transparent;
  }

  :host(${pressedState}[appearance='primary']) {
    background-color: ${colorBrandBackgroundSelected};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host(${pressedState}[appearance='primary']:hover) {
    background-color: ${colorBrandBackgroundHover};
  }

  :host(${pressedState}[appearance='primary']:active) {
    background-color: ${colorBrandBackgroundPressed};
  }

  :host(${pressedState}[appearance='subtle']) {
    border-color: transparent;
    background-color: ${colorSubtleBackgroundSelected};
    color: ${colorNeutralForeground2Selected};
  }

  :host(${pressedState}[appearance='subtle']:hover) {
    background-color: ${colorSubtleBackgroundHover};
    color: ${colorNeutralForeground2Hover};
  }

  :host(${pressedState}[appearance='subtle']:active) {
    background-color: ${colorSubtleBackgroundPressed};
    color: ${colorNeutralForeground2Pressed};
  }

  :host(${pressedState}[appearance='outline']),
  :host(${pressedState}[appearance='transparent']) {
    background-color: ${colorTransparentBackgroundSelected};
  }

  :host(${pressedState}[appearance='outline']:hover),
  :host(${pressedState}[appearance='transparent']:hover) {
    background-color: ${colorTransparentBackgroundHover};
  }

  :host(${pressedState}[appearance='outline']:active),
  :host(${pressedState}[appearance='transparent']:active) {
    background-color: ${colorTransparentBackgroundPressed};
  }

  :host(${pressedState}[appearance='transparent']) {
    border-color: transparent;
    color: ${colorNeutralForeground2BrandSelected};
  }

  :host(${pressedState}[appearance='transparent']:hover) {
    color: ${colorNeutralForeground2BrandHover};
  }

  :host(${pressedState}[appearance='transparent']:active) {
    color: ${colorNeutralForeground2BrandPressed};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host(${pressedState}),
    :host(
        ${pressedState}:is([appearance='primary'], [appearance='subtle'], [appearance='outline'], [appearance='transparent'])
      ) {
      background: SelectedItem;
      color: SelectedItemText;
    }
  `),
);
