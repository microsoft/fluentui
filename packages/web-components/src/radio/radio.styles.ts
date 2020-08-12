import { css } from '@microsoft/fast-element';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { disabledCursor, display, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import {
  heightNumber,
  neutralFillActiveBehavior,
  neutralFillInputActiveBehavior,
  neutralFillInputHoverBehavior,
  neutralFillInputRestBehavior,
  neutralFocusBehavior,
  neutralForegroundRestBehavior,
  neutralOutlineActiveBehavior,
  neutralOutlineHoverBehavior,
  neutralOutlineRestBehavior,
} from '../styles';

export const RadioStyles = css`
    ${display('inline-flex')} :host {
        --input-size: calc((${heightNumber} / 2) + var(--design-unit));
        align-items: center;
        outline: none;
        margin: calc(var(--design-unit) * 1px) 0;
        ${
          /*
           * Chromium likes to select label text or the default slot when
           * the radio button is clicked. Maybe there is a better solution here?
           */ ''
        } user-select: none;
        position: relative;
        flex-direction: row;
        transition: all 0.2s ease-in-out;
    }

    .control {
        position: relative;
        width: calc(var(--input-size) * 1px);
        height: calc(var(--input-size) * 1px);
        box-sizing: border-box;
        border-radius: 50%;
        border: calc(var(--outline-width) * 1px) solid ${neutralOutlineRestBehavior.var};
        background: ${neutralFillInputRestBehavior.var};
        outline: none;
        cursor: pointer;
    }

    .label__hidden {
        display: none;
        visibility: hidden;
    }

    .label {
        font-family: var(--body-font);
        color: ${neutralForegroundRestBehavior.var};
        ${
          /* Need to discuss with Brian how HorizontalSpacingNumber can work. https://github.com/microsoft/fast/issues/2766 */ ''
        } padding-inline-start: calc(var(--design-unit) * 2px + 2px);
        margin-inline-end: calc(var(--design-unit) * 2px + 2px);
        cursor: pointer;
        font-size: var(--type-ramp-base-font-size);
        line-height: var(--type-ramp-base-line-height);
    }

    .control, .checked-indicator {
      flex-shrink: 0;
    }

    .checked-indicator {
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        border-radius: 50%;
        display: inline-block;
        background: ${neutralForegroundRestBehavior.var};
        fill: ${neutralForegroundRestBehavior.var};
        opacity: 0;
        pointer-events: none;
    }

    :host(:enabled) .control:hover{
        background: ${neutralFillInputHoverBehavior.var};
        border-color: ${neutralOutlineHoverBehavior.var};
    }

    :host(:enabled) .control:active {
        background: ${neutralFillInputActiveBehavior.var};
        border-color: ${neutralOutlineActiveBehavior.var};
    }

    :host(:${focusVisible}) .control {
        box-shadow: 0 0 0 2px var(--background-color), 0 0 0 4px ${neutralFocusBehavior.var};
        border-color: ${neutralFocusBehavior.var};
    }

    :host(.disabled) .label,
    :host(.readonly) .label,
    :host(.readonly) .control,
    :host(.disabled) .control {
        cursor: ${disabledCursor};
    }

    :host(.checked) .checked-indicator {
        opacity: 1;
    }

    :host(.disabled) {
        opacity: var(--disabled-opacity);
    }
`.withBehaviors(
  neutralFillActiveBehavior,
  neutralFillInputHoverBehavior,
  neutralFillInputRestBehavior,
  neutralFocusBehavior,
  neutralForegroundRestBehavior,
  neutralOutlineActiveBehavior,
  neutralOutlineHoverBehavior,
  neutralOutlineRestBehavior,
  neutralFillInputActiveBehavior,
  forcedColorsStylesheetBehavior(
    css`
            .control {
                forced-color-adjust: none;
                border-color: ${SystemColors.FieldText};
                background: ${SystemColors.Field};
            }
            :host(:enabled) .control:hover, .control:active {
                border-color: ${SystemColors.Highlight};
                background: ${SystemColors.Field};
            }
            :host(:${focusVisible}) .control {
                border-color: ${SystemColors.Highlight};
                box-shadow: 0 0 0 2px ${SystemColors.Field}, 0 0 0 4px ${SystemColors.FieldText};
            }
            :host(.checked:${focusVisible}:enabled) .control {
                border-color: ${SystemColors.Highlight};
                box-shadow: 0 0 0 2px ${SystemColors.Field}, 0 0 0 4px ${SystemColors.FieldText};
            }
            :host(.checked:enabled) .control:hover, .control:active {
                border-color: ${SystemColors.Highlight};
                background: ${SystemColors.Highlight};
            }
            :host(.checked) .checked-indicator {
                background: ${SystemColors.Highlight};
                fill: ${SystemColors.Highlight};
            }
            :host(.checked) .control:hover .checked-indicator {
                background: ${SystemColors.HighlightText};
                fill: ${SystemColors.HighlightText};
            }
            :host(.disabled) {
                forced-color-adjust: none;
                opacity: 1;
            }
            :host(.disabled) .label {
                color: ${SystemColors.GrayText};
            }
            :host(.disabled) .control,
            :host(.checked.disabled) .control:hover, .control:active {
                background: ${SystemColors.Field};
                border-color: ${SystemColors.GrayText};
            }
            :host(.disabled) .checked-indicator,
            :host(.checked.disabled) .control:hover .checked-indicator {
                fill: ${SystemColors.GrayText};
                background: ${SystemColors.GrayText};
            }
        `,
  ),
);
