import { css, ElementStyles } from '@microsoft/fast-element';
import {
  ElementDefinitionContext,
  forcedColorsStylesheetBehavior,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { fillColor, neutralStrokeDividerRest, strokeWidth } from '../design-tokens';

export const dataGridRowStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    :host {
      display: grid;
      padding: 1px 0;
      box-sizing: border-box;
      width: 100%;
      border-bottom: calc(${strokeWidth} * 1px) solid ${neutralStrokeDividerRest};
    }

    :host(.header) {
    }

    :host(.sticky-header) {
      background: ${fillColor};
      position: sticky;
      top: 0;
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host {
        }
      `,
    ),
  );
