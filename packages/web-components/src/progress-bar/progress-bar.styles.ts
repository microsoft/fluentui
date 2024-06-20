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
import { errorState, largeState, squareState, successState, warningState } from '../styles/states/index.js';

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
  }

  :host(${largeState}) {
    height: 4px;
  }

  :host(${squareState}) {
    border-radius: ${borderRadiusNone};
  }

  .indicator {
    background-color: ${colorCompoundBrandBackground};
    border-radius: inherit;
    height: 100%;
  }

  :host([value]) .indicator {
    transition: all 0.2s ease-in-out;
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

  :host(${errorState}) .indicator {
    background-color: ${colorPaletteRedBackground3};
  }

  :host(${warningState}) .indicator {
    background-color: ${colorPaletteDarkOrangeBackground3};
  }

  :host(${successState}) .indicator {
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
    :host(:is(${successState}, ${warningState}, ${errorState})) .indicator {
      background-color: Highlight;
    }
  `),
);
