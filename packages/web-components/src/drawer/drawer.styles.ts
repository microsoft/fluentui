import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorTransparentStroke,
  curveAccelerateMid,
  durationNormal,
  fontFamilyBase,
  fontSizeBase300,
  fontSizeBase500,
  fontWeightRegular,
  fontWeightSemibold,
  lineHeightBase300,
  lineHeightBase500,
  shadow64,
  spacingHorizontalL,
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
    display: inline-block;
    left: auto;
    right: 0;
    top: 0;
    height: 100%;
    z-index: 1;
    overflow-x: hidden;
    transition: width 325ms ease 0s;
    width: 0;
    margin-right: 0;
    transition-duration: ${durationNormal};
    transition-timing-function: ${curveAccelerateMid};
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

  .header {
    height: 32px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    font-size: ${fontSizeBase500};
    font-family: ${fontFamilyBase};
    font-weight: ${fontWeightSemibold};
    line-height: ${lineHeightBase500};
    padding: ${spacingVerticalXXL} ${spacingHorizontalXXL} ${spacingVerticalS};
  }

  .actions {
    padding: ${spacingVerticalL} ${spacingHorizontalXXL} ${spacingVerticalXXL};
  }

  .panel {
    display: grid;
    grid-template-rows: 64px auto 72px;
    display: grid;
    height: 100%;
    width: 100%;
    transition: width 325ms ease 0s;
    transition-duration: ${durationNormal};
    transition-timing-function: ${curveAccelerateMid};
    transition-property: width;
    width: 100%;
    position: relative;
  }

  .content {
    padding: 0 ${spacingHorizontalXXL} ${spacingVerticalXXL} ${spacingHorizontalXXL};
  }

  :host([open]) {
    width: 522px;
    transition-duration: ${durationNormal};
    transition-timing-function: ${curveAccelerateMid};
    transition-property: width;
  }
`;
