import { css, ElementStyles } from '@microsoft/fast-element';
import { SystemColors } from '@microsoft/fast-web-utilities';
import {
  display,
  ElementDefinitionContext,
  forcedColorsStylesheetBehavior,
  ProgressOptions,
} from '@microsoft/fast-foundation';
import {
  accentFillRest,
  designUnit,
  neutralForegroundHint,
  neutralStrokeStrongRest,
  strokeWidth,
} from '../../design-tokens';

export const progressStyles: (context: ElementDefinitionContext, definition: ProgressOptions) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: ProgressOptions,
) =>
  css`
    ${display('flex')} :host {
      align-items: center;
      height: calc((${strokeWidth} * 3) * 1px);
    }

    .progress {
      background-color: ${neutralStrokeStrongRest};
      border-radius: calc(${designUnit} * 1px);
      width: 100%;
      height: calc(${strokeWidth} * 1px);
      display: flex;
      align-items: center;
      position: relative;
    }

    .determinate {
      background-color: ${accentFillRest};
      border-radius: calc(${designUnit} * 1px);
      height: calc((${strokeWidth} * 3) * 1px);
      transition: all 0.2s ease-in-out;
      display: flex;
    }

    .indeterminate {
      height: calc((${strokeWidth} * 3) * 1px);
      border-radius: calc(${designUnit} * 1px);
      display: flex;
      width: 100%;
      position: relative;
      overflow: hidden;
    }

    .indeterminate-indicator-1 {
      position: absolute;
      opacity: 0;
      height: 100%;
      background-color: ${accentFillRest};
      border-radius: calc(${designUnit} * 1px);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
      width: 40%;
      animation: indeterminate-1 2s infinite;
    }

    .indeterminate-indicator-2 {
      position: absolute;
      opacity: 0;
      height: 100%;
      background-color: ${accentFillRest};
      border-radius: calc(${designUnit} * 1px);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
      width: 60%;
      animation: indeterminate-2 2s infinite;
    }

    :host(.paused) .indeterminate-indicator-1,
    :host(.paused) .indeterminate-indicator-2 {
      animation: none;
      background-color: ${neutralForegroundHint};
      width: 100%;
      opacity: 1;
    }

    :host(.paused) .determinate {
      background-color: ${neutralForegroundHint};
    }

    @keyframes indeterminate-1 {
      0% {
        opacity: 1;
        transform: translateX(-100%);
      }
      70% {
        opacity: 1;
        transform: translateX(300%);
      }
      70.01% {
        opacity: 0;
      }
      100% {
        opacity: 0;
        transform: translateX(300%);
      }
    }

    @keyframes indeterminate-2 {
      0% {
        opacity: 0;
        transform: translateX(-150%);
      }
      29.99% {
        opacity: 0;
      }
      30% {
        opacity: 1;
        transform: translateX(-150%);
      }
      100% {
        transform: translateX(166.66%);
        opacity: 1;
      }
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        .indeterminate-indicator-1,
        .indeterminate-indicator-2,
        .determinate,
        .progress {
          background-color: ${SystemColors.ButtonText};
        }
        :host(.paused) .indeterminate-indicator-1,
        :host(.paused) .indeterminate-indicator-2,
        :host(.paused) .determinate {
          background-color: ${SystemColors.GrayText};
        }
      `,
    ),
  );
