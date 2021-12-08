import { css, ElementStyles } from '@microsoft/fast-element';
import {
  Button,
  display,
  ElementDefinitionContext,
  forcedColorsStylesheetBehavior,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import {
  inputFilledForcedColorStyles,
  inputFilledStyles,
  inputForcedColorStyles,
  inputStateStyles,
  inputStyles,
} from '../styles';
import { appearanceBehavior } from '../utilities/behaviors';
import { designUnit } from '../design-tokens';
import { DirectionalStyleSheetBehavior } from '../styles';

/**
 * LTR styles for calendar
 * @internal
 */
 const ltrStyles = css`
 .clear-button {
   right: 1px;
 }
 `;

 /**
  * RTL styles for calendar
  * @internal
  */
 const rtlStyles = css`
 .clear-button {
  left: 1px;
 }
 `;

export const searchFilledStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    ${inputFilledStyles(context, definition, '.root')}
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        ${inputFilledForcedColorStyles(context, definition, '.root')}
      `,
    ),
  );

export const searchStyles = (context, definition) =>
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

    .clear-button {
      position: absolute;
      top: 1px;
      height: calc(100% - 3px);
      opacity: 0;
    }

    :host(:hover:not([disabled], [readOnly])) .clear-button,
    :host(:active:not([disabled], [readOnly])) .clear-button,
    :host(:focus-within:not([disabled], [readOnly])) .clear-button {
        opacity: 1;
    }

    :host(:hover:not([disabled], [readOnly])) .clear-button__hidden,
    :host(:active:not([disabled], [readOnly])) .clear-button__hidden,
    :host(:focus-within:not([disabled], [readOnly])) .clear-button__hidden {
        opacity: 0;
    }

    .control::-webkit-search-cancel-button {
      -webkit-appearance: none;
    }

    .input-wrapper {
      display: flex;
      position: relative;
      width: 100%;
    }

    .start,
    .end {
      display: flex;
      margin: 1px;
      align-items: center;
    }

    .start {
      display: flex;
      margin-inline-start: 11px;
    }

    ::slotted([slot="end"]) {
      height: 100%
    }

    .clear-button__hidden {
      opacity: 0;
    }

    .end {
        margin-inline-end: 11px;
    }

    ::slotted(${context.tagFor(Button)}) {
      margin-inline-end: 1px;
    }
  `.withBehaviors(
    appearanceBehavior('filled', searchFilledStyles(context, definition)),
    forcedColorsStylesheetBehavior(
      css`
        ${inputForcedColorStyles(context, definition, '.root')}
      `,
    ),
    new DirectionalStyleSheetBehavior(ltrStyles, rtlStyles)
  );
