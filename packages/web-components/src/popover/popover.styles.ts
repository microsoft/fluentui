import { css } from '@microsoft/fast-element';
import * as tokens from '../theme/design-tokens.js';

export const styles = css`
  :host {
    display: contents;
  }

  .popover-content {
    position: absolute;
    background: ${tokens.colorNeutralBackground1};
    color: ${tokens.colorNeutralForeground1};
    padding: ${tokens.spacingHorizontalM} ${tokens.spacingVerticalM};
    border: ${tokens.strokeWidthThickest} solid ${tokens.colorNeutralStroke1};
  }
`;
