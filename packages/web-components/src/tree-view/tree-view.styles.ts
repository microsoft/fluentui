import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';

export const TreeViewStyles = css`
  :host([hidden]) {
    display: none;
  }

  ${display('flex')} :host {
    flex-direction: column;
    align-items: stretch;
    min-width: fit-content;
    font-size: 0;
  }

  :host:focus-visible {
    outline: none;
  }
`;
