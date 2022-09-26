import { css, ElementStyles } from '@microsoft/fast-element';
import {
  DesignToken,
  disabledCursor,
  ElementDefinitionContext,
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
  neutralFillSecondaryFocus,
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
import { focusTreatmentBase } from '../focus';

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
 * The base styles for input controls, without `appearance` visual differences.
 * 
 * @internal
 */
export const baseInputStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  logicalControlSelector: string,
) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  logicalControlSelector: string,
) => css`
  :host {
    ${typeRampBase}
    color: ${neutralForegroundRest};
    fill: currentcolor;
    user-select: none;
    position: relative;
  }

  ${logicalControlSelector} {
    box-sizing: border-box;
    position: relative;
    color: inherit;
    border: calc(${strokeWidth} * 1px) solid transparent;
    border-radius: calc(${controlCornerRadius} * 1px);
    height: calc(${heightNumber} * 1px);
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  .control {
    width: 100%;
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

  :host([disabled]) ${logicalControlSelector},
  :host([readonly]) ${logicalControlSelector},
  :host([disabled]) .label,
  :host([readonly]) .label,
  :host([disabled]) .control,
  :host([readonly]) .control {
    cursor: ${disabledCursor};
  }

  :host([disabled]) {
    opacity: ${disabledOpacity};
  }
`;

/**
 * The styles for active and focus interactions for input controls.
 * 
 * @internal
 */
export const inputStateStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  logicalControlSelector: string,
) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  logicalControlSelector: string,
) => css`
  @media (forced-colors: none) {
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
  }
`;

/**
 * The visual styles for inputs with `appearance='outline'`.
 * 
 * @internal
 */
 export const inputOutlineStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  logicalControlSelector: string,
  interactivitySelector?: string,
) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  logicalControlSelector: string,
  interactivitySelector: string = ':not([disabled]):not(:focus-within)',
) => css`
  ${logicalControlSelector} {
    background: padding-box linear-gradient(${neutralFillInputRest}, ${neutralFillInputRest}),
      border-box ${neutralStrokeInputRest};
  }

  :host(${interactivitySelector}:hover) ${logicalControlSelector} {
    background: padding-box linear-gradient(${neutralFillInputHover}, ${neutralFillInputHover}),
      border-box ${neutralStrokeInputHover};
  }

  :host(:not([disabled]):focus-within) ${logicalControlSelector} {
    background: padding-box linear-gradient(${neutralFillInputFocus}, ${neutralFillInputFocus}),
      border-box ${neutralStrokeInputRest};
  }
  
  :host([disabled]) ${logicalControlSelector} {
    background: padding-box linear-gradient(${neutralFillInputRest}, ${neutralFillInputRest}),
      border-box ${neutralStrokeRest};
  }

  .control::placeholder {
    color: ${placeholderRest};
  }

  :host(${interactivitySelector}:hover) .control::placeholder {
    color: ${placeholderHover};
  }
`;

/**
 * The visual styles for inputs with `appearance='filled'`.
 * 
 * @internal
 */
export const inputFilledStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  logicalControlSelector: string,
  interactivitySelector?: string,
) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  logicalControlSelector: string,
  interactivitySelector: string = ':not([disabled]):not(:focus-within)',
) => css`
  ${logicalControlSelector} {
    background: ${neutralFillSecondaryRest};
  }

  :host(${interactivitySelector}:hover) ${logicalControlSelector} {
    background: ${neutralFillSecondaryHover};
  }

  :host(:not([disabled]):focus-within) ${logicalControlSelector} {
    background: ${neutralFillSecondaryFocus};
  }

  :host([disabled]) ${logicalControlSelector} {
    background: ${neutralFillSecondaryRest};
  }

  .control::placeholder {
    color: ${filledPlaceholderRest};
  }

  :host(${interactivitySelector}:hover) .control::placeholder {
    color: ${filledPlaceholderHover};
  }
`;

/**
 * @internal
 */
export const inputForcedColorStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  logicalControlSelector: string,
  interactivitySelector?: string,
) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  logicalControlSelector: string,
  interactivitySelector: string = ':not([disabled]):not(:focus-within)',
) => css`
  :host {
    color: ${SystemColors.ButtonText};
  }

  ${logicalControlSelector} {
    background: ${SystemColors.ButtonFace};
    border-color: ${SystemColors.ButtonText};
  }

  :host(${interactivitySelector}:hover) ${logicalControlSelector},
  :host(:not([disabled]):focus-within) ${logicalControlSelector} {
    border-color: ${SystemColors.Highlight};
  }

  :host([disabled]) ${logicalControlSelector} {
    opacity: 1;
    background: ${SystemColors.ButtonFace};
    border-color: ${SystemColors.GrayText};
  }

  .control::placeholder,
  :host(${interactivitySelector}:hover) .control::placeholder {
    color: ${SystemColors.CanvasText};
  }

  :host(:not([disabled]):focus) ${logicalControlSelector} {
    ${focusTreatmentBase}
    outline-color: ${SystemColors.Highlight};
  }

  :host([disabled]) {
    opacity: 1;
    color: ${SystemColors.GrayText};
  }

  :host([disabled]) ::placeholder,
  :host([disabled]) ::-webkit-input-placeholder {
    color: ${SystemColors.GrayText};
  }
`;
