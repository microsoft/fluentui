import { css, ElementStyles } from '@microsoft/fast-element';
import {
  CheckboxOptions,
  disabledCursor,
  display,
  ElementDefinitionContext,
  focusVisible,
  forcedColorsStylesheetBehavior,
} from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { heightNumber } from '../styles';
import {
  accentFillActive,
  accentFillHover,
  accentFillRest,
  bodyFont,
  controlCornerRadius,
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

export const checkboxStyles: (context: ElementDefinitionContext, definition: CheckboxOptions) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: CheckboxOptions,
) =>
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

    slot[name='checked-indicator'],
    slot[name='indeterminate-indicator'] {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      fill: ${neutralForegroundRest};
      opacity: 0;
      pointer-events: none;
    }

    slot[name='indeterminate-indicator'] {
      position: absolute;
      top: 0;
    }

    :host(.checked) slot[name='checked-indicator'],
    :host(.checked) slot[name='indeterminate-indicator'] {
      fill: ${foregroundOnAccentRest};
    }

    :host(:enabled:hover) .control {
      background: ${neutralFillInputHover};
      border-color: ${strokeControlStrongHover};
    }

    :host(:enabled:active) .control {
      background: ${neutralFillInputActive};
      border-color: ${strokeControlStrongActive};
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

    :host(.checked:not(.indeterminate)) slot[name='checked-indicator'],
    :host(.indeterminate) slot[name='indeterminate-indicator'] {
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
        slot[name='checked-indicator'] {
          fill: ${SystemColors.FieldText};
        }
        slot[name='indeterminate-indicator'] {
          fill: ${SystemColors.FieldText};
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
        :host(.checked) .control:hover,
        .control:active {
          background: ${SystemColors.HighlightText};
        }
        :host(.checked) slot[name='checked-indicator'] {
          fill: ${SystemColors.HighlightText};
        }
        :host(.checked) .control:hover slot[name='checked-indicator'] {
          fill: ${SystemColors.Highlight};
        }
        :host(.checked) slot[name='indeterminate-indicator'] {
          fill: ${SystemColors.HighlightText};
        }
        :host(.checked) .control:hover slot[name='indeterminate-indicator'] {
          fill: ${SystemColors.Highlight};
        }
        :host(.disabled) {
          opacity: 1;
        }
        :host(.disabled) .control {
          forced-color-adjust: none;
          border-color: ${SystemColors.GrayText};
          background: ${SystemColors.Field};
        }
        :host(.disabled) slot[name='indeterminate-indicator'],
        :host(.checked.disabled) .control:hover slot[name='indeterminate-indicator'] {
          forced-color-adjust: none;
          fill: ${SystemColors.GrayText};
        }
        :host(.disabled) slot[name='checked-indicator'],
        :host(.checked.disabled) .control:hover slot[name='checked-indicator'] {
          forced-color-adjust: none;
          fill: ${SystemColors.GrayText};
        }
      `,
    ),
  );
