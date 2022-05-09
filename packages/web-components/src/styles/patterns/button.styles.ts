import { css } from '@microsoft/fast-element';
import { SystemColors } from '@microsoft/fast-web-utilities';
import {
  display,
  ElementDefinitionContext,
  focusVisible,
  forcedColorsStylesheetBehavior,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { heightNumber } from '../size';
import {
  accentFillActive,
  accentFillHover,
  accentFillRest,
  accentForegroundActive,
  accentForegroundHover,
  accentForegroundRest,
  accentStrokeControlActive,
  accentStrokeControlHover,
  accentStrokeControlRest,
  controlCornerRadius,
  density,
  designUnit,
  focusStrokeInner,
  focusStrokeOuter,
  focusStrokeWidth,
  foregroundOnAccentActive,
  foregroundOnAccentHover,
  foregroundOnAccentRest,
  neutralFillActive,
  neutralFillHover,
  neutralFillRest,
  neutralFillStealthActive,
  neutralFillStealthHover,
  neutralFillStealthRest,
  neutralForegroundRest,
  neutralStrokeActive,
  neutralStrokeControlActive,
  neutralStrokeControlHover,
  neutralStrokeControlRest,
  neutralStrokeHover,
  neutralStrokeRest,
  strokeWidth,
} from '../../design-tokens';
import { typeRampBase } from '../../styles/patterns/type-ramp';

/**
 * @internal
 */
export const baseButtonStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  interactivitySelector: string = '',
  nonInteractivitySelector: string = '',
) =>
  css`
    ${display('inline-flex')} :host {
      position: relative;
      box-sizing: border-box;
      outline: none;
      ${typeRampBase}
      height: calc(${heightNumber} * 1px);
      min-width: calc(${heightNumber} * 1px);
      color: ${neutralForegroundRest};
      border-radius: calc(${controlCornerRadius} * 1px);
      fill: currentcolor;
      cursor: pointer;
    }

    :host .control {
      background: padding-box linear-gradient(${neutralFillRest}, ${neutralFillRest}),
        border-box ${neutralStrokeControlRest};
      border: calc(${strokeWidth} * 1px) solid transparent;
      flex-grow: 1;
      box-sizing: border-box;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      padding: 0 calc((10 + (${designUnit} * 2 * ${density})) * 1px);
      white-space: nowrap;
      outline: none;
      text-decoration: none;
      color: inherit;
      border-radius: inherit;
      fill: inherit;
      cursor: inherit;
      font-family: inherit;
    }

    .control,
    .end,
    .start {
      font: inherit;
    }

    .control.icon-only {
      padding: 0;
      line-height: 0;
    }

    :host .control${interactivitySelector}:hover {
      background: padding-box linear-gradient(${neutralFillHover}, ${neutralFillHover}),
        border-box ${neutralStrokeControlHover};
    }

    :host .control${interactivitySelector}:active {
      background: padding-box linear-gradient(${neutralFillActive}, ${neutralFillActive}),
        border-box ${neutralStrokeControlActive};
    }

    :host .control:${focusVisible} {
      border-color: ${focusStrokeOuter} !important;
      box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${focusStrokeOuter} inset !important;
    }

    :host .control${nonInteractivitySelector} {
      background: padding-box linear-gradient(${neutralFillRest}, ${neutralFillRest}), border-box ${neutralStrokeRest};
    }

    .control::-moz-focus-inner {
      border: 0;
    }

    .content {
      pointer-events: none;
    }

    .start,
    .end {
      display: flex;
      pointer-events: none;
    }

    .start {
      margin-inline-end: 11px;
    }

    .end {
      margin-inline-start: 11px;
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host .control {
          background: ${SystemColors.ButtonFace};
          border-color: ${SystemColors.ButtonText};
          color: ${SystemColors.ButtonText};
          fill: currentcolor;
        }
        :host(:not([disabled])) .control:hover,
        :host .control${interactivitySelector}:hover,
        .control${interactivitySelector}:hover {
          forced-color-adjust: none;
          background: ${SystemColors.Highlight};
          color: ${SystemColors.HighlightText};
        }
        .control:${focusVisible},
        :host .control:${focusVisible},
        :host(:${focusVisible}) .control {
          forced-color-adjust: none;
          background: ${SystemColors.ButtonFace};
          border-color: ${SystemColors.Highlight} !important;
          box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${SystemColors.Highlight} !important;
        }
        :host([href]) .control {
          background: ${SystemColors.ButtonFace};
          border-color: ${SystemColors.LinkText};
          color: ${SystemColors.LinkText};
          fill: currentcolor;
        }
        :host([href]) .control:hover,
        :host(.neutral[href]) .control:hover {
          background: ${SystemColors.LinkText};
          border-color: ${SystemColors.LinkText} !important;
          color: ${SystemColors.HighlightText};
          fill: currentcolor;
        }
        :host([href]) .control:${focusVisible}{
          forced-color-adjust: none;
          border-color: ${SystemColors.LinkText} !important;
          box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${SystemColors.LinkText} !important;
        }
    `,
    ),
  );

