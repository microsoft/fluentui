import { css, ElementStyles } from '@microsoft/fast-element';
import { ComboboxOptions, disabledCursor, ElementDefinitionContext } from '@microsoft/fast-foundation';
import { selectFilledStyles, selectStyles } from '../select/select.styles';
import { appearanceBehavior } from '../utilities/behaviors';
import { neutralFillInputActive, neutralFillInputHover, neutralFillInputRest, neutralStrokeInputActive, neutralStrokeInputHover, neutralStrokeInputRest, strokeWidth } from '../design-tokens';
import { typeRampBase } from '../styles/patterns/type-ramp';

export const comboboxStyles: (context: ElementDefinitionContext, definition: ComboboxOptions) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: ComboboxOptions,
) =>
  css`
    ${selectStyles(context, definition)}

    :host {
      background: padding-box linear-gradient(${neutralFillInputRest}, ${neutralFillInputRest}),
        border-box ${neutralStrokeInputRest};
    }

    :host(:not([disabled]):not([open]):hover) {
      background: padding-box linear-gradient(${neutralFillInputHover}, ${neutralFillInputHover}),
        border-box ${neutralStrokeInputHover};
    }

    :host(:not([disabled]):not([open]):active) {
      background: padding-box linear-gradient(${neutralFillInputActive}, ${neutralFillInputActive}),
        border-box ${neutralStrokeInputActive};
    }

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
        outline: none;
    }
`.withBehaviors(
  appearanceBehavior('filled', selectFilledStyles(context, definition)));
