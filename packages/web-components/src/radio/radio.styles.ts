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

export const radioStyles: (context: ElementDefinitionContext, definition: RadioOptions) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: RadioOptions,
) =>
  css`
    ${display('inline-flex')} :host {
      --input-size: calc((${heightNumber} / 2) + ${designUnit});
      align-items: center;
      outline: none;
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

    :host(:not(.disabled):hover) .control {
      background: ${neutralFillInputAltHover};
      border-color: ${neutralStrokeStrongHover};
    }

    :host(:not(.disabled):active) .control {
      background: ${neutralFillInputAltActive};
      border-color: ${neutralStrokeStrongActive};
    }

    :host(:not(.disabled):active) slot[name='checked-indicator'] {
      opacity: 1;
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
          background: ${SystemColors.Field};
          border-color: ${SystemColors.FieldText};
        }
        :host(:not(.disabled):hover) .control,
        :host(:not(.disabled):active) .control {
          border-color: ${SystemColors.Highlight};
        }
        :host(:${focusVisible}) .control {
          forced-color-adjust: none;
          box-shadow: 0 0 0 1px ${SystemColors.Field}, 0 0 0 3px ${SystemColors.FieldText};
          background: ${SystemColors.Field};
          border-color: ${SystemColors.Highlight};
        }
        :host(.checked:not(.disabled):hover) .control,
        :host(.checked:not(.disabled):active) .control {
          border-color: ${SystemColors.Highlight};
          background: ${SystemColors.Highlight};
        }
        :host(.checked:${focusVisible}) .control {
          box-shadow: 0 0 0 1px ${SystemColors.Field}, 0 0 0 3px ${SystemColors.FieldText};
        }
        :host(.checked) slot[name='checked-indicator'] {
          fill: ${SystemColors.Highlight};
        }
        :host(.checked:hover) .control slot[name='checked-indicator'] {
          fill: ${SystemColors.HighlightText};
        }
        :host(.disabled) {
          opacity: 1;
        }
        :host(.disabled) .label {
          color: ${SystemColors.GrayText};
        }
        :host(.disabled) .control,
        :host(.checked.disabled) .control {
          background: ${SystemColors.Field};
          border-color: ${SystemColors.GrayText};
        }
        :host(.disabled) slot[name='checked-indicator'],
        :host(.checked.disabled) slot[name='checked-indicator'] {
          fill: ${SystemColors.GrayText};
        }
      `,
    ),
  );
