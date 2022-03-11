import { css, ElementStyles } from '@microsoft/fast-element';
import { ComboboxOptions, disabledCursor, ElementDefinitionContext, focusVisible } from '@microsoft/fast-foundation';
import { selectFilledStyles, selectStyles } from '../select/select.styles';
import { appearanceBehavior } from '../utilities/behaviors';
import { strokeWidth, typeRampBase } from '../design-tokens';

export const comboboxStyles: (context: ElementDefinitionContext, definition: ComboboxOptions) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: ComboboxOptions,
) =>
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
        ${typeRampBase}
        height: calc(100% - ${strokeWidth} * 1px));
        margin: auto 0;
        width: 100%;
    }

    .selected-value:hover,
    .selected-value:${focusVisible},
    .selected-value:disabled,
    .selected-value:active {
        outline: none;
    }
`.withBehaviors(
  appearanceBehavior('filled', selectFilledStyles(context, definition)));
