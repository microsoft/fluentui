import { css } from '@microsoft/fast-element';
import { display, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import {
  neutralLayerFloating,
  neutralOutlineRest,
  neutralFocus,
  outlineWidth,
  cornerRadius,
  designUnit,
  focusOutlineWidth,
} from '../design-tokens';

export const listboxStyles = (context, definition) =>
  css`
    ${display('inline-flex')} :host {
      background: ${neutralLayerFloating};
      border: calc(${outlineWidth} * 1px) solid ${neutralOutlineRest};
      border-radius: calc(${cornerRadius} * 1px);
      box-sizing: border-box;
      flex-direction: column;
      padding: calc(${designUnit} * 1px) 0;
    }

    :host(:focus-within:not([disabled])) {
      border-color: ${neutralFocus};
      box-shadow: 0 0 0 1px ${neutralFocus} inset;
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
            :host(:${focusVisible}) ::slotted([aria-selected="true"][role="option"]) {
                background: ${SystemColors.Highlight};
                border-color: ${SystemColors.ButtonText};
                box-shadow: 0 0 0 calc(${focusOutlineWidth} * 1px) inset ${SystemColors.HighlightText};
                color: ${SystemColors.HighlightText};
                fill: currentcolor;
            }

            :host(:${focusVisible}) ::slotted([aria-selected="true"][role="option"]) {
                background: ${SystemColors.Highlight};
                border-color: ${SystemColors.ButtonText};
                box-shadow: 0 0 0 calc(${focusOutlineWidth} * 1px) inset ${SystemColors.HighlightText};
                color: ${SystemColors.HighlightText};
                fill: currentcolor;
            }

            ::slotted([role="option"]:not([aria-selected="true"]):not([disabled]):hover) {
                forced-color-adjust: none;
                color: ${SystemColors.ButtonText};
                background: ${SystemColors.ButtonFace};
                border-color: ${SystemColors.Highlight};
                box-shadow: none;
            }
        `,
    ),
  );
