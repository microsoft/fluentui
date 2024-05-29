import { css } from '@microsoft/fast-element';
import { display } from '../utils/index.js';
import {
  borderRadiusXLarge,
  colorBackgroundOverlay,
  colorNeutralBackground1,
  colorNeutralForeground1,
  colorTransparentStroke,
  curveAccelerateMid,
  curveDecelerateMid,
  curveLinear,
  durationGentle,
  shadow64,
  strokeWidthThin,
} from '../theme/design-tokens.js';

/** Dialog styles
 * @public
 */
export const styles = css`
  @layer base {
    ${display('flex')}

    :host {
      --dialog-backdrop: ${colorBackgroundOverlay};
      --dialog-starting-scale: 0.85;
    }

    ::backdrop {
      background: var(--dialog-backdrop, rgba(0, 0, 0, 0.4));
    }

    dialog {
      background: ${colorNeutralBackground1};
      border-radius: ${borderRadiusXLarge};
      border: ${strokeWidthThin} solid ${colorTransparentStroke};
      box-shadow: ${shadow64};
      color: ${colorNeutralForeground1};
      height: fit-content;
      margin: auto auto;
      max-height: 100vh;
      max-width: 100%;
      padding: 0;
      width: 100vw;

      /* for non-modal dialogs */
      inset: 0;
      position: fixed;
      z-index: 2;
      overflow: auto;
      /* end for non-modal dialogs */
    }

    @media screen and (min-width: 480px) {
      dialog {
        max-width: 600px;
        width: 100%;
      }
    }
  }

  @layer animations {
    /* Disable animations for reduced motion */
    @media (prefers-reduced-motion: no-preference) {
      dialog,
      ::backdrop {
        transition: display allow-discrete, opacity, overlay allow-discrete, scale;
        transition-duration: ${durationGentle};
        transition-timing-function: ${curveDecelerateMid};
        /* Set opacity to 0 when closed */
        opacity: 0;
      }
      ::backdrop {
        transition-timing-function: ${curveLinear};
      }

      /* Set opacity to 1 when open */
      [open],
      [open]::backdrop {
        opacity: 1;
      }

      /* Exit styles for dialog */
      dialog:not([open]) {
        /* Make small when leaving */
        scale: var(--dialog-starting-scale);
        /* faster leaving the stage then entering */
        transition-timing-function: ${curveAccelerateMid};
      }
    }

    @starting-style {
      [open],
      [open]::backdrop {
        opacity: 0;
      }

      dialog {
        scale: var(--dialog-starting-scale);
      }
    }
  }
`;
