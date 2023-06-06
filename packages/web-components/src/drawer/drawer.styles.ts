import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorTransparentStroke,
  curveAccelerateMid,
  curveDecelerateMid,
  durationNormal,
  fontFamilyBase,
  fontSizeBase300,
  fontSizeBase500,
  fontWeightRegular,
  fontWeightSemibold,
  lineHeightBase300,
  lineHeightBase500,
  shadow64,
  spacingHorizontalS,
  spacingHorizontalXXL,
  spacingVerticalL,
  spacingVerticalS,
  spacingVerticalXXL,
  strokeWidthThin,
} from '../theme/design-tokens.js';

/** Drawer styles
 * @public
 */
export const styles = css`
  ${display('flex')}

  :host {
    position: fixed;
    left: auto;
    right: 0;
    top: 0;
    height: 100%;
    z-index: 1;
    overflow-x: hidden;
    width: 0;
    transition-duration: ${durationNormal};
    transition-timing-function: ${curveDecelerateMid};
    transition-property: width;
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    line-height: ${lineHeightBase300};
    background: ${colorNeutralBackground1};
    color: ${colorNeutralForeground1};
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    box-shadow: ${shadow64};
  }

  :host([open]) {
    width: var(--drawer-width);
    transition-duration: ${durationNormal};
    transition-timing-function: ${curveAccelerateMid};
    transition-property: width;
    width: var(--drawer-width);
  }

  ::slotted([slot='header']) {
    width: 100%;
  }

  .header {
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: ${fontSizeBase500};
    font-family: ${fontFamilyBase};
    font-weight: ${fontWeightSemibold};
    line-height: ${lineHeightBase500};
    padding: ${spacingVerticalXXL} ${spacingHorizontalXXL} ${spacingVerticalS};
  }

  .close {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
  }

  .actions {
    padding: ${spacingVerticalL} ${spacingHorizontalXXL} ${spacingVerticalXXL};
  }

  .drawer {
    display: grid;
    grid-template-rows: 64px auto 72px;
    display: grid;
    height: 100%;
    width: 100%;
    position: relative;
  }

  .content {
    padding: 0 ${spacingHorizontalXXL} ${spacingVerticalXXL};
  }

  ::slotted([slot='actions']) {
    display: flex;
    flex-direction: row;
    column-gap: ${spacingHorizontalS};
  }

  :host([position='left']) {
    right: auto;
    left: 0;
    margin-left: 0;
    column-gap: ${spacingHorizontalS};
  }
`;
