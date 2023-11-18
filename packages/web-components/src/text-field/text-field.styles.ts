import { css, ElementStyles } from '@microsoft/fast-element';
import {
  display,
  ElementDefinitionContext,
  forcedColorsStylesheetBehavior,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import {
  baseInputStyles,
  inputFilledStyles,
  inputForcedColorStyles,
  inputOutlineStyles,
  inputStateStyles,
} from '../styles';
import { appearanceBehavior } from '../utilities/behaviors';
import { designUnit } from '../design-tokens';

const logicalControlSelector: string = '.root';

export const textFieldStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) =>
  css`
    ${display('inline-block')}

    ${baseInputStyles(context, definition, logicalControlSelector)}

    ${inputStateStyles(context, definition, logicalControlSelector)}

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
      display: flex;
      margin: auto;
    }

    .start {
      display: flex;
      margin-inline-start: 11px;
    }

    .end {
      display: flex;
      margin-inline-end: 11px;
    }
  `.withBehaviors(
    appearanceBehavior('outline', inputOutlineStyles(context, definition, logicalControlSelector)),
    appearanceBehavior('filled', inputFilledStyles(context, definition, logicalControlSelector)),
    forcedColorsStylesheetBehavior(inputForcedColorStyles(context, definition, logicalControlSelector)),
  );
