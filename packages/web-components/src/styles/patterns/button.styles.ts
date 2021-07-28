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
  bodyFont,
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
  neutralStrokeHover,
  neutralStrokeRest,
  strokeControlAccentActive,
  strokeControlAccentHover,
  strokeControlAccentRest,
  strokeControlActive,
  strokeControlHover,
  strokeControlRest,
  strokeWidth,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
} from '../../design-tokens';

/**
 * @internal
 */
export const baseButtonStyles = (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
  interactivitySelector: string = '',
) =>
  css`
    ${display('inline-flex')} :host {
      position: relative;
      box-sizing: border-box;
      font-family: ${bodyFont};
      outline: none;
      font-size: ${typeRampBaseFontSize};
      line-height: ${typeRampBaseLineHeight};
      height: calc(${heightNumber} * 1px);
      min-width: calc(${heightNumber} * 1px);
      color: ${neutralForegroundRest};
      border-radius: calc(${controlCornerRadius} * 1px);
      fill: currentcolor;
      cursor: pointer;
    }

    :host .control {
      background: padding-box linear-gradient(${neutralFillRest}, ${neutralFillRest}), border-box ${strokeControlRest};
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

    :host(${interactivitySelector}:hover) .control {
      background: padding-box linear-gradient(${neutralFillHover}, ${neutralFillHover}),
        border-box ${strokeControlHover};
    }

    :host(${interactivitySelector}:active) .control {
      background: padding-box linear-gradient(${neutralFillActive}, ${neutralFillActive}),
        border-box ${strokeControlActive};
    }

    :host .control:${focusVisible} {
      border-color: ${focusStrokeOuter} !important;
      box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${focusStrokeOuter} inset !important;
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
        :host,
        :host .control {
          background-color: ${SystemColors.ButtonFace};
          border-color: ${SystemColors.ButtonText};
          color: ${SystemColors.ButtonText};
          fill: currentcolor;
        }

        :host(:not([disabled][href]):hover),
        :host(${interactivitySelector}:hover) .control {
          forced-color-adjust: none;
          background-color: ${SystemColors.Highlight};
          color: ${SystemColors.HighlightText};
        }

        .control:${focusVisible},
        :host .control:${focusVisible},
        :host(:${focusVisible}) .control {
          forced-color-adjust: none;
          background-color: ${SystemColors.Highlight};
          border-color: ${SystemColors.ButtonText};
          box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${SystemColors.ButtonText};
          color: ${SystemColors.HighlightText};
        }

        .control${interactivitySelector}:hover,
        :host .control:hover {
          border-color: ${SystemColors.ButtonText};
        }

        :host([href]) .control {
          border-color: ${SystemColors.LinkText};
          color: ${SystemColors.LinkText};
        }

        :host([href]) .control:hover,
        :host(.neutral[href]) .control:hover,
        :host(.outline[href]) .control:hover,
        :host([href]) .control:${focusVisible}{
          forced-color-adjust: none;
          background: ${SystemColors.ButtonFace};
          border-color: ${SystemColors.LinkText};
          box-shadow: 0 0 0 1px ${SystemColors.LinkText} inset;
          color: ${SystemColors.LinkText};
          fill: currentcolor;
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
) =>
  css`
    :host .control {
      background: padding-box linear-gradient(${accentFillRest}, ${accentFillRest}), border-box ${strokeControlAccentRest};
      color: ${foregroundOnAccentRest};
    }

    :host(${interactivitySelector}:hover) .control {
      background: padding-box linear-gradient(${accentFillHover}, ${accentFillHover}),
        border-box ${strokeControlAccentHover};
      color: ${foregroundOnAccentHover};
    }

    :host(${interactivitySelector}:active) .control {
      background: padding-box linear-gradient(${accentFillActive}, ${accentFillActive}),
        border-box ${strokeControlAccentActive};
      color: ${foregroundOnAccentActive};
    }

    :host .control:${focusVisible} {
      box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${focusStrokeOuter} inset,
        0 0 0 calc(((${focusStrokeWidth} * 2) - ${strokeWidth}) * 1px) ${focusStrokeInner} inset !important;
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host .control {
          forced-color-adjust: none;
          background: ${SystemColors.Highlight};
          color: ${SystemColors.HighlightText};
        }

        :host .control:hover,
        :host(${interactivitySelector}:active) .control:active {
          background: ${SystemColors.HighlightText};
          border-color: ${SystemColors.Highlight};
          color: ${SystemColors.Highlight};
        }

        :host .control:${focusVisible} {
          border-color: ${SystemColors.ButtonText};
          box-shadow: 0 0 0 2px ${SystemColors.HighlightText} inset;
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
          border-color: ${SystemColors.LinkText};
          box-shadow: 0 0 0 2px ${SystemColors.HighlightText} inset;
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
    :host a.control:not(:link) {
      background-color: transparent;
      cursor: default;
    }
    :host .control:link,
    :host .control:visited {
      background: transparent;
      color: ${accentForegroundRest};
    }
    :host .control:hover {
      border-bottom-color: ${accentForegroundHover};
    }
    :host .control:active {
      border-bottom-color: ${accentForegroundActive};
    }
    :host .control:${focusVisible} {
      box-shadow: 0 0 0 calc(${focusStrokeWidth} * 1px) ${focusStrokeOuter} !important;
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
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
) =>
  css`
    :host {
      color: ${accentForegroundRest};
    }

    :host .control {
      padding: 0;
      height: initial;
      background: transparent !important;
    }

    :host(${interactivitySelector}:hover) {
      color: ${accentForegroundHover};
    }

    :host(${interactivitySelector}:active) {
      color: ${accentForegroundActive};
    }

    :host .content {
      position: relative;
    }

    :host .content::before {
      content: '';
      display: block;
      height: calc(${strokeWidth} * 1px);
      position: absolute;
      top: calc(1em + 3px);
      width: 100%;
      background: ${accentForegroundRest};
    }

    :host(${interactivitySelector}:hover) .content::before {
      background: transparent;
    }

    :host(${interactivitySelector}:active) .content::before {
      background: transparent;
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host {
          color: ${SystemColors.ButtonText};
        }
        :host .control:hover,
        :host .control:${focusVisible} {
          forced-color-adjust: none;
          background: ${SystemColors.ButtonFace};
          color: ${SystemColors.Highlight};
        }
        :host .control:hover .content::before,
        :host .control:${focusVisible} .content::before {
          background: ${SystemColors.Highlight};
        }

        :host([href]) .control:hover,
        :host([href]) .control:${focusVisible} {
          background: ${SystemColors.ButtonFace};
          box-shadow: none;
          color: ${SystemColors.LinkText};
        }

        :host([href]) .control:hover .content::before,
        :host([href]) .control:${focusVisible} .content::before {
          background: ${SystemColors.LinkText};
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
) =>
  css`
    :host .control {
      background: transparent !important;
      border-color: ${neutralStrokeRest};
    }

    :host(${interactivitySelector}:hover) .control {
      border-color: ${neutralStrokeHover};
    }

    :host(${interactivitySelector}:active) .control {
      border-color: ${neutralStrokeActive};
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host {
          border-color: ${SystemColors.ButtonText};
        }
        :host([href]) {
          border-color: ${SystemColors.LinkText};
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
) =>
  css`
    :host .control {
      background: ${neutralFillStealthRest};
    }

    :host(${interactivitySelector}:hover) .control {
      background: ${neutralFillStealthHover};
    }

    :host(${interactivitySelector}:active) .control {
      background: ${neutralFillStealthActive};
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host,
        :host .control {
          forced-color-adjust: none;
          background: ${SystemColors.ButtonFace};
          border-color: transparent;
          color: ${SystemColors.ButtonText};
          fill: currentcolor;
        }

        :host(${interactivitySelector}:hover) .control {
          background: ${SystemColors.Highlight};
          border-color: ${SystemColors.Highlight};
          color: ${SystemColors.HighlightText};
          fill: currentcolor;
        }

        :host(:${focusVisible}) .control {
          background: ${SystemColors.Highlight};
          box-shadow: 0 0 0 1px ${SystemColors.Highlight};
          color: ${SystemColors.HighlightText};
          fill: currentcolor;
        }

        :host([href]) .control {
          color: ${SystemColors.LinkText};
        }

        :host(:hover[href]) .control,
        :host(:${focusVisible}[href]) .control {
          background: ${SystemColors.LinkText};
          border-color: ${SystemColors.LinkText};
          color: ${SystemColors.HighlightText};
          fill: currentcolor;
        }

        :host(:${focusVisible}[href]) .control {
          box-shadow: 0 0 0 1px ${SystemColors.LinkText};
        }
      `,
    ),
  );
