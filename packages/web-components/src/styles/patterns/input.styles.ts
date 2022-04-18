import { css, ElementStyles } from '@microsoft/fast-element';
import {
  DesignToken,
  disabledCursor,
  ElementDefinitionContext,
  focusVisible,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { Swatch } from '../../color/swatch';
import {
  accentFillRest,
  controlCornerRadius,
  disabledOpacity,
  focusStrokeWidth,
  neutralFillInputFocus,
  neutralFillInputHover,
  neutralFillInputRecipe,
  neutralFillInputRest,
  neutralFillSecondaryHover,
  neutralFillSecondaryRecipe,
  neutralFillSecondaryRest,
  neutralForegroundHintRecipe,
  neutralForegroundRest,
  neutralStrokeInputHover,
  neutralStrokeInputRest,
  neutralStrokeRest,
  strokeWidth,
} from '../../design-tokens';
import { typeRampBase } from '../patterns/type-ramp';
import { heightNumber } from '../size';

const placeholderRest = DesignToken.create<Swatch>('input-placeholder-rest').withDefault((target: HTMLElement) => {
  const baseRecipe = neutralFillInputRecipe.getValueFor(target);
  const hintRecipe = neutralForegroundHintRecipe.getValueFor(target);
  return hintRecipe.evaluate(target, baseRecipe.evaluate(target).rest);
});

const placeholderHover = DesignToken.create<Swatch>('input-placeholder-hover').withDefault((target: HTMLElement) => {
  const baseRecipe = neutralFillInputRecipe.getValueFor(target);
  const hintRecipe = neutralForegroundHintRecipe.getValueFor(target);
  return hintRecipe.evaluate(target, baseRecipe.evaluate(target).hover);
});

const filledPlaceholderRest = DesignToken.create<Swatch>('input-filled-placeholder-rest').withDefault(
  (target: HTMLElement) => {
    const baseRecipe = neutralFillSecondaryRecipe.getValueFor(target);
    const hintRecipe = neutralForegroundHintRecipe.getValueFor(target);
    return hintRecipe.evaluate(target, baseRecipe.evaluate(target).rest);
  },
);

const filledPlaceholderHover = DesignToken.create<Swatch>('input-filled-placeholder-hover').withDefault(
  (target: HTMLElement) => {
    const baseRecipe = neutralFillSecondaryRecipe.getValueFor(target);
    const hintRecipe = neutralForegroundHintRecipe.getValueFor(target);
    return hintRecipe.evaluate(target, baseRecipe.evaluate(target).hover);
  },
);

/**
 * @internal
 */
export const inputStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  rootSelector: string,
) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  rootSelector: string,
) => css`
  :host {
    ${typeRampBase}
    color: ${neutralForegroundRest};
    fill: currentcolor;
    outline: none;
    user-select: none;
    position: relative;
  }

  ${rootSelector} {
    box-sizing: border-box;
    position: relative;
    color: inherit;
    background: padding-box linear-gradient(${neutralFillInputRest}, ${neutralFillInputRest}),
      border-box ${neutralStrokeInputRest};
    border: calc(${strokeWidth} * 1px) solid transparent;
    border-radius: calc(${controlCornerRadius} * 1px);
    height: calc(${heightNumber} * 1px);
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  .control {
    width: 100%;
  }

  .control:hover,
  .control:${focusVisible},
  .control:disabled,
  .control:active {
    outline: none;
  }

  .label {
    display: block;
    color: ${neutralForegroundRest};
    cursor: pointer;
    ${typeRampBase}
    margin-bottom: 4px;
  }

  .label__hidden {
    display: none;
    visibility: hidden;
  }

  :host(:hover:not([disabled]):not(:focus-within)) ${rootSelector} {
    background: padding-box linear-gradient(${neutralFillInputHover}, ${neutralFillInputHover}),
      border-box ${neutralStrokeInputHover};
  }

  :host(:not([disabled]):focus-within) ${rootSelector} {
    background: padding-box linear-gradient(${neutralFillInputFocus}, ${neutralFillInputFocus}),
      border-box ${neutralStrokeInputRest};
  }

  .control::placeholder {
    color: ${placeholderRest};
  }

  :host(:hover:not([disabled]):not(:focus-within)) .control::placeholder {
    color: ${placeholderHover};
  }

  :host([disabled]) ${rootSelector}, :host([readonly]) ${rootSelector}, :host([disabled]) .label,
  :host([readonly]) .label,
  :host([disabled]) .control,
  :host([readonly]) .control {
    cursor: ${disabledCursor};
  }

  :host([disabled]) {
    opacity: ${disabledOpacity};
  }

  :host([disabled]) ${rootSelector} {
    background: padding-box linear-gradient(${neutralFillInputRest}, ${neutralFillInputRest}),
      border-box ${neutralStrokeRest};
  }
`;

