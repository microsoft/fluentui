import { css } from '@microsoft/fast-element';
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
import { forcedColorsStylesheetBehavior } from '../utils/behaviors/match-media-stylesheet-behavior.js';

/** Dialog styles
 * @public
 */
export const styles = css`
  @layer base {
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
      border: none;
      box-shadow: ${shadow64};
      color: ${colorNeutralForeground1};
      max-height: calc(-48px + 100vh);
      padding: 0;
      width: 100%;
      max-width: 600px;
    }

    :host([type='non-modal']) dialog {
      inset: 0;
      position: fixed;
      z-index: 2;
      overflow: auto;
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
        /* Faster leaving the stage then entering */
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
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    @layer base {
      dialog {
        border: ${strokeWidthThin} solid ${colorTransparentStroke};
      }
    }
  `),
);
