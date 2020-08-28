import { css } from '@microsoft/fast-element';
import { display, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { elevation } from '../styles';
import { neutralFillCardRestBehavior } from '../styles/index';
export const CardStyles = css`
  ${display('block')} :host {
    --elevation: 4;
    display: block;
    contain: content;
    height: var(--card-height, 100%);
    width: var(--card-width, 100%);
    box-sizing: border-box;
    background: ${neutralFillCardRestBehavior.var};
    border-radius: calc(var(--elevated-corner-radius) * 1px);
    ${elevation}
  }
`.withBehaviors(
  neutralFillCardRestBehavior,
  forcedColorsStylesheetBehavior(
    css`
      :host {
        forced-color-adjust: none;
        background: ${SystemColors.Canvas};
        box-shadow: 0 0 0 1px ${SystemColors.CanvasText};
      }
    `,
  ),
);
