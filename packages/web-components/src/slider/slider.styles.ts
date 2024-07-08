import { css } from '@microsoft/fast-element';
import { smallState, verticalState } from '../styles/states/index.js';
import { display, forcedColorsStylesheetBehavior } from '../utils/index.js';
import {
  borderRadiusCircular,
  borderRadiusMedium,
  borderRadiusSmall,
  colorCompoundBrandBackground,
  colorCompoundBrandBackgroundHover,
  colorCompoundBrandBackgroundPressed,
  colorNeutralBackground1,
  colorNeutralBackgroundDisabled,
  colorNeutralForegroundDisabled,
  colorNeutralStroke1,
  colorNeutralStrokeAccessible,
  colorStrokeFocus1,
  colorStrokeFocus2,
} from '../theme/design-tokens.js';

/** Text styles
 * @public
 */
export const styles = css`
  ${display('inline-grid')}

  :host {
    --thumb-size: 20px;
    --track-margin-inline: calc(var(--thumb-size) / 2);
    --track-size: 4px;
    --track-overhang: calc(var(--track-size) / -2);
    --slider-direction: 90deg;
    --border-radius: ${borderRadiusMedium};
    --step-marker-inset: var(--track-overhang) -1px;
    position: relative;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    outline: none;
    user-select: none;
    touch-action: none;
    min-width: 120px;
    min-height: 32px;
    grid-template-rows: 1fr var(--thumb-size) 1fr;
    grid-template-columns: var(--track-margin-inline) 1fr var(--track-margin-inline);
  }

  :host(:not(:disabled)) {
    cursor: pointer;
  }

  :host(:dir(rtl)) {
    --slider-direction: -90deg;
  }

  :host(${smallState}) {
    --thumb-size: 16px;
    --track-overhang: -1px;
    --track-size: 2px;
    --border-radius: ${borderRadiusSmall};
  }

  :host(${verticalState}) {
    --slider-direction: 0deg;
    --step-marker-inset: -1px var(--track-overhang);
    min-height: 120px;
    grid-template-rows: var(--track-margin-inline) 1fr var(--track-margin-inline);
    grid-template-columns: 1fr var(--thumb-size) 1fr;
    width: unset;
    min-width: 32px;
    justify-items: center;
  }

  :host(:not([slot='input']):focus-visible) {
    box-shadow: 0 0 0 2pt ${colorStrokeFocus2};
    outline: 1px solid ${colorStrokeFocus1};
  }

  .track {
    position: relative;
    background-color: ${colorNeutralStrokeAccessible};
    border-radius: var(--border-radius);
    grid-row: 2 / 2;
    grid-column: 2 / 2;
    width: 100%;
    height: var(--track-size);
    forced-color-adjust: none;
  }

  :host(${verticalState}) .track {
    top: var(--track-overhang);
    bottom: var(--track-overhang);
    width: var(--track-size);
    height: 100%;
  }

  .track::before {
    content: '';
    position: absolute;
    height: 100%;
    border-radius: inherit;
    inset-inline-start: 0;
    width: var(--slider-progress);
  }

  :host(${verticalState}) .track::before {
    width: 100%;
    bottom: 0;
    height: var(--slider-progress);
  }

  :host([step]) .track::after {
    content: '';
    position: absolute;
    border-radius: inherit;
    inset: var(--step-marker-inset);
    background-image: repeating-linear-gradient(
      var(--slider-direction),
      #0000 0%,
      #0000 calc(var(--step-rate) - 1px),
      ${colorNeutralBackground1} calc(var(--step-rate) - 1px),
      ${colorNeutralBackground1} var(--step-rate)
    );
  }

  .thumb-container {
    position: absolute;
    grid-row: 2 / 2;
    grid-column: 2 / 2;
    transform: translateX(-50%);
    left: var(--slider-thumb);
  }

  :host(${verticalState}) .thumb-container {
    transform: translateY(50%);
    left: unset;
    bottom: var(--slider-thumb);
  }

  :host(:not(:active)) :is(.thumb-container, .track::before) {
    transition: all 0.2s ease;
  }

  .thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    border-radius: ${borderRadiusCircular};
    box-shadow: 0 0 0 calc(var(--thumb-size) * 0.2) ${colorNeutralBackground1} inset;
    border: calc(var(--thumb-size) * 0.05) solid ${colorNeutralStroke1};
    box-sizing: border-box;
  }

  .thumb,
  .track::before {
    background-color: ${colorCompoundBrandBackground};
  }

  :host(:hover) .thumb,
  :host(:hover) .track::before {
    background-color: ${colorCompoundBrandBackgroundHover};
  }

  :host(:active) .thumb,
  :host(:active) .track::before {
    background-color: ${colorCompoundBrandBackgroundPressed};
  }

  :host(:disabled) .track {
    background-color: ${colorNeutralBackgroundDisabled};
  }

  :host(:disabled) .thumb,
  :host(:disabled) .track::before {
    background-color: ${colorNeutralForegroundDisabled};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    .track:hover,
    .track:active,
    .track {
      background: WindowText;
    }
    .thumb-cursor:hover,
    .thumb-cursor:active,
    .thumb-cursor {
      background: ButtonText;
    }

    :host(:hover) .track::before,
    .track::before:active,
    .track::before {
      background: Highlight;
    }
  `),
);
