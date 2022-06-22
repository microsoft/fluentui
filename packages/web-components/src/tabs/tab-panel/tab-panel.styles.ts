import { css, ElementStyles } from '@microsoft/fast-element';
import { display, ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { density, designUnit } from '../../design-tokens';
import { typeRampBase } from '../../styles/patterns/type-ramp';

export const tabPanelStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) => css`
  ${display('block')} :host {
    box-sizing: border-box;
    ${typeRampBase}
    padding: 0 calc((6 + (${designUnit} * 2 * ${density})) * 1px);
  }
`;
