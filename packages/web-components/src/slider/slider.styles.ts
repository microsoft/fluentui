import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  borderRadiusCircular,
  borderRadiusMedium,
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

    align-items: center;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
    user-select: none;
    border-radius: ${borderRadiusMedium};
  }

  :host([size='small']) {
    --thumb-size: 14px;
    --track-width: 2px;
    --thumb-padding: 3px;
  }

  :host([orientation='horizontal']) {
    touch-action: pan-y;
    min-width: calc(var(--thumb-size) * 1px);
    width: 100%;
  }

  :host([orientation='vertical']) {
    height: 160px;
    min-height: var(--thumb-size);
    touch-action: pan-x;
  }

  :host(:focus-visible) {
    border: 1px solid #000;
  }

  /* Thumb Container and Cursor */
  .thumb-container {
    position: absolute;
    height: var(--thumb-size);
    width: var(--thumb-size);
    transition: all 0.2s ease;
  }

  :host([orientation='horizontal']) .thumb-container {
    transform: translateX(calc(var(--thumb-size) * 0.5)) translateY(calc(var(--thumb-translate) * -1.5));
  }
  :host([orientation='vertical']) .thumb-container {
    transform: translateX(var(--thumb-translate)) translateY(calc(var(--thumb-size) * 0.5));
  }

  .thumb-cursor {
    grid-row: 2 / auto;
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
    margin: 0 8px;
    display: grid;
  }

  :host([orientation='horizontal']) .positioning-region {
    position: relative;
    margin: 0 8px;
    display: grid;
    grid-template-rows: var(--thumb-size) var(--thumb-size);
  }

  :host([orientation='vertical']) .positioning-region {
    position: relative;
    margin: 0 8px;
    display: grid;
    height: 100%;
    grid-template-columns: var(--thumb-size) 1fr;
  }

  /* Track */
  .track {
    align-self: start;
    position: absolute;
    grid-row: 2 / auto;
  }

  .track {
    background-color: ${colorNeutralStrokeAccessible};
    position: absolute;
    border-radius: ${borderRadiusMedium};
  }

  :host([disabled]) .track {
    background-color: ${colorNeutralBackgroundDisabled};
  }

  :host([orientation='horizontal']) .track {
    height: var(--track-width);
    left: 0;
    right: 0;
  }

  :host([orientation='horizontal']) .track {
    right: var(--track-overhang);
    left: var(--track-overhang);
    align-self: start;
    height: var(--track-width);
  }

  :host([orientation='vertical']) .track {
    top: var(--track-overhang);
    bottom: var(--track-overhang);
    width: var(--track-width);
    height: 100%;
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
    top: 0;
  }
`;
