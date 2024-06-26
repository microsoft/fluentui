import { css } from '@microsoft/fast-element';
import { display, forcedColorsStylesheetBehavior } from '../utils/index.js';
import {
  borderRadiusCircular,
  borderRadiusMedium,
  borderRadiusSmall,
  colorBrandBackground,
  colorCompoundBrandBackground,
  colorCompoundBrandBackgroundHover,
  colorCompoundBrandBackgroundPressed,
  colorNeutralBackground1,
  colorNeutralBackgroundDisabled,
  colorNeutralForegroundDisabled,
  colorNeutralStroke1,
  colorNeutralStrokeAccessible,
  colorNeutralStrokeDisabled,
  colorStrokeFocus1,
  colorStrokeFocus2,
} from '../theme/design-tokens.js';

/** Text styles
 * @public
 */
export const styles = css`
  ${display('inline-grid')} :host {
    --thumb-size: 20px;
    --track-overhang: -2px;
    --track-size: 4px;
    --slider-direction: 90deg;
    position: relative;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
    user-select: none;
    touch-action: pan-y;
    border-radius: ${borderRadiusSmall};
    min-width: 120px;
    min-height: 32px;
    grid-template-rows: 1fr var(--thumb-size) 1fr;
    grid-template-columns: 1fr calc(100% - var(--thumb-size)) 1fr;
  }

  :host([orientation='vertical']) {
    --slider-direction: 0deg;
    min-height: 120px;
    grid-template-rows: 1fr calc(100% - var(--thumb-size)) 1fr;
    grid-template-columns: 1fr var(--thumb-size) 1fr;
    touch-action: pan-x;
    width: unset;
    min-width: 32px;
    justify-items: center;
  }

  :host(:focus-visible) {
    box-shadow: 0 0 0 2pt ${colorStrokeFocus2};
    outline: 1px solid ${colorStrokeFocus1};
  }

  .track {
    position: relative;
    background-color: ${colorNeutralStrokeAccessible};
    border-radius: ${borderRadiusSmall};
    grid-row: 2 / 2;
    grid-column: 2 / 2;
    width: 100%;
    height: var(--track-size);
    forced-color-adjust: none;
  }

  :host([orientation='vertical']) .track {
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

  :host([orientation='vertical']) .track::before {
    width: 100%;
    bottom: 0;
    height: var(--slider-progress);
  }

  :host([step]) .track::after {
    content: '';
    position: absolute;
    border-radius: ${borderRadiusMedium};
    width: 100%;
    inset: -2px 0;
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

  :host([orientation='vertical']) .thumb-container {
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

  .thumb:hover,
  .track::before:hover {
    background-color: ${colorCompoundBrandBackgroundHover};
  }

  .thumb:active,
  .track::before:active {
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
