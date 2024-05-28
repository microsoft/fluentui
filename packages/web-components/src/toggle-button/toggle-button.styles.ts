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

/**
 * The styles for the ToggleButton component.
 *
 * @public
 * @privateRemarks
 * TODO: Need to support icon hover styles
 */
export const styles = css`
  ${ButtonStyles}

  :host([aria-pressed='true']) {
    border-color: ${colorNeutralStroke1};
    background-color: ${colorNeutralBackground1Selected};
    color: ${colorNeutralForeground1};
    border-width: ${strokeWidthThin};
  }

  :host([aria-pressed='true']:hover) {
    border-color: ${colorNeutralStroke1Hover};
    background-color: ${colorNeutralBackground1Hover};
  }

  :host([aria-pressed='true']:active) {
    border-color: ${colorNeutralStroke1Pressed};
    background-color: ${colorNeutralBackground1Pressed};
  }

  :host([aria-pressed='true'][appearance='primary']) {
    border-color: transparent;
    background-color: ${colorBrandBackgroundSelected};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host([aria-pressed='true'][appearance='primary']:hover) {
    background-color: ${colorBrandBackgroundHover};
  }

  :host([aria-pressed='true'][appearance='primary']:active) {
    background-color: ${colorBrandBackgroundPressed};
  }

  :host([aria-pressed='true'][appearance='subtle']) {
    border-color: transparent;
    background-color: ${colorSubtleBackgroundSelected};
    color: ${colorNeutralForeground2Selected};
  }

  :host([aria-pressed='true'][appearance='subtle']:hover) {
    background-color: ${colorSubtleBackgroundHover};
    color: ${colorNeutralForeground2Hover};
  }

  :host([aria-pressed='true'][appearance='subtle']:active) {
    background-color: ${colorSubtleBackgroundPressed};
    color: ${colorNeutralForeground2Pressed};
  }

  :host([aria-pressed='true'][appearance='outline']),
  :host([aria-pressed='true'][appearance='transparent']) {
    background-color: ${colorTransparentBackgroundSelected};
  }

  :host([aria-pressed='true'][appearance='outline']:hover),
  :host([aria-pressed='true'][appearance='transparent']:hover) {
    background-color: ${colorTransparentBackgroundHover};
  }

  :host([aria-pressed='true'][appearance='outline']:active),
  :host([aria-pressed='true'][appearance='transparent']:active) {
    background-color: ${colorTransparentBackgroundPressed};
  }

  :host([aria-pressed='true'][appearance='transparent']) {
    border-color: transparent;
    color: ${colorNeutralForeground2BrandSelected};
  }

  :host([aria-pressed='true'][appearance='transparent']:hover) {
    color: ${colorNeutralForeground2BrandHover};
  }

  :host([aria-pressed='true'][appearance='transparent']:active) {
    color: ${colorNeutralForeground2BrandPressed};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host([aria-pressed='true']),
    :host([aria-pressed='true'][appearance='primary']),
    :host([aria-pressed='true'][appearance='subtle']),
    :host([aria-pressed='true'][appearance='outline']),
    :host([aria-pressed='true'][appearance='transparent']) {
      background: SelectedItem;
      color: SelectedItemText;
    }
  `),
);
