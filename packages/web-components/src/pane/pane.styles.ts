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

/** Pane styles
 * @public
 */
export const styles = css`
  ${display('flex')}

  :host {
    position: fixed;
    left: auto;
    right: 0; /* Use the CSS custom property */
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
    box-shadow: -4px 0px 8px rgba(0, 0, 0, 0.12), 0px 32px 64px rgba(0, 0, 0, 0.14), 0px 0px 0px rgba(0, 0, 0, 0);
  }

  .root {
    width: 100%;
    position: relative;
  }

  :host([data-context='pane-switcher']) {
    right: 32px;
  }

  :host([open]) {
    width: var(--pane-width, 595px);
    transition: width ${durationNormal} ${curveAccelerateMid};
  }

  :host([open][control-size='small']) {
    width: 320px;
  }

  :host([open][control-size='large']) {
    width: 940px;
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

  .pane {
    display: grid;
    grid-template-rows: 64px auto 72px;
    display: grid;
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 1;
    background: ${colorNeutralBackground1};
  }

  :host([toolbar]) .pane {
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
