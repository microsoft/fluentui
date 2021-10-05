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
  neutralFillRest,
  neutralForegroundHint,
  strokeWidth,
} from '../../design-tokens';

export const progressStyles: (context: ElementDefinitionContext, definition: ProgressOptions) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: ProgressOptions,
) =>
  css`
    ${display('flex')} :host {
      align-items: center;
      outline: none;
      height: calc(${designUnit} * 1px);
      margin: calc(${designUnit} * 1px) 0;
    }

    .progress {
      background-color: ${neutralFillRest};
      border-radius: calc(${designUnit} * 1px);
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      position: relative;
    }

    .determinate {
      background-color: ${accentFillRest};
      border-radius: calc(${designUnit} * 1px);
      height: 100%;
      transition: all 0.2s ease-in-out;
      display: flex;
    }

    .indeterminate {
      height: 100%;
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
      animation-play-state: paused;
      background-color: ${neutralFillRest};
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
        .determinate {
          forced-color-adjust: none;
          background-color: ${SystemColors.FieldText};
        }
        .progress {
          background-color: ${SystemColors.Field};
          border: calc(${strokeWidth} * 1px) solid ${SystemColors.FieldText};
        }
        :host(.paused) .indeterminate-indicator-1,
        .indeterminate-indicator-2 {
          background-color: ${SystemColors.Field};
        }
        :host(.paused) .determinate {
          background-color: ${SystemColors.GrayText};
        }
      `,
    ),
  );
