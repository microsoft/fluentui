import { css, ElementStyles } from '@microsoft/fast-element';
import { SystemColors } from '@microsoft/fast-web-utilities';
import {
  display,
  ElementDefinitionContext,
  forcedColorsStylesheetBehavior,
  ProgressRingOptions,
} from '@microsoft/fast-foundation';
import { heightNumber } from '../../styles';
import { accentFillRest, neutralForegroundHint } from '../../design-tokens';

export const progressRingStyles: (
  context: ElementDefinitionContext,
  definition: ProgressRingOptions,
) => ElementStyles = (context: ElementDefinitionContext, definition: ProgressRingOptions) =>
  css`
    ${display('flex')} :host {
      align-items: center;
      height: calc(${heightNumber} * 1px);
      width: calc(${heightNumber} * 1px);
    }

    .progress {
      height: 100%;
      width: 100%;
    }

    .background {
      fill: none;
      stroke-width: 2px;
    }

    .determinate {
      stroke: ${accentFillRest};
      fill: none;
      stroke-width: 2px;
      stroke-linecap: round;
      transform-origin: 50% 50%;
      transform: rotate(-90deg);
      transition: all 0.2s ease-in-out;
    }

    .indeterminate-indicator-1 {
      stroke: ${accentFillRest};
      fill: none;
      stroke-width: 2px;
      stroke-linecap: round;
      transform-origin: 50% 50%;
      transform: rotate(-90deg);
      transition: all 0.2s ease-in-out;
      animation: spin-infinite 2s linear infinite;
    }

    :host(.paused) .indeterminate-indicator-1 {
      animation: none;
      stroke: ${neutralForegroundHint};
    }

    :host(.paused) .determinate {
      stroke: ${neutralForegroundHint};
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
    forcedColorsStylesheetBehavior(
      css`
        .background {
          stroke: ${SystemColors.Field};
        }
        .determinate,
        .indeterminate-indicator-1 {
          stroke: ${SystemColors.ButtonText};
        }
        :host(.paused) .determinate,
        :host(.paused) .indeterminate-indicator-1 {
          stroke: ${SystemColors.GrayText};
        }
      `,
    ),
  );
