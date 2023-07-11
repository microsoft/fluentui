import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  colorBackgroundOverlay,
  colorNeutralBackground1,
  colorNeutralForeground1,
  curveDecelerateMid,
  durationNormal,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  spacingHorizontalM,
  spacingHorizontalS,
  spacingHorizontalXXL,
  spacingVerticalS,
  spacingVerticalXXL,
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
    width: 595px;
    transition: width ${durationNormal} ${curveDecelerateMid};
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-family: ${fontFamilyBase};
    font-weight: ${fontWeightRegular};
    color: ${colorNeutralForeground1};
    transform: translateX(calc(100% + 32px));
  }

  .root {
    width: 100%;
    position: relative;
  }

  :host([data-context='drawer-switcher']) {
    right: 32px;
  }

  :host([expanded]) {
    transform: translateX(0);
    box-shadow: -4px 0px 8px rgba(0, 0, 0, 0.12), 0px 32px 64px rgba(0, 0, 0, 0.14), 0px 0px 0px rgba(0, 0, 0, 0);
  }

  :host([control-size='small']) {
    width: 320px;
  }

  :host([control-size='large']) {
    width: 940px;
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
    pointer-events: none;
  }

  .drawer {
    width: 100%;
    position: relative;
    z-index: 1;
    overflow: hidden;
    background: ${colorNeutralBackground1};
    padding: ${spacingHorizontalXXL} ${spacingVerticalXXL};
  }

  :host([compact]) .drawer {
    padding: ${spacingVerticalS} ${spacingHorizontalM};
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
