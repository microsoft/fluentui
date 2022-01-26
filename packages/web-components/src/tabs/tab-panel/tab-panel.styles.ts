import { css, ElementStyles } from '@microsoft/fast-element';
import { display, ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { bodyFont, density, designUnit, typeRampBaseFontSize, typeRampBaseLineHeight } from '../../design-tokens';

export const tabPanelStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) => css`
  ${display('block')} :host {
    box-sizing: border-box;
    font-family: ${bodyFont};
    font-size: ${typeRampBaseFontSize};
    font-weight: 400;
    line-height: ${typeRampBaseLineHeight};
    padding: 0 calc((6 + (${designUnit} * 2 * ${density})) * 1px);
  }
`;
