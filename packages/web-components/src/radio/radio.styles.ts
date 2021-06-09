import { css } from '@microsoft/fast-element';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { disabledCursor, display, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import { heightNumber } from '../styles';
import {
  designUnit,
  strokeWidth,
  neutralStrokeRest,
  neutralFillInputRest,
  neutralForeground,
  neutralFillInputHover,
  neutralStrokeHover,
  neutralFillInputActive,
  neutralStrokeActive,
  focusStrokeOuter,
  disabledOpacity,
  fillColor,
} from '../design-tokens';

export const radioStyles = (context, definition) =>
  css`
    ${display('inline-flex')} :host {
        --input-size: calc((${heightNumber} / 2) + ${designUnit});
        align-items: center;
        outline: none;
        margin: calc(${designUnit} * 1px) 0;
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
        border: calc(${strokeWidth} * 1px) solid ${neutralStrokeRest};
        background: ${neutralFillInputRest};
        outline: none;
        cursor: pointer;
    }

    .label__hidden {
        display: none;
        visibility: hidden;
    }

    .label {
        font-family: var(--body-font);
        color: ${neutralForeground};
        ${
          /* Need to discuss with Brian how HorizontalSpacingNumber can work. https://github.com/microsoft/fast/issues/2766 */ ''
        } padding-inline-start: calc(${designUnit} * 2px + 2px);
        margin-inline-end: calc(${designUnit} * 2px + 2px);
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
        background: ${neutralForeground};
        fill: ${neutralForeground};
        opacity: 0;
        pointer-events: none;
    }

    :host(:enabled) .control:hover{
        background: ${neutralFillInputHover};
        border-color:${neutralStrokeHover};
    }

    :host(:enabled) .control:active {
        background:${neutralFillInputActive};
        border-color: ${neutralStrokeActive};
    }

    :host(:${focusVisible}) .control {
        box-shadow: 0 0 0 2px ${fillColor}, 0 0 0 4px ${focusStrokeOuter};
        border-color: ${focusStrokeOuter};
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
        opacity: ${disabledOpacity};
    }
`.withBehaviors(
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
