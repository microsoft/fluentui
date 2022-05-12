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
  layerCornerRadius,
  neutralFillActive,
  neutralFillHover,
  neutralFillRest,
  neutralFillSecondaryActive,
  neutralFillSecondaryHover,
  neutralFillSecondaryRest,
  neutralFillStealthActive,
  neutralFillStealthHover,
  neutralFillStealthRest,
  neutralForegroundRest,
  neutralStrokeControlActive,
  neutralStrokeControlHover,
  neutralStrokeControlRest,
  strokeWidth,
} from '../design-tokens';
import { typeRampBase } from '../styles/patterns/type-ramp';

export const selectFilledStyles: (context: ElementDefinitionContext, definition: SelectOptions) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: SelectOptions,
) => css`
  :host {
    background: ${neutralFillSecondaryRest};
    border-color: transparent;
  }

  :host(:not([disabled]):not([open]):hover) {
    background: ${neutralFillSecondaryHover};
    border-color: transparent;
  }

  :host(:not([disabled]):not([open]):active) {
    background: ${neutralFillSecondaryActive};
    border-color: transparent;
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(
    css`
      :host(:not([disabled]):not([open]):hover) {
        background: transparent;
      }
      :host(:not([disabled]):not([open]):hover),
      :host(:not([disabled]):not([open]):active) {
        border-color: ${SystemColors.Highlight};
      }
      :host(:${focusVisible}) {
        forced-color-adjust: none;
        background: transparent;
        border-color: ${SystemColors.Highlight};
        box-shadow: 0 0 0 1px inset ${SystemColors.Highlight};
      }
    `,
  )
);

export const selectStealthStyles: (context: ElementDefinitionContext, definition: SelectOptions) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: SelectOptions,
) => css`
  :host {
    background: ${neutralFillStealthRest};
    border-color: transparent;
  }

  :host(:not([disabled]):not([open]):hover) {
    background: ${neutralFillStealthHover};
    border-color: transparent;
  }

  :host(:not([disabled]):not([open]):active) {
    background: ${neutralFillStealthActive};
    border-color: transparent;
  }
`;

export const selectStyles = (context, definition) =>
  css`
    ${display('inline-flex')} :host {
      background: padding-box linear-gradient(${neutralFillRest}, ${neutralFillRest}),
        border-box ${neutralStrokeControlRest};
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
      border-radius: calc(${layerCornerRadius} * 1px);
      box-sizing: border-box;
      display: inline-flex;
      flex-direction: column;
      left: 0;
      max-height: calc(var(--max-height) - (${heightNumber} * 1px));
      padding: calc((${designUnit} - ${strokeWidth} ) * 1px) 0;
      overflow-y: auto;
      position: absolute;
      width: 100%;
      z-index: 1;
      margin: 1px 0;
      border: calc(${strokeWidth} * 1px) solid transparent;
    }

    :host .listbox[hidden] {
      display: none;
    }

    :host .control {
      align-items: center;
      box-sizing: border-box;
      cursor: pointer;
      display: flex;
      ${typeRampBase}
      min-height: 100%;
      padding: 0 calc(${designUnit} * 2.25px);
      width: 100%;
    }

    :host(:not([disabled]):not([open]):hover) {
      background: padding-box linear-gradient(${neutralFillHover}, ${neutralFillHover}),
        border-box ${neutralStrokeControlHover};
    }

    :host(:not([disabled]):not([open]):active) {
      background: padding-box linear-gradient(${neutralFillActive}, ${neutralFillActive}),
        border-box ${neutralStrokeControlActive};
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
      :host {
        background: ${SystemColors.ButtonFace};
        color: ${SystemColors.ButtonText};
      }
      :host(:not([disabled]):not([open]):hover) {
        background: transparent;
      }
      :host(:not([disabled]):hover) {
        border-color: ${SystemColors.Highlight};
      }
      :host(:${focusVisible}) {
        forced-color-adjust: none;
        border-color: ${SystemColors.Highlight};
        box-shadow: 0 0 0 1px inset ${SystemColors.Highlight};
      }
      :host([open]) .listbox {
        background: ${SystemColors.ButtonFace};
        border-color: ${SystemColors.CanvasText};
      }
      .start, .end, .indicator, ::slotted(svg) {
        fill: ${SystemColors.FieldText};
      }
      :host([disabled]) {
        border-color: ${SystemColors.GrayText};
        color: ${SystemColors.GrayText};
        opacity: 1;
      }
      :host([disabled]) .start,
      :host([disabled]) .end,
      :host([disabled]) .indicator,
      :host([disabled]) ::slotted(svg) {
        fill: ${SystemColors.GrayText};
      }
    `,
  )
);
