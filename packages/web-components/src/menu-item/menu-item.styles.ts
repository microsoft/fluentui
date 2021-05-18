import { css } from '@microsoft/fast-element';
import { disabledCursor, display, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { heightNumber } from '../styles/index';
import {
  designUnit,
  neutralForegroundRest,
  bodyFont,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
  cornerRadius,
  outlineWidth,
  neutralFocus,
  neutralFillStealthHover,
  neutralFillStealthActive,
  disabledOpacity,
} from '../design-tokens';

export const menuItemStyles = (context, definition) =>
  css`
    ${display('grid')} :host {
        outline: none;
        box-sizing: border-box;
        height: calc(${heightNumber} * 1px);
        grid-template-columns: minmax(42px, auto) 1fr minmax(42px, auto);
        grid-template-rows: auto;
        justify-items: center;
        align-items: center;
        padding: 0;
        margin: 0 calc(${designUnit} * 1px);
        white-space: nowrap;
        overflow: hidden;
        color: ${neutralForegroundRest};
        fill: currentcolor;
        cursor: pointer;
        font-family: ${bodyFont};
        font-size: ${typeRampBaseFontSize};
        line-height: ${typeRampBaseLineHeight};
        border-radius: calc(${cornerRadius} * 1px);
        border: calc(${outlineWidth} * 1px) solid transparent;
    }

    :host(:${focusVisible}) {
        border: calc(${outlineWidth} * 1px) solid ${neutralFocus};
        box-shadow: 0 0 0 calc((${outlineWidth} - ${outlineWidth}) * 1px) ${neutralFocus};
    }

    :host(:hover) {
        background: ${neutralFillStealthHover};
    }

    :host(:active) {
        background: ${neutralFillStealthActive};
    }

    :host(.disabled) {
        cursor: ${disabledCursor};
        opacity: ${disabledOpacity};
    }

    :host(.disabled:hover) .start,
    :host(.disabled:hover) .end,
    :host(.disabled:hover)::slotted(svg) {
        fill: currentcolor;
    }

    .content {
        grid-column-start: 2;
        justify-self: start;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .start,
    .end,
    ::slotted(svg) {
        ${
          /* Glyph size and margin-left is temporary -
            replace when adaptive typography is figured out */ ''
        } width: 16px;
        height: 16px;
        display: flex;
    }

    :host(:hover) .start,
    :host(:hover) .end,
    :host(:hover)::slotted(svg),
    :host(:active) .start,
    :host(:active) .end,
    :host(:active)::slotted(svg) {
        fill: ${neutralForegroundRest};
    }


    :host([role="menuitemcheckbox"]),
    :host([role="menuitemradio"]) {
        display: grid;
        grid-template-columns: auto auto 1fr minmax(42px, auto);
        align-items: center;
        min-height: 32px;
    }

    :host .input-container {
        display: none;
    }

    :host([role="menuitemcheckbox"]) .input-container,
    :host([role="menuitemradio"]) .input-container {
        display: grid;
        margin-inline-end: 10px;
    }

    :host([role="menuitemcheckbox"]) .start,
    :host([role="menuitemradio"]) .start {
        grid-column-start: 2;
        margin-inline-end: 10px;
    }

    :host([role="menuitemcheckbox"]) .content,
    :host([role="menuitemradio"]) .content {
        grid-column-start: 3;
    }

    :host([role="menuitemcheckbox"]) .end,
    :host([role="menuitemradio"]) .end {
        grid-column-start: 4;
    }

    :host .checkbox,
    :host .radio {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 20px;
        height: 20px;
        box-sizing: border-box;
        border: calc(${outlineWidth} * 1px) solid ${neutralForegroundRest};
        outline: none;
        margin-inline-start: 10px;
    }

    :host .checkbox {
        border-radius: calc(${cornerRadius} * 1px);
    }

    :host .radio {
        border-radius: 999px;
    }

    :host .checkbox-indicator,
    :host .radio-indicator,
    ::slotted([slot="checkbox-indicator"]),
    ::slotted([slot="radio-indicator"]) {
        display: none;
    }

    :host([aria-checked="true"]) .checkbox-indicator,
    :host([aria-checked="true"]) ::slotted([slot="checkbox-indicator"]) {
        width: 100%;
        height: 100%;
        display: block;
        fill: ${neutralForegroundRest};
        pointer-events: none;
    }

    :host([aria-checked="true"]) .radio-indicator {
        position: absolute;
        top: 4px;
        left: 4px;
        right: 4px;
        bottom: 4px;
        border-radius: 999px;
        display: block;
        background: ${neutralForegroundRest};
        pointer-events: none;
    }

    :host([aria-checked="true"]) ::slotted([slot="radio-indicator"]) {
        display: block;
        pointer-events: none;
    }
`.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
            :host {
                forced-color-adjust: none;
                border-color: transparent;
                color: ${SystemColors.ButtonText};
                fill: ${SystemColors.ButtonText};
            }
            :host(:hover) {
                background: ${SystemColors.Highlight};
                color: ${SystemColors.HighlightText};
            }
            :host(:hover) .start,
            :host(:hover) .end,
            :host(:hover)::slotted(svg),
            :host(:active) .start,
            :host(:active) .end,
            :host(:active)::slotted(svg) {
                fill: ${SystemColors.HighlightText};
            }
            :host(:${focusVisible}) {
                background: ${SystemColors.Highlight};
                border-color: ${SystemColors.ButtonText};
                box-shadow: 0 0 0 calc(${outlineWidth} * 1px) inset ${SystemColors.HighlightText};
                color: ${SystemColors.HighlightText};
                fill: currentcolor;
            }
            :host(.disabled),
            :host(.disabled:hover),
            :host(.disabled:hover) .start,
            :host(.disabled:hover) .end,
            :host(.disabled:hover)::slotted(svg) {
                background: ${SystemColors.Canvas};
                color: ${SystemColors.GrayText};
                fill: currentcolor;
                opacity: 1;
            }

            :host .checkbox,
            :host .radio{
                border-color: ${SystemColors.ButtonText};
                background: ${SystemColors.HighlightText};
            }

            :host([checked="true"]) .checkbox,
            :host([checked="true"]) .radio {
                background: ${SystemColors.HighlightText};
                border-color: ${SystemColors.HighlightText};
            }

            :host(:hover) .checkbox,
            :host(:hover) .radio,
            :host(:${focusVisible}) .checkbox,
            :host(:${focusVisible}) .radio,
            :host([checked="true"]:hover) .checkbox,
            :host([checked="true"]:hover) .radio,
            :host([checked="true"]:${focusVisible}) .checkbox,
            :host([checked="true"]:${focusVisible}) .radio {
                border-color: ${SystemColors.HighlightText};
            }

            :host([aria-checked="true"]) {
                background: ${SystemColors.Highlight};
                color: ${SystemColors.HighlightText};
            }

            :host([aria-checked="true"]) .checkbox-indicator,
            :host([aria-checked="true"]) ::slotted([slot="checkbox-indicator"]),
            :host([aria-checked="true"]) ::slotted([slot="radio-indicator"]) {
                fill: ${SystemColors.Highlight};
            }

            :host([aria-checked="true"]) .radio-indicator {
                background: ${SystemColors.Highlight};
            }
        `,
    ),
  );
