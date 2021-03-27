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
  neutralOutlineActiveBehavior,
  neutralOutlineHoverBehavior,
  neutralOutlineRestBehavior,
} from '../styles/index';
import { appearanceBehavior } from '../utilities/behaviors';

export const NumberFieldFilledStyles = css`
  :host([appearance='filled']) .root {
    background: ${neutralFillRestBehavior.var};
  }

  :host([appearance='filled']:hover:not([disabled])) .root {
    background: ${neutralFillHoverBehavior.var};
  }

  :host([appearance='filled']:not([disabled]):active) .root {
    border-color: ${neutralOutlineRestBehavior.var};
    box-shadow: 0 0 0 calc(var(--outline-width) * 1px) ${neutralOutlineRestBehavior.var} inset;
  }

  :host([appearance='filled']:not([disabled]):active) .root::after {
    content: '';
    position: absolute;
    top: -1px;
    bottom: -1px;
    border-top: calc(var(--focus-outline-width) * 1px) solid ${accentFillRestBehavior.var};
    border-bottom: calc(var(--focus-outline-width) * 1px) solid ${accentFillRestBehavior.var};
  }

  :host([appearance='filled']:not([disabled]):active) .root::after {
    left: 50%;
    width: 40%;
    transform: translateX(-50%);
  }

  :host([appearance='filled']:not([disabled]):focus-within:not(:active)) .root {
    border-color: ${accentFillRestBehavior.var};
    box-shadow: 0 0 0 calc(var(--outline-width) * 1px) ${accentFillRestBehavior.var} inset;
  }
`.withBehaviors(
  accentFillRestBehavior,
  neutralFillHoverBehavior,
  neutralFillRestBehavior,
  neutralOutlineRestBehavior,
  forcedColorsStylesheetBehavior(
    css`
      :host([appearance='filled']) .root {
        background: ${SystemColors.Field};
        border-color: ${SystemColors.FieldText};
      }
      :host([appearance='filled']:hover:not([disabled])) .root {
        background: ${SystemColors.Field};
        border-color: ${SystemColors.FieldText};
      }
      :host([appearance='filled']:not([disabled]):active) .root {
        border-color: ${SystemColors.FieldText};
        box-shadow: 0 0 0 calc(var(--outline-width) * 1px) ${SystemColors.FieldText} inset;
      }
      :host([appearance='filled']:not([disabled]):active) .root::after {
        border-top-color: ${SystemColors.Highlight};
        border-bottom-color: ${SystemColors.Highlight};
      }
      :host([appearance='filled']:not([disabled]):focus-within:not(:active)) .root {
        border-color: ${SystemColors.Highlight};
        box-shadow: 0 0 0 calc(var(--outline-width) * 1px) ${SystemColors.Highlight} inset;
      }
      :host([appearance='filled'][disabled]) .root {
        border-color: ${SystemColors.GrayText};
        background: ${SystemColors.Field};
      }
    `,
  ),
);

export const NumberFieldStyles = css`
    ${display('inline-block')} :host {
        font-family: var(--body-font);
        outline: none;
        user-select: none;
        position: relative;
    }

    .root {
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-direction: row;
        color: ${neutralForegroundRestBehavior.var};
        background: ${neutralFillInputRestBehavior.var};
        border-radius: calc(var(--corner-radius) * 1px);
        border: calc(var(--outline-width) * 1px) solid ${neutralOutlineRestBehavior.var};
        height: calc(${heightNumber} * 1px);
    }

    .control {
        -webkit-appearance: none;
        font: inherit;
        background: transparent;
        border: 0;
        color: inherit;
        height: calc(100% - 4px);
        width: 100%;
        margin-top: auto;
        margin-bottom: auto;
        border: none;
        padding: 0 calc(var(--design-unit) * 2px + 1px);
        font-size: var(--type-ramp-base-font-size);
        line-height: var(--type-ramp-base-line-height);
    }

    .control:hover,
    .control:${focusVisible},
    .control:disabled,
    .control:active {
        outline: none;
    }

    .controls {
        opacity: 0;
    }

    .label {
        display: block;
        color: ${neutralForegroundRestBehavior.var};
        cursor: pointer;
        font-size: var(--type-ramp-base-font-size);
        line-height: var(--type-ramp-base-line-height);
        margin-bottom: 4px;
    }

    .label__hidden {
        display: none;
        visibility: hidden;
    }

    .start,
    .end {
        margin: auto;
        fill: currentcolor;
    }

    .step-up,
    .step-down {
        padding: 2px 10px;
        cursor: pointer;
    }

    .step-up:before,
    .step-down:before {
        content: '';
        display: block;
        border: solid transparent 6px;
    }

    .step-up:before {
        border-bottom-color: ${neutralForegroundRestBehavior.var};
    }

    .step-down:before {
        border-top-color: ${neutralForegroundRestBehavior.var};
    }

    ::slotted(svg) {
        ${
          /* Glyph size and margin-left is temporary -
            replace when adaptive typography is figured out */ ''
        } width: 16px;
        height: 16px;
    }

    .start {
        display: flex;
        margin-inline-start: 11px;
    }

    .end {
        display: flex;
        margin-inline-end: 11px;
    }

    :host(:hover:not([disabled])) .root {
        background: ${neutralFillInputHoverBehavior.var};
        border-color: ${neutralOutlineHoverBehavior.var};
    }

    :host(:active:not([disabled])) .root {
        background: ${neutralFillInputHoverBehavior.var};
        border-color: ${neutralOutlineActiveBehavior.var};
    }

    :host(:focus-within:not([disabled])) .root {
        border-color: ${neutralFocusBehavior.var};
        box-shadow: 0 0 0 1px ${neutralFocusBehavior.var} inset;
    }

    :host(:hover:not([disabled])) .controls,
    :host(:focus-within:not([disabled])) .controls {
        opacity: 1;
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

    :host([disabled]) .control {
        border-color: ${neutralOutlineRestBehavior.var};
    }
`.withBehaviors(
  appearanceBehavior('filled', NumberFieldFilledStyles),
  neutralFillHoverBehavior,
  neutralFillInputHoverBehavior,
  neutralFillInputRestBehavior,
  neutralFillRestBehavior,
  neutralFocusBehavior,
  neutralForegroundRestBehavior,
  neutralOutlineActiveBehavior,
  neutralOutlineHoverBehavior,
  neutralOutlineRestBehavior,
  forcedColorsStylesheetBehavior(
    css`
      .root {
        forced-color-adjust: none;
        background: ${SystemColors.Field};
        border-color: ${SystemColors.FieldText};
      }
      :host(:hover:not([disabled])) .root {
        background: ${SystemColors.Field};
        border-color: ${SystemColors.Highlight};
      }
      :host(:focus-within:enabled) .root {
        border-color: ${SystemColors.Highlight};
        box-shadow: 0 0 0 1px ${SystemColors.Highlight} inset;
      }
      .control,
      ::placeholder,
      ::-webkit-input-placeholder {
        color: ${SystemColors.FieldText};
      }
      .step-up:before {
        border-bottom-color: ${SystemColors.FieldText};
      }
      .step-down:before {
        border-top-color: ${SystemColors.FieldText};
      }
      .start,
      .end {
        fill: ${SystemColors.FieldText};
      }
      :host([disabled]) {
        opacity: 1;
      }
      :host([disabled]) .root {
        border-color: ${SystemColors.GrayText};
        background: ${SystemColors.Field};
      }
      :host([disabled]) ::placeholder,
      :host([disabled]) ::-webkit-input-placeholder {
        color: ${SystemColors.GrayText};
      }
    `,
  ),
);
