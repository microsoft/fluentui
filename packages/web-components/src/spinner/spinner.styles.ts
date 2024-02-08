import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation/utilities.js';
import { colorBrandStroke1, colorBrandStroke2, colorNeutralStrokeOnBrand2 } from '../theme/design-tokens.js';

export const styles = css`
  ${display('flex')}

  :host {
    display: flex;
    align-items: center;
    height: 32px;
    width: 32px;
    contain: content;
  }
  :host([size='tiny']) {
    height: 20px;
    width: 20px;
  }
  :host([size='extra-small']) {
    height: 24px;
    width: 24px;
  }
  :host([size='small']) {
    height: 28px;
    width: 28px;
  }
  :host([size='large']) {
    height: 36px;
    width: 36px;
  }
  :host([size='extra-large']) {
    height: 40px;
    width: 40px;
  }
  :host([size='huge']) {
    height: 44px;
    width: 44px;
  }
  .progress {
    height: 100%;
    width: 100%;
  }

  .background {
    fill: none;
    stroke: var(${colorBrandStroke2});
    stroke-width: 1.5px;
  }

  :host([appearance='inverted']) .background {
    stroke: rgba(255, 255, 255, 0.2);
  }

  .determinate {
    stroke: var(${colorBrandStroke1});
    fill: none;
    stroke-width: 1.5px;
    stroke-linecap: round;
    transform-origin: 50% 50%;
    transform: rotate(-90deg);
    transition: all 0.2s ease-in-out;
  }

  :host([appearance='inverted']) .determinite {
    stroke: var(${colorNeutralStrokeOnBrand2});
  }

  .indeterminate-indicator-1 {
    stroke: var(${colorBrandStroke1});
    fill: none;
    stroke-width: 1.5px;
    stroke-linecap: round;
    transform-origin: 50% 50%;
    transform: rotate(-90deg);
    transition: all 0.2s ease-in-out;
    animation: spin-infinite 3s cubic-bezier(0.53, 0.21, 0.29, 0.67) infinite;
  }

  :host([appearance='inverted']) .indeterminate-indicator-1 {
    stroke: var(${colorNeutralStrokeOnBrand2});
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
