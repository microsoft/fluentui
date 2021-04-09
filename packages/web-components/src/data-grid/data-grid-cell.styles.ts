import { css } from '@microsoft/fast-element';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import { neutralFocusBehavior, neutralForegroundActiveBehavior, neutralForegroundRestBehavior } from '../styles';

export const DataGridCellStyles = css`
    :host {
        padding: calc(var(--design-unit) * 1px) calc(var(--design-unit) * 3px);
        color: ${neutralForegroundRestBehavior.var};
        box-sizing: border-box;
        font-family: var(--body-font);
        font-size: var(--type-ramp-base-font-size);
        line-height: var(--type-ramp-base-line-height);
        font-weight: 400;
        border: transparent calc(var(--outline-width) * 1px) solid;
        overflow: hidden;
        white-space: nowrap;
        border-radius: calc(var(--corner-radius) * 1px);
    }

    :host(.column-header) {
        font-weight: 600;
    }

    :host(:${focusVisible}) {
        border: ${neutralFocusBehavior.var} calc(var(--outline-width) * 1px) solid;
        color: ${neutralForegroundActiveBehavior.var};
    }

`.withBehaviors(
  neutralFocusBehavior,
  neutralForegroundActiveBehavior,
  neutralForegroundRestBehavior,
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
