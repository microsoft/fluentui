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
  neutralForegroundRest,
} from '../design-tokens';
import { typeRampBase } from '../styles/patterns/type-ramp';
import { insetFocusTreatment } from '../styles/patterns/focus';

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
      overflow: hidden;
      white-space: nowrap;
      border-radius: calc(${controlCornerRadius} * 1px);
    }

    :host(.column-header) {
      font-weight: 600;
    }

    :host(:${focusVisible}) {
      ${insetFocusTreatment}
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
