import { css, ElementStyles } from '@microsoft/fast-element';
import {
  disabledCursor,
  display,
  ElementDefinitionContext,
  focusVisible,
  forcedColorsStylesheetBehavior,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { fillStateStyles, heightNumber } from '../styles';
import { appearanceBehavior } from '../utilities/behaviors';
import {
  controlCornerRadius,
  designUnit,
  focusStrokeOuter,
  neutralFillHover,
  neutralFillInputHover,
  neutralFillInputRest,
  neutralFillRest,
  neutralForegroundRest,
  neutralStrokeHover,
  neutralStrokeRest,
  strokeWidth,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
} from '../design-tokens';

export const textAreaFilledStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    :host([appearance='filled']) .control {
      background: ${neutralFillRest};
      border-color: transparent;
    }

    :host([appearance='filled']:hover:not([disabled])) .control {
      background: ${neutralFillHover};
      border-color: transparent;
    }

    :host([appearance='filled']:focus-within:not([disabled])) .control {
      border-color: transparent;
      box-shadow: none;
    }
    ${fillStateStyles(context, definition)}
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host([appearance='filled']:hover:not([disabled])) .control,
        :host([appearance='filled']:focus-within:not([disabled])) .control {
          background: ${SystemColors.Field};
          border-color: ${SystemColors.FieldText};
        }
        :host([appearance='filled']:not([disabled]):active)::after,
        :host([appearance='filled']:not([disabled]):focus-within:not(:active))::after {
          border-bottom-color: ${SystemColors.Highlight};
        }
      `,
    ),
  );

export const textAreaStyles = (context, definition) =>
  css`
    ${display('inline-flex')} :host {
      font-family: var(--body-font);
      outline: none;
      user-select: none;
      position: relative;
      flex-direction: column;
      vertical-align: bottom;
    }

    .control {
      box-sizing: border-box;
      position: relative;
      color: ${neutralForegroundRest};
      background: ${neutralFillInputRest};
      border-radius: calc(${controlCornerRadius} * 1px);
      border: calc(${strokeWidth} * 1px) solid ${neutralStrokeRest};
      height: calc(${heightNumber} * 2px);
      font: inherit;
      font-size: ${typeRampBaseFontSize};
      line-height: ${typeRampBaseLineHeight};
      padding: calc(${designUnit}} * 1.5px) calc(${designUnit}} * 2px + 1px);
      width: 100%;
      resize: none;
    }

    .control:hover:enabled {
      background: ${neutralFillInputHover};
      border-color: ${neutralStrokeHover};
    }

    .control:hover,
    .control:${focusVisible},
    .control:disabled,
    .control:active {
      outline: none;
    }

    :host(:focus-within) .control {
      border-color: ${focusStrokeOuter};
      box-shadow: 0 0 0 1px ${focusStrokeOuter} inset;
    }

    :host(.resize-both) .control {
      resize: both;
    }

    :host(.resize-horizontal) .control {
      resize: horizontal;
    }

    :host(.resize-vertical) .control {
      resize: vertical;
    }

    .label__hidden {
      display: none;
      visibility: hidden;
    }

    .label {
      display: block;
      color: ${neutralForegroundRest};
      cursor: pointer;
      $font-size: ${typeRampBaseFontSize};
      line-height: ${typeRampBaseLineHeight};
      margin-bottom: 4px;
    }

    :host([disabled]) .label,
    :host([readonly]) .label,
    :host([readonly]) .control,
    :host([disabled]) .control {
      cursor: ${disabledCursor};
    }
    :host([disabled]) {
      opacity: var(--disabled-opacity);
    }
  `.withBehaviors(
    appearanceBehavior('filled', textAreaFilledStyles(context, definition)),
    forcedColorsStylesheetBehavior(
      css`
        :host([disabled]) {
          opacity: 1;
        }
        ::placeholder,
        ::-webkit-input-placeholder {
          color: ${SystemColors.FieldText};
        }
        :host([disabled]) ::placeholder,
        :host([disabled]) ::-webkit-input-placeholder,
        :host([disabled]) .label {
          color: ${SystemColors.GrayText};
        }
      `,
    ),
  );
