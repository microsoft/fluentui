import { css, ElementStyles } from '@microsoft/fast-element';
import {
  display,
  ElementDefinitionContext,
  forcedColorsStylesheetBehavior,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { elevation } from '../styles';
import { fillColor, layerCornerRadius } from '../design-tokens';

export const cardStyles: (context: ElementDefinitionContext, definition: FoundationElementDefinition) => ElementStyles =
  (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
    css`
      ${display('block')} :host {
        --elevation: 4;
        display: block;
        contain: content;
        height: var(--card-height, 100%);
        width: var(--card-width, 100%);
        box-sizing: border-box;
        background: ${fillColor};
        border-radius: calc(${layerCornerRadius} * 1px);
        ${elevation}
      }

      :host(:hover) {
        --elevation: 8;
      }

      :host(:focus-within) {
        --elevation: 8;
      }

      :host {
        content-visibility: auto;
      }
    `.withBehaviors(
      forcedColorsStylesheetBehavior(
        css`
          :host {
            forced-color-adjust: none;
            background: ${SystemColors.Canvas};
            box-shadow: 0 0 0 1px ${SystemColors.CanvasText};
          }
        `,
      ),
    );
