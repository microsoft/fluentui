import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import * as tokens from '../theme/design-tokens.js';

const borderWidth = '1px';

/* see also arrowSize in popover implementation */
const arrowEdgeLength = {
  small: `${6 * 1.414}px`,
  default: `${8 * 1.414}px` /* used for both medium and large */,
};

export const styles = css`
  :host {
    ${display('contents')}
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
    padding: 16px; /* size="medium" */
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

  .popover-arrow {
    position: absolute;
    background-color: inherit;
    visibility: hidden;
    z-index: -1;
    width: ${arrowEdgeLength.default};
    height: ${arrowEdgeLength.default};
  }

  :host([size='small']) .popover-arrow {
    width: ${arrowEdgeLength.small};
    height: ${arrowEdgeLength.small};
  }

  .popover-arrow::before {
    content: '';
    visibility: visible;
    position: absolute;
    box-sizing: border-box;
    width: inherit;
    height: inherit;
    background-color: inherit;
    border-right: ${borderWidth} solid ${tokens.colorTransparentStroke};
    border-bottom: ${borderWidth} solid ${tokens.colorTransparentStroke};
    border-bottom-right-radius: ${tokens.borderRadiusSmall};
    transform: rotate(var(--angle)) translate(0, 50%) rotate(45deg);
  }

  :host([data-popper-placement^='top']) .popover-arrow {
    bottom: -${borderWidth};
    --angle: 0;
  }

  :host([data-popper-placement^='right']) .popover-arrow {
    left: -${borderWidth};
    --angle: 90deg;
  }

  :host([data-popper-placement^='bottom']) .popover-arrow {
    top: -${borderWidth};
    --angle: 180deg;
  }

  :host([data-popper-placement^='left']) .popover-arrow {
    right: -${borderWidth};
    --angle: 270deg;
  }

  :host([size='small']) .popover-content {
    padding: 12px;
  }

  :host([size='large']) .popover-content {
    padding: 20px;
  }
`;
