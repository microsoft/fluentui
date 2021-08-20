import { css, ElementStyles } from '@microsoft/fast-element';
import {
  forcedColorsStylesheetBehavior
} from '@microsoft/fast-foundation';
import type { ElementDefinitionContext, FoundationElementDefinition } from "@microsoft/fast-foundation";
import { neutralFillRest, neutralStrokeDividerRest, strokeWidth } from '../design-tokens';

export const dataGridRowStyles: (
  context: ElementDefinitionContext,
  defintion: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, defintion: FoundationElementDefinition) =>
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
      background: ${neutralFillRest};
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
