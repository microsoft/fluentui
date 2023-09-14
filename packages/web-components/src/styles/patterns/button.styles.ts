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
import { focusTreatmentBase, focusTreatmentTight } from '../focus';

/**
 * The base styles for button controls, without `appearance` visual differences.
 * 
 * @internal
 */
export const baseButtonStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  interactivitySelector: string,
  nonInteractivitySelector: string = '[disabled]',
) =>
  css`
    ${display('inline-flex')}
    
    :host {
      position: relative;
      box-sizing: border-box;
      ${typeRampBase}
      height: calc(${heightNumber} * 1px);
      min-width: calc(${heightNumber} * 1px);
      color: ${neutralForegroundRest};
      border-radius: calc(${controlCornerRadius} * 1px);
      fill: currentcolor;
    }

    .control {
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

    .control:${focusVisible} {
      ${focusTreatmentBase}
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
  `;

/**
 * @internal
 */
export const NeutralButtonStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  interactivitySelector: string,
  nonInteractivitySelector: string = '[disabled]',
) =>
  css`
    .control {
      background: padding-box linear-gradient(${neutralFillRest}, ${neutralFillRest}),
        border-box ${neutralStrokeControlRest};
    }

    :host(${interactivitySelector}:hover) .control {
      background: padding-box linear-gradient(${neutralFillHover}, ${neutralFillHover}),
        border-box ${neutralStrokeControlHover};
    }

    :host(${interactivitySelector}:active) .control {
      background: padding-box linear-gradient(${neutralFillActive}, ${neutralFillActive}),
        border-box ${neutralStrokeControlActive};
    }

    :host(${nonInteractivitySelector}) .control {
      background: padding-box linear-gradient(${neutralFillRest}, ${neutralFillRest}),
        border-box ${neutralStrokeRest};
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        .control {
          background: ${SystemColors.ButtonFace};
          border-color: ${SystemColors.ButtonText};
          color: ${SystemColors.ButtonText};
        }

        :host(${interactivitySelector}:hover) .control,
        :host(${interactivitySelector}:active) .control {
          forced-color-adjust: none;
          background: ${SystemColors.HighlightText};
          border-color: ${SystemColors.Highlight};
          color: ${SystemColors.Highlight};
        }

        :host(${nonInteractivitySelector}) .control {
          background: transparent;
          border-color: ${SystemColors.GrayText};
          color: ${SystemColors.GrayText};
        }

        .control:${focusVisible} {
          outline-color: ${SystemColors.CanvasText};
        }

        :host([href]) .control {
          background: transparent;
          border-color: ${SystemColors.LinkText};
          color: ${SystemColors.LinkText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          background: transparent;
          border-color: ${SystemColors.CanvasText};
          color: ${SystemColors.CanvasText};
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
  interactivitySelector: string,
  nonInteractivitySelector: string = '[disabled]',
) =>
  css`
    .control {
      background: padding-box linear-gradient(${accentFillRest}, ${accentFillRest}),
        border-box ${accentStrokeControlRest};
      color: ${foregroundOnAccentRest};
    }

    :host(${interactivitySelector}:hover) .control {
      background: padding-box linear-gradient(${accentFillHover}, ${accentFillHover}),
        border-box ${accentStrokeControlHover};
      color: ${foregroundOnAccentHover};
    }

    :host(${interactivitySelector}:active) .control {
      background: padding-box linear-gradient(${accentFillActive}, ${accentFillActive}),
        border-box ${accentStrokeControlActive};
      color: ${foregroundOnAccentActive};
    }

    :host(${nonInteractivitySelector}) .control {
      background: ${accentFillRest};
    }

    .control:${focusVisible} {
      box-shadow: 0 0 0 calc(${focusStrokeWidth} * 1px) ${focusStrokeInner} inset !important;
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        .control {
          forced-color-adjust: none;
          background: ${SystemColors.Highlight};
          color: ${SystemColors.HighlightText};
        }

        :host(${interactivitySelector}:hover) .control,
        :host(${interactivitySelector}:active) .control {
          background: ${SystemColors.HighlightText};
          border-color: ${SystemColors.Highlight};
          color: ${SystemColors.Highlight};
        }

        :host(${nonInteractivitySelector}) .control {
          background: transparent;
          border-color: ${SystemColors.GrayText};
          color: ${SystemColors.GrayText};
        }

        .control:${focusVisible} {
          outline-color: ${SystemColors.CanvasText};
          box-shadow: 0 0 0 calc(${focusStrokeWidth} * 1px) ${SystemColors.HighlightText} inset !important;
        }

        :host([href]) .control {
          background: ${SystemColors.LinkText};
          color: ${SystemColors.HighlightText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          background: ${SystemColors.ButtonFace};
          border-color: ${SystemColors.LinkText};
          color: ${SystemColors.LinkText};
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
  interactivitySelector: string,
  nonInteractivitySelector: string = '[disabled]',
) =>
  css`
    :host {
      height: auto;
      font-family: inherit;
      font-size: inherit;
      line-height: inherit;
      min-width: 0;
    }

    .control {
      display: inline;
      padding: 0;
      border: none;
      box-shadow: none;
      line-height: 1;
    }

    :host(${interactivitySelector}) .control {
      color: ${accentForegroundRest};
      text-decoration: underline 1px;
    }

    :host(${interactivitySelector}:hover) .control {
      color: ${accentForegroundHover};
      text-decoration: none;
    }

    :host(${interactivitySelector}:active) .control {
      color: ${accentForegroundActive};
      text-decoration: none;
    }

    .control:${focusVisible} {
      ${focusTreatmentTight}
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host(${interactivitySelector}) .control {
          color: ${SystemColors.LinkText};
        }

        :host(${interactivitySelector}:hover) .control,
        :host(${interactivitySelector}:active) .control {
          color: ${SystemColors.CanvasText};
        }

        .control:${focusVisible} {
          outline-color: ${SystemColors.CanvasText};
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
  interactivitySelector: string,
  nonInteractivitySelector: string = '[disabled]',
) =>
  css`
    :host {
      color: ${accentForegroundRest};
    }

    .control {
      background: ${neutralFillStealthRest};
    }

    :host(${interactivitySelector}:hover) .control {
      background: ${neutralFillStealthHover};
      color: ${accentForegroundHover};
    }

    :host(${interactivitySelector}:active) .control {
      background: ${neutralFillStealthActive};
      color: ${accentForegroundActive};
    }

    :host(${nonInteractivitySelector}) .control {
      background: ${neutralFillStealthRest};
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host {
          color: ${SystemColors.ButtonText};
        }

        .control {
          forced-color-adjust: none;
          background: transparent;
        }

        :host(${interactivitySelector}:hover) .control,
        :host(${interactivitySelector}:active) .control {
          background: transparent;
          border-color: ${SystemColors.ButtonText};
          color: ${SystemColors.ButtonText};
        }

        :host(${nonInteractivitySelector}) .control {
          background: transparent;
          color: ${SystemColors.GrayText};
        }

        .control:${focusVisible} {
          outline-color: ${SystemColors.CanvasText};
        }

        :host([href]) .control {
          color: ${SystemColors.LinkText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          border-color: ${SystemColors.LinkText};
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
  interactivitySelector: string,
  nonInteractivitySelector: string = '[disabled]',
) =>
  css`
    .control {
      background: transparent !important;
      border-color: ${neutralStrokeRest};
    }

    :host(${interactivitySelector}:hover) .control {
      border-color: ${neutralStrokeHover};
    }

    :host(${interactivitySelector}:active) .control {
      border-color: ${neutralStrokeActive};
    }

    :host(${nonInteractivitySelector}) .control {
      background: transparent !important;
      border-color: ${neutralStrokeRest};
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        .control {
          border-color: ${SystemColors.ButtonText};
          color: ${SystemColors.ButtonText};
        }

        :host(${interactivitySelector}:hover) .control,
        :host(${interactivitySelector}:active) .control {
          background: ${SystemColors.HighlightText};
          border-color: ${SystemColors.Highlight};
          color: ${SystemColors.Highlight};
        }

        :host(${nonInteractivitySelector}) .control {
          border-color: ${SystemColors.GrayText};
          color: ${SystemColors.GrayText};
        }

        .control:${focusVisible} {
          outline-color: ${SystemColors.CanvasText};
        }

        :host([href]) .control {
          border-color: ${SystemColors.LinkText};
          color: ${SystemColors.LinkText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          border-color: ${SystemColors.CanvasText};
          color: ${SystemColors.CanvasText};
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
  interactivitySelector: string,
  nonInteractivitySelector: string = '[disabled]',
) =>
  css`
    .control {
      background: ${neutralFillStealthRest};
    }

    :host(${interactivitySelector}:hover) .control {
      background: ${neutralFillStealthHover};
    }

    :host(${interactivitySelector}:active) .control {
      background: ${neutralFillStealthActive};
    }

    :host(${nonInteractivitySelector}) .control {
      background: ${neutralFillStealthRest};
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        .control {
          forced-color-adjust: none;
          background: transparent;
          color: ${SystemColors.ButtonText};
        }

        :host(${interactivitySelector}:hover) .control,
        :host(${interactivitySelector}:active) .control {
          background: transparent;
          border-color: ${SystemColors.ButtonText};
          color: ${SystemColors.ButtonText};
        }

        :host(${nonInteractivitySelector}) .control {
          background: transparent;
          color: ${SystemColors.GrayText};
        }
        
        .control:${focusVisible} {
          outline-color: ${SystemColors.CanvasText};
        }

        :host([href]) .control {
          color: ${SystemColors.LinkText};
        }

        :host([href]:hover) .control,
        :host([href]:active) .control {
          background: transparent;
          border-color: ${SystemColors.LinkText};
          color: ${SystemColors.LinkText};
        }
      `,
    ),
  );
