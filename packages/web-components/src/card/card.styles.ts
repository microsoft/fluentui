import { css, ElementStyles } from '@microsoft/fast-element';
import {
  display,
  ElementDefinitionContext,
  forcedColorsStylesheetBehavior,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import {
  fillColor,
  layerCornerRadius,
  neutralForegroundRest,
  neutralStrokeLayerRest,
  strokeWidth,
} from '../design-tokens';
import { elevationShadowCardRest } from '../styles';

export const cardStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    ${display('block')} :host {
      display: block;
      contain: content;
      height: var(--card-height, 100%);
      width: var(--card-width, 100%);
      box-sizing: border-box;
      background: ${fillColor};
      color: ${neutralForegroundRest};
      border: calc(${strokeWidth} * 1px) solid ${neutralStrokeLayerRest};
      border-radius: calc(${layerCornerRadius} * 1px);
      box-shadow: ${elevationShadowCardRest};
    }

    :host {
      content-visibility: auto;
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host {
          background: ${SystemColors.Canvas};
          color: ${SystemColors.CanvasText};
        }
      `,
    ),
  );
