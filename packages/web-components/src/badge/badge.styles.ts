import { css, ElementStyles } from '@microsoft/fast-element';
import { display, ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import {
  accentFillRest,
  bodyFont,
  controlCornerRadius,
  designUnit,
  foregroundOnAccentRest,
  neutralFillSecondaryRest,
  neutralForegroundRest,
  strokeWidth,
  typeRampMinus1FontSize,
  typeRampMinus1LineHeight,
} from '../design-tokens';

export const badgeStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    ${display('inline-block')} :host {
      box-sizing: border-box;
      font-family: ${bodyFont};
      font-size: ${typeRampMinus1FontSize};
      line-height: ${typeRampMinus1LineHeight};
    }

    .control {
      border-radius: calc(${controlCornerRadius} * 1px);
      padding: calc(((${designUnit} * 0.5) - ${strokeWidth}) * 1px) calc((${designUnit} - ${strokeWidth}) * 1px);
      border: calc(${strokeWidth} * 1px) solid transparent;
    }

    :host(.lightweight) .control {
      background: transparent;
      color: ${neutralForegroundRest};
      font-weight: 600;
    }

    :host(.accent) .control {
      background: ${accentFillRest};
      color: ${foregroundOnAccentRest};
    }

    :host(.neutral) .control {
      background: ${neutralFillSecondaryRest};
      color: ${neutralForegroundRest};
    }

    :host([circular]) .control {
      border-radius: 100px;
      min-width: calc(${typeRampMinus1LineHeight} - calc(${designUnit} * 1px));
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;
