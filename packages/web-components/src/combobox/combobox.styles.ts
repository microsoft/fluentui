import { css, ElementStyles } from '@microsoft/fast-element';
import { ComboboxOptions, disabledCursor, ElementDefinitionContext, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import { baseSelectStyles } from '../select/select.styles';
import { appearanceBehavior } from '../utilities/behaviors';
import { strokeWidth } from '../design-tokens';
import { typeRampBase } from '../styles/patterns/type-ramp';
import { inputFilledStyles, inputForcedColorStyles, inputOutlineStyles, inputStateStyles } from '../styles';

const logicalControlSelector: string = '.control';
const interactivitySelector: string = ':not([disabled]):not([open])';

export const comboboxStyles: (context: ElementDefinitionContext, definition: ComboboxOptions) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: ComboboxOptions,
) =>
  css`
    ${baseSelectStyles(context, definition)}

    ${inputStateStyles(context, definition, logicalControlSelector)}

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
    appearanceBehavior('outline', inputOutlineStyles(context, definition, logicalControlSelector, interactivitySelector)),
    appearanceBehavior('filled', inputFilledStyles(context, definition, logicalControlSelector, interactivitySelector)),
    forcedColorsStylesheetBehavior(inputForcedColorStyles(context, definition, logicalControlSelector, interactivitySelector)),
  );
