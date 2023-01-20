import { css } from '@microsoft/fast-element';

import {} from '../theme/design-tokens.js';

export const styles = css`
  :host {
    /* default CSS */
    display: flex;
    background-color: red;
  }

  :host([alignContent='start']) {
    align-items: flex-start;
  }
  :host([alignContent='center']) {
    align-items: center;
  }
  :host([alignContent='end']) {
    align-items: end;
  }
  :host([appearance='strong']) {
  }
  :host([appearance='brand']) {
  }
  :host([appearance='subtle']) {
  }
  :host([appearance='default']) {
  }
`;
