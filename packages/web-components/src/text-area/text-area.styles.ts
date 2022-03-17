import { css, ElementStyles } from '@microsoft/fast-element';
import {
  display,
  ElementDefinitionContext,
  forcedColorsStylesheetBehavior,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import {
  heightNumber,
  inputFilledForcedColorStyles,
  inputFilledStyles,
  inputForcedColorStyles,
  inputStateStyles,
  inputStyles,
} from '../styles';
import { appearanceBehavior } from '../utilities/behaviors';
import { designUnit } from '../design-tokens';

export const textAreaFilledStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    ${inputFilledStyles(context, definition, '.control')}
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        ${inputFilledForcedColorStyles(context, definition, '.control')}
      `,
    ),
  );

export const textAreaStyles = (context, definition) =>
  css`
    ${display('inline-flex')}

    ${inputStyles(context, definition, '.control')}

    ${inputStateStyles(context, definition, '.control')}

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
  `.withBehaviors(
    appearanceBehavior('filled', textAreaFilledStyles(context, definition)),
    forcedColorsStylesheetBehavior(
      css`
        ${inputForcedColorStyles(context, definition, '.control')}
      `,
    ),
  );
