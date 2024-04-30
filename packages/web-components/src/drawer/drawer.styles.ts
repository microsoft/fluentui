import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  colorBackgroundOverlay,
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorStrokeFocus1,
  colorStrokeFocus2,
  colorTransparentStroke,
  curveAccelerateMin,
  curveDecelerateMid,
  curveEasyEase,
  durationNormal,
  durationSlow,
  fontFamilyBase,
  fontSizeBase300,
  fontWeightRegular,
  lineHeightBase300,
  shadow64,
  strokeWidthThick,
  strokeWidthThin,
} from '../theme/design-tokens.js';

/** Drawer styles
 * @public
 */
export const styles = css`
  ${display('block')}

  :host {
    position: fixed;
    height: 100%;
    max-height: 100vh;
    width: auto;
    outline: none;
    top: 0;
    left: 0;
    z-index: var(--drawer-elevation, 1000);
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-family: ${fontFamilyBase};
    font-weight: ${fontWeightRegular};
    color: ${colorNeutralForeground1};
  }

  :host([open][type='inline']),
  :host([open][modal-type='non-modal']) {
    width: 100%;
  }

  :host([position='end']) {
    inset-inline-start: unset;
    inset-inline-end: 0;
  }

  :host([type='inline']) dialog,
  :host([type='inline']) {
    position: relative;
    width: 0;
  }

  :host([open][type='inline']) dialog,
  :host([open][modal-type='non-modal']) {
    width: 522px;
  }

  :host([size='small']) dialog {
    width: 320px;
  }

  :host([open][size='small'][type='inline']),
  :host([open][size='small'][modal-type='non-modal']) {
    width: 320px;
  }

  :host([size='large']) dialog {
    width: 940px;
  }

  :host([open][size='large'][type='inline']),
  :host([open][size='large'][modal-type='non-modal']) {
    width: 940px;
  }

  :host([size='full']) dialog {
    width: 100%;
  }

  :host([open][size='large'][type='inline']),
  :host([open][size='large'][modal-type='non-modal']) {
    width: 100%;
  }

  :host([position='end']) dialog {
    margin-inline-start: auto;
    margin-inline-end: 0;
  }

  :host([position='end']) dialog {
    inset-inline-end: 0px;
  }

  dialog {
    background-color: transparent;
    top: 0;
    bottom: 0;
    border-radius: 0;
    height: 100%;
    margin-inline-start: 0;
    margin-inline-end: auto;
    padding: 0;
    max-width: 100%;
    max-height: 100vh;
    overflow: hidden;
    width: var(--drawer-width, 592px);
    box-shadow: ${shadow64};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    background: ${colorNeutralBackground1};
    position: absolute;
  }

  :host([position='end']) dialog {
    border-inline-end-color: ${colorTransparentStroke};
    border-inline-start-color: var(--drawer-separator, ${colorTransparentStroke});
  }

  :host([open][type='inline']),
  :host([open][modal-type='non-modal']) {
    width: var(--drawer-width, 592px);
  }

  :host([type='inline']) dialog {
    box-shadow: none;
  }

  :host([modal-type='non-modal']) dialog::backdrop {
    display: none;
  }

  .drawer {
  }

  dialog:focus-visible:after {
    content: '';
    position: absolute;
    inset: 0px;
    cursor: pointer;
    outline: none;
    border: ${strokeWidthThick} solid ${colorStrokeFocus1};
    box-shadow: inset 0 0 0 1px ${colorStrokeFocus2};
  }

  dialog:focus-visible {
    outline: none;
  }

  dialog::backdrop {
    background: ${colorBackgroundOverlay};
    inset: 0;
  }

  :host([data-animating]) dialog::backdrop {
    animation: drawer-fade;
    animation-timing-function: ${curveEasyEase};
    animation-duration: ${durationSlow};
  }

  :host([data-animating][data-closing]) dialog::backdrop {
    animation-direction: reverse;
  }

  :host([data-animating]) dialog {
    animation: drawer-slide-in-start;
    animation-timing-function: ${curveDecelerateMid};
    animation-duration: ${durationNormal};
  }

  :host([data-animating][data-closing]) dialog {
    animation-direction: reverse;
    animation-timing-function: ${curveAccelerateMin};
    animation-duration: ${durationNormal};
  }

  :host([position='end'][data-animating]) dialog {
    animation: drawer-slide-in-end;
    animation-timing-function: ${curveDecelerateMid};
    animation-duration: ${durationNormal};
  }

  :host([position='end'][data-closing]) dialog {
    animation-direction: reverse;
    animation-timing-function: ${curveAccelerateMin};
    animation-duration: ${durationNormal};
  }

  @keyframes drawer-fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes drawer-slide-in-start {
    0% {
      transform: translate3D(-100%, 0, 0);
    }
    100% {
      transform: translate3D(0%, 0, 0);
    }
  }

  @keyframes drawer-slide-in-end {
    0% {
      transform: translate3D(100%, 0, 0);
    }
    100% {
      transform: translate3D(0%, 0, 0);
    }
  }
`;
