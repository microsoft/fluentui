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
  fontSizeBase400,
  fontSizeBase500,
  fontWeightRegular,
  fontWeightSemibold,
  lineHeightBase300,
  lineHeightBase400,
  lineHeightBase500,
  spacingHorizontalL,
  spacingHorizontalM,
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
    z-index: 1000;
    left: auto;
    right: 0; /* Use the CSS custom property */
    top: 0;
    height: 100%;
    z-index: 1;
    overflow: hidden;
    width: 0;
    transition: width ${durationNormal} ${curveDecelerateMid};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-family: ${fontFamilyBase};
    font-weight: ${fontWeightRegular};
    color: ${colorNeutralForeground1};
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
  }

  .root {
    width: 100%;
    position: relative;
  }

  :host([data-context='drawer-switcher']) {
    right: 34px;
  }

  :host([expanded]) {
    width: var(--drawer-width, 595px);
    transition: width ${durationNormal} ${curveAccelerateMid};
    box-shadow: -4px 0px 8px rgba(0, 0, 0, 0.12), 0px 32px 64px rgba(0, 0, 0, 0.14), 0px 0px 0px rgba(0, 0, 0, 0);
  }

  :host([expanded][control-size='small']) {
    width: 320px;
  }

  :host([expanded][control-size='large']) {
    width: 940px;
  }

  ::slotted([slot='header']),
  ::slotted([slot='toolbar']) {
    width: 100%;
  }

  :host([modal][expanded]) {
    /* This will create an overlay effect */
    z-index: 1000;
  }

  :host([modal][expanded])::before {
    content: '';
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: ${colorBackgroundOverlay};
    z-index: -1;
  }

  .header-container {
    height: 32px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .header {
    font-size: ${fontSizeBase500};
    line-height: ${lineHeightBase500};
    font-weight: ${fontWeightSemibold};
  }
  .subheader {
    height: 28px;
  }
  .drawer {
    display: grid;
    grid-template-rows: 34px auto 72px;
    flex-direction: column;
    width: 100%;
    position: relative;
    z-index: 1;
    overflow: hidden;
    background: ${colorNeutralBackground1};
    padding: ${spacingHorizontalXXL} ${spacingVerticalXXL};
  }

  .toolbar-container {
    display: grid;
  }

  :host([compact]) .drawer {
    padding: ${spacingVerticalS} ${spacingHorizontalM};
  }

  :host([compact]) .header {
    font-size: ${fontSizeBase400};
    line-height: ${lineHeightBase400};
    font-weight: ${fontWeightSemibold};
  }
  :host([compact]) .header-container {
    height: 28px;
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
    position: relative; /* to be on top of the overlay */
    z-index: 1;
  }

  .content {
    padding: ${spacingVerticalS} 0 ${spacingVerticalXXL};
  }

  .footer {
    align-self: flex-end;
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
  [hidden] {
    display: none;
  }
`;
