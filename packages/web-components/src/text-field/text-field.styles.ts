import { css } from '@microsoft/fast-element';
import { disabledCursor, display, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { fillStateStyles, heightNumber } from '../styles';
import { appearanceBehavior } from '../utilities/behaviors';
import {
  neutralFillRest,
  neutralFillHover,
  bodyFont,
  neutralForegroundRest,
  neutralFillInputRest,
  controlCornerRadius,
  strokeWidth,
  neutralStrokeRest,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
  neutralFillInputHover,
  neutralStrokeHover,
  focusStrokeOuter,
  disabledOpacity,
} from '../design-tokens';

export const textFieldFilledStyles = (context, definition) =>
  css`
    :host([appearance='filled']) .root {
      background: ${neutralFillRest};
      border-color: transparent;
    }

    :host([appearance='filled']:hover:not(.disabled)) .root {
      background: ${neutralFillHover};
      border-color: transparent;
    }

    :host([appearance='filled']:focus-within:not(.disabled)) .root {
      border-color: transparent;
      box-shadow: none;
    }
    ${fillStateStyles(context, definition)}
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host([appearance='filled']) .root {
          background: ${SystemColors.Field};
          border-color: ${SystemColors.FieldText};
        }
        :host([appearance='filled']:hover:not([disabled])) .root,
        :host([appearance='filled']:focus-within:not([disabled])) .root {
          background: ${SystemColors.Field};
          border-color: ${SystemColors.FieldText};
        }
        :host([appearance='filled']:active:not([disabled])) .root {
          background: ${SystemColors.Field};
          border-color: ${SystemColors.FieldText};
        }
        :host([appearance='filled']:not([disabled]):active)::after,
        :host([appearance='filled']:not([disabled]):focus-within:not(:active))::after {
          border-bottom-color: ${SystemColors.Highlight};
        }
        :host([appearance='filled'][disabled]) .root {
          border-color: ${SystemColors.GrayText};
          background: ${SystemColors.Field};
        }
      `,
    ),
  );

export const textFieldStyles = (context, definition) =>
  css`
    ${display('inline-block')} :host {
        font-family: ${bodyFont};
        outline: none;
        user-select: none;
        position: relative;
    }

    .root {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: row;
        color: ${neutralForegroundRest};
        background: ${neutralFillInputRest};
        border-radius: calc(${controlCornerRadius} * 1px);
        border: calc(${strokeWidth} * 1px) solid ${neutralStrokeRest};
        height: calc(${heightNumber} * 1px);
    }

    .control {
        -webkit-appearance: none;
        background: transparent;
        border: 0;
        height: calc(100% - 4px);
        width: 100%;
        margin-top: auto;
        margin-bottom: auto;
        border: none;
        padding: 0 calc(var(--design-unit) * 2px + 1px);
        color: ${neutralForegroundRest};
        font-family: inherit;
        font-size: ${typeRampBaseFontSize};
        line-height: ${typeRampBaseLineHeight};
    }

    .control:hover,
    .control:${focusVisible},
    .control:disabled,
    .control:active {
        outline: none;
    }

    .label {
        display: block;
        color: ${neutralForegroundRest};
        cursor: pointer;
        font-size: ${typeRampBaseFontSize};
        line-height: ${typeRampBaseLineHeight};
        margin-bottom: 4px;
    }

    .label__hidden {
      display: none;
      visibility: hidden;
    }

    .start,
    .end {
        margin: auto;
        fill: currentcolor;
    }

    ::slotted(svg) {      ${
      /* Glyph size and margin-left is temporary -
            replace when adaptive typography is figured out */ ''
    } width: 16px;
        height: 16px;
    }

    .start {
        margin-inline-start: 11px;
    }

    .end {
        margin-inline-end: 11px;
    }

    :host(:hover:not(.disabled)) .root {
        background: ${neutralFillInputHover};
        border-color: ${neutralStrokeHover};
    }

    :host(:focus-within:not(.disabled)) .root {
        border-color: ${focusStrokeOuter};
        box-shadow: 0 0 0 1px ${focusStrokeOuter} inset;
    }

    :host(.disabled) .label,
    :host(.readonly) .label,
    :host(.readonly) .control,
    :host(.disabled) .control {
        cursor: ${disabledCursor};
    }

    :host(.disabled) {
        opacity: ${disabledOpacity};
    }
`.withBehaviors(
    appearanceBehavior('filled', textFieldFilledStyles(context, definition)),
    forcedColorsStylesheetBehavior(
      css`
        .root {
          forced-color-adjust: none;
          background: ${SystemColors.Field};
          border-color: ${SystemColors.FieldText};
        }
        :host(:hover:not(.disabled)) .root {
          background: ${SystemColors.Field};
          border-color: ${SystemColors.Highlight};
        }
        .start,
        .end {
          fill: ${SystemColors.ButtonText};
        }
        :host(.disabled) {
          opacity: 1;
        }
        :host(.disabled) .root {
          border-color: ${SystemColors.GrayText};
          background: ${SystemColors.Field};
        }
        :host(:focus-within:enabled) .root {
          border-color: ${SystemColors.Highlight};
          box-shadow: 0 0 0 1px ${SystemColors.Highlight} inset;
        }
        .control {
          color: ${SystemColors.ButtonText};
        }
        ::placeholder,
        ::-webkit-input-placeholder {
          color: ${SystemColors.FieldText};
        }
        :host(.disabled) ::placeholder,
        :host(.disabled) ::-webkit-input-placeholder,
        :host([disabled]) .label {
          color: ${SystemColors.GrayText};
        }
      `,
    ),
  );
