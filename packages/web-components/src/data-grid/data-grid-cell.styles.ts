import { css, ElementStyles } from '@microsoft/fast-element';
import { SystemColors } from '@microsoft/fast-web-utilities';
import {
  ElementDefinitionContext,
  focusVisible,
  forcedColorsStylesheetBehavior,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import {
  controlCornerRadius,
  designUnit,
  focusStrokeOuter,
  focusStrokeWidth,
  neutralForegroundRest,
} from '../design-tokens';
import { typeRampBase } from '../styles/patterns/type-ramp';

export const dataGridCellStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    :host {
      padding: calc(${designUnit} * 1px) calc(${designUnit} * 3px);
      color: ${neutralForegroundRest};
      box-sizing: border-box;
      ${typeRampBase}
      border: transparent calc(${focusStrokeWidth} * 1px) solid;
      overflow: hidden;
      outline: none;
      white-space: nowrap;
      border-radius: calc(${controlCornerRadius} * 1px);
    }

    :host(.column-header) {
      font-weight: 600;
    }

    :host(:${focusVisible}) {
      border-color: ${focusStrokeOuter};
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host {
          forced-color-adjust: none;
          border-color: transparent;
          background: ${SystemColors.Field};
          color: ${SystemColors.FieldText};
        }

        :host(:${focusVisible}) {
          border-color: ${SystemColors.FieldText};
          box-shadow: 0 0 0 2px inset ${SystemColors.Field};
          color: ${SystemColors.FieldText};
        }
      `,
    ),
  );
