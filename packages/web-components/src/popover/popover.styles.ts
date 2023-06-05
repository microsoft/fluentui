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
    color: ${tokens.colorNeutralForeground1};
    background: ${tokens.colorNeutralBackground1};
    box-shadow: ${tokens.shadow16};
    padding: ${tokens.spacingHorizontalM} ${tokens.spacingVerticalM};
    border-radius: ${tokens.borderRadiusMedium};
    border: 1px solid ${tokens.colorTransparentStroke};
    font-family: ${tokens.fontFamilyBase};
    font-size: ${tokens.fontSizeBase300};
    font-weight: ${tokens.fontWeightRegular};
    line-height: ${tokens.lineHeightBase300};
  }

  :host([appearance='brand']) .popover-content {
    background-color: ${tokens.colorBrandBackground};
    color: ${tokens.colorNeutralForegroundOnBrand};
  }

  :host([appearance='inverted']) .popover-content {
    background-color: ${tokens.colorNeutralBackgroundStatic};
    color: ${tokens.colorNeutralForegroundStaticInverted};
  }
`;
