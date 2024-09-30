import { css } from '@microsoft/fast-element';
import { colorNeutralStroke1, display, strokeWidthThin } from '../index.js';

export const styles = css`
  ${display('inline-flex')}

  ::slotted(fluent-button:nth-child(1)) {
    border-inline-end: 0;
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  ::slotted(fluent-button:nth-child(2)) {
    border-inline-start: ${strokeWidthThin} solid ${colorNeutralStroke1};
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  ::slotted(fluent-button[appearance='primary']:nth-child(2)) {
    border-inline-start: ${strokeWidthThin} solid white;
  }
`;
