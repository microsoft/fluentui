import { css } from '@microsoft/fast-element';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { display, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
import {
  accentForegroundRestBehavior,
  heightNumber,
  neutralFillRestBehavior,
  neutralForegroundHintBehavior,
} from '../../styles';

export const ProgressRingStyles = css`
  ${display('flex')} :host {
    align-items: center;
    outline: none;
    height: calc(${heightNumber} * 1px);
    width: calc(${heightNumber} * 1px);
    margin: calc(${heightNumber} * 1px) 0;
  }

  .progress {
    height: 100%;
    width: 100%;
  }

  .background {
    stroke: ${neutralFillRestBehavior.var};
    fill: none;
    stroke-width: 2px;
  }

  .determinate {
    stroke: ${accentForegroundRestBehavior.var};
    fill: none;
    stroke-width: 2px;
    stroke-linecap: round;
    transform-origin: 50% 50%;
    transform: rotate(-90deg);
    transition: all 0.2s ease-in-out;
  }

  .indeterminate-indicator-1 {
    stroke: ${accentForegroundRestBehavior.var};
    fill: none;
    stroke-width: 2px;
    stroke-linecap: round;
    transform-origin: 50% 50%;
    transform: rotate(-90deg);
    transition: all 0.2s ease-in-out;
    animation: spin-infinite 2s linear infinite;
  }

  :host(.paused) .indeterminate-indicator-1 {
    animation-play-state: paused;
    stroke: ${neutralFillRestBehavior.var};
  }

  :host(.paused) .determinate {
    stroke: ${neutralForegroundHintBehavior.var};
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
`.withBehaviors(
  accentForegroundRestBehavior,
  neutralFillRestBehavior,
  neutralForegroundHintBehavior,
  forcedColorsStylesheetBehavior(
    css`
      .indeterminate-indicator-1,
      .determinate {
        stroke: ${SystemColors.FieldText};
      }
      .background {
        stroke: ${SystemColors.Field};
      }
      :host(.paused) .indeterminate-indicator-1 {
        stroke: ${SystemColors.Field};
      }
      :host(.paused) .determinate {
        stroke: ${SystemColors.GrayText};
      }
    `,
  ),
);
