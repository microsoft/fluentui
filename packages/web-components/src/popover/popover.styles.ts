import { css } from '@microsoft/fast-element';
import * as tokens from '../theme/design-tokens.js';

export const styles = css`
  :host {
    display: contents;
  }

  .popover-content ::slotted(*) {
    position: relative; /* needed for correct positioning of nested popovers */
  }

  .popover-content {
    position: absolute;
    left: 0;
    top: 0;
    background: ${tokens.colorNeutralBackground1};
    color: ${tokens.colorNeutralForeground1};
    padding: ${tokens.spacingHorizontalM} ${tokens.spacingVerticalM};
    border: ${tokens.strokeWidthThickest} solid ${tokens.colorNeutralStroke1};
  }
`;
