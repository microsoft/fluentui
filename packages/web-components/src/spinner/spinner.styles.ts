import { css } from '@microsoft/fast-element';
import { display } from '../utils/index.js';
import { colorBrandStroke1, colorBrandStroke2, colorNeutralStrokeOnBrand2 } from '../theme/design-tokens.js';
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
  ${display('flex')}

  :host {
    display: flex;
    align-items: center;
    height: 32px;
    width: 32px;
    contain: content;
  }
  :host(${tinyState}) {
    height: 20px;
    width: 20px;
  }
  :host(${extraSmallState}) {
    height: 24px;
    width: 24px;
  }
  :host(${smallState}) {
    height: 28px;
    width: 28px;
  }
  :host(${largeState}) {
    height: 36px;
    width: 36px;
  }
  :host(${extraLargeState}) {
    height: 40px;
    width: 40px;
  }
  :host(${hugeState}) {
    height: 44px;
    width: 44px;
  }
  .progress {
    height: 100%;
    width: 100%;
  }

  .background {
    fill: none;
    stroke: ${colorBrandStroke2};
    stroke-width: 1.5px;
  }

  :host(${invertedState}) .background {
    stroke: rgba(255, 255, 255, 0.2);
  }

  .indicator {
    stroke: ${colorBrandStroke1};
    fill: none;
    stroke-width: 1.5px;
    stroke-linecap: round;
    transform-origin: 50% 50%;
    transform: rotate(-90deg);
    transition: all 0.2s ease-in-out;
    animation: spin-infinite 3s cubic-bezier(0.53, 0.21, 0.29, 0.67) infinite;
  }

  :host(${invertedState}) .indicator {
    stroke: ${colorNeutralStrokeOnBrand2};
  }

  @keyframes spin-infinite {
    0% {
      stroke-dasharray: 0.01px 43.97px;
      transform: rotate(0deg);
    }
    50% {
      stroke-dasharray: 21.99px 21.99px;
      transform: rotate(450deg);
    }
    100% {
      stroke-dasharray: 0.01px 43.97px;
      transform: rotate(1080deg);
    }
  }
`;
