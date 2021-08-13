import { css, ElementStyles } from '@microsoft/fast-element';
import {
  disabledCursor,
  display,
  ElementDefinitionContext,
  focusVisible,
  forcedColorsStylesheetBehavior,
  SelectOptions,
} from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { elevationShadowFlyout } from '../styles/elevation';
import { heightNumber } from '../styles/size';
import { appearanceBehavior } from '../utilities/behaviors';
import {
  bodyFont,
  controlCornerRadius,
  designUnit,
  disabledOpacity,
  fillColor,
  focusStrokeOuter,
  focusStrokeWidth,
  neutralFillActive,
  neutralFillHover,
  neutralFillInputActive,
  neutralFillInputHover,
  neutralFillInputRest,
  neutralFillRest,
  neutralFillStealthActive,
  neutralFillStealthHover,
  neutralFillStealthRest,
  neutralForegroundRest,
  strokeControlActive,
  strokeControlHover,
  strokeControlRest,
  strokeWidth,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
} from '../design-tokens';

export const selectFilledStyles: (context: ElementDefinitionContext, definition: SelectOptions) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: SelectOptions,
) => css`
  :host {
    background: ${neutralFillInputRest};
    border-color: transparent;
  }

  :host(:not([disabled]):hover) {
    background: ${neutralFillInputHover};
    border-color: transparent;
  }

  :host(:not([disabled]):active) {
    background: ${neutralFillInputActive};
    border-color: transparent;
  }
`;

export const selectStealthStyles: (context: ElementDefinitionContext, definition: SelectOptions) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: SelectOptions,
) => css`
  :host {
    background: ${neutralFillStealthRest};
    border-color: transparent;
  }

  :host(:not([disabled]):hover) {
    background: ${neutralFillStealthHover};
    border-color: transparent;
  }

  :host(:not([disabled]):active) {
    background: ${neutralFillStealthActive};
    border-color: transparent;
  }
`;

export const selectStyles = (context, definition) =>
  css`
    ${display('inline-flex')} :host {
      background: padding-box linear-gradient(${neutralFillRest}, ${neutralFillRest}), border-box ${strokeControlRest};
      border: calc(${strokeWidth} * 1px) solid transparent;
      border-radius: calc(${controlCornerRadius} * 1px);
      box-sizing: border-box;
      color: ${neutralForegroundRest};
      fill: currentcolor;
      font-family: ${bodyFont};
      height: calc(${heightNumber} * 1px);
      position: relative;
      user-select: none;
      min-width: 250px;
      vertical-align: top;
    }

    :host .listbox {
      box-shadow: ${elevationShadowFlyout};
      background: ${fillColor};
      border-radius: calc(${controlCornerRadius} * 1px);
      box-sizing: border-box;
      display: inline-flex;
      flex-direction: column;
      left: 0;
      max-height: calc(var(--max-height) - (${heightNumber} * 1px));
      padding: calc(${designUnit} * 1px) 0;
      overflow-y: auto;
      position: absolute;
      width: 100%;
      z-index: 1;
      margin: 1px 0;
    }

    :host .listbox[hidden] {
      display: none;
    }

    :host .control {
      align-items: center;
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      font-size: ${typeRampBaseFontSize};
      font-family: inherit;
      min-height: 100%;
      line-height: ${typeRampBaseLineHeight};
      padding: 0 calc(${designUnit} * 2.25px);
      width: 100%;
    }

    :host(:not([disabled]):hover) {
      background: padding-box linear-gradient(${neutralFillHover}, ${neutralFillHover}),
        border-box ${strokeControlHover};
    }

    :host(:not([disabled]):active) {
      background: padding-box linear-gradient(${neutralFillActive}, ${neutralFillActive}),
        border-box ${strokeControlActive};
    }

    :host(:${focusVisible}) {
      border-color: ${focusStrokeOuter};
      outline: none;
      box-shadow: 0 0 0 1px inset ${focusStrokeOuter};
    }

    :host([disabled]) {
      cursor: ${disabledCursor};
      opacity: ${disabledOpacity};
    }

    :host([disabled]) .control {
      cursor: ${disabledCursor};
      user-select: none;
    }

    :host([open][position='above']) .listbox {
      bottom: calc((${heightNumber} + ${designUnit} * 2) * 1px);
    }

    :host([open][position='below']) .listbox {
      top: calc((${heightNumber} + ${designUnit} * 2) * 1px);
    }

    .selected-value {
      font-family: inherit;
      flex: 1 1 auto;
      text-align: start;
    }

    .indicator {
      flex: 0 0 auto;
      margin-inline-start: 1em;
    }

    slot[name='listbox'] {
      display: none;
      width: 100%;
    }

    :host([open]) slot[name='listbox'] {
      display: flex;
      position: absolute;
    }

    .start {
      margin-inline-end: 11px;
    }

    .end {
      margin-inline-start: 11px;
    }

    .start,
    .end,
    .indicator,
    ::slotted(svg) {
      display: flex;
    }

    ::slotted([role='option']) {
      flex: 0 0 auto;
    }
  `.withBehaviors(
    appearanceBehavior('filled', selectFilledStyles(context, definition)),
    appearanceBehavior('stealth', selectStealthStyles(context, definition)),
    forcedColorsStylesheetBehavior(
      css`
        :host([disabled]) {
          border-color: ${SystemColors.GrayText};
          background-color: ${SystemColors.ButtonFace};
          color: ${SystemColors.GrayText};
          opacity: 1;
          forced-color-adjust: none;
        }

        :host([disabled]:hover) {
          background: ${SystemColors.ButtonFace};
        }

        :host([disabled]) .control {
          color: ${SystemColors.GrayText};
          border-color: ${SystemColors.GrayText};
        }

        :host(:not([disabled]):hover) {
          background: ${SystemColors.ButtonFace};
          border-color: ${SystemColors.Highlight};
        }

        :host(:${focusVisible}) {
          forced-color-adjust: none;
          background: ${SystemColors.ButtonFace};
          border-color: ${SystemColors.Highlight};
          box-shadow: 0 0 0 1px inset ${SystemColors.Highlight};
          color: ${SystemColors.ButtonText};
          fill: currentcolor;
        }

        :host([open]) .listbox {
          background: ${SystemColors.ButtonFace};
          border: 1px solid ${SystemColors.ButtonText};
        }

        :host(:${focusVisible}) ::slotted([aria-selected="true"][role="option"]:not([disabled])) {
          background: ${SystemColors.Highlight};
          border-color: ${SystemColors.ButtonText};
          box-shadow: 0 0 0 calc(${focusStrokeWidth} * 1px) inset ${SystemColors.HighlightText};
          color: ${SystemColors.HighlightText};
          fill: currentcolor;
        }

        ::slotted([role='option']:not([aria-selected='true']):not([disabled]):hover) {
          forced-color-adjust: none;
          color: ${SystemColors.ButtonText};
          background: ${SystemColors.ButtonFace};
          border-color: ${SystemColors.Highlight};
          box-shadow: none;
        }
      `,
    ),
  );
