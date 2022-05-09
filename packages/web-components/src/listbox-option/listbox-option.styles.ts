import { css, ElementStyles } from '@microsoft/fast-element';
import {
  disabledCursor,
  display,
  ElementDefinitionContext,
  focusVisible,
  forcedColorsStylesheetBehavior,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { heightNumber } from '../styles/size';
import {
  accentFillRest,
  controlCornerRadius,
  designUnit,
  disabledOpacity,
  focusStrokeOuter,
  focusStrokeWidth,
  neutralFillSecondaryActive,
  neutralFillSecondaryHover,
  neutralFillSecondaryRest,
  neutralFillStealthActive,
  neutralFillStealthFocus,
  neutralFillStealthHover,
  neutralFillStealthRest,
  neutralForegroundRest,
} from '../design-tokens';
import { typeRampBase } from '../styles/patterns/type-ramp';

export const optionStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    ${display('inline-flex')} :host {
      position: relative;
      ${typeRampBase}
      background: ${neutralFillStealthRest};
      border-radius: calc(${controlCornerRadius} * 1px);
      border: calc(${focusStrokeWidth} * 1px) solid transparent;
      box-sizing: border-box;
      color: ${neutralForegroundRest};
      cursor: pointer;
      fill: currentcolor;
      height: calc(${heightNumber} * 1px);
      outline: none;
      overflow: hidden;
      align-items: center;
      padding: 0 calc(${designUnit} * 2.25px);
      user-select: none;
      white-space: nowrap;
    }

    :host::before {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: calc((${heightNumber} / 4) - ${focusStrokeWidth} * 1px);
      width: 3px;
      height: calc((${heightNumber} / 2) * 1px);
      background: transparent;
      border-radius: calc(${controlCornerRadius} * 1px);
    }

    :host(:not([disabled]):hover) {
      background: ${neutralFillStealthHover};
    }

    :host(:not([disabled]):active) {
      background: ${neutralFillStealthActive};
    }

    :host(:not([disabled]):active)::before {
      background: ${accentFillRest};
      height: calc(((${heightNumber} / 2) - 6) * 1px);
    }

    :host([aria-selected='true'])::before {
      background: ${accentFillRest};
    }

    :host(:${focusVisible}) {
      border-color: ${focusStrokeOuter};
      background: ${neutralFillStealthFocus};
    }

    :host([aria-selected='true']) {
      background: ${neutralFillSecondaryRest};
    }

    :host(:not([disabled])[aria-selected='true']:hover) {
      background: ${neutralFillSecondaryHover};
    }

    :host(:not([disabled])[aria-selected='true']:active) {
      background: ${neutralFillSecondaryActive};
    }

    :host(:not([disabled]):not([aria-selected='true']):hover) {
      background: ${neutralFillStealthHover};
    }

    :host(:not([disabled]):not([aria-selected='true']):active) {
      background: ${neutralFillStealthActive};
    }

    :host([disabled]) {
      cursor: ${disabledCursor};
      opacity: ${disabledOpacity};
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

    ::slotted([slot='end']) {
      margin-inline-start: 1ch;
    }

    ::slotted([slot='start']) {
      margin-inline-end: 1ch;
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host {
          background: ${SystemColors.ButtonFace};
          border-color: ${SystemColors.ButtonFace};
          color: ${SystemColors.ButtonText};
        }
        :host(:not([disabled]):not([aria-selected="true"]):hover),
        :host(:not([disabled])[aria-selected="true"]:hover),
        :host([aria-selected="true"]) {
          forced-color-adjust: none;
          background: ${SystemColors.Highlight};
          color: ${SystemColors.HighlightText};
        }
        :host(:not([disabled]):active)::before,
        :host([aria-selected='true'])::before {
          background: ${SystemColors.HighlightText};
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
