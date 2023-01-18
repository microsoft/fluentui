import { css } from '@microsoft/fast-element';

import {} from '../theme/design-tokens.js';

export const styles = css`
  :host {
  }

  :host([alignContent='start']) {
    display: flex;
    align-items: flex-start;
  }
  :host([alignContent='center']) {
    display: flex;
    align-items: center;
  }
  :host([alignContent='end']) {
    display: flex;
    align-items: end;
  }
`;
