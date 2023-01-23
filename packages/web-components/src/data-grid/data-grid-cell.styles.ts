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
  focusStrokeWidth,
  neutralForegroundRest,
  strokeWidth,
} from '../design-tokens';
import { typeRampBase } from '../styles/patterns/type-ramp';
import { focusTreatmentBase } from '../styles/focus';

export const dataGridCellStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    :host {
      padding: calc((${designUnit} + ${focusStrokeWidth} - ${strokeWidth}) * 1px) calc(((${designUnit} * 3) + ${focusStrokeWidth} - ${strokeWidth}) * 1px);
      color: ${neutralForegroundRest};
      box-sizing: border-box;
      ${typeRampBase}
      border: transparent calc(${strokeWidth} * 1px) solid;
      overflow: hidden;
      white-space: nowrap;
      border-radius: calc(${controlCornerRadius} * 1px);
    }

    :host(.column-header) {
      font-weight: 600;
    }

    :host(:${focusVisible}) {
      ${focusTreatmentBase}
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host {
          forced-color-adjust: none;
          background: ${SystemColors.Field};
          color: ${SystemColors.FieldText};
        }

        :host(:${focusVisible}) {
          outline-color: ${SystemColors.FieldText};
        }
      `,
    ),
  );
