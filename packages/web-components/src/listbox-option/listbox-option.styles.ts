import { css } from '@microsoft/fast-element';
import { disabledCursor, display, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import {
  accentFillActiveBehavior,
  accentFillHoverBehavior,
  accentFillSelectedBehavior,
  accentForegroundCutRestBehavior,
  neutralFillHoverBehavior,
  neutralFillStealthHoverBehavior,
  neutralFillStealthRestBehavior,
  neutralFillStealthSelectedBehavior,
  neutralFocusBehavior,
  neutralFocusInnerAccentBehavior,
  neutralForegroundHoverBehavior,
  neutralForegroundRestBehavior,
  neutralLayerL1Behavior,
} from '../styles';
import { heightNumber } from '../styles/size';

export const OptionStyles = css`
    ${display('inline-flex')} :host {
        font-family: var(--body-font);
        border-radius: calc(var(--corner-radius) * 1px);
        border: calc(var(--focus-outline-width) * 1px) solid transparent;
        box-sizing: border-box;
        color: ${neutralForegroundRestBehavior.var};
        cursor: pointer;
        fill: currentcolor;
        font-size: var(--type-ramp-base-font-size);
        height: calc(${heightNumber} * 1px);
        line-height: var(--type-ramp-base-line-height);
        margin: 0 calc(var(--design-unit) * 1px);
        outline: none;
        overflow: hidden;
        align-items: center;
        padding: 0 calc(var(--design-unit) * 2.25px);
        user-select: none;
        white-space: nowrap;
    }

    :host(:${focusVisible}) {
        box-shadow: 0 0 0 calc(var(--focus-outline-width) * 1px) inset ${neutralFocusInnerAccentBehavior.var};
        border-color: ${neutralFocusBehavior.var};
        background: ${accentFillHoverBehavior.var};
        color: ${accentForegroundCutRestBehavior.var};
    }

    :host([aria-selected="true"]) {
        background: ${accentFillHoverBehavior.var};
        color: ${accentForegroundCutRestBehavior.var};
    }

    :host(:active) {
        background: ${accentFillActiveBehavior.var};
        color: ${accentForegroundCutRestBehavior.var};
    }

    :host(:not([aria-selected="true"]):hover) {
        background: ${neutralFillHoverBehavior.var};
        color: ${neutralForegroundHoverBehavior.var};
    }

    :host(:not([aria-selected="true"]):active) {
        background: ${neutralFillHoverBehavior.var};
        color: ${neutralForegroundHoverBehavior.var};
    }

    :host([disabled]) {
        cursor: ${disabledCursor};
        opacity: var(--disabled-opacity);
    }

    :host([disabled]:hover) {
        background-color: inherit;
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
        display: flex;
    }

    ::slotted(svg) {
        ${/* Glyph size and margin-left is temporary - replace when adaptive typography is figured out */ ''}
        height: calc(var(--design-unit) * 4px);
        width: calc(var(--design-unit) * 4px);
    }

    ::slotted([slot="end"]) {
        margin-inline-start: 1ch;
    }

    ::slotted([slot="start"]) {
        margin-inline-end: 1ch;
    }

`.withBehaviors(
  accentFillActiveBehavior,
  accentFillHoverBehavior,
  accentFillSelectedBehavior,
  accentForegroundCutRestBehavior,
  forcedColorsStylesheetBehavior(
    css`
      :host {
        border-color: transparent;
        color: ${SystemColors.ButtonText};
        forced-color-adjust: none;
      }

      :host(:not([aria-selected='true']):hover),
      :host([aria-selected='true']) {
        background: ${SystemColors.Highlight};
        color: ${SystemColors.HighlightText};
      }

      :host([disabled]),
      :host([disabled]:not([aria-selected='true']):hover) {
        background: ${SystemColors.Canvas};
        color: ${SystemColors.GrayText};
        fill: currentcolor;
        opacity: 1;
      }
    `,
  ),
  neutralFillHoverBehavior,
  neutralFillStealthHoverBehavior,
  neutralFillStealthRestBehavior,
  neutralFillStealthSelectedBehavior,
  neutralFocusBehavior,
  neutralFocusInnerAccentBehavior,
  neutralForegroundHoverBehavior,
  neutralForegroundRestBehavior,
  neutralLayerL1Behavior,
);
