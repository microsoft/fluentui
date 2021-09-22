import { css, ElementStyles } from '@microsoft/fast-element';
import {
  disabledCursor,
  display,
  ElementDefinitionContext,
  FlipperOptions,
  focusVisible,
  forcedColorsStylesheetBehavior,
} from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import { heightNumber } from '../styles';
import {
  controlCornerRadius,
  designUnit,
  disabledOpacity,
  focusStrokeOuter,
  focusStrokeWidth,
  neutralFillSecondaryRest,
  neutralFillStrongActive,
  neutralFillStrongHover,
  neutralFillStrongRest,
} from '../design-tokens';

export const flipperStyles: (context: ElementDefinitionContext, definition: FlipperOptions) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: FlipperOptions,
) =>
  css`
    ${display('inline-flex')} :host {
      height: calc((${heightNumber} + ${designUnit}) * 1px);
      justify-content: center;
      align-items: center;
      margin: 0;
      fill: currentcolor;
      color: ${neutralFillStrongRest};
      background: ${neutralFillSecondaryRest};
      box-sizing: border-box;
      border: calc(${focusStrokeWidth} * 1px) solid transparent;
      border-radius: calc(${controlCornerRadius} * 1px);
      outline: none;
      padding: 0;
    }

    :host(.disabled) {
      opacity: ${disabledOpacity};
      cursor: ${disabledCursor};
    }

    .next,
    .previous {
      display: flex;
    }

    :host(:not(.disabled):hover) {
      cursor: pointer;
    }

    :host(:not(.disabled):hover) {
      color: ${neutralFillStrongHover};
    }

    :host(:not(.disabled):active) {
      color: ${neutralFillStrongActive};
    }

    :host(:${focusVisible}) {
      border-color: ${focusStrokeOuter};
    }

    :host::-moz-focus-inner {
      border: 0;
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host {
          background: ${SystemColors.Canvas};
        }
        :host .next,
        :host .previous {
          color: ${SystemColors.ButtonText};
          fill: currentcolor;
        }
        :host {
          background: ${SystemColors.Canvas};
          border-color: ${SystemColors.ButtonText};
        }
        :host(:not(.disabled):hover) {
          forced-color-adjust: none;
          background: ${SystemColors.Highlight};
          border-color: ${SystemColors.ButtonText};
          opacity: 1;
        }
        :host(:not(.disabled):hover) .next,
        :host(:not(.disabled):hover) .previous {
          forced-color-adjust: none;
          color: ${SystemColors.HighlightText};
          fill: currentcolor;
        }
        :host(.disabled) {
          opacity: 1;
        }
        :host(.disabled),
        :host(.disabled:hover),
        :host(.disabled) .next,
        :host(.disabled) .previous,
        :host(.disabled:hover) .next,
        :host(.disabled:hover) .previous {
          forced-color-adjust: none;
          background: ${SystemColors.Canvas};
          border-color: ${SystemColors.GrayText};
          color: ${SystemColors.GrayText};
          fill: ${SystemColors.GrayText};
        }
        :host(:${focusVisible}) {
          forced-color-adjust: none;
          border-color: ${SystemColors.Highlight};
          box-shadow: 0 0 0 2px ${SystemColors.Field}, 0 0 0 4px ${SystemColors.FieldText};
        }
      `,
    ),
  );
