import { css } from '@microsoft/fast-element';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { disabledCursor, display, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import {
  heightNumber,
  neutralFocusBehavior,
  neutralForegroundActiveBehavior,
  neutralForegroundHoverBehavior,
  neutralForegroundRestBehavior,
  neutralOutlineHoverBehavior,
  neutralOutlineRestBehavior,
} from '../styles';

export const SliderStyles = css`
    ${display('inline-grid')} :host {
        --thumb-size: calc(${heightNumber} * 0.5);
        --thumb-translate: calc(var(--thumb-size) * 0.5);
        --track-overhang: calc((var(--design-unit) / 2) * -1);
        --track-width: var(--design-unit);
        align-items: center;
        width: 100%;
        margin: calc(var(--design-unit) * 1px) 0;
        user-select: none;
        box-sizing: border-box;
        border-radius: calc(var(--corner-radius) * 1px);
        outline: none;
        cursor: pointer;
    }
    :host(.horizontal) .positioning-region {
        position: relative;
        margin: 0 8px;
        display: grid;
        grid-template-rows: calc(var(--thumb-size) * 1px) 1fr;
    }
    :host(.vertical) .positioning-region {
        position: relative;
        margin: 0 8px;
        display: grid;
        height: 100%;
        grid-template-columns: calc(var(--thumb-size) * 1px) 1fr;
    }
    :host(:${focusVisible}) .thumb-cursor {
        box-shadow: 0 0 0 2px var(--background-color), 0 0 0 4px ${neutralFocusBehavior.var};
    }
    .thumb-container {
        position: absolute;
        height: calc(var(--thumb-size) * 1px);
        width: calc(var(--thumb-size) * 1px);
        transition: all 0.2s ease;
    }
    .thumb-cursor {
        border: none;
        width: calc(var(--thumb-size) * 1px);
        height: calc(var(--thumb-size) * 1px);
        background: ${neutralForegroundRestBehavior.var};
        border-radius: 50%;
    }
    .thumb-cursor:hover {
        background: ${neutralForegroundHoverBehavior.var};
        border-color: ${neutralOutlineHoverBehavior.var};
    }
    .thumb-cursor:active {
        background: ${neutralForegroundActiveBehavior.var};
    }
    :host(.horizontal) .thumb-container {
        transform: translateX(calc(var(--thumb-translate) * 1px));
    }
    :host(.vertical) .thumb-container {
        transform: translateY(calc(var(--thumb-translate) * 1px));
    }
    :host(.horizontal) {
        min-width: calc(var(--thumb-size) * 1px);
    }
    :host(.horizontal) .track {
        right: calc(var(--track-overhang) * 1px);
        left: calc(var(--track-overhang) * 1px);
        align-self: start;
        margin-top: calc((var(--design-unit) + calc(var(--density) + 2)) * 1px);
        height: calc(var(--track-width) * 1px);
    }
    :host(.vertical) .track {
        top: calc(var(--track-overhang) * 1px);
        bottom: calc(var(--track-overhang) * 1px);
        margin-left: calc((var(--design-unit) + calc(var(--density) + 2)) * 1px);
        width: calc(var(--track-width) * 1px);
        height: 100%;
    }
    .track {
        background: ${neutralOutlineRestBehavior.var};
        position: absolute;
    }
    :host(.vertical) {
        height: 100%;
        min-height: calc(var(--design-unit) * 60px);
        min-width: calc(var(--design-unit) * 20px);
    }
    :host(.disabled) .label,
    :host(.readonly) .label,
    :host(.readonly) .slider,
    :host(.disabled) .slider {
        cursor: ${disabledCursor};
    }
    :host(.disabled) {
        opacity: var(--disabled-opacity);
    }
`.withBehaviors(
  neutralFocusBehavior,
  neutralForegroundActiveBehavior,
  neutralForegroundHoverBehavior,
  neutralForegroundRestBehavior,
  neutralOutlineHoverBehavior,
  neutralOutlineRestBehavior,
  forcedColorsStylesheetBehavior(
    css`
            .thumb-cursor {
                forced-color-adjust: none;
                border-color: ${SystemColors.FieldText};
                background: ${SystemColors.FieldText};
            }
            .thumb-cursor:hover,
            .thumb-cursor:active {
                background: ${SystemColors.Highlight};
            }
            .track {
                forced-color-adjust: none;
                background: ${SystemColors.FieldText};
            }
            :host(:${focusVisible}) .thumb-cursor {
                background: ${SystemColors.Highlight};
                border-color: ${SystemColors.Highlight};
                box-shadow: 0 0 0 2px ${SystemColors.Field}, 0 0 0 4px ${SystemColors.FieldText};
            }
            :host(.disabled) {
                opacity: 1;
                cursor: ${disabledCursor};
            }
            :host(.disabled) .slider,
            :host(.disabled) .track,
            :host(.disabled) .thumb-cursor {
                forced-color-adjust: none;
                background: ${SystemColors.GrayText};
            }
        `,
  ),
);
