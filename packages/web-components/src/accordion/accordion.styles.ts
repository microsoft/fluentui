import { css, ElementStyles } from '@microsoft/fast-element';
import { display, ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designUnit, neutralForegroundRest } from '../design-tokens';
import { typeRampBase } from '../styles/patterns/type-ramp';

export const accordionStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    ${display('flex')} :host {
      box-sizing: border-box;
      flex-direction: column;
      ${typeRampBase}
      color: ${neutralForegroundRest};
      gap: calc(${designUnit} * 1px);
    }
  `;