/**
 * @internal
 */
export const AccentButtonStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  interactivitySelector: string = '',
  nonInteractivitySelector: string = '',
) =>
  css`
    :host .control {
      background: padding-box linear-gradient(${accentFillRest}, ${accentFillRest}),
        border-box ${accentStrokeControlRest};
      color: ${foregroundOnAccentRest};
    }

    :host .control${interactivitySelector}:hover {
      background: padding-box linear-gradient(${accentFillHover}, ${accentFillHover}),
        border-box ${accentStrokeControlHover};
      color: ${foregroundOnAccentHover};
    }

    :host .control${interactivitySelector}:active {
      background: padding-box linear-gradient(${accentFillActive}, ${accentFillActive}),
        border-box ${accentStrokeControlActive};
      color: ${foregroundOnAccentActive};
    }

    :host .control:${focusVisible} {
      box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${focusStrokeOuter} inset,
        0 0 0 calc(((${focusStrokeWidth} + ${strokeWidth}) - ${strokeWidth}) * 1px) ${focusStrokeInner} inset !important;
    }

    :host .control${nonInteractivitySelector} {
      background: ${accentFillRest};
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host .control {
          forced-color-adjust: none;
          background: ${SystemColors.Highlight};
          color: ${SystemColors.HighlightText};
        }
        :host .control${interactivitySelector}:hover,
        :host .control${interactivitySelector}:active {
          background: ${SystemColors.HighlightText};
          border-color: ${SystemColors.Highlight};
          color: ${SystemColors.Highlight};
        }
        :host .control:${focusVisible} {
          background: ${SystemColors.Highlight};
          box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${SystemColors.Highlight} inset,
            0 0 0 calc(((${focusStrokeWidth} + ${strokeWidth}) - ${strokeWidth}) * 1px) ${SystemColors.HighlightText} inset !important;
        }
        :host([href]) .control {
          background: ${SystemColors.LinkText};
          color: ${SystemColors.HighlightText};
        }
        :host([href]) .control:hover {
          background: ${SystemColors.ButtonFace};
          border-color: ${SystemColors.LinkText};
          box-shadow: none;
          color: ${SystemColors.LinkText};
          fill: currentcolor;
        }
        :host([href]) .control:${focusVisible} {
          background: ${SystemColors.LinkText};
          box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${SystemColors.LinkText} inset,
            0 0 0 calc(((${focusStrokeWidth} + ${strokeWidth}) - ${strokeWidth}) * 1px) ${SystemColors.HighlightText} inset !important;
          color: ${SystemColors.HighlightText};
          fill: currentcolor;
        }
      `,
    ),
  );

/**
 * @internal
 */
export const HypertextStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  interactivitySelector: string = '',
  nonInteractivitySelector: string = '',
) =>
  css`
    :host {
      height: auto;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      min-width: 0;
    }

    :host .control {
      display: inline;
      padding: 0;
      background: transparent;
      border: none;
      box-shadow: none;
      line-height: 1;
      text-decoration: underline 1px;
    }

    :host .control:not([href]) {
      background: transparent;
    }

    :host .control${interactivitySelector} {
      background: transparent;
      color: ${accentForegroundRest};
    }

    :host .control${interactivitySelector}:hover {
      background: transparent;
      color: ${accentForegroundHover};
      text-decoration: none;
    }

    :host .control${interactivitySelector}:active {
      background: transparent;
      color: ${accentForegroundActive};
      text-decoration: none;
    }

    :host .control:${focusVisible} {
      box-shadow: 0 0 0 calc(${focusStrokeWidth} * 1px) ${focusStrokeOuter} !important;
    }

    :host .control${nonInteractivitySelector} {
      background: transparent;
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
      :host .control${interactivitySelector}:hover {
        color: ${SystemColors.Highlight};
        fill: currentcolor;
      }
      :host .control:${focusVisible} {
        color: ${SystemColors.LinkText};
      }
      `,
    ),
  );

