import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  colorBackgroundOverlay,
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorStrokeFocus1,
  colorStrokeFocus2,
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
    width: 592px;
  }
  :host([control-size='small']) {
    width: 320px;
  }
  :host([control-size='large']) {
    width: 940px;
  }

  :host(:focus-visible) .root:after {
    content: '';
    position: absolute;
    inset: 0px;
    cursor: pointer;
    outline: none;
    border: 2px solid ${colorStrokeFocus1};
    box-shadow: inset 0 0 0 1px ${colorStrokeFocus2};
  }

  .root {
    position: fixed;
    left: auto;
    right: 0;
    top: 0;
    z-index: 2;
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    width: inherit;
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-family: ${fontFamilyBase};
    font-weight: ${fontWeightRegular};
    color: ${colorNeutralForeground1};
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    display: grid;
    grid-template-rows: min-content 1fr min-content;
    row-gap: ${spacingVerticalS};
    background: ${colorNeutralBackground1};
    transform: translateX(100%);
    transition: transform ${durationNormal} ${curveDecelerateMid};
  }

  :host([position='left']) .root {
    right: auto;
    left: 0;
    margin-left: 0;
    column-gap: ${spacingHorizontalS};
    transform: translateX(-100%);
  }

  :host([open][position='left']) .root,
  :host([open]) .root {
    transform: translateX(0);
    transition: transform ${durationNormal} ${curveAccelerateMid};
    box-shadow: ${shadow64};
  }

  ::slotted([slot='header']),
  ::slotted([slot='toolbar']) {
    width: 100%;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    background-color: ${colorBackgroundOverlay};
    width: 100vw;
    height: 100vh;
    background-color: ${colorBackgroundOverlay};
    z-index: 1;
  }

  .header-container {
    padding: ${spacingVerticalS} ${spacingHorizontalXXL};
    display: flex;
    flex-direction: column;
    font-size: ${fontSizeBase500};
    line-height: ${lineHeightBase500};
    font-weight: ${fontWeightSemibold};
    padding: ${spacingVerticalXXL} ${spacingHorizontalXXL} 0;
    row-gap: ${spacingVerticalS};
  }

  .footer {
    display: flex;
    flex-direction: row;
    column-gap: ${spacingHorizontalS};
    padding: ${spacingVerticalL} ${spacingHorizontalXXL} ${spacingVerticalXXL};
    border-top: ${strokeWidthThin} solid var(--overflow-border, ${colorTransparentStroke});
  }
  .content {
    flex-grow: 1;
    position: relative;
    padding: ${spacingVerticalS} ${spacingHorizontalXXL} ${spacingVerticalXXL};
    overflow-y: auto;
  }
`;
