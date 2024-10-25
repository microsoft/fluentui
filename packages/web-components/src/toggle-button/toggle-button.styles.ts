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
import { state } from '../utils/states.js';

/**
 * The styles for the ToggleButton component.
 *
 * @public
 * @privateRemarks
 * TODO: Need to support icon hover styles
 */
export const styles = css`
  ${ButtonStyles}

  :host(${state('pressed')}) {
    border-color: ${colorNeutralStroke1};
    background-color: ${colorNeutralBackground1Selected};
    color: ${colorNeutralForeground1};
    border-width: ${strokeWidthThin};
  }

  :host(${state('pressed')}:hover) {
    border-color: ${colorNeutralStroke1Hover};
    background-color: ${colorNeutralBackground1Hover};
  }

  :host(${state('pressed')}:active) {
    border-color: ${colorNeutralStroke1Pressed};
    background-color: ${colorNeutralBackground1Pressed};
  }

  :host(${state('pressed')}${state('primary')}) {
    border-color: transparent;
    background-color: ${colorBrandBackgroundSelected};
    color: ${colorNeutralForegroundOnBrand};
  }

  :host(${state('pressed')}${state('primary')}:hover) {
    background-color: ${colorBrandBackgroundHover};
  }

  :host(${state('pressed')}${state('primary')}:active) {
    background-color: ${colorBrandBackgroundPressed};
  }

  :host(${state('pressed')}${state('subtle')}) {
    border-color: transparent;
    background-color: ${colorSubtleBackgroundSelected};
    color: ${colorNeutralForeground2Selected};
  }

  :host(${state('pressed')}${state('subtle')}:hover) {
    background-color: ${colorSubtleBackgroundHover};
    color: ${colorNeutralForeground2Hover};
  }

  :host(${state('pressed')}${state('subtle')}:active) {
    background-color: ${colorSubtleBackgroundPressed};
    color: ${colorNeutralForeground2Pressed};
  }

  :host(${state('pressed')}${state('outline')}),
  :host(${state('pressed')}${state('transparent')}) {
    background-color: ${colorTransparentBackgroundSelected};
  }

  :host(${state('pressed')}${state('outline')}:hover),
  :host(${state('pressed')}${state('transparent')}:hover) {
    background-color: ${colorTransparentBackgroundHover};
  }

  :host(${state('pressed')}${state('outline')}:active),
  :host(${state('pressed')}${state('transparent')}:active) {
    background-color: ${colorTransparentBackgroundPressed};
  }

  :host(${state('pressed')}${state('transparent')}) {
    border-color: transparent;
    color: ${colorNeutralForeground2BrandSelected};
  }

  :host(${state('pressed')}${state('transparent')}:hover) {
    color: ${colorNeutralForeground2BrandHover};
  }

  :host(${state('pressed')}${state('transparent')}:active) {
    color: ${colorNeutralForeground2BrandPressed};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host(${state('pressed')}),
    :host(${state('pressed')}${state('primary')}),
    :host(${state('pressed')}${state('subtle')}),
    :host(${state('pressed')}${state('outline')}),
    :host(${state('pressed')}${state('transparent')}) {
      background: SelectedItem;
      color: SelectedItemText;
    }
  `),
);
