import { css } from '@microsoft/fast-element';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { disabledCursor, display, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import { heightNumber } from '../styles';
import {
  designUnit,
  controlCornerRadius,
  focusStrokeOuter,
  neutralForegroundRest,
  neutralStrokeHover,
  neutralStrokeActive,
  density,
  neutralStrokeRest,
  disabledOpacity,
  fillColor,
} from '../design-tokens';

export const sliderStyles = (context, defintion) =>
  css`
    ${display('inline-grid')} :host {
        --thumb-size: calc(${heightNumber} * 0.5);
        --thumb-translate: calc(var(--thumb-size) * 0.5);
        --track-overhang: calc((${designUnit} / 2) * -1);
        --track-width: ${designUnit};
        align-items: center;
        width: 100%;
        margin: calc(${designUnit} * 1px) 0;
        user-select: none;
        box-sizing: border-box;
        border-radius: calc(${controlCornerRadius} * 1px);
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
        box-shadow: 0 0 0 2px ${fillColor}, 0 0 0 4px ${focusStrokeOuter};
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
        background: ${neutralForegroundRest};
        border-radius: 50%;
    }
    .thumb-cursor:hover {
        background: ${neutralForegroundRest};;
        border-color: ${neutralStrokeHover};
    }
    .thumb-cursor:active {
        background: ${neutralForegroundRest};
        border-color: ${neutralStrokeActive};
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
        margin-top: calc((${designUnit} + calc(${density} + 2)) * 1px);
        height: calc(var(--track-width) * 1px);
    }
    :host(.vertical) .track {
        top: calc(var(--track-overhang) * 1px);
        bottom: calc(var(--track-overhang) * 1px);
        margin-inline-start: calc((${designUnit} + calc(${density} + 2)) * 1px);
        width: calc(var(--track-width) * 1px);
        height: 100%;
    }
    .track {
        background: ${neutralStrokeRest};
        position: absolute;
    }
    :host(.vertical) {
        height: 100%;
        min-height: calc(${designUnit} * 60px);
        min-width: calc(${designUnit} * 20px);
    }
    :host(.disabled), :host(.readonly) {
        cursor: ${disabledCursor};
    }
    :host(.disabled) {
        opacity: ${disabledOpacity};
    }
`.withBehaviors(
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
            }
            :host(.disabled) .track,
            :host(.disabled) .thumb-cursor {
                forced-color-adjust: none;
                background: ${SystemColors.GrayText};
            }
        `,
    ),
  );
