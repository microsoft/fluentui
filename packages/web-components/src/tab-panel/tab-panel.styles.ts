import { css } from '@microsoft/fast-element';
import { spacingHorizontalM, spacingHorizontalMNudge } from '../theme/design-tokens.js';

export const styles = css`
  :host([hidden]) {
    display: none;
  }
  :host {
    display: block;
    box-sizing: border-box;
    padding: ${spacingHorizontalM} ${spacingHorizontalMNudge};
  }
`;
