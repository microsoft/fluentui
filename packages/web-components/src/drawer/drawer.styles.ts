import { css } from '@microsoft/fast-element';
import { display } from '../utils/index.js';
import {
  colorBackgroundOverlay,
  colorNeutralBackground1,
  colorNeutralForeground1,
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
  strokeWidthThin,
} from '../theme/design-tokens.js';

/** Drawer styles
 * @public
 */
export const styles = css`
  ${display('block')}

  :host {
    --dialog-backdrop: ${colorBackgroundOverlay};
  }

  :host([type='non-modal']) dialog[open]::backdrop {
    display: none;
  }

  :host([type='non-modal']) dialog {
    position: fixed;
    top: 0;
    bottom: 0;
  }

  :host([type='inline']) {
    height: 100%;
    width: fit-content;
  }

  :host([type='inline']) dialog[open] {
    box-shadow: none;
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

  :host([position='end']) dialog {
    margin-inline-start: auto;
    margin-inline-end: 0;
  }

  dialog {
    box-sizing: border-box;
    z-index: var(--drawer-elevation, 1000);
    font-size: ${fontSizeBase300};
    line-height: ${lineHeightBase300};
    font-family: ${fontFamilyBase};
    font-weight: ${fontWeightRegular};
    color: ${colorNeutralForeground1};
    max-width: var(--drawer-width, 592px);
    max-height: 100vh;
    height: 100%;
    margin-inline-start: 0;
    margin-inline-end: auto;
    border-inline-end-color: ${colorTransparentStroke};
    border-inline-start-color: var(--drawer-separator, ${colorTransparentStroke});
    outline: none;
    top: 0;
    bottom: 0;
    width: var(--drawer-width, 592px);
    border-radius: 0;
    padding: 0;
    max-width: var(--drawer-width, 592px);
    box-shadow: ${shadow64};
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    background: ${colorNeutralBackground1};
  }

  dialog::backdrop {
    background: var(--dialog-backdrop);
  }

  @layer animations {
    /* Disable animations for reduced motion */
    @media (prefers-reduced-motion: no-preference) {
      dialog {
        transition: display allow-discrete, opacity, overlay allow-discrete, transform;
        transition-duration: ${durationGentle};
        transition-timing-function: ${curveDecelerateMid};
      }

      /* Exit styles for dialog */
      :host dialog:not([open]) {
        transform: translateX(-100%);
        transition-timing-function: ${curveAccelerateMid};
      }
      :host([position='end']) dialog:not([open]) {
        transform: translateX(100%);
        transition-timing-function: ${curveAccelerateMid};
      }

      dialog[open] {
        transform: translateX(0);
      }

      dialog::backdrop {
        transition: display allow-discrete, opacity, overlay allow-discrete, scale;
        transition-duration: ${durationGentle};
        transition-timing-function: ${curveDecelerateMid};
        background: var(--dialog-backdrop, ${colorBackgroundOverlay});
        opacity: 0;
      }

      dialog[open]::backdrop {
        opacity: 1;
      }

      dialog::backdrop {
        transition-timing-function: ${curveLinear};
      }
    }

    @starting-style {
      dialog[open] {
        transform: translateX(-100%);
      }
      :host([position='end']) dialog[open] {
        transform: translateX(100%);
      }
      dialog[open]::backdrop {
        opacity: 0;
      }
    }
  }
`;
