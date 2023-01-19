import { css } from '@microsoft/fast-element';

import {} from '../theme/design-tokens.js';

export const styles = css`
  :host {
  }

  :host([dividerAlignContent='start']) {
    display: flex;
    align-items: flex-start;
  }
  :host([dividerAlignContent='center']) {
    display: flex;
    align-items: center;
  }
  :host([dividerAlignContent='end']) {
    display: flex;
    align-items: end;
  }
  :host([DividerAppearance='strong']) {
  }
  :host([DividerAppearance='brand']) {
  }
  :host([DividerAppearance='subtle']) {
  }
  :host([DividerAppearance='default']) {
  }
`;
