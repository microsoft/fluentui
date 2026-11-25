import { css } from '@microsoft/fast-element';
import { display } from '../utils/display.js';
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
  spacingHorizontalXXL,
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
    background: ${colorNeutralBackground1};
    border-radius: 0;
    border: ${strokeWidthThin} solid ${colorTransparentStroke};
    border-inline-end-color: ${colorTransparentStroke};
    border-inline-start-color: var(--drawer-separator, ${colorTransparentStroke});
    box-shadow: ${shadow64};
    box-sizing: border-box;
    color: ${colorNeutralForeground1};
    font-family: ${fontFamilyBase};
    font-size: ${fontSizeBase300};
    font-weight: ${fontWeightRegular};
    height: 100%;
    line-height: ${lineHeightBase300};
    margin-inline-end: auto;
    margin-inline-start: 0;
    max-height: 100vh;
    max-width: calc(100vw - ${spacingHorizontalXXL});
    outline: none;
    padding: 0;
    bottom: 0;
    top: 0;
    width: var(--drawer-width, 592px);
    z-index: var(--drawer-elevation, 1000);
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
