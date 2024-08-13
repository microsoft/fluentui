import { css } from '@microsoft/fast-element';
import { baseButtonStyles } from '../button/button.styles.js';
import { forcedColorsStylesheetBehavior } from '../utils/index.js';

// Need to support icon hover styles
export const styles = css`
  ${baseButtonStyles}

  ::slotted(a) {
    position: absolute;
    inset: 0;
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host {
      border-color: LinkText;
      color: LinkText;
    }
  `),
);
