import { css } from '@microsoft/fast-element';
import { display, forcedColorsStylesheetBehavior } from '../utils/index.js';
import {
  borderRadiusMedium,
  borderRadiusNone,
  colorCompoundBrandBackground,
  colorNeutralBackground6,
  colorPaletteDarkOrangeBackground3,
  colorPaletteGreenBackground3,
  colorPaletteRedBackground3,
  colorTransparentBackground,
} from '../theme/design-tokens.js';

/** ProgressBar styles
 * @public
 */
export const styles = css`
  ${display('block')}

  :host {
    width: 100%;
    height: 2px;
    overflow-x: hidden;
    background-color: ${colorNeutralBackground6};
    border-radius: ${borderRadiusMedium};
    contain: content;

    @supports (width: attr(value type(<number>))) {
      --max: attr(max type(<number>), 100);
      --min: attr(min type(<number>), 0);
      --value: attr(value type(<number>), 0);
      --indicator-width: clamp(0%, calc((var(--value) - var(--min)) / (var(--max) - var(--min)) * 100%), 100%);
    }
  }

  :host([thickness='large']) {
    height: 4px;
  }

  :host([shape='square']) {
    border-radius: ${borderRadiusNone};
  }

  .indicator {
    background-color: ${colorCompoundBrandBackground};
    border-radius: inherit;
    height: 100%;
  }

  :host([value]) .indicator {
    transition: all 0.2s ease-in-out;

    @supports (width: attr(value type(<number>))) {
      width: var(--indicator-width);
    }
  }

  :host(:not([value])) .indicator {
    position: relative;
    width: 33%;
    background-image: linear-gradient(
      to right,
      ${colorNeutralBackground6} 0%,
      ${colorTransparentBackground} 50%,
      ${colorNeutralBackground6} 100%
    );
    animation-name: indeterminate;
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  :host([validation-state='error']) .indicator {
    background-color: ${colorPaletteRedBackground3};
  }

  :host([validation-state='warning']) .indicator {
    background-color: ${colorPaletteDarkOrangeBackground3};
  }

  :host([validation-state='success']) .indicator {
    background-color: ${colorPaletteGreenBackground3};
  }

  @layer animations {
    /* Disable animations for reduced motion */
    @media (prefers-reduced-motion: no-preference) {
      :host([value]) {
        transition: none;
      }
      :host(:not([value])) .indicator {
        animation-duration: 0.01ms;
        animation-iteration-count: 1;
      }
    }
  }

  @keyframes indeterminate {
    0% {
      inset-inline-start: -33%;
    }
    100% {
      inset-inline-start: 100%;
    }
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host {
      background-color: CanvasText;
    }
    .indicator,
    :host(:is([validation-state='success'], [validation-state='warning'], [validation-state='error'])) .indicator {
      background-color: Highlight;
    }
  `),
);
