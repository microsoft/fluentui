import { css } from '@microsoft/fast-element';
import { disabledCursor, display, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import {
  accentFillRestBehavior,
  FillStateStyles,
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

export const TextFieldFilledStyles = css`
  :host([appearance='filled']) .root {
    background: ${neutralFillRestBehavior.var};
    border-color: transparent;
  }

  :host([appearance='filled']:hover:not(.disabled)) .root {
    background: ${neutralFillHoverBehavior.var};
    border-color: transparent;
  }

  :host([appearance='filled']:focus-within:not(.disabled)) .root {
    border-color: transparent;
    box-shadow: none;
  }
  ${FillStateStyles}
`.withBehaviors(
  accentFillRestBehavior,
  neutralFillHoverBehavior,
  neutralFillRestBehavior,
  forcedColorsStylesheetBehavior(
    css`
      :host([appearance='filled']) .root {
        background: ${SystemColors.Field};
        border-color: ${SystemColors.FieldText};
      }
      :host([appearance='filled']:hover:not([disabled])) .root,
      :host([appearance='filled']:focus-within:not([disabled])) .root {
        background: ${SystemColors.Field};
        border-color: ${SystemColors.FieldText};
      }
      :host([appearance='filled']:active:not([disabled])) .root {
        background: ${SystemColors.Field};
        border-color: ${SystemColors.FieldText};
      }
      :host([appearance='filled']:not([disabled]):active)::after,
      :host([appearance='filled']:not([disabled]):focus-within:not(:active))::after {
        border-bottom-color: ${SystemColors.Highlight};
      }
      :host([appearance='filled'][disabled]) .root {
        border-color: ${SystemColors.GrayText};
        background: ${SystemColors.Field};
      }
    `,
  ),
);

export const TextFieldStyles = css`
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
        background: transparent;
        border: 0;
        height: calc(100% - 4px);
        width: 100%;
        margin-top: auto;
        margin-bottom: auto;
        border: none;
        padding: 0 calc(var(--design-unit) * 2px + 1px);
        color: ${neutralForegroundRestBehavior.var};
        font-family: inherit;
        font-size: var(--type-ramp-base-font-size);
        line-height: var(--type-ramp-base-line-height);
    }

    .control:hover,
    .control:${focusVisible},
    .control:disabled,
    .control:active {
        outline: none;
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

    ::slotted(svg) {      ${
      /* Glyph size and margin-left is temporary -
            replace when adaptive typography is figured out */ ''
    } width: 16px;
        height: 16px;
    }

    .start {
        margin-inline-start: 11px;
    }

    .end {
        margin-inline-end: 11px;
    }

    :host(:hover:not(.disabled)) .root {
        background: ${neutralFillInputHoverBehavior.var};
        border-color: ${neutralOutlineHoverBehavior.var};
    }

    :host(:focus-within:not(.disabled)) .root {
        border-color: ${neutralFocusBehavior.var};
        box-shadow: 0 0 0 1px ${neutralFocusBehavior.var} inset;
    }

    :host(.disabled) .label,
    :host(.readonly) .label,
    :host(.readonly) .control,
    :host(.disabled) .control {
        cursor: ${disabledCursor};
    }

    :host(.disabled) {
        opacity: var(--disabled-opacity);
    }
`.withBehaviors(
  appearanceBehavior('filled', TextFieldFilledStyles),
  neutralFillInputHoverBehavior,
  neutralFillInputRestBehavior,
  neutralFocusBehavior,
  neutralForegroundRestBehavior,
  neutralOutlineHoverBehavior,
  neutralOutlineRestBehavior,
  forcedColorsStylesheetBehavior(
    css`
      .root {
        forced-color-adjust: none;
        background: ${SystemColors.Field};
        border-color: ${SystemColors.FieldText};
      }
      :host(:hover:not(.disabled)) .root {
        background: ${SystemColors.Field};
        border-color: ${SystemColors.Highlight};
      }
      .start,
      .end {
        fill: ${SystemColors.ButtonText};
      }
      :host(.disabled) {
        opacity: 1;
      }
      :host(.disabled) .root {
        border-color: ${SystemColors.GrayText};
        background: ${SystemColors.Field};
      }
      :host(:focus-within:enabled) .root {
        border-color: ${SystemColors.Highlight};
        box-shadow: 0 0 0 1px ${SystemColors.Highlight} inset;
      }
      .control {
        color: ${SystemColors.ButtonText};
      }
      ::placeholder,
      ::-webkit-input-placeholder {
        color: ${SystemColors.FieldText};
      }
      :host(.disabled) ::placeholder,
      :host(.disabled) ::-webkit-input-placeholder,
      :host([disabled]) .label {
        color: ${SystemColors.GrayText};
      }
    `,
  ),
);
