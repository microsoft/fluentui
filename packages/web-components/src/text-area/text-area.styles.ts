import { css, ElementStyles } from '@microsoft/fast-element';
import {
  display,
  ElementDefinitionContext,
  forcedColorsStylesheetBehavior,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import {
  baseInputStyles,
  heightNumber,
  inputFilledStyles,
  inputForcedColorStyles,
  inputOutlineStyles,
  inputStateStyles,
} from '../styles';
import { appearanceBehavior } from '../utilities/behaviors';
import { designUnit } from '../design-tokens';

const logicalControlSelector: string = '.control';

export const textAreaStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) =>
  css`
    ${display('inline-flex')}

    ${baseInputStyles(context, definition, logicalControlSelector)}

    ${inputStateStyles(context, definition, logicalControlSelector)}

    :host {
      flex-direction: column;
      vertical-align: bottom;
    }

    .control {
      height: calc((${heightNumber} * 2) * 1px);
      padding: calc(${designUnit} * 1.5px) calc(${designUnit} * 2px + 1px);
    }

    :host .control {
      resize: none;
    }

    :host(.resize-both) .control {
      resize: both;
    }

    :host(.resize-horizontal) .control {
      resize: horizontal;
    }

    :host(.resize-vertical) .control {
      resize: vertical;
    }

    :host([cols]) {
      width: initial;
    }

    :host([rows]) .control {
      height: initial;
    }
  `.withBehaviors(
    appearanceBehavior('outline', inputOutlineStyles(context, definition, logicalControlSelector)),
    appearanceBehavior('filled', inputFilledStyles(context, definition, logicalControlSelector)),
    forcedColorsStylesheetBehavior(inputForcedColorStyles(context, definition, logicalControlSelector)),
  );
