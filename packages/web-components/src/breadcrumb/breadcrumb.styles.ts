import { css, ElementStyles } from '@microsoft/fast-element';
import { display, ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { typeRampBase } from '../styles/patterns/type-ramp';

export const breadcrumbStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) => css`
  ${display('inline-block')} :host {
    box-sizing: border-box;
    ${typeRampBase};
  }

  .list {
    display: flex;
  }
`;
