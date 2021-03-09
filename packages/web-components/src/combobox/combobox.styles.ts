import { css } from '@microsoft/fast-element';
import { disabledCursor, focusVisible } from '@microsoft/fast-foundation';
import { SelectStyles } from '../select/select.styles';

export const ComboboxStyles = css`
    ${SelectStyles}

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
        font-size: var(--type-ramp-base-font-size);
        line-height: var(--type-ramp-base-line-height);
        height: calc(100% - (var(--outline-width) * 1px));
        margin: auto 0;
        width: 100%;
    }

    .selected-value:hover,
    .selected-value:${focusVisible},
    .selected-value:disabled,
    .selected-value:active {
        outline: none;
    }
`;
