import { css } from '@microsoft/fast-element';

export const anchoredRegionStyles = (context, definition) => css`
  :host {
    contain: layout;
    display: block;
  }
`;
