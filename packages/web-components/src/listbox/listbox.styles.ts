import { css, ElementStyles } from '@microsoft/fast-element';
import {
  display,
  ElementDefinitionContext,
  FoundationElementDefinition,
  ListboxOption
} from '@microsoft/fast-foundation';
import {
  controlCornerRadius,
  designUnit,
  focusStrokeOuter,
  neutralStrokeRest,
  strokeWidth,
} from '../design-tokens';

export const listboxStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    ${display('inline-flex')} :host {
      border: calc(${strokeWidth} * 1px) solid ${neutralStrokeRest};
      border-radius: calc(${controlCornerRadius} * 1px);
      box-sizing: border-box;
      flex-direction: column;
      padding: calc(${designUnit} * 1px) 0;
      outline: none;
    }

    ::slotted(${context.tagFor(ListboxOption)}) {
      margin: 0 calc(${designUnit} * 1px);
    }

    :host(:focus-within:not([disabled])) {
      border-color: ${focusStrokeOuter};
      box-shadow: 0 0 0 1px ${focusStrokeOuter} inset;
    }
  `
