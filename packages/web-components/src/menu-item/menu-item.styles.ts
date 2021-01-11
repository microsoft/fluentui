import { css } from '@microsoft/fast-element';
import { disabledCursor, display, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import {
  heightNumber,
  neutralFillStealthActiveBehavior,
  neutralFillStealthHoverBehavior,
  neutralFillStealthRestBehavior,
  neutralFocusBehavior,
  neutralForegroundRestBehavior,
} from '../styles/index';

export const MenuItemStyles = css`
    ${display('grid')} :host {
        outline: none;
        box-sizing: border-box;
        height: calc(${heightNumber} * 1px);
        grid-template-columns: minmax(42px, auto) 1fr minmax(42px, auto);
        grid-template-rows: auto;
        justify-items: center;
        align-items: center;
        padding: 0;
        margin: 0 calc(var(--design-unit) * 1px);
        white-space: nowrap;
        overflow: hidden;
        color: ${neutralForegroundRestBehavior.var};
        fill: currentcolor;
        cursor: pointer;
        font-family: var(--body-font);
        font-size: var(--type-ramp-base-font-size);
        line-height: var(--type-ramp-base-line-height);
        border-radius: calc(var(--corner-radius) * 1px);
        border: calc(var(--outline-width) * 1px) solid transparent;
    }

    :host(:${focusVisible}) {
        border: calc(var(--outline-width) * 1px) solid ${neutralFocusBehavior.var};
        box-shadow: 0 0 0 calc((var(--focus-outline-width) - var(--outline-width)) * 1px) ${neutralFocusBehavior.var};
    }

    :host(:hover) {
        background: ${neutralFillStealthHoverBehavior.var};
    }

    :host(:active) {
        background: ${neutralFillStealthActiveBehavior.var};
    }

    :host(.disabled) {
        cursor: ${disabledCursor};
        opacity: var(--disabled-opacity);
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
        fill: ${neutralForegroundRestBehavior.var};
    }
`.withBehaviors(
  neutralFillStealthActiveBehavior,
  neutralFillStealthHoverBehavior,
  neutralFillStealthRestBehavior,
  neutralFocusBehavior,
  neutralForegroundRestBehavior,
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
                box-shadow: 0 0 0 calc(var(--focus-outline-width) * 1px) inset ${SystemColors.HighlightText};
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
        `,
  ),
);
