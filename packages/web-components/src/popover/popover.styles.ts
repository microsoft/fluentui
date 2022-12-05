import { css } from '@microsoft/fast-element';
import * as tokens from '../theme/design-tokens';

export const styles = css`
  :host {
    display: inline-block;
    //height: 0;
    //width: 0;
    overflow: visible;
  }

  .popover-arrow {
    position: absolute;
    width: 12px;
    height: 12px;
    background: red;
    transform: rotate(45deg);
  }

  .popover-content {
    position: absolute;
    white-space: nowrap;
    //visibility: hidden;
    left: 0;
    top: 0;
    background: ${tokens.colorNeutralBackground1};
    color: ${tokens.colorNeutralForeground1};
    padding: ${tokens.spacingHorizontalM} ${tokens.spacingVerticalM};
    border: ${tokens.strokeWidthThickest} solid ${tokens.colorNeutralStroke1};
  }
`;
