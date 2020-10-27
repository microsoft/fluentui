import { css } from '@microsoft/fast-element';
import { display } from '@microsoft/fast-foundation';
import { neutralFillRestBehavior } from '../styles';

export const SkeletonStyles = css`
  ${display('block')} :host {
    --skeleton-fill-default: #e1dfdd;
    overflow: hidden;
    width: 100%;
    position: relative;
    background-color: var(--skeleton-fill, var(--skeleton-fill-default));
    --skeleton-animation-gradient-default: linear-gradient(
      270deg,
      var(--skeleton-fill, var(--skeleton-fill-default)) 0%,
      #f3f2f1 51.13%,
      var(--skeleton-fill, var(--skeleton-fill-default)) 100%
    );
    --skeleton-animation-timing-default: ease-in-out;
  }

  :host(.rect) {
    border-radius: calc(var(--corner-radius) * 1px);
  }

  :host(.circle) {
    border-radius: 100%;
    overflow: hidden;
  }

  object {
    position: absolute;
    width: 100%;
    height: auto;
    z-index: 2;
  }

  object img {
    width: 100%;
    height: auto;
  }

  ${display('block')} span.shimmer {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: var(--skeleton-animation-gradient, var(--skeleton-animation-gradient-default));
    background-size: 0px 0px / 90% 100%;
    background-repeat: no-repeat;
    background-color: var(--skeleton-animation-fill, ${neutralFillRestBehavior.var});
    animation: shimmer 2s infinite;
    animation-timing-function: var(--skeleton-animation-timing, var(--skeleton-timing-default));
    animation-direction: normal;
    z-index: 1;
  }

  ::slotted(svg) {
    z-index: 2;
  }

  ::slotted(.pattern) {
    width: 100%;
    height: 100%;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`.withBehaviors(neutralFillRestBehavior);
