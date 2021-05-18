import { css } from '@microsoft/fast-element';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import {
  bodyFont,
  cornerRadius,
  designUnit,
  neutralFocus,
  neutralForegroundRest,
  outlineWidth,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
} from '../design-tokens';

export const dataGridCellStyles = (context, definition) =>
  css`
    :host {
        padding: calc(${designUnit} * 1px) calc(${designUnit} * 3px);
        color: ${neutralForegroundRest};
        box-sizing: border-box;
        font-family: ${bodyFont};
        font-size: ${typeRampBaseFontSize};
        line-height: ${typeRampBaseLineHeight};
        font-weight: 400;
        border: transparent calc(${outlineWidth} * 1px) solid;
        overflow: hidden;
        white-space: nowrap;
        border-radius: calc(${cornerRadius} * 1px);
    }

    :host(.column-header) {
        font-weight: 600;
    }

    :host(:${focusVisible}) {
        border: ${neutralFocus} calc(${outlineWidth} * 1px) solid;
        color: ${neutralForegroundRest};
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
