import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  colorBackgroundOverlay,
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
  spacingHorizontalL,
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
    overflow-y: auto;
    width: 0;
    transition: width ${durationNormal} ${curveDecelerateMid};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-family: ${fontFamilyBase};
    font-weight: ${fontWeightRegular};
    color: ${colorNeutralForeground1};
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    box-shadow: ${shadow64};
  }

  :host([open]) {
    width: var(--drawer-width);
    transition: width ${durationNormal} ${curveAccelerateMid};
  }

  ::slotted([slot='header']),
  ::slotted([slot='toolbar']) {
    width: 100%;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${colorBackgroundOverlay};
  }

  .root {
    width: 100%;
    position: relative;
  }

  .header {
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: ${fontSizeBase500};
    line-height: ${lineHeightBase500};
    font-weight: ${fontWeightSemibold};
    padding: ${spacingVerticalXXL} ${spacingHorizontalXXL};
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
    padding: 0 ${spacingHorizontalXXL} ${spacingVerticalXXL};
  }

  .drawer {
    display: grid;
    grid-template-rows: 64px auto 72px;
    display: grid;
    height: 100%;
    width: 100%;
    position: relative;
    background: ${colorNeutralBackground1};
    z-index: 1;
  }

  :host([toolbar]) .drawer {
    grid-template-rows: 56px 34px auto 72px;
  }

  :host([toolbar]) .header {
    padding: ${spacingVerticalS} ${spacingHorizontalXXL};
  }

  .toolbar {
    padding: ${spacingVerticalL} ${spacingHorizontalL};
    height: 32px;
    display: flex;
    align-items: center;
  }

  .content {
    padding: ${spacingVerticalS} ${spacingHorizontalXXL} ${spacingVerticalXXL};
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
