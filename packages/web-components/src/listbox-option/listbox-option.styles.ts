import { css } from '@microsoft/fast-element';
import { disabledCursor, display, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { heightNumber } from '../styles/size';
import {
  bodyFont,
  controlCornerRadius,
  focusStrokeWidth,
  neutralForegroundRest,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
  designUnit,
  focusStrokeInner,
  focusStrokeOuter,
  accentFillHover,
  accentForegroundCut,
  accentFillActive,
  neutralFillHover,
  neutralFillActive,
  disabledOpacity,
} from '../design-tokens';

export const optionStyles = (context, definition) =>
  css`
    ${display('inline-flex')} :host {
        font-family: ${bodyFont};
        border-radius: calc(${controlCornerRadius} * 1px);
        border: calc(${focusStrokeWidth} * 1px) solid transparent;
        box-sizing: border-box;
        color: ${neutralForegroundRest};
        cursor: pointer;
        fill: currentcolor;
        font-size: ${typeRampBaseFontSize};
        height: calc(${heightNumber} * 1px);
        line-height: ${typeRampBaseLineHeight};
        margin: 0 calc(${designUnit} * 1px);
        outline: none;
        overflow: hidden;
        align-items: center;
        padding: 0 calc(${designUnit} * 2.25px);
        user-select: none;
        white-space: nowrap;
    }

    :host(:${focusVisible}) {
        box-shadow: 0 0 0 calc(${focusStrokeWidth} * 1px) inset ${focusStrokeInner};
        border-color: ${focusStrokeOuter};
        background: ${accentFillHover};
        color: ${accentForegroundCut};
    }

    :host([aria-selected="true"]) {
        background: ${accentFillHover};
        color: ${accentForegroundCut};
    }

    :host(:active) {
        background: ${accentFillActive};
        color: ${accentForegroundCut};
    }

    :host(:not([aria-selected="true"]):hover) {
        background: ${neutralFillHover};
        color: ${neutralForegroundRest}};
    }

    :host(:not([aria-selected="true"]):active) {
        background: ${neutralFillActive};
        color: ${neutralForegroundRest}};
    }

    :host([disabled]) {
        cursor: ${disabledCursor};
        opacity: ${disabledOpacity};
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
        height: calc(${designUnit} * 4px);
        width: calc(${designUnit} * 4px);
    }

    ::slotted([slot="end"]) {
        margin-inline-start: 1ch;
    }

    ::slotted([slot="start"]) {
        margin-inline-end: 1ch;
    }

`.withBehaviors(
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
  );
