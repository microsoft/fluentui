import { css } from '@microsoft/fast-element';
import { disabledCursor, display, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { heightNumber } from '../styles';
import {
  designUnit,
  controlCornerRadius,
  strokeWidth,
  neutralStrokeRest,
  neutralFillInputRest,
  bodyFont,
  neutralForeground,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
  neutralFillInputHover,
  neutralStrokeHover,
  neutralFillInputActive,
  neutralStrokeActive,
  focusStrokeOuter,
  disabledOpacity,
  fillColor,
} from '../design-tokens';

export const checkboxStyles = (context, definition) =>
  css`
    ${display('inline-flex')} :host {
        align-items: center;
        outline: none;
        margin: calc(${designUnit} * 1px) 0;
        ${
          /*
           * Chromium likes to select label text or the default slot when
           * the checkbox is clicked. Maybe there is a better solution here?
           */ ''
        } user-select: none;
    }

    .control {
        position: relative;
        width: calc((${heightNumber} / 2 + ${designUnit}) * 1px);
        height: calc((${heightNumber} / 2 + ${designUnit}) * 1px);
        box-sizing: border-box;
        border-radius: calc(${controlCornerRadius} * 1px);
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
        font-family: ${bodyFont};
        color: ${neutralForeground};
        ${
          /* Need to discuss with Brian how HorizontalSpacingNumber can work. https://github.com/microsoft/fast/issues/2766 */ ''
        } padding-inline-start: calc(${designUnit} * 2px + 2px);
        margin-inline-end: calc(${designUnit} * 2px + 2px);
        cursor: pointer;
        font-size: ${typeRampBaseFontSize};
        line-height: ${typeRampBaseLineHeight};
    }

    .checked-indicator {
        width: 100%;
        height: 100%;
        display: block;
        fill: ${neutralForeground};
        opacity: 0;
        pointer-events: none;
    }

    .indeterminate-indicator {
        border-radius: calc((${controlCornerRadius} / 2) * 1px);
        background: ${neutralForeground};
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50%;
        height: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
    }

    :host(:enabled) .control:hover {
        background: ${neutralFillInputHover};
        border-color: ${neutralStrokeHover};
    }

    :host(:enabled) .control:active {
        background: ${neutralFillInputActive};
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

    :host(.checked:not(.indeterminate)) .checked-indicator,
    :host(.indeterminate) .indeterminate-indicator {
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
            .checked-indicator {
                fill: ${SystemColors.FieldText};
            }
            .indeterminate-indicator {
                background: ${SystemColors.FieldText};
            }
            :host(:${focusVisible}) .control {
                border-color: ${SystemColors.Highlight};
                box-shadow: 0 0 0 2px ${SystemColors.Field}, 0 0 0 4px ${SystemColors.FieldText};
            }
            :host(.checked:${focusVisible}:enabled) .control {
                box-shadow: 0 0 0 2px ${SystemColors.Field}, 0 0 0 4px ${SystemColors.FieldText};
            }
            :host(.checked) .control {
                background: ${SystemColors.Highlight};
                border-color: ${SystemColors.Highlight};
            }
            :host(.checked) .control:hover, .control:active {
                background: ${SystemColors.HighlightText};
            }
            :host(.checked) .checked-indicator {
                fill: ${SystemColors.HighlightText};
            }
            :host(.checked) .control:hover .checked-indicator {
                fill: ${SystemColors.Highlight}
            }
            :host(.checked) .indeterminate-indicator {
                background: ${SystemColors.HighlightText};
            }
            :host(.checked) .control:hover .indeterminate-indicator {
                background: ${SystemColors.Highlight}
            }
            :host(.disabled) {
                opacity: 1;
            }
            :host(.disabled) .control {
                forced-color-adjust: none;
                border-color: ${SystemColors.GrayText};
                background: ${SystemColors.Field};
            }
            :host(.disabled) .indeterminate-indicator,
            :host(.checked.disabled) .control:hover .indeterminate-indicator {
                forced-color-adjust: none;
                background: ${SystemColors.GrayText};
            }
            :host(.disabled) .checked-indicator,
            :host(.checked.disabled) .control:hover .checked-indicator {
                forced-color-adjust: none;
                fill: ${SystemColors.GrayText};
            }
        `,
    ),
  );
