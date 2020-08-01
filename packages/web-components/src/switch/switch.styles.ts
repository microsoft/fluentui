import { css } from '@microsoft/fast-element';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { disabledCursor, display, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import {
  accentFillActiveBehavior,
  accentFillHoverBehavior,
  accentFillRestBehavior,
  accentForegroundCutRestBehavior,
  heightNumber,
  neutralFillInputActiveBehavior,
  neutralFillInputHoverBehavior,
  neutralFillInputRestBehavior,
  neutralFocusBehavior,
  neutralForegroundRestBehavior,
  neutralOutlineActiveBehavior,
  neutralOutlineHoverBehavior,
  neutralOutlineRestBehavior,
} from '../styles';

export const SwitchStyles = css`
    :host([hidden]) {
        display: none;
    }

    ${display('inline-flex')} :host {
        align-items: center;
        outline: none;
        font-family: var(--body-font);
        margin: calc(var(--design-unit) * 1px) 0;
        ${
          /*
           * Chromium likes to select label text or the default slot when
           * the checkbox is clicked. Maybe there is a better solution here?
           */ ''
        } user-select: none;
    }

    :host(.disabled) {
        opacity: var(--disabled-opacity);
    }

    :host(.disabled) .label,
    :host(.readonly) .label,
    :host(.readonly) .switch,
    :host(.disabled) .switch {
        cursor: ${disabledCursor};
    }

    .switch {
        position: relative;
        outline: none;
        box-sizing: border-box;
        width: calc(((${heightNumber} / 2) + var(--design-unit)) * 2px);
        height: calc(((${heightNumber} / 2) + var(--design-unit)) * 1px);
        background: ${neutralFillInputRestBehavior.var};
        border-radius: calc(${heightNumber} * 1px);
        border: calc(var(--outline-width) * 1px) solid ${neutralOutlineRestBehavior.var};
    }

    :host(:enabled) .switch:hover {
        background: ${neutralFillInputHoverBehavior.var};
        border-color: ${neutralOutlineHoverBehavior.var};
        cursor: pointer;
    }

    :host(:enabled) .switch:active {
        background: ${neutralFillInputActiveBehavior.var};
        border-color: ${neutralOutlineActiveBehavior.var};
    }

    :host(:${focusVisible}) .switch {
        box-shadow: 0 0 0 2px var(--background-color), 0 0 0 4px ${neutralFocusBehavior.var};
        border-color: ${neutralFocusBehavior.var};
    }

    .checked-indicator {
        position: absolute;
        height: calc((${heightNumber} - (var(--design-unit) * 5.5)) * 1px);
        width: calc((${heightNumber} - (var(--design-unit) * 5.5)) * 1px);
        top: calc(var(--design-unit) * 1px);
        left: calc(var(--design-unit) * 1px);
        background: ${neutralForegroundRestBehavior.var};
        border-radius: 50%;
        transition: all 0.2s ease-in-out;
    }

    .status-message {
        color: ${neutralForegroundRestBehavior.var};
        cursor: pointer;
        font-size: var(--type-ramp-base-font-size);
        line-height: var(--type-ramp-base-line-height);
    }

    .label__hidden {
        display: none;
        visibility: hidden;
    }

    .label {
        color: ${neutralForegroundRestBehavior.var};
        font-size: var(--type-ramp-base-font-size);
        line-height: var(--type-ramp-base-line-height);
    }

    ::slotted(*) {
        ${
          /* Need to discuss with Brian how HorizontalSpacingNumber can work. https://github.com/microsoft/fast/issues/2766 */ ''
        } margin-inline-start: calc(var(--design-unit) * 2px + 2px);
    }

    :host(.checked) .checked-indicator {
        left: calc((((${heightNumber} / 2) + var(--design-unit)) + var(--design-unit)) * 1px);
        background: ${accentForegroundCutRestBehavior.var};
    }

    :host(.checked) .switch {
        background: ${accentFillRestBehavior.var};
    }

    :host(.checked:enabled) .switch:hover {
        background: ${accentFillHoverBehavior.var};
    }

    :host(.checked:enabled) .switch:active {
        background: ${accentFillActiveBehavior.var};
    }

    :host(.checked:${focusVisible}:enabled) .switch {
        box-shadow: 0 0 0 2px var(--background-color), 0 0 0 4px ${neutralFocusBehavior.var};
        border-color: transparent;
    }

    .unchecked-message {
        display: block;
    }

    .checked-message {
        display: none;
    }

    :host(.checked) .unchecked-message {
        display: none;
    }

    :host(.checked) .checked-message {
        display: block;
    }
`.withBehaviors(
  accentFillActiveBehavior,
  accentFillHoverBehavior,
  accentFillRestBehavior,
  accentForegroundCutRestBehavior,
  neutralFillInputActiveBehavior,
  neutralFillInputHoverBehavior,
  neutralFillInputRestBehavior,
  neutralFocusBehavior,
  neutralForegroundRestBehavior,
  neutralOutlineActiveBehavior,
  neutralOutlineHoverBehavior,
  neutralOutlineRestBehavior,
  forcedColorsStylesheetBehavior(
    css`
            .checked-indicator,
            :host(:enabled) .switch:active .checked-indicator {
                forced-color-adjust: none;
                background: ${SystemColors.FieldText};
            }
            .switch {
                forced-color-adjust: none;
                background: ${SystemColors.Field};
                border-color: ${SystemColors.FieldText};
            }
            :host(:enabled) .switch:hover {
                background: ${SystemColors.HighlightText};
                border-color: ${SystemColors.Highlight};
            }
            :host(.checked) .switch {
                background: ${SystemColors.Highlight};
                border-color: ${SystemColors.Highlight};
            }
            :host(.checked:enabled) .switch:hover,
            :host(:enabled) .switch:active {
                background: ${SystemColors.HighlightText};
                border-color: ${SystemColors.Highlight};
            }
            :host(.checked) .checked-indicator {
                background: ${SystemColors.HighlightText};
            }
            :host(.checked:enabled) .switch:hover .checked-indicator {
                background: ${SystemColors.Highlight};
            }
            :host(:${focusVisible}) .switch {
                border-color: ${SystemColors.Highlight};
                box-shadow: 0 0 0 2px ${SystemColors.Field}, 0 0 0 4px ${SystemColors.FieldText};
            }
            :host(.checked:${focusVisible}:enabled) .switch {
                box-shadow: 0 0 0 2px ${SystemColors.Field}, 0 0 0 4px ${SystemColors.FieldText};
            }
            :host(.disabled) {
                opacity: 1;
            }
            :host(.disabled) .checked-indicator {
                background: ${SystemColors.GrayText};
            }
            :host(.disabled) .switch {
                background: ${SystemColors.Field};
                border-color: ${SystemColors.GrayText};
            }
        `,
  ),
);
