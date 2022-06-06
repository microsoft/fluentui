import { css, ElementStyles } from '@microsoft/fast-element';
import { display, ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { neutralStrokeDividerRest, strokeWidth } from '../design-tokens';

export const dividerStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    ${display('block')} :host {
      box-sizing: content-box;
      height: 0;
      border: none;
      border-top: calc(${strokeWidth} * 1px) solid ${neutralStrokeDividerRest};
    }
  `;
