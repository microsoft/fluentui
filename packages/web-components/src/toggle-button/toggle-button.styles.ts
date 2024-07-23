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
import { outlineState, pressedState, primaryState, subtleState, transparentState } from '../styles/states/index.js';

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

  :host(${pressedState}${primaryState}) {
    border-color: transparent;
    background-color: ${colorBrandBackgroundSelected};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host(${pressedState}${primaryState}:hover) {
    background-color: ${colorBrandBackgroundHover};
  }

  :host(${pressedState}${primaryState}:active) {
    background-color: ${colorBrandBackgroundPressed};
  }

  :host(${pressedState}${subtleState}) {
    border-color: transparent;
    background-color: ${colorSubtleBackgroundSelected};
    color: ${colorNeutralForeground2Selected};
  }

  :host(${pressedState}${subtleState}:hover) {
    background-color: ${colorSubtleBackgroundHover};
    color: ${colorNeutralForeground2Hover};
  }

  :host(${pressedState}${subtleState}:active) {
    background-color: ${colorSubtleBackgroundPressed};
    color: ${colorNeutralForeground2Pressed};
  }

  :host(${pressedState}${outlineState}),
  :host(${pressedState}${transparentState}) {
    background-color: ${colorTransparentBackgroundSelected};
  }

  :host(${pressedState}${outlineState}:hover),
  :host(${pressedState}${transparentState}:hover) {
    background-color: ${colorTransparentBackgroundHover};
  }

  :host(${pressedState}${outlineState}:active),
  :host(${pressedState}${transparentState}:active) {
    background-color: ${colorTransparentBackgroundPressed};
  }

  :host(${pressedState}${transparentState}) {
    border-color: transparent;
    color: ${colorNeutralForeground2BrandSelected};
  }

  :host(${pressedState}${transparentState}:hover) {
    color: ${colorNeutralForeground2BrandHover};
  }

  :host(${pressedState}${transparentState}:active) {
    color: ${colorNeutralForeground2BrandPressed};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host(${pressedState}),
    :host(${pressedState}${primaryState}),
    :host(${pressedState}${subtleState}),
    :host(${pressedState}${outlineState}),
    :host(${pressedState}${transparentState}) {
      background: SelectedItem;
      color: SelectedItemText;
    }
  `),
);
