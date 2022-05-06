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
  controlCornerRadius,
  designUnit,
  disabledOpacity,
  fillColor,
  focusStrokeOuter,
  foregroundOnAccentRest,
  neutralFillInputAltActive,
  neutralFillInputAltFocus,
  neutralFillInputAltHover,
  neutralFillInputAltRest,
  neutralForegroundRest,
  neutralStrokeStrongActive,
  neutralStrokeStrongHover,
  neutralStrokeStrongRest,
  strokeWidth,
} from '../design-tokens';
import { typeRampBase } from '../styles/patterns/type-ramp';

export const checkboxStyles: (context: ElementDefinitionContext, definition: CheckboxOptions) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: CheckboxOptions,
) =>
  css`
    ${display('inline-flex')} :host {
      align-items: center;
      outline: none;
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
      border: calc(${strokeWidth} * 1px) solid ${neutralStrokeStrongRest};
      background: ${neutralFillInputAltRest};
      outline: none;
      cursor: pointer;
    }

    .label__hidden {
      display: none;
      visibility: hidden;
    }

    .label {
      ${typeRampBase}
      color: ${neutralForegroundRest};
      ${
        /* Need to discuss with Brian how HorizontalSpacingNumber can work. https://github.com/microsoft/fast/issues/2766 */ ''
      } padding-inline-start: calc(${designUnit} * 2px + 2px);
      margin-inline-end: calc(${designUnit} * 2px + 2px);
      cursor: pointer;
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

    :host(:not(.disabled):hover) .control {
      background: ${neutralFillInputAltHover};
      border-color: ${neutralStrokeStrongHover};
    }

    :host(:not(.disabled):active) .control {
      background: ${neutralFillInputAltActive};
      border-color: ${neutralStrokeStrongActive};
    }

    :host(:${focusVisible}) .control {
      box-shadow: 0 0 0 1px ${fillColor}, 0 0 0 3px ${focusStrokeOuter};
      background: ${neutralFillInputAltFocus};
      border-color: ${focusStrokeOuter};
    }

    :host(.checked) .control {
      background: ${accentFillRest};
      border-color: transparent;
    }

    :host(.checked:not(.disabled):hover) .control {
      background: ${accentFillHover};
      border-color: transparent;
    }

    :host(.checked:not(.disabled):active) .control {
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
          border-color: ${SystemColors.FieldText};
          background: ${SystemColors.Field};
        }
        :host(:not(.disabled):hover) .control,
        :host(:not(.disabled):active) .control {
          border-color: ${SystemColors.Highlight};
          background: ${SystemColors.Field};
        }
        slot[name='checked-indicator'],
        slot[name='indeterminate-indicator'] {
          fill: ${SystemColors.FieldText};
        }
        :host(:${focusVisible}) .control {
          forced-color-adjust: none;
          box-shadow: 0 0 0 1px ${SystemColors.Field}, 0 0 0 3px ${SystemColors.FieldText};
          background: ${SystemColors.Field};
          border-color: ${SystemColors.Highlight};
        }
        :host(.checked) .control {
          background: ${SystemColors.Highlight};
          border-color: ${SystemColors.Highlight};
        }
        :host(.checked:not(.disabled):hover) .control,
        :host(.checked:not(.disabled):active) .control {
          background: ${SystemColors.HighlightText};
          border-color: ${SystemColors.Highlight};
        }
        :host(.checked:${focusVisible}) .control {
          box-shadow: 0 0 0 1px ${SystemColors.Field}, 0 0 0 3px ${SystemColors.FieldText};
        }
        :host(.checked) slot[name='checked-indicator'],
        :host(.checked) slot[name='indeterminate-indicator'] {
          fill: ${SystemColors.HighlightText};
        }
        :host(.checked:hover ) .control slot[name='checked-indicator'],
        :host(.checked:hover ) .control slot[name='indeterminate-indicator'] {
          fill: ${SystemColors.Highlight};
        }
        :host(.disabled) {
          opacity: 1;
        }
        :host(.disabled) .control {
          border-color: ${SystemColors.GrayText};
          background: ${SystemColors.Field};
        }
        :host(.disabled) slot[name='checked-indicator'],
        :host(.checked.disabled:hover) .control slot[name='checked-indicator'],
        :host(.disabled) slot[name='indeterminate-indicator'],
        :host(.checked.disabled:hover) .control slot[name='indeterminate-indicator'] {
          fill: ${SystemColors.GrayText};
        }
      `,
    ),
  );
