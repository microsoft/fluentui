import { css, ElementStyles } from '@microsoft/fast-element';
import { SystemColors } from '@microsoft/fast-web-utilities';
import {
  disabledCursor,
  display,
  ElementDefinitionContext,
  focusVisible,
  forcedColorsStylesheetBehavior,
  RadioOptions,
} from '@microsoft/fast-foundation';
import { heightNumber } from '../styles';
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
  neutralFillInputFocus,
  neutralFillInputHover,
  neutralFillInputRest,
  neutralForegroundRest,
  strokeControlStrongActive,
  strokeControlStrongHover,
  strokeControlStrongRest,
  strokeWidth,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
} from '../design-tokens';

export const radioStyles: (context: ElementDefinitionContext, definition: RadioOptions) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: RadioOptions,
) =>
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
      border: calc(${strokeWidth} * 1px) solid ${strokeControlStrongRest};
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
      color: ${neutralForegroundRest};
      ${
        /* Need to discuss with Brian how HorizontalSpacingNumber can work. https://github.com/microsoft/fast/issues/2766 */ ''
      } padding-inline-start: calc(${designUnit} * 2px + 2px);
      margin-inline-end: calc(${designUnit} * 2px + 2px);
      cursor: pointer;
      font-size: ${typeRampBaseFontSize};
      line-height: ${typeRampBaseLineHeight};
    }

    .control,
    slot[name='checked-indicator'] {
      flex-shrink: 0;
    }

    slot[name='checked-indicator'] {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      fill: ${foregroundOnAccentRest};
      opacity: 0;
      pointer-events: none;
    }

    :host(:enabled:hover) .control {
      background: ${neutralFillInputHover};
      border-color: ${strokeControlStrongHover};
    }

    :host(:enabled:active) .control {
      background: ${neutralFillInputActive};
      border-color: ${strokeControlStrongActive};
    }

    :host(:enabled:active) slot[name='checked-indicator'] {
      opacity: 1;
    }

    :host(:${focusVisible}) .control {
      box-shadow: 0 0 0 1px ${fillColor}, 0 0 0 3px ${focusStrokeOuter};
      background: ${neutralFillInputFocus};
      border-color: ${focusStrokeOuter};
    }

    :host(.checked) .control {
      background: ${accentFillRest};
      border-color: transparent;
    }

    :host(.checked:enabled:hover) .control {
      background: ${accentFillHover};
      border-color: transparent;
    }

    :host(.checked:enabled:active) .control {
      background: ${accentFillActive};
      border-color: transparent;
    }

    :host(.disabled) .label,
    :host(.readonly) .label,
    :host(.readonly) .control,
    :host(.disabled) .control {
      cursor: ${disabledCursor};
    }

    :host(.checked) slot[name='checked-indicator'] {
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
        :host(:enabled) .control:hover,
        .control:active {
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
        :host(.checked:enabled) .control:hover,
        .control:active {
          border-color: ${SystemColors.Highlight};
          background: ${SystemColors.Highlight};
        }
        :host(.checked) slot[name='checked-indicator'] {
          fill: ${SystemColors.Highlight};
        }
        :host(.checked) .control:hover slot[name='checked-indicator'] {
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
        :host(.checked.disabled) .control:hover,
        .control:active {
          background: ${SystemColors.Field};
          border-color: ${SystemColors.GrayText};
        }
        :host(.disabled) slot[name='checked-indicator'],
        :host(.checked.disabled) .control:hover slot[name='checked-indicator'] {
          fill: ${SystemColors.GrayText};
        }
      `,
    ),
  );
