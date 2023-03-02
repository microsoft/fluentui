import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
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
    align-items: center;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
    user-select: none;
    border-radius: ${borderRadiusSmall};
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
    padding: 8px 0;
  }

  :host([disabled]:hover) {
    cursor: initial;
  }

  :host(:focus:not(:focus-visible)) {
    outline: none;
  }

  :host(:focus-visible) {
    outline-offset: 4px;
    outline: 2px solid ${colorStrokeFocus2};
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
    transform: translateX(calc(var(--thumb-translate) * -1.5)) translateY(calc(var(--thumb-size) * 0.5));
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
    top: 0;
  }
`;
