import { css, ElementStyles } from '@microsoft/fast-element';
import {
  disabledCursor,
  ElementDefinitionContext,
  focusVisible,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import {
  accentForegroundRest,
  bodyFont,
  controlCornerRadius,
  disabledOpacity,
  focusStrokeWidth,
  neutralFillActive,
  neutralFillHover,
  neutralFillInputActive,
  neutralFillInputHover,
  neutralFillInputRest,
  neutralFillRest,
  neutralForegroundRest,
  strokeControlTextActive,
  strokeControlTextHover,
  strokeControlTextRest,
  strokeWidth,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
} from '../../design-tokens';
import { heightNumber } from '../size';

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
    font-family: ${bodyFont};
    font-size: ${typeRampBaseFontSize};
    line-height: ${typeRampBaseLineHeight};
    color: ${neutralForegroundRest};
    outline: none;
    user-select: none;
    position: relative;
  }

  ${rootSelector} {
    box-sizing: border-box;
    position: relative;
    color: inherit;
    background: padding-box linear-gradient(${neutralFillRest}, ${neutralFillRest}), border-box ${strokeControlTextRest};
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
    font-size: ${typeRampBaseFontSize};
    line-height: ${typeRampBaseLineHeight};
    margin-bottom: 4px;
  }

  .label__hidden {
    display: none;
    visibility: hidden;
  }

  :host(:hover:not([disabled]):not(:focus-within)) ${rootSelector} {
    background: padding-box linear-gradient(${neutralFillHover}, ${neutralFillHover}),
      border-box ${strokeControlTextHover};
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
    height: 100%;
    bottom: 0;
    border-bottom: calc(${focusStrokeWidth} * 1px) solid ${accentForegroundRest};
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
    background: ${neutralFillInputRest};
    border-color: transparent;
  }

  :host(:hover:not([disabled]):not(:focus-within)) ${rootSelector} {
    background: ${neutralFillInputHover};
    border-color: transparent;
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
  ${rootSelector} {
    forced-color-adjust: none;
    background: ${SystemColors.ButtonFace};
    border-color: ${SystemColors.ButtonText};
  }
  :host(:hover:not([disabled])) ${rootSelector} {
    background: ${SystemColors.ButtonFace};
    border-color: ${SystemColors.Highlight};
  }
  :host(:focus-within:enabled) ${rootSelector} {
    border-color: ${SystemColors.Highlight};
    box-shadow: 0 0 0 1px ${SystemColors.Highlight} inset;
  }
  .control,
  ::placeholder,
  ::-webkit-input-placeholder {
    color: ${SystemColors.FieldText};
  }
  .start,
  .end {
    fill: ${SystemColors.FieldText};
  }
  :host([disabled]) {
    opacity: 1;
  }
  :host([disabled]) ${rootSelector} {
    border-color: ${SystemColors.GrayText};
    background: ${SystemColors.Field};
  }
  :host([disabled]) ::placeholder,
  :host([disabled]) ::-webkit-input-placeholder,
  :host([disabled]) .label {
    color: ${SystemColors.GrayText};
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
  :host
    ${rootSelector},
    :host(:hover:not([disabled]))
    ${rootSelector},
    :host(:active:not([disabled]))
    ${rootSelector},
    :host(:focus-within:not([disabled]))
    ${rootSelector} {
    background: ${SystemColors.Field};
    border-color: ${SystemColors.FieldText};
  }
  :host(:not([disabled]):active)::after,
  :host(:not([disabled]):focus-within:not(:active))::after {
    border-bottom-color: ${SystemColors.Highlight};
  }
  :host([disabled]) ${rootSelector} {
    border-color: ${SystemColors.GrayText};
    background: ${SystemColors.Field};
  }
`;
