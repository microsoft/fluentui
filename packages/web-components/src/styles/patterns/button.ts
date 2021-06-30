import { css } from '@microsoft/fast-element';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { display, focusVisible, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
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
  strokeWidth,
  typeRampBaseFontSize,
  typeRampBaseLineHeight,
} from '../../design-tokens';

/**
 * @internal
 */
export const baseButtonStyles = (context, definition) =>
  css`
  ${display('inline-flex')} :host {
    font-family: ${bodyFont};
    outline: none;
    font-size: ${typeRampBaseFontSize};
    line-height: ${typeRampBaseLineHeight};
    height: calc(${heightNumber} * 1px);
    min-width: calc(${heightNumber} * 1px);
    background-color: ${neutralFillRest};
    color: ${neutralForegroundRest};
    border-radius: calc(${controlCornerRadius} * 1px);
    fill: currentcolor;
    cursor: pointer;
  }

  .control {
    background: transparent;
    height: inherit;
    flex-grow: 1;
    box-sizing: border-box;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0 calc((10 + (${designUnit} * 2 * ${density})) * 1px);
    white-space: nowrap;
    outline: none;
    text-decoration: none;
    border: calc(${strokeWidth} * 1px) solid transparent;
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

  :host(:hover) {
    background-color: ${neutralFillHover};
  }

  :host(:active) {
    background-color: ${neutralFillActive};
  }

  .control:${focusVisible} {
    border: calc(${strokeWidth} * 1px) solid ${focusStrokeOuter};
    box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${focusStrokeOuter};
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

  ::slotted(svg) {
    ${
      /* Glyph size and margin-left is temporary -
            replace when adaptive typography is figured out */ ''
    } width: 16px;
    height: 16px;
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
        :host([appearance="neutral"]) .control {
          background-color: ${SystemColors.ButtonFace};
          border-color: ${SystemColors.ButtonText};
          color: ${SystemColors.ButtonText};
          fill: currentcolor;
        }

        :host(:not([disabled][href]):hover),
        :host([appearance="neutral"]:not([disabled]):hover) .control {
          forced-color-adjust: none;
          background-color: ${SystemColors.Highlight};
          color: ${SystemColors.HighlightText};
        }

        .control:${focusVisible},
        :host([appearance="outline"]) .control:${focusVisible},
        :host([appearance="neutral"]:${focusVisible}) .control {
          forced-color-adjust: none;
          background-color: ${SystemColors.Highlight};
          border-color: ${SystemColors.ButtonText};
          box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${SystemColors.ButtonText};
          color: ${SystemColors.HighlightText};
        }

        .control:not([disabled]):hover,
        :host([appearance="outline"]) .control:hover {
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
export const AccentButtonStyles = css`
    :host([appearance="accent"]) {
        background: ${accentFillRest};
        color: ${foregroundOnAccentRest};
    }

    :host([appearance="accent"]:hover) {
        background: ${accentFillHover};
        color: ${foregroundOnAccentHover};
    }

    :host([appearance="accent"]:active) .control:active {
        background: ${accentFillActive};
        color: ${foregroundOnAccentActive};
    }

    :host([appearance="accent"]) .control:${focusVisible} {
        box-shadow: 0 0 0 calc(${focusStrokeWidth} * 1px) inset ${focusStrokeInner}, 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${focusStrokeOuter}
    }
`.withBehaviors(
  forcedColorsStylesheetBehavior(
    css`
        :host([appearance="accent"]) .control {
            forced-color-adjust: none;
            background: ${SystemColors.Highlight};
            color: ${SystemColors.HighlightText};
        }

        :host([appearance="accent"]) .control:hover,
        :host([appearance="accent"]:active) .control:active {
            background: ${SystemColors.HighlightText};
            border-color: ${SystemColors.Highlight};
            color: ${SystemColors.Highlight};
        }

        :host([appearance="accent"]) .control:${focusVisible} {
            border-color: ${SystemColors.ButtonText};
            box-shadow: 0 0 0 2px ${SystemColors.HighlightText} inset;
        }

        :host([appearance="accent"][href]) .control{
            background: ${SystemColors.LinkText};
            color: ${SystemColors.HighlightText};
        }

        :host([appearance="accent"][href]) .control:hover {
            background: ${SystemColors.ButtonFace};
            border-color: ${SystemColors.LinkText};
            box-shadow: none;
            color: ${SystemColors.LinkText};
            fill: currentcolor;
        }

        :host([appearance="accent"][href]) .control:${focusVisible} {
          border-color: ${SystemColors.LinkText};
          box-shadow: 0 0 0 2px ${SystemColors.HighlightText} inset;
      }
    `,
  ),
);

/**
 * @internal
 */
export const HypertextStyles = css`
    :host([appearance="hypertext"]) {
        height: auto;
        font-size: inherit;
        line-height: inherit;
        background: transparent;
        min-width: 0;
    }

    :host([appearance="hypertext"]) .control {
        display: inline;
        padding: 0;
        border: none;
        box-shadow: none;
        border-radius: 0;
        line-height: 1;
    }
    :host a.control:not(:link) {
        background-color: transparent;
        cursor: default;
    }
    :host([appearance="hypertext"]) .control:link,
    :host([appearance="hypertext"]) .control:visited {
        background: transparent;
        color: ${accentForegroundRest};
        border-bottom: calc(${strokeWidth} * 1px) solid ${accentForegroundRest};
    }
    :host([appearance="hypertext"]) .control:hover {
        border-bottom-color: ${accentForegroundHover};
    }
    :host([appearance="hypertext"]) .control:active {
        border-bottom-color: ${accentForegroundActive};
    }
    :host([appearance="hypertext"]) .control:${focusVisible} {
        border-bottom: calc(${focusStrokeWidth} * 1px) solid ${focusStrokeOuter};
        margin-bottom: calc(calc(${strokeWidth} - ${focusStrokeWidth}) * 1px);
    }
