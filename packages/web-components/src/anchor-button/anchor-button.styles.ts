import { css } from '@microsoft/fast-element';
import { baseButtonStyles } from '../button/button.styles.js';

// Need to support icon hover styles
export const styles = css`
  ${baseButtonStyles}

  ::slotted(a) {
    position: absolute;
    inset: 0;
  }

  @media (forced-colors: active) {
    :host {
      border-color: LinkText;
      color: LinkText;
    }
  }
`;
