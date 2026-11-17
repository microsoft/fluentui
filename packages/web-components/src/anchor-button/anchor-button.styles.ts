import { css } from '@microsoft/fast-element';
import { createBaseButtonStyles } from '../button/button.styles.js';
import { stateSelector } from '../utils/element-internals.js';

// Need to support icon hover styles
export const styles = css`
  ${createBaseButtonStyles(`:is(:not(:defined):focus-within, ${stateSelector('focus-visible')})`)}

  a {
    display: inherit;
    align-items: inherit;
    justify-content: inherit;
    color: inherit;
    text-decoration: inherit;
    outline-style: none;
  }

  a::after {
    content: '';
    inset: 0;
    position: absolute;
  }

  @media (forced-colors: active) {
    :host {
      border-color: LinkText;
      color: LinkText;
    }
  }
`;
