import { css } from '@microsoft/fast-element';
import { display, forcedColorsStylesheetBehavior } from '../utils/index.js';
import {
  colorBrandStroke1,
  colorBrandStroke2,
  colorNeutralStrokeOnBrand2,
  curveEasyEase,
} from '../theme/design-tokens.js';
import {
  extraLargeState,
  extraSmallState,
  hugeState,
  invertedState,
  largeState,
  smallState,
  tinyState,
} from '../styles/states/index.js';

export const styles = css`
  ${display('inline-flex')}

  :host {
    --size: 32px;
    --duration: 1.5s;
    --indicatorSize: calc(0.09375 * var(--size));

    height: var(--size);
    width: var(--size);
    position: relative;
    align-items: center;
    justify-content: center;
    contain: strict;
    content-visibility: auto;
  }

  :host(${tinyState}) {
    --size: 20px;
  }
  :host(${extraSmallState}) {
    --size: 24px;
  }
  :host(${smallState}) {
    --size: 28px;
  }
  :host(${largeState}) {
    --size: 36px;
  }
  :host(${extraLargeState}) {
    --size: 40px;
  }
  :host(${hugeState}) {
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

  .progress {
    flex: 1;
    align-self: stretch;

    animation-duration: var(--duration);
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-name: spin;
  }

  .background {
    border: var(--indicatorSize) solid ${colorBrandStroke2};
    border-radius: 50%;
  }

  :host(${invertedState}) .background {
    border-color: rgba(255, 255, 255, 0.2);
  }

  .spinner {
    animation-duration: var(--duration);
    animation-iteration-count: infinite;
    animation-timing-function: ${curveEasyEase};
    animation-name: spin-mask;
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

    animation-duration: var(--duration);
    animation-iteration-count: infinite;
    animation-timing-function: ${curveEasyEase};
  }

  :host(${invertedState}) .indicator {
    color: ${colorNeutralStrokeOnBrand2};
  }

  .start .indicator {
    rotate: 135deg; /* 9 o'clock */
    inset: 0 -100% 0 0;
    animation-name: spin-start;
  }

  .end .indicator {
    rotate: 135deg; /* 3 o'clock */
    inset: 0 0 0 -100%;
    animation-name: spin-end;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-mask {
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
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(-80deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes spin-end {
    0% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(70deg);
    }
    100% {
      transform: rotate(0deg);
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
