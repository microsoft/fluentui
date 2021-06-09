import { css } from '@microsoft/fast-element';
import { forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import { neutralFillRest, strokeWidth, neutralStrokeDivider } from '../design-tokens';

export const dataGridRowStyles = (context, defintion) =>
  css`
    :host {
      display: grid;
      padding: 1px 0;
      box-sizing: border-box;
      width: 100%;
      border-bottom: calc(${strokeWidth} * 1px) solid ${neutralStrokeDivider};
    }

    :host(.header) {
    }

    :host(.sticky-header) {
      background: ${neutralFillRest};
      position: sticky;
      top: 0;
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host {
        }
      `,
    ),
  );
