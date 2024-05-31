import { css } from '@microsoft/fast-element';
import { display } from '../utils/index.js';
import {
  colorBackgroundOverlay,
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorStrokeFocus1,
  colorStrokeFocus2,
  colorTransparentStroke,
  curveAccelerateMid,
  curveDecelerateMid,
  curveLinear,
  durationGentle,
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
    --dialog-backdrop: ${colorBackgroundOverlay};
    overflow: hidden;
  }

  dialog {
    position: fixed;
    display: none;
    z-index: var(--drawer-elevation, 1000);
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-family: ${fontFamilyBase};
    font-weight: ${fontWeightRegular};
    color: ${colorNeutralForeground1};
    max-width: var(--drawer-width, 592px);
    max-height: 100vh;
    overflow: hidden;
    height: 100%;
    transition: none;
  }

  dialog[open] {
    outline: none;
    top: 0;
    margin-inline-start: 0;
    bottom: 0;
    width: var(--drawer-width, 592px);
    border-radius: 0;
    padding: 0;
    max-width: var(--drawer-width, 592px);
    overflow: hidden;
    box-shadow: ${shadow64};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    background: ${colorNeutralBackground1};
  }

  :host([inline]) {
    width: fit-content;
    position: relative;
  }

  :host([inline]) dialog {
    box-shadow: none;
  }

  :host([inline]) dialog[open] {
    position: relative;
  }

  :host([size='small']) dialog {
    width: 320px;
    max-width: 320px;
  }

  :host([size='large']) dialog {
    width: 940px;
    max-width: 940px;
  }

  :host([size='full']) dialog {
    width: 100%;
    max-width: 100%;
  }

  :host([position='start']) dialog {
    margin-inline-start: 0;
    margin-inline-end: auto;
    inset-inline-start: 0px;
    border-inline-end-color: ${colorTransparentStroke};
    border-inline-start-color: var(--drawer-separator, ${colorTransparentStroke});
    transform: translateX(-100%);
  }

  :host([position='end']) dialog {
    margin-inline-start: auto;
    margin-inline-end: 0;
    inset-inline-end: 0px;
    border-inline-end-color: ${colorTransparentStroke};
    border-inline-start-color: var(--drawer-separator, ${colorTransparentStroke});
    transform: translateX(100%);
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

  @layer animations {
    /* Disable animations for reduced motion */
    @media (prefers-reduced-motion: no-preference) {
      dialog {
        transition: transform ${durationGentle} ${curveDecelerateMid};
      }

      :host([position='start']) dialog {
        /* Move offscreen left when closed */
        transform: translateX(-100%);
      }

      :host([position='end']) dialog {
        /* Move offscreen right when closed */
        transform: translateX(100%);
      }

      /* Move onscreen when open */
      dialog[open] {
        transform: translateX(0);
      }

      /* Exit styles for dialog */
      dialog:not([open]) {
        transition-timing-function: ${curveAccelerateMid};
      }

      :host([position='start']) dialog:not([open]) {
        transform: translateX(-100%);
      }

      :host([position='end']) dialog:not([open]) {
        transform: translateX(100%);
      }

      ::backdrop {
        transition: opacity ${durationGentle} ${curveDecelerateMid};
        background: var(--dialog-backdrop, ${colorBackgroundOverlay});
        /* Set opacity to 0 when closed */
        opacity: 0;
      }

      /* Set opacity to 1 when open */
      [open]::backdrop {
        opacity: 1;
      }

      ::backdrop {
        transition-timing-function: ${curveLinear};
      }
    }

    @starting-style {
      dialog,
      :host([position='start']) dialog {
        transform: translateX(-100%);
      }
      :host([position='end']) dialog {
        transform: translateX(100%);
      }
      [open]::backdrop {
        opacity: 0;
      }
    }
  }
`;
