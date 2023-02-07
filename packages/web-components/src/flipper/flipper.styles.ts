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
  neutralFillRest,
  neutralFillStrongActive,
  neutralFillStrongHover,
  neutralFillStrongRest,
  neutralStrokeControlRest,
  strokeWidth,
} from '../design-tokens';
import { focusTreatmentBase } from '../styles/focus';

export const flipperStyles: (context: ElementDefinitionContext, definition: FlipperOptions) => ElementStyles = (
  context: ElementDefinitionContext,
  definition: FlipperOptions,
) =>
  css`
    ${display('inline-flex')} :host {
      height: calc((${heightNumber} + ${designUnit}) * 1px);
      justify-content: center;
      align-items: center;
      fill: currentcolor;
      color: ${neutralFillStrongRest};
      background: padding-box linear-gradient(${neutralFillRest}, ${neutralFillRest}),
        border-box ${neutralStrokeControlRest};
      box-sizing: border-box;
      border: calc(${strokeWidth} * 1px) solid transparent;
      border-radius: calc(${controlCornerRadius} * 1px);
      padding: 0;
    }

    :host(.disabled) {
      opacity: ${disabledOpacity};
      cursor: ${disabledCursor};
      pointer-events: none;
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
      ${focusTreatmentBase}
    }

    :host::-moz-focus-inner {
      border: 0;
    }
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host {
          background: ${SystemColors.ButtonFace};
          border-color: ${SystemColors.ButtonText};
        }
        :host .next,
        :host .previous {
          color: ${SystemColors.ButtonText};
          fill: currentcolor;
        }
        :host(:not(.disabled):hover) {
          background: ${SystemColors.Highlight};
        }
        :host(:not(.disabled):hover) .next,
        :host(:not(.disabled):hover) .previous {
          color: ${SystemColors.HighlightText};
          fill: currentcolor;
        }
        :host(.disabled) {
          opacity: 1;
        }
        :host(.disabled),
        :host(.disabled) .next,
        :host(.disabled) .previous {
          border-color: ${SystemColors.GrayText};
          color: ${SystemColors.GrayText};
          fill: currentcolor;
        }
        :host(:${focusVisible}) {
          forced-color-adjust: none;
          outline-color: ${SystemColors.Highlight};
        }
      `,
    ),
  );
