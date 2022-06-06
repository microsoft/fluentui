import { css, ElementStyles } from '@microsoft/fast-element';
import {
  display,
  ElementDefinitionContext,
  forcedColorsStylesheetBehavior,
  NumberFieldOptions,
} from '@microsoft/fast-foundation';
import { SystemColors } from "@microsoft/fast-web-utilities";
import {
  inputFilledForcedColorStyles,
  inputFilledStyles,
  inputForcedColorStyles,
  inputStateStyles,
  inputStyles,
} from '../styles/index';
import { appearanceBehavior } from '../utilities/behaviors';
import { designUnit } from '../design-tokens';

export const numberFieldFilledStyles: (
  context: ElementDefinitionContext,
  definition: NumberFieldOptions,
) => ElementStyles = (context: ElementDefinitionContext, definition: NumberFieldOptions) =>
  css`
    ${inputFilledStyles(context, definition, '.root')}
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        ${inputFilledForcedColorStyles(context, definition, '.root')}
      `,
    ),
  );

export const numberFieldStyles = (context, definition) =>
  css`
    ${display('inline-block')}

    ${inputStyles(context, definition, '.root')}

    ${inputStateStyles(context, definition, '.root')}

    .root {
      display: flex;
      flex-direction: row;
    }

    .control {
      -webkit-appearance: none;
      color: inherit;
      background: transparent;
      border: 0;
      height: calc(100% - 4px);
      margin-top: auto;
      margin-bottom: auto;
      padding: 0 calc(${designUnit} * 2px + 1px);
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
    }

    .start,
    .end {
      margin: auto;
      fill: currentcolor;
    }

    .start {
      display: flex;
      margin-inline-start: 11px;
    }

    .end {
      display: flex;
      margin-inline-end: 11px;
    }

    .controls {
      opacity: 0;
      position: relative;
      top: -1px;
      z-index: 3;
    }

    :host(:hover:not([disabled])) .controls,
    :host(:focus-within:not([disabled])) .controls {
      opacity: 1;
    }

    .step-up,
    .step-down {
      display: flex;
      padding: 0 8px;
      cursor: pointer;
    }

    .step-up {
      padding-top: 3px;
    }
  `.withBehaviors(
    appearanceBehavior('filled', numberFieldFilledStyles(context, definition)),
    forcedColorsStylesheetBehavior(
      css`
        ${inputForcedColorStyles(context, definition, '.root')}
        .step-up,
        .step-down {
          fill: ${SystemColors.FieldText};
        }
      `,
    ),
  );