/**
 * @internal
 */
export const inputStateStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  rootSelector: string,
) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  rootSelector: string,
) => css`
  :host(:not([disabled]):active)::after {
    left: 50%;
    width: 40%;
    transform: translateX(-50%);
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  :host(:not([disabled]):focus-within)::after {
    left: 0;
    width: 100%;
    transform: none;
  }

  :host(:not([disabled]):active)::after,
  :host(:not([disabled]):focus-within:not(:active))::after {
    content: '';
    position: absolute;
    height: calc(${focusStrokeWidth} * 1px);
    bottom: 0;
    border-bottom: calc(${focusStrokeWidth} * 1px) solid ${accentFillRest};
    border-bottom-left-radius: calc(${controlCornerRadius} * 1px);
    border-bottom-right-radius: calc(${controlCornerRadius} * 1px);
    z-index: 2;
    transition: all 300ms cubic-bezier(0.1, 0.9, 0.2, 1);
  }
`;

/**
 * @internal
 */
export const inputFilledStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  rootSelector: string,
) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  rootSelector: string,
) => css`
  :host ${rootSelector} {
    background: ${neutralFillSecondaryRest};
    border-color: transparent;
  }

  :host(:hover:not([disabled]):not(:focus-within)) ${rootSelector} {
    background: ${neutralFillSecondaryHover};
    border-color: transparent;
  }

  .control::placeholder {
    color: ${filledPlaceholderRest};
  }

  :host(:hover:not([disabled]):not(:focus-within)) .control::placeholder {
    color: ${filledPlaceholderHover};
  }

  :host(:focus-within:not([disabled])) ${rootSelector} {
    border-color: transparent;
    box-shadow: none;
  }
`;

/**
 * @internal
 */
export const inputForcedColorStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  rootSelector: string,
) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  rootSelector: string,
) => css`
  :host ${rootSelector} {
    background: ${SystemColors.Field};
    border-color: ${SystemColors.FieldText};
  }
  :host(:hover:not([disabled]):not(:focus-within)) ${rootSelector} {
    border-color: ${SystemColors.Highlight};
  }
  :host(:not([disabled]):active)::after,
  :host(:not([disabled]):focus-within:not(:active))::after {
    border-bottom-color: ${SystemColors.Highlight};
  }
  :host([disabled]) {
    opacity: 1;
  }
  :host([disabled]) ${rootSelector} {
    border-color: ${SystemColors.GrayText};
  }
  :host([disabled]) ::placeholder,
  :host([disabled]) ::-webkit-input-placeholder,
  :host([disabled]) .label {
    color: ${SystemColors.GrayText};
    fill: currentcolor;
  }
`;

/**
 * @internal
 */
export const inputFilledForcedColorStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  rootSelector: string,
) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  rootSelector: string,
) => css`
  :host ${rootSelector},
  :host(:hover:not([disabled])) ${rootSelector},
  :host(:active:not([disabled])) ${rootSelector},
  :host(:focus-within:not([disabled])) ${rootSelector} {
    background: ${SystemColors.Field};
    border-color: ${SystemColors.FieldText};
  }
  :host(:not([disabled]):active)::after,
  :host(:not([disabled]):focus-within:not(:active))::after {
    border-bottom-color: ${SystemColors.Highlight};
  }
  :host([disabled]) ${rootSelector} {
    border-color: ${SystemColors.GrayText};
  }
`;
