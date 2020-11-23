import { css } from '@microsoft/fast-element';
import { display, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import {
  neutralFocusBehavior,
  neutralLayerFloatingBehavior,
  neutralOutlineFocusBehavior,
  neutralOutlineRestBehavior,
} from '../styles';

export const ListboxStyles = css`
  ${display('inline-flex')} :host {
    background: ${neutralLayerFloatingBehavior.var};
    border: calc(var(--outline-width) * 1px) solid ${neutralOutlineRestBehavior.var};
    border-radius: calc(var(--corner-radius) * 1px);
    box-sizing: border-box;
    flex-direction: column;
    padding: calc(var(--design-unit) * 1px) 0;
  }

  :host(:focus-within:not([disabled])) {
    border-color: ${neutralFocusBehavior.var};
    box-shadow: 0 0 0 1px ${neutralFocusBehavior.var} inset;
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(
    css`
            :host(:${focusVisible}) ::slotted([aria-selected="true"][role="option"]) {
                background: ${SystemColors.Highlight};
                border-color: ${SystemColors.ButtonText};
                box-shadow: 0 0 0 calc(var(--focus-outline-width) * 1px) inset ${SystemColors.HighlightText};
                color: ${SystemColors.HighlightText};
                fill: currentcolor;
            }

            :host(:${focusVisible}) ::slotted([aria-selected="true"][role="option"]) {
                background: ${SystemColors.Highlight};
                border-color: ${SystemColors.ButtonText};
                box-shadow: 0 0 0 calc(var(--focus-outline-width) * 1px) inset ${SystemColors.HighlightText};
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
  neutralLayerFloatingBehavior,
  neutralOutlineRestBehavior,
  neutralOutlineFocusBehavior,
);
