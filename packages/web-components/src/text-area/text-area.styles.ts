import { css } from '@microsoft/fast-element';
import { disabledCursor, display, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import {
  accentFillRestBehavior,
  heightNumber,
  neutralFillHoverBehavior,
  neutralFillInputHoverBehavior,
  neutralFillInputRestBehavior,
  neutralFillRestBehavior,
  neutralFocusBehavior,
  neutralForegroundRestBehavior,
  neutralOutlineHoverBehavior,
  neutralOutlineRestBehavior,
} from '../styles';
import { appearanceBehavior } from '../utilities/behaviors';

export const TextAreaFilledStyles = css`
  :host([appearance='filled']) .control {
    background: ${neutralFillRestBehavior.var};
    border-color: transparent;
  }

  :host([appearance='filled']:hover:not([disabled])) .control {
    background: ${neutralFillHoverBehavior.var};
    border-color: transparent;
  }

  :host([appearance='filled']:focus-within:not([disabled])) .control {
    border-color: transparent;
    box-shadow: none;
  }

  :host([appearance='filled']:not([disabled]):active)::after,
  :host([appearance='filled']:not([disabled]):focus-within:not(:active))::after {
    content: '';
    position: absolute;
    bottom: 0;
    border-bottom: calc(var(--focus-outline-width) * 1px) solid ${accentFillRestBehavior.var};
    border-bottom-left-radius: calc(var(--corner-radius) * 1px);
    border-bottom-right-radius: calc(var(--corner-radius) * 1px);
    z-index: 2;
  }

  :host([appearance='filled']:not([disabled]):active)::after {
    left: 50%;
    width: 40%;
    transform: translateX(-50%);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  :host([appearance='filled']:not([disabled]):focus-within:not(:active))::after {
    left: 0;
    width: 100%;
  }
`.withBehaviors(
  accentFillRestBehavior,
  neutralFillHoverBehavior,
  neutralFillRestBehavior,
  forcedColorsStylesheetBehavior(
    css`
      :host([appearance='filled']:hover:not([disabled])) .control,
      :host([appearance='filled']:focus-within:not([disabled])) .control {
        background: ${SystemColors.Field};
        border-color: ${SystemColors.FieldText};
      }
      :host([appearance='filled']:not([disabled]):active)::after,
      :host([appearance='filled']:not([disabled]):focus-within:not(:active))::after {
        border-bottom-color: ${SystemColors.Highlight};
      }
    `,
  ),
);

export const TextAreaStyles = css`
    ${display('inline-flex')} :host {
        font-family: var(--body-font);
        outline: none;
        user-select: none;
        position: relative;
        flex-direction: column;
        vertical-align: bottom;
    }

    .control {
        box-sizing: border-box;
        position: relative;
        color: ${neutralForegroundRestBehavior.var};
        background: ${neutralFillInputRestBehavior.var};
        border-radius: calc(var(--corner-radius) * 1px);
        border: calc(var(--outline-width) * 1px) solid ${neutralOutlineRestBehavior.var};
        height: calc(${heightNumber} * 2px);
        font: inherit;
        font-size: var(--type-ramp-base-font-size);
        line-height: var(--type-ramp-base-line-height);
        padding: calc(var(--design-unit) * 1.5px) calc(var(--design-unit) * 2px + 1px);
        width: 100%;
        resize: none;
    }

    .control:hover:enabled {
        background: ${neutralFillInputHoverBehavior.var};
        border-color: ${neutralOutlineHoverBehavior.var};
    }

    .control:hover,
    .control:${focusVisible},
    .control:disabled,
    .control:active {
        outline: none;
    }

    :host(:focus-within) .control {
        border-color: ${neutralFocusBehavior.var};
        box-shadow: 0 0 0 1px ${neutralFocusBehavior.var} inset;
    }

    :host(.resize-both) .control {
        resize: both;
    }

    :host(.resize-horizontal) .control {
        resize: horizontal;
    }

    :host(.resize-vertical) .control {
        resize: vertical;
    }

    .label__hidden {
        display: none;
        visibility: hidden;
    }

    .label {
        display: block;
        color: ${neutralForegroundRestBehavior.var};
        cursor: pointer;
        $font-size: var(--type-ramp-base-font-size);
        line-height: var(--type-ramp-base-line-height);
        margin-bottom: 4px;
    }

    :host([disabled]) .label,
    :host([readonly]) .label,
    :host([readonly]) .control,
    :host([disabled]) .control {
        cursor: ${disabledCursor};
    }
    :host([disabled]) {
        opacity: var(--disabled-opacity);
    }
`.withBehaviors(
  appearanceBehavior('filled', TextAreaFilledStyles),
  neutralFillInputHoverBehavior,
  neutralFillInputRestBehavior,
  neutralFocusBehavior,
  neutralForegroundRestBehavior,
  neutralOutlineHoverBehavior,
  neutralOutlineRestBehavior,
  forcedColorsStylesheetBehavior(
    css`
      :host([disabled]) {
        opacity: 1;
      }
      ::placeholder,
      ::-webkit-input-placeholder {
        color: ${SystemColors.FieldText};
      }
      :host([disabled]) ::placeholder,
      :host([disabled]) ::-webkit-input-placeholder,
      :host([disabled]) .label {
        color: ${SystemColors.GrayText};
      }
    `,
  ),
);
