import { css, ElementStyles } from '@microsoft/fast-element';
import {
  disabledCursor,
  ElementDefinitionContext,
  forcedColorsStylesheetBehavior,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { SystemColors } from '@microsoft/fast-web-utilities';
import {
  AccentButtonStyles,
  baseButtonStyles,
  LightweightButtonStyles,
  OutlineButtonStyles,
  StealthButtonStyles,
} from '../styles/';
import { appearanceBehavior } from '../utilities/behaviors';
import {
  accentFillRest,
  accentForegroundRest,
  disabledOpacity,
  neutralFillRest,
  neutralFillStealthRest,
  neutralStrokeRest,
} from '../design-tokens';

export const buttonStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    :host([disabled]),
    :host([disabled]:hover),
    :host([disabled]:active) {
      opacity: ${disabledOpacity};
      background-color: ${neutralFillRest};
      cursor: ${disabledCursor};
    }

    ${baseButtonStyles(context, definition)}
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host([disabled]),
        :host([disabled]:hover),
        :host([disabled]:active),
        :host([disabled]) .control,
        :host([disabled]) .control:hover,
        :host([disabled]:hover) .control {
          forced-color-adjust: none;
          background-color: ${SystemColors.ButtonFace};
          border-color: ${SystemColors.GrayText};
          color: ${SystemColors.GrayText};
          opacity: 1;
        }
      `,
    ),
    appearanceBehavior(
      'accent',
      css`
        :host([disabled]),
        :host([disabled]:hover),
        :host([disabled]:active) {
          background: ${accentFillRest};
        }

        ${AccentButtonStyles}
      `.withBehaviors(
        forcedColorsStylesheetBehavior(
          css`
            :host([disabled]) .control,
            :host([disabled]) .control:hover {
              background: ${SystemColors.ButtonFace};
              border-color: ${SystemColors.GrayText};
              color: ${SystemColors.GrayText};
            }
          `,
        ),
      ),
    ),
    appearanceBehavior(
      'lightweight',
      css`
        :host([disabled]:hover),
        :host([disabled]:active) {
          background-color: transparent;
          color: ${accentForegroundRest};
        }

        :host([disabled]) .content::before,
        :host([disabled]:hover) .content::before,
        :host([disabled]:active) .content::before {
          background: transparent;
        }

        ${LightweightButtonStyles}
      `.withBehaviors(
        forcedColorsStylesheetBehavior(
          css`
            :host([disabled]) .control {
              forced-color-adjust: none;
              color: ${SystemColors.GrayText};
            }

            :host([disabled]) .control:hover .content::before {
              background: none;
            }
          `,
        ),
      ),
    ),
    appearanceBehavior(
      'outline',
      css`
        :host([disabled]:hover),
        :host([disabled]:active) {
          background: transparent;
          border-color: ${neutralStrokeRest};
        }

        ${OutlineButtonStyles}
      `.withBehaviors(
        forcedColorsStylesheetBehavior(
          css`
            :host([disabled]) .control {
              border-color: ${SystemColors.GrayText};
            }
          `,
        ),
      ),
    ),
    appearanceBehavior(
      'stealth',
      css`
        :host([disabled]),
        :host([disabled]:hover),
        :host([disabled]:active) {
          background: ${neutralFillStealthRest};
        }

        ${StealthButtonStyles}
      `.withBehaviors(
        forcedColorsStylesheetBehavior(
          css`
            :host([disabled]),
            :host([disabled]:hover) {
              background: ${SystemColors.ButtonFace};
            }

            :host([disabled]) .control {
              background: ${SystemColors.ButtonFace};
              border-color: transparent;
              color: ${SystemColors.GrayText};
            }
          `,
        ),
      ),
    ),
  );
