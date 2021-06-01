import { css } from '@microsoft/fast-element';
import { disabledCursor, display, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { elevation } from '../styles/elevation';
import { heightNumber } from '../styles/size';
import { appearanceBehavior } from '../utilities/behaviors';
import {
  neutralFillRest,
  neutralFillHover,
  neutralFocus,
  neutralFillInputRest,
  neutralOutlineRest,
  neutralForegroundRest,
  neutralLayerFloating,
  outlineWidth,
  cornerRadius,
  designUnit,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
  neutralFillInputHover,
  neutralOutlineHover,
  neutralFocusInnerAccent,
  accentFillHover,
  accentForegroundCut,
  disabledOpacity,
  neutralFillStealthRest,
  neutralFillInputActive,
  neutralOutlineActive,
  bodyFont,
} from '../design-tokens';

export const selectFilledStyles = (context, definition) => css`
  :host([appearance="filled"]) {
    background: ${neutralFillRest};
    border-color: transparent;
  }

  :host([appearance="filled"]:hover:not([disabled])) {
    background: ${neutralFillHover};
    border-color: transparent;
  }

  :host([appearance="filled"]:${focusVisible}) {
    border-color: ${neutralFocus};
  }
`;

export const selectStyles = (context, definition) =>
  css`
    ${display('inline-flex')} :host {
        --elevation: 14;
        background: ${neutralFillInputRest};
        border-radius: calc(${cornerRadius} * 1px);
        border: calc(${outlineWidth} * 1px) solid ${neutralOutlineRest};
        box-sizing: border-box;
        color: ${neutralForegroundRest};
        font-family: ${bodyFont};
        height: calc(${heightNumber} * 1px);
        position: relative;
        user-select: none;
        min-width: 250px;
        vertical-align: top;
    }

    .listbox {
        ${elevation}
        background: ${neutralLayerFloating};
        border-radius: calc(${cornerRadius} * 1px);
        box-sizing: border-box;
        display: inline-flex;
        flex-direction: column;
        left: 0;
        max-height: calc(var(--max-height) - (${heightNumber} * 1px));
        padding: calc(${designUnit} * 1px) 0;
        overflow-y: auto;
        position: absolute;
        width: 100%;
        z-index: 1;
        margin: 1px 0;
    }

    .listbox[hidden] {
        display: none;
    }

    .control {
        align-items: center;
        box-sizing: border-box;
        cursor: pointer;
        display: flex;
        font-size: ${typeRampBaseFontSize};
        font-family: inherit;
        min-height: 100%;
        line-height: ${typeRampBaseLineHeight};
        padding: 0 calc(${designUnit} * 2.25px);
        width: 100%;
    }

    :host(:not([disabled]):hover) {
        background: ${neutralFillInputHover};
        border-color: ${neutralOutlineHover};
    }

    :host(:focus) {
        outline: none;
    }

    :host(:${focusVisible}) {
        border-color: ${neutralFocus};
        outline: none;
        box-shadow:
            0 0 0 1px inset ${neutralFocus};
    }

    :host([open]:${focusVisible}) {
        border-color: ${neutralOutlineRest};
        outline: none;
        box-shadow: none;
  }

    :host(:${focusVisible}) ::slotted([aria-selected="true"][role="option"]:not([disabled])) {
        box-shadow: 0 0 0 calc(var(--focus-outline-width) * 1px) inset ${neutralFocusInnerAccent};
        border-color: ${neutralFocus};
        background: ${accentFillHover};
        color: ${accentForegroundCut};
    }

    :host([disabled]) {
        cursor: ${disabledCursor};
        opacity: ${disabledOpacity};
    }

    :host([disabled]) .control {
        cursor: ${disabledCursor};
        user-select: none;
    }

    :host([disabled]:hover) {
        background: ${neutralFillStealthRest};
        color: ${neutralForegroundRest};
        fill: currentcolor;
    }

    :host(:not([disabled])) .control:active {
        background: ${neutralFillInputActive};
        border-color: ${neutralOutlineActive};
    }

    :host([open][position="above"]) .listbox,
    :host([open][position="below"]) .control {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    :host([open][position="above"]) .control,
    :host([open][position="below"]) .listbox {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }

    :host([open][position="above"]) .listbox {
        border-bottom: 0;
        bottom: calc(${heightNumber} * 1px);
    }

    :host([open][position="below"]) .listbox {
        border-top: 0;
        top: calc(${heightNumber} * 1px);
    }

    .selected-value {
        font-family: inherit;
        flex: 1 1 auto;
        text-align: start;
    }

    .indicator {
        flex: 0 0 auto;
        margin-inline-start: 1em;
    }

    slot[name="listbox"] {
        display: none;
        width: 100%;
    }

    :host([open]) slot[name="listbox"] {
        display: flex;
        position: absolute;
        ${elevation}
    }

    .end {
        margin-inline-start: auto;
    }

    .start,
    .end,
    .indicator,
    .select-indicator,
    ::slotted(svg) {
        ${`` /* Glyph size is temporary - replace when glyph-size var is added */}
        fill: currentcolor;
        height: 1em;
        min-height: calc(${designUnit} * 4px);
        min-width: calc(${designUnit} * 4px);
        width: 1em;
    }

    ::slotted([role="option"]) {
        flex: 0 0 auto;
    }
`.withBehaviors(
    appearanceBehavior('filled', selectFilledStyles(context, definition)),
    forcedColorsStylesheetBehavior(
      css`
            :host([disabled]) {
                border-color: ${SystemColors.GrayText};
                background-color: ${SystemColors.ButtonFace};
                color: ${SystemColors.GrayText};
                opacity: 1;
                forced-color-adjust: none;
            }

            :host([disabled]:hover) {
                background: ${SystemColors.ButtonFace};
            }

            :host([disabled]) .control {
                color: ${SystemColors.GrayText};
                border-color: ${SystemColors.GrayText};
            }

            :host(:not([disabled]):hover) {
              background: ${SystemColors.ButtonFace};
              border-color: ${SystemColors.Highlight};
            }

            :host(:${focusVisible}) {
              forced-color-adjust: none;
              background: ${SystemColors.ButtonFace};
              border-color: ${SystemColors.Highlight};
              box-shadow: 0 0 0 1px inset ${SystemColors.Highlight};
              color: ${SystemColors.ButtonText};
              fill: currentcolor;
            }

            :host([open]) .listbox {
                background: ${SystemColors.ButtonFace};
                border: 1px solid ${SystemColors.ButtonText};
            }

            :host(:${focusVisible}) ::slotted([aria-selected="true"][role="option"]:not([disabled])) {
                background: ${SystemColors.Highlight};
                border-color: ${SystemColors.ButtonText};
                box-shadow: 0 0 0 calc(var(--focus-outline-width) * 1px) inset ${SystemColors.HighlightText};
                color: ${SystemColors.HighlightText};
                fill: currentcolor;
            }

            ::slotted([role="option"]:not([aria-selected="true"]):not([disabled]):hover) {
                forced-color-adjust: none;
                color: ${SystemColors.ButtonText};
                background: ${SystemColors.ButtonFace};
                border-color: ${SystemColors.Highlight};
                box-shadow: none;
            }
        `,
    ),
  );
