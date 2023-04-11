import { css } from '@microsoft/fast-element';
import { styles as ButtonStyles } from '../button/button.styles.js';

// Need to support icon hover styles
export const styles = css`
  ${ButtonStyles}

  .content {
    text-align: center;
  }
`;
