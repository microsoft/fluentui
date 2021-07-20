import { css, ElementStyles } from '@microsoft/fast-element';
import { display, ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import {
  bodyFont,
  designUnit,
  neutralForegroundRest,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
} from '../design-tokens';

export const accordionStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    ${display('flex')} :host {
      box-sizing: border-box;
      flex-direction: column;
      font-family: ${bodyFont};
      font-size: ${typeRampBaseFontSize};
      line-height: ${typeRampBaseLineHeight};
      color: ${neutralForegroundRest};
      gap: calc(${designUnit} * 1px);
    }
  `;
