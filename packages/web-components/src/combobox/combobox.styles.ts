import { css } from '@microsoft/fast-element';
import { disabledCursor, focusVisible } from '@microsoft/fast-foundation';
import { selectFilledStyles, selectStyles } from '../select/select.styles';
import { appearanceBehavior } from '../utilities/behaviors';
import { typeRampBaseFontSize, typeRampBaseLineHeight, outlineWidth } from '../design-tokens';

export const comboboxStyles = (context, definition) =>
  css`
    ${selectStyles(context, definition)}

    :host(:empty) .listbox {
        display: none;
    }

    :host([disabled]) *,
    :host([disabled]) {
        cursor: ${disabledCursor};
        user-select: none;
    }

    :host(:active) .selected-value {
        user-select: none;
    }

    .selected-value {
        -webkit-appearance: none;
        background: transparent;
        border: none;
        color: inherit;
        font-size: ${typeRampBaseFontSize};
        line-height: ${typeRampBaseLineHeight};
        height: calc(100% - ${outlineWidth} * 1px));
        margin: auto 0;
        width: 100%;
    }

    .selected-value:hover,
    .selected-value:${focusVisible},
    .selected-value:disabled,
    .selected-value:active {
        outline: none;
    }
`.withBehaviors(appearanceBehavior('filled', selectFilledStyles(context, definition)));
