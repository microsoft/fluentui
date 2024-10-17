import { css } from '@microsoft/fast-element';
import {
  colorBrandStroke1,
  colorBrandStroke2,
  colorNeutralStrokeOnBrand2,
  curveEasyEase,
  strokeWidthThick,
  strokeWidthThicker,
  strokeWidthThickest,
} from '../theme/design-tokens.js';
import { forcedColorsStylesheetBehavior } from '../utils/behaviors/match-media-stylesheet-behavior.js';
import { display } from '../utils/display.js';
import { state } from '../utils/states.js';

export const styles = css`
  ${display('inline-flex')}

  :host {
    --duration: 1.5s;
    --indicatorSize: ${strokeWidthThicker};
    --size: 32px;
    height: var(--size);
    width: var(--size);
    contain: strict;
    content-visibility: auto;
  }

  :host(${state('tiny')}) {
    --indicatorSize: ${strokeWidthThick};
    --size: 20px;
  }
  :host(${state('extra-small')}) {
    --indicatorSize: ${strokeWidthThick};
    --size: 24px;
  }
  :host(${state('small')}) {
    --indicatorSize: ${strokeWidthThick};
    --size: 28px;
  }
  :host(${state('large')}) {
    --indicatorSize: ${strokeWidthThicker};
    --size: 36px;
  }
  :host(${state('extra-large')}) {
    --indicatorSize: ${strokeWidthThicker};
    --size: 40px;
  }
  :host(${state('huge')}) {
    --indicatorSize: ${strokeWidthThickest};
    --size: 44px;
  }

  .progress,
  .background,
  .spinner,
  .start,
  .end,
  .indicator {
    position: absolute;
    inset: 0;
  }

  .progress,
  .spinner,
  .indicator {
    animation: none var(--duration) infinite ${curveEasyEase};
  }

  .progress {
    animation-timing-function: linear;
    animation-name: spin-linear;
  }

  .background {
    border: var(--indicatorSize) solid ${colorBrandStroke2};
    border-radius: 50%;
  }

  :host(${state('inverted')}) .background {
    border-color: rgba(255, 255, 255, 0.2);
  }

  .spinner {
    animation-name: spin-swing;
  }

  .start {
    overflow: hidden;
    inset-inline-end: 50%;
  }

  .end {
    overflow: hidden;
    inset-inline-start: 50%;
  }

  .indicator {
    color: ${colorBrandStroke1};
    box-sizing: border-box;
    border-radius: 50%;
    border: var(--indicatorSize) solid transparent;
    border-block-start-color: currentcolor;
    border-inline-end-color: currentcolor;
  }

  :host(${state('inverted')}) .indicator {
    color: ${colorNeutralStrokeOnBrand2};
  }

  .start .indicator {
    rotate: 135deg; /* Starts 9 o'clock */
    inset: 0 -100% 0 0;
    animation-name: spin-start;
  }

  .end .indicator {
    rotate: 135deg; /* Ends at 3 o'clock */
    inset: 0 0 0 -100%;
    animation-name: spin-end;
  }

  @keyframes spin-linear {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-swing {
    0% {
      transform: rotate(-135deg);
    }
    50% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(225deg);
    }
  }

  @keyframes spin-start {
    0%,
    100% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(-80deg);
    }
  }

  @keyframes spin-end {
    0%,
    100% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(70deg);
    }
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    .background {
      display: none;
    }
    .indicator {
      border-color: Canvas;
      border-block-start-color: Highlight;
      border-inline-end-color: Highlight;
    }
  `),
);