`.withBehaviors(
  forcedColorsStylesheetBehavior(
    css`
      :host([appearance="hypertext"]) .control:${focusVisible} {
        color: ${SystemColors.LinkText};
        border-bottom-color: ${SystemColors.LinkText};
      }
    `,
  ),
);

/**
 * @internal
 */
export const LightweightButtonStyles = css`
    :host([appearance="lightweight"]) {
        background: transparent;
        color: ${accentForegroundRest};
    }

    :host([appearance="lightweight"]) .control {
        padding: 0;
        height: initial;
        border: none;
        box-shadow: none;
        border-radius: 0;
    }

    :host([appearance="lightweight"]:hover) {
        color: ${accentForegroundHover};
    }

    :host([appearance="lightweight"]:active) {
        color: ${accentForegroundActive};
    }

    :host([appearance="lightweight"]) .content {
        position: relative;
    }

    :host([appearance="lightweight"]) .content::before {
        content: "";
        display: block;
        height: calc(${strokeWidth} * 1px);
        position: absolute;
        top: calc(1em + 3px);
        width: 100%;
    }

    :host([appearance="lightweight"]:hover) .content::before {
        background: ${accentForegroundHover};
    }

    :host([appearance="lightweight"]:active) .content::before {
        background: ${accentForegroundActive};
    }

    :host([appearance="lightweight"]) .control:${focusVisible} .content::before {
        background: ${neutralForegroundRest};
        height: calc(${focusStrokeWidth} * 1px);
    }
`.withBehaviors(
  forcedColorsStylesheetBehavior(
    css`
        :host([appearance="lightweight"]) {
            color: ${SystemColors.ButtonText};
        }
        :host([appearance="lightweight"]) .control:hover,
        :host([appearance="lightweight"]) .control:${focusVisible} {
            forced-color-adjust: none;
            background: ${SystemColors.ButtonFace};
            color: ${SystemColors.Highlight};
        }
        :host([appearance="lightweight"]) .control:hover .content::before,
        :host([appearance="lightweight"]) .control:${focusVisible} .content::before {
            background: ${SystemColors.Highlight};
        }

        :host([appearance="lightweight"][href]) .control:hover,
        :host([appearance="lightweight"][href]) .control:${focusVisible} {
            background: ${SystemColors.ButtonFace};
            box-shadow: none;
            color: ${SystemColors.LinkText};
        }

        :host([appearance="lightweight"][href]) .control:hover .content::before,
        :host([appearance="lightweight"][href]) .control:${focusVisible} .content::before {
            background: ${SystemColors.LinkText};
        }
    `,
  ),
);

/**
 * @internal
 */
export const OutlineButtonStyles = css`
    :host([appearance="outline"]) {
        background: transparent;
        border-color: ${neutralStrokeRest};
    }

    :host([appearance="outline"]:hover) {
        border-color: ${neutralStrokeHover};
    }

    :host([appearance="outline"]:active) {
        border-color: ${neutralStrokeActive};
    }

    :host([appearance="outline"]) .control {
        border-color: inherit;
    }

    :host([appearance="outline"]) .control:${focusVisible} {
        box-shadow: 0 0 0 calc((${focusStrokeWidth} - ${strokeWidth}) * 1px) ${focusStrokeOuter};
        border-color: ${focusStrokeOuter};
    }
`.withBehaviors(
  forcedColorsStylesheetBehavior(
    css`
      :host([appearance='outline']) {
        border-color: ${SystemColors.ButtonText};
      }
      :host([appearance='outline'][href]) {
        border-color: ${SystemColors.LinkText};
      }
    `,
  ),
);

/**
 * @internal
 */
export const StealthButtonStyles = css`
  :host([appearance='stealth']) {
    background: ${neutralFillStealthRest};
  }

  :host([appearance='stealth']:hover) {
    background: ${neutralFillStealthHover};
  }

  :host([appearance='stealth']:active) {
    background: ${neutralFillStealthActive};
  }
`.withBehaviors(
  forcedColorsStylesheetBehavior(
    css`
        :host([appearance="stealth"]),
        :host([appearance="stealth"]) .control {
            forced-color-adjust: none;
            background: ${SystemColors.ButtonFace};
            border-color: transparent;
            color: ${SystemColors.ButtonText};
            fill: currentcolor;
        }

        :host([appearance="stealth"]:hover) .control {
            background: ${SystemColors.Highlight};
            border-color: ${SystemColors.Highlight};
            color: ${SystemColors.HighlightText};
            fill: currentcolor;
        }

        :host([appearance="stealth"]:${focusVisible}) .control {
            background: ${SystemColors.Highlight};
            box-shadow: 0 0 0 1px ${SystemColors.Highlight};
            color: ${SystemColors.HighlightText};
            fill: currentcolor;
        }

        :host([appearance="stealth"][href]) .control {
            color: ${SystemColors.LinkText};
        }

        :host([appearance="stealth"]:hover[href]) .control,
        :host([appearance="stealth"]:${focusVisible}[href]) .control {
            background: ${SystemColors.LinkText};
            border-color: ${SystemColors.LinkText};
            color: ${SystemColors.HighlightText};
            fill: currentcolor;
        }

      :host([appearance="stealth"]:${focusVisible}[href]) .control {
          box-shadow: 0 0 0 1px ${SystemColors.LinkText};
      }
    `,
  ),
);
