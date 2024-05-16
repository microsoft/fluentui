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
    --thumb-size: 18px;
    --thumb-padding: 3px;
    --thumb-translate: calc(var(--thumb-size) * -0.5 + var(--track-width) / 2);
    --track-overhang: -2px;
    --track-width: 4px;
    --fast-slider-height: calc(var(--thumb-size) * 10);
    --slider-direction: 90deg;
    align-items: center;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
    user-select: none;
    border-radius: ${borderRadiusSmall};
    touch-action: pan-y;
    min-width: calc(var(--thumb-size) * 1px);
    width: 100%;
  }

  :host([size='small']) {
    --thumb-size: 14px;
    --track-width: 2px;
    --thumb-padding: 3px;
  }

  :host([orientation='vertical']) {
    --slider-direction: 0deg;
    height: 160px;
    min-height: var(--thumb-size);
    touch-action: pan-x;
    padding: 8px 0;
    width: auto;
    min-width: auto;
  }

  :host([disabled]:hover) {
    cursor: initial;
  }

  :host(:focus-visible) {
    box-shadow: 0 0 0 2pt ${colorStrokeFocus2};
    outline: 1px solid ${colorStrokeFocus1};
  }

  .thumb-cursor:focus {
    outline: 0;
  }

  /* Thumb Container and Cursor */
  .thumb-container {
    position: absolute;
    height: var(--thumb-size);
    width: var(--thumb-size);
    transition: all 0.2s ease;
  }

  .thumb-container {
    transform: translateX(calc(var(--thumb-size) * 0.5)) translateY(calc(var(--thumb-translate) * -1.5));
  }

  :host([size='small']) .thumb-container {
    transform: translateX(calc(var(--thumb-size) * 0.5)) translateY(calc(var(--thumb-translate) * -1.35));
  }

  :host([orientation='vertical']) .thumb-container {
    transform: translateX(calc(var(--thumb-translate) * -1.5)) translateY(calc(var(--thumb-size) * -0.5));
  }

  :host([orientation='vertical'][size='small']) .thumb-container {
    transform: translateX(calc(var(--thumb-translate) * -1.35)) translateY(calc(var(--thumb-size) * -0.5));
  }

  .thumb-cursor {
    height: var(--thumb-size);
    width: var(--thumb-size);
    background-color: ${colorBrandBackground};
    border-radius: ${borderRadiusCircular};
    box-shadow: inset 0 0 0 var(--thumb-padding) ${colorNeutralBackground1}, 0 0 0 1px ${colorNeutralStroke1};
  }
  .thumb-cursor:hover {
    background-color: ${colorCompoundBrandBackgroundHover};
  }
  .thumb-cursor:active {
    background-color: ${colorCompoundBrandBackgroundPressed};
  }
  :host([disabled]) .thumb-cursor {
    background-color: ${colorNeutralForegroundDisabled};
    box-shadow: inset 0 0 0 var(--thumb-padding) ${colorNeutralBackground1}, 0 0 0 1px ${colorNeutralStrokeDisabled};
  }

  /* Positioning Region */
  .positioning-region {
    position: relative;
    display: grid;
  }

  :host([orientation='horizontal']) .positioning-region {
    margin: 0 8px;
    grid-template-rows: var(--thumb-size) var(--thumb-size);
  }
  :host([orientation='vertical']) .positioning-region {
    margin: 8px 0;
    height: 100%;
    grid-template-columns: var(--thumb-size) var(--thumb-size);
  }

  /* Track */
  .track {
    align-self: start;
    position: absolute;
    background-color: ${colorNeutralStrokeAccessible};
    border-radius: ${borderRadiusMedium};
    overflow: hidden;
  }

  :host([step]) .track::after {
    content: '';
    position: absolute;
    border-radius: ${borderRadiusMedium};
    width: 100%;
    inset: 0 2px;
    background-image: repeating-linear-gradient(
      var(--slider-direction),
      #0000 0%,
      #0000 calc(var(--step-rate) - 1px),
      ${colorNeutralBackground1} calc(var(--step-rate) - 1px),
      ${colorNeutralBackground1} var(--step-rate)
    );
  }

  :host([orientation='vertical'][step]) .track::after {
    inset: -2px 0;
  }

  :host([disabled]) .track {
    background-color: ${colorNeutralBackgroundDisabled};
  }

  :host([orientation='horizontal']) .track {
    right: var(--track-overhang);
    left: var(--track-overhang);
    align-self: start;
    height: var(--track-width);
    grid-row: 2 / auto;
  }

  :host([orientation='vertical']) .track {
    top: var(--track-overhang);
    bottom: var(--track-overhang);
    width: var(--track-width);
    height: 100%;
    grid-column: 2 / auto;
  }
  .track-start {
    background-color: ${colorCompoundBrandBackground};
    position: absolute;
    height: 100%;
    left: 0;
    border-radius: ${borderRadiusMedium};
  }
  :host([disabled]) .track-start {
    background-color: ${colorNeutralForegroundDisabled};
  }
  :host(:hover) .track-start {
    background-color: ${colorCompoundBrandBackgroundHover};
  }
  :host([disabled]:hover) .track-start {
    background-color: ${colorNeutralForegroundDisabled};
  }
  .track-start:active {
    background-color: ${colorCompoundBrandBackgroundPressed};
  }
  :host([orientation='vertical']) .track-start {
    height: auto;
    width: 100%;
    bottom: 0;
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

    :host(:hover) .track-start,
    .track-start:active,
    .track-start {
      background: Highlight;
    }
  `),
);