/**
 * @internal
 */
export const LightweightButtonStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  interactivitySelector: string = '',
  nonInteractivitySelector: string = '',
) =>
  css`
    :host {
      color: ${accentForegroundRest};
    }

    :host .control {
      background: ${neutralFillStealthRest};
    }

    :host .control${interactivitySelector}:hover {
      background: ${neutralFillStealthHover};
      color: ${accentForegroundHover};
    }

    :host .control${interactivitySelector}:active {
      background: ${neutralFillStealthActive};
      color: ${accentForegroundActive};
    }

    :host .control${nonInteractivitySelector} {
      background: ${neutralFillStealthRest};
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host .control {
          border-color: ${SystemColors.ButtonFace};
          color: ${SystemColors.ButtonText};
        }
        :host .control${interactivitySelector}:hover,
        :host .control${interactivitySelector}:active,
        :host .control:${focusVisible} {
          border-color: ${SystemColors.Highlight};
          background: ${SystemColors.Highlight};
          box-shadow: none;
          color: ${SystemColors.HighlightText};
        }
        :host([href]) .control {
          border-color: ${SystemColors.ButtonFace};
          color: ${SystemColors.LinkText};
        }
        :host([href]) .control:hover,
        :host([href]) .control:${focusVisible} {
          background: ${SystemColors.ButtonFace};
          box-shadow: none;
          color: ${SystemColors.LinkText};
        }
      `,
    ),
  );

/**
 * @internal
 */
export const OutlineButtonStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  interactivitySelector: string = '',
  nonInteractivitySelector: string = '',
) =>
  css`
    :host .control {
      background: transparent !important;
      border-color: ${neutralStrokeRest};
    }

    :host .control${interactivitySelector}:hover {
      border-color: ${neutralStrokeHover};
    }

    :host .control${interactivitySelector}:active {
      border-color: ${neutralStrokeActive};
    }

    :host .control${nonInteractivitySelector} {
      background: transparent !important;
      border-color: ${neutralStrokeRest};
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host .control${nonInteractivitySelector} {
          border-color: ${SystemColors.ButtonText};
        }
        :host .control${interactivitySelector}:hover {
          border-color: ${SystemColors.Highlight};
          color: ${SystemColors.ButtonText};
        }
        :host([href]) {
          border-color: ${SystemColors.LinkText};
        }
        :host([href]) .control:hover {
          box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${SystemColors.LinkText};
          color: ${SystemColors.LinkText};
        }
      `,
    ),
  );

/**
 * @internal
 */
export const StealthButtonStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  interactivitySelector: string = '',
  nonInteractivitySelector: string = '',
) =>
  css`
    :host .control {
      background: ${neutralFillStealthRest};
    }

    :host .control${interactivitySelector}:hover {
      background: ${neutralFillStealthHover};
    }

    :host .control${interactivitySelector}:active {
      background: ${neutralFillStealthActive};
    }

    :host .control${nonInteractivitySelector} {
      background: ${neutralFillStealthRest};
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host .control {
          background: ${SystemColors.ButtonFace};
          border-color: ${SystemColors.ButtonFace};
          color: ${SystemColors.ButtonText};
          fill: currentcolor;
        }
        :host .control${interactivitySelector}:hover,
        :host .control${interactivitySelector}:active,
        :host .control:${focusVisible} {
          background: ${SystemColors.Highlight};
          border-color: ${SystemColors.Highlight};
          box-shadow: none !important;
          color: ${SystemColors.HighlightText};
          fill: currentcolor;
        }
        :host([href]) .control {
          border-color: ${SystemColors.ButtonFace};
          color: ${SystemColors.LinkText};
        }
        :host([href]) .control:hover,
        :host([href]) .control:${focusVisible} {
          background: ${SystemColors.LinkText};
          border-color: ${SystemColors.LinkText};
          box-shadow: none !important;
          color: ${SystemColors.HighlightText};
          fill: currentcolor;
        }
      `,
    ),
  );
