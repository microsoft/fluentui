import { css } from '@microsoft/fast-element';
import { disabledCursor, forcedColorsStylesheetBehavior } from '@microsoft/fast-foundation';
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

export const buttonStyles = (context, definition) =>
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
        :host([appearance='neutral'][disabled]:hover) .control {
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
        :host([appearance='accent'][disabled]),
        :host([appearance='accent'][disabled]:hover),
        :host([appearance='accent'][disabled]:active) {
          background: ${accentFillRest};
        }

        ${AccentButtonStyles}
      `.withBehaviors(
        forcedColorsStylesheetBehavior(
          css`
            :host([appearance='accent'][disabled]) .control,
            :host([appearance='accent'][disabled]) .control:hover {
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
        :host([appearance='lightweight'][disabled]:hover),
        :host([appearance='lightweight'][disabled]:active) {
          background-color: transparent;
          color: ${accentForegroundRest};
        }

        :host([appearance='lightweight'][disabled]) .content::before,
        :host([appearance='lightweight'][disabled]:hover) .content::before,
        :host([appearance='lightweight'][disabled]:active) .content::before {
          background: transparent;
        }

        ${LightweightButtonStyles}
      `.withBehaviors(
        forcedColorsStylesheetBehavior(
          css`
            :host([appearance='lightweight'][disabled]) .control {
              forced-color-adjust: none;
              color: ${SystemColors.GrayText};
            }

            :host([appearance='lightweight'][disabled]) .control:hover .content::before {
              background: none;
            }
          `,
        ),
      ),
    ),
    appearanceBehavior(
      'outline',
      css`
        :host([appearance='outline'][disabled]:hover),
        :host([appearance='outline'][disabled]:active) {
          background: transparent;
          border-color: ${neutralStrokeRest};
        }

        ${OutlineButtonStyles}
      `.withBehaviors(
        forcedColorsStylesheetBehavior(
          css`
            :host([appearance='outline'][disabled]) .control {
              border-color: ${SystemColors.GrayText};
            }
          `,
        ),
      ),
    ),
    appearanceBehavior(
      'stealth',
      css`
        :host([appearance='stealth'][disabled]),
        :host([appearance='stealth'][disabled]:hover),
        :host([appearance='stealth'][disabled]:active) {
          background: ${neutralFillStealthRest};
        }

        ${StealthButtonStyles}
      `.withBehaviors(
        forcedColorsStylesheetBehavior(
          css`
            :host([appearance='stealth'][disabled]),
            :host([appearance='stealth'][disabled]:hover) {
              background: ${SystemColors.ButtonFace};
            }

            :host([appearance='stealth'][disabled]) .control {
              background: ${SystemColors.ButtonFace};
              border-color: transparent;
              color: ${SystemColors.GrayText};
            }
          `,
        ),
      ),
    ),
  );
