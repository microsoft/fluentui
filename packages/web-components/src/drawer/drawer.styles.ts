import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import {
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorNeutralStroke2,
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
    width: auto;
    outline: none;
    top: 0;
    left: 0;
    z-index: var(--drawer-elevation, 1000);
  }

  :host([position='end']) {
    right: 0;
    left: unset;
  }

  :host([type='inline']) .dialog,
  :host([type='inline']) {
    position: relative;
  }

  :host([size='small']) dialog {
    width: 320px;
  }

  :host([size='large']) dialog {
    width: 940px;
  }

  :host([size='full']) dialog {
    width: 100%;
  }

  :host([position='end']) dialog {
    margin-right: 0;
    margin-left: auto;
  }

  :host([position='end']) dialog {
    right: 0px;
  }

  :host([modal-type='non-modal']) dialog::backdrop {
    display: none;
  }

  dialog::backdrop {
    background: rgba(0, 0, 0, 0.4);
  }

  dialog {
    color: inherit;
    font: inherit;
    background-color: transparent;
    top: 0;
    bottom: 0;
    border-radius: 0;
    border: 1px solid ${colorTransparentStroke};
    height: 100%;
    margin-left: 0;
    margin-right: auto;
    padding: 0;
    max-width: none;
    max-height: none;
    overflow: hidden;
    width: var(--drawer-size, 592px);
  }

  :host([type='overlay']) .drawer {
    box-shadow: ${shadow64};
  }

  :host([separator]) .drawer {
    border-right-color: ${colorNeutralStroke2};
    border-left-color: ${colorTransparentStroke};
  }

  :host([separator][position='end']) .drawer {
    border-right-color: ${colorTransparentStroke};
    border-left-color: ${colorNeutralStroke2};
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
    padding-top: ${spacingVerticalXL};
    position: absolute;
    width: inherit;
  }

  .header {
    padding: 0 0 ${spacingVerticalS};
    display: flex;
    flex-direction: column;
    font-size: ${fontSizeBase500};
    line-height: ${lineHeightBase500};
    font-weight: ${fontWeightSemibold};
  }

  .title {
    padding: 0 ${spacingHorizontalL} 0 ${spacingHorizontalXXL};
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .content {
    flex-grow: 1;
    position: relative;
    padding: 0 ${spacingHorizontalXXL} ${spacingVerticalXXL};
    overflow-y: auto;
  }

  ::slotted([slot='navigation']) {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr;
    column-gap: ${spacingHorizontalS};
    padding: 0 ${spacingHorizontalL};
    justify-content: flex-start;
    margin-bottom: ${spacingVerticalS};
  }

  ::slotted([slot='footer']) {
    display: flex;
    flex-direction: row;
    column-gap: ${spacingHorizontalS};
    padding: ${spacingVerticalL} ${spacingHorizontalXXL} ${spacingVerticalXXL};
    border-top: ${strokeWidthThin} solid var(--overflow-border, ${colorTransparentStroke});
  }

  .dialog:focus-visible:after {
    content: '';
    position: absolute;
    inset: 0px;
    cursor: pointer;
    outline: none;
    border: ${strokeWidthThick} solid ${colorStrokeFocus1};
    box-shadow: inset 0 0 0 1px ${colorStrokeFocus2};
  }

  .dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.4);
    inset: 0;
  }

  .dialog.animating::backdrop {
    animation: drawer-fade;
    animation-timing-function: cubic-bezier(0.33, 0, 0.67, 1);
    animation-duration: 250ms;
  }

  .dialog.closing::backdrop {
    animation-direction: reverse;
  }

  :host .dialog.animating .drawer {
    animation: drawer-slide-in-start;
    animation-timing-function: ${curveDecelerateMid};
    animation-duration: ${durationNormal};
  }

  :host .dialog.closing .drawer {
    animation-direction: reverse;
    animation-timing-function: ${curveAccelerateMin};
    animation-duration: ${durationNormal};
  }

  :host([position='end']) .dialog.animating .drawer {
    animation: drawer-slide-in-end;
    animation-timing-function: ${curveDecelerateMid};
    animation-duration: ${durationNormal};
  }

  :host([position='end']) .dialog.closing .drawer {
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
