import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorStrokeFocus1,
  colorStrokeFocus2,
  colorTransparentStroke,
  curveAccelerateMin,
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
  spacingVerticalXL,
  spacingVerticalXXL,
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
    right: 0;
    left: unset;
  }

  :host([type='inline']) dialog,
  :host([type='inline']) {
    position: relative;
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
    margin-right: 0;
    margin-left: auto;
  }

  :host([position='end']) dialog {
    right: 0px;
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0.4);
  }

  dialog {
    color: inherit;
    font: inherit;
    background-color: transparent;
    border: 1px solid ${colorTransparentStroke};
    border-right-color: var(--drawer-separator, ${colorTransparentStroke});
    border-left-color: ${colorTransparentStroke};
    top: 0;
    bottom: 0;
    border-radius: 0;
    height: 100%;
    margin-left: 0;
    margin-right: auto;
    padding: 0;
    max-width: 100%;
    max-height: 100vh;
    overflow: hidden;
    width: var(--drawer-width, 592px);
    box-shadow: ${shadow64};
  }

  :host([position='end']) dialog {
    border-right-color: ${colorTransparentStroke};
    border-left-color: var(--drawer-separator, ${colorTransparentStroke});
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
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-family: ${fontFamilyBase};
    font-weight: ${fontWeightRegular};
    color: ${colorNeutralForeground1};
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    display: grid;
    grid-template-rows: min-content 1fr min-content;
    background: ${colorNeutralBackground1};
    width: inherit;
    padding: ${spacingVerticalXL} ${spacingHorizontalXXL};
    position: absolute;
    width: inherit;
  }

  .header {
    font-size: ${fontSizeBase500};
    line-height: ${lineHeightBase500};
    font-weight: ${fontWeightSemibold};
    padding-bottom: ${spacingVerticalS};
  }

  .content {
    flex-grow: 1;
    position: relative;
    overflow-y: auto;
  }

  ::slotted([slot='footer']) {
    display: flex;
    flex-direction: row;
    column-gap: ${spacingHorizontalS};
    padding-top: ${spacingVerticalL};
    border-top: ${strokeWidthThin} solid var(--drawer-overflow-border, ${colorTransparentStroke});
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
    background-color: rgba(0, 0, 0, 0.4);
    inset: 0;
  }

  :host(.animating) dialog::backdrop {
    animation: drawer-fade;
    animation-timing-function: cubic-bezier(0.33, 0, 0.67, 1);
    animation-duration: 250ms;
  }

  :host(.animating.closing) dialog::backdrop {
    animation-direction: reverse;
  }

  :host(.animating) dialog {
    animation: drawer-slide-in-start;
    animation-timing-function: ${curveDecelerateMid};
    animation-duration: ${durationNormal};
  }

  :host(.animating.closing) dialog {
    animation-direction: reverse;
    animation-timing-function: ${curveAccelerateMin};
    animation-duration: ${durationNormal};
  }

  :host([position='end'].animating) dialog {
    animation: drawer-slide-in-end;
    animation-timing-function: ${curveDecelerateMid};
    animation-duration: ${durationNormal};
  }

  :host([position='end'].closing) dialog {
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
