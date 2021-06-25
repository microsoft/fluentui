import { css, ElementStyles } from '@microsoft/fast-element';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { disabledCursor, display, ElementDefinitionContext, focusVisible, forcedColorsStylesheetBehavior, SwitchOptions } from '@microsoft/fast-foundation';
import { DirectionalStyleSheetBehavior, heightNumber } from '../styles';
import {
  accentFillActive,
  accentFillHover,
  accentFillRest,
  bodyFont,
  designUnit,
  disabledOpacity,
  fillColor,
  focusStrokeOuter,
  foregroundOnAccentRest,
  neutralFillInputActive,
  neutralFillInputHover,
  neutralFillInputRest,
  neutralForegroundRest,
  neutralStrokeActive,
  neutralStrokeHover,
  neutralStrokeRest,
  strokeWidth,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
} from '../design-tokens';

export const switchStyles: (context: ElementDefinitionContext, defintiion: SwitchOptions) => ElementStyles = (context: ElementDefinitionContext, defintiion: SwitchOptions) =>
  css`
    :host([hidden]) {
        display: none;
    }

    ${display('inline-flex')} :host {
        align-items: center;
        outline: none;
        font-family: ${bodyFont};
        margin: calc(${designUnit} * 1px) 0;
        ${
          /*
           * Chromium likes to select label text or the default slot when
           * the checkbox is clicked. Maybe there is a better solution here?
           */ ''
        } user-select: none;
    }

    :host(.disabled) {
        opacity: ${disabledOpacity};
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
        width: calc(((${heightNumber} / 2) + ${designUnit}) * 2px);
        height: calc(((${heightNumber} / 2) + ${designUnit}) * 1px);
        background: ${neutralFillInputRest};
        border-radius: calc(${heightNumber} * 1px);
        border: calc(${strokeWidth} * 1px) solid ${neutralStrokeRest};
    }

    :host(:enabled) .switch:hover {
        background: ${neutralFillInputHover};
        border-color: ${neutralStrokeHover};
        cursor: pointer;
    }

    :host(:enabled) .switch:active {
        background: ${neutralFillInputActive};
        border-color: ${neutralStrokeActive};
    }

    :host(:${focusVisible}) .switch {
        box-shadow: 0 0 0 2px ${fillColor}, 0 0 0 4px ${focusStrokeOuter};
        border-color: ${focusStrokeOuter};
    }

    .checked-indicator {
        position: absolute;
        height: calc((${heightNumber} - (${designUnit} * 5.5)) * 1px);
        width: calc((${heightNumber} - (${designUnit} * 5.5)) * 1px);
        top: calc(${designUnit} * 1px);
        background: ${neutralForegroundRest};
        border-radius: 50%;
        transition: all 0.2s ease-in-out;
    }

    .status-message {
        color: ${neutralForegroundRest};
        cursor: pointer;
        font-size: ${typeRampBaseFontSize};
        line-height: ${typeRampBaseLineHeight};
    }

    .label__hidden {
        display: none;
        visibility: hidden;
    }

    .label {
        color: ${neutralForegroundRest};
        font-size: ${typeRampBaseFontSize};
        line-height: ${typeRampBaseLineHeight};
        margin-inline-end: calc(${designUnit} * 2px + 2px);
        cursor: pointer;
    }

    ::slotted(*) {
        ${
          /* Need to discuss with Brian how HorizontalSpacingNumber can work. https://github.com/microsoft/fast/issues/2766 */ ''
        } margin-inline-start: calc(${designUnit} * 2px + 2px);
    }

    :host([aria-checked="true"]) .checked-indicator {
        background: ${foregroundOnAccentRest};
    }

    :host([aria-checked="true"]) .switch {
        background: ${accentFillRest};
    }

    :host([aria-checked="true"]:enabled) .switch:hover {
        background: ${accentFillHover};
    }

    :host([aria-checked="true"]:enabled) .switch:active {
        background: ${accentFillActive};
    }

    :host([aria-checked="true"]:${focusVisible}:enabled) .switch {
        box-shadow: 0 0 0 2px ${fillColor}, 0 0 0 4px ${focusStrokeOuter};
        border-color: transparent;
    }

    .unchecked-message {
        display: block;
    }

    .checked-message {
        display: none;
    }

    :host([aria-checked="true"]) .unchecked-message {
        display: none;
    }

    :host([aria-checked="true"]) .checked-message {
        display: block;
    }
`.withBehaviors(
    new DirectionalStyleSheetBehavior(
      css`
        .checked-indicator {
          left: calc(${designUnit} * 1px);
        }

        :host([aria-checked='true']) .checked-indicator {
          left: calc((((${heightNumber} / 2) + ${designUnit}) + ${designUnit}) * 1px);
        }
      `,
      css`
        .checked-indicator {
          right: calc(${designUnit} * 1px);
        }

        :host([aria-checked='true']) .checked-indicator {
          right: calc((((${heightNumber} / 2) + ${designUnit}) + ${designUnit}) * 1px);
        }
      `,
    ),
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
            .status-message,
            .label {
              color: ${SystemColors.FieldText};
          }
        `,
    ),
  );
