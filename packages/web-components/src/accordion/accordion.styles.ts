import { css, ElementStyles } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import type { ElementDefinitionContext, FoundationElementDefinition } from "@microsoft/fast-foundation";
import {
  bodyFont,
  neutralForegroundRest,
  neutralStrokeDividerRest,
  strokeWidth,
  typeRampMinus1FontSize,
  typeRampMinus1LineHeight,
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
      font-size: ${typeRampMinus1FontSize};
      line-height: ${typeRampMinus1LineHeight};
      color: ${neutralForegroundRest};
      border-top: calc(${strokeWidth} * 1px) solid ${neutralStrokeDividerRest};
    }
  `;
