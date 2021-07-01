import { css, ElementStyles } from '@microsoft/fast-element';
import {
  disabledCursor,
  display,
  ElementDefinitionContext,
  focusVisible,
  forcedColorsStylesheetBehavior,
  NumberFieldOptions,
} from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { fillStateStyles, heightNumber } from '../styles/index';
import { appearanceBehavior } from '../utilities/behaviors';
import {
  bodyFont,
  controlCornerRadius,
  designUnit,
  disabledOpacity,
  focusStrokeOuter,
  neutralFillHover,
  neutralFillInputActive,
  neutralFillInputHover,
  neutralFillInputRest,
  neutralFillRest,
  neutralForegroundRest,
  neutralStrokeActive,
  neutralStrokeHover,
  neutralStrokeRest,
  strokeWidth,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
} from '../design-tokens';

export const numberFieldFilledStyles: (
  context: ElementDefinitionContext,
  definition: NumberFieldOptions,
) => ElementStyles = (context: ElementDefinitionContext, definition: NumberFieldOptions) =>
  css`
    :host([appearance='filled']) .root {
      background: ${neutralFillRest};
      border-color: transparent;
    }

    :host([appearance='filled']:hover:not([disabled])) .root {
      background: ${neutralFillHover};
      border-color: transparent;
    }

    :host([appearance='filled']:focus-within:not([disabled])) .root {
      border-color: transparent;
      box-shadow: none;
    }
    ${fillStateStyles(context, definition)}
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host([appearance='filled']) .root,
        :host([appearance='filled']:hover:not([disabled])) .root {
          background: ${SystemColors.Field};
          border-color: ${SystemColors.FieldText};
        }
        :host([appearance='filled']:active:not([disabled])) .root,
        :host([appearance='filled']:focus-within:not([disabled])) .root {
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
        :host([appearance='filled'][disabled]) .root {
          border-color: ${SystemColors.GrayText};
          background: ${SystemColors.Field};
        }
      `,
    ),
  );

export const numberFieldStyles = (context, definition) =>
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
      font: inherit;
      background: transparent;
      border: 0;
      color: inherit;
      height: calc(100% - 4px);
      width: 100%;
      margin-top: auto;
      margin-bottom: auto;
      border: none;
      padding: 0 calc(${designUnit} * 2px + 1px);
      font-size: ${typeRampBaseFontSize};
      line-height: ${typeRampBaseLineHeight};
    }

    .control:hover,
    .control:${focusVisible},
    .control:disabled,
    .control:active {
      outline: none;
    }

    .controls {
      opacity: 0;
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

    .step-up,
    .step-down {
      padding: 2px 10px;
      cursor: pointer;
    }

    .step-up:before,
    .step-down:before {
      content: '';
      display: block;
      border: solid transparent 6px;
    }

    .step-up:before {
      border-bottom-color: ${neutralForegroundRest};
    }

    .step-down:before {
      border-top-color: ${neutralForegroundRest};
    }

    ::slotted(svg) {
      ${
        /* Glyph size and margin-left is temporary -
            replace when adaptive typography is figured out */ ''
      } width: 16px;
      height: 16px;
    }

    .start {
      display: flex;
      margin-inline-start: 11px;
    }

    .end {
      display: flex;
      margin-inline-end: 11px;
    }

    :host(:hover:not([disabled])) .root {
      background: ${neutralFillInputHover};
      border-color: ${neutralStrokeHover};
    }

    :host(:active:not([disabled])) .root {
      background: ${neutralFillInputActive};
      border-color: ${neutralStrokeActive};
    }

    :host(:focus-within:not([disabled])) .root {
      border-color: ${focusStrokeOuter};
      box-shadow: 0 0 0 1px ${focusStrokeOuter} inset;
    }

    :host(:hover:not([disabled])) .controls,
    :host(:focus-within:not([disabled])) .controls {
      opacity: 1;
    }

    :host([disabled]) .label,
    :host([readonly]) .label,
    :host([readonly]) .control,
    :host([disabled]) .control {
      cursor: ${disabledCursor};
    }

    :host([disabled]) {
      opacity: ${disabledOpacity};
    }

    :host([disabled]) .control {
      border-color: ${neutralStrokeRest};
    }
  `.withBehaviors(
    appearanceBehavior('filled', numberFieldFilledStyles(context, definition)),
    forcedColorsStylesheetBehavior(
      css`
        .root {
          forced-color-adjust: none;
          background: ${SystemColors.Field};
          border-color: ${SystemColors.FieldText};
        }
        :host(:hover:not([disabled])) .root {
          background: ${SystemColors.Field};
          border-color: ${SystemColors.Highlight};
        }
        :host(:focus-within:enabled) .root {
          border-color: ${SystemColors.Highlight};
          box-shadow: 0 0 0 1px ${SystemColors.Highlight} inset;
        }
        .control,
        ::placeholder,
        ::-webkit-input-placeholder {
          color: ${SystemColors.FieldText};
        }
        .step-up:before {
          border-bottom-color: ${SystemColors.FieldText};
        }
        .step-down:before {
          border-top-color: ${SystemColors.FieldText};
        }
        .start,
        .end {
          fill: ${SystemColors.FieldText};
        }
        :host([disabled]) {
          opacity: 1;
        }
        :host([disabled]) .root {
          border-color: ${SystemColors.GrayText};
          background: ${SystemColors.Field};
        }
        :host([disabled]) ::placeholder,
        :host([disabled]) ::-webkit-input-placeholder,
        :host([disabled]) .label {
          color: ${SystemColors.GrayText};
        }
      `,
    ),
  );
