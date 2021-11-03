import { css, ElementStyles } from '@microsoft/fast-element';
import {
  disabledCursor,
  ElementDefinitionContext,
  forcedColorsStylesheetBehavior,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { SystemColors } from "@microsoft/fast-web-utilities";
import {
  AccentButtonStyles,
  baseButtonStyles,
  LightweightButtonStyles,
  OutlineButtonStyles,
  StealthButtonStyles,
} from '../styles/';
import { appearanceBehavior } from '../utilities/behaviors';
import { disabledOpacity } from '../design-tokens';

const interactivitySelector: string = ':not([disabled])';
const nonInteractivitySelector: string = '[disabled]';

export const buttonStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    :host([disabled]) {
      opacity: ${disabledOpacity};
      cursor: ${disabledCursor};
    }

    ${baseButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)}
  `.withBehaviors(
    forcedColorsStylesheetBehavior(
      css`
        :host([disabled]) {
          opacity: 1;
        }
        :host([disabled]) .control {
          border-color: ${SystemColors.GrayText};
          color: ${SystemColors.GrayText};
          fill: currentcolor;
        }
      `,
    ),
    appearanceBehavior(
      'accent',
      css`
      ${AccentButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)},
      `.withBehaviors(
        forcedColorsStylesheetBehavior(
          css`
            :host([disabled]) .control {
              background: ${SystemColors.ButtonFace};
            }
          `,
        ),
      )
    ),
    appearanceBehavior(
      'lightweight',
      css`
      ${LightweightButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)},
      `.withBehaviors(
        forcedColorsStylesheetBehavior(
          css`
            :host([disabled]) .control {
              border-color: ${SystemColors.ButtonFace};
            }
          `,
        ),
      )
    ),
    appearanceBehavior(
      'outline',
      css`
      ${OutlineButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)}
      `.withBehaviors(
        forcedColorsStylesheetBehavior(
          css`
            :host([disabled]) .control {
              border-color: ${SystemColors.GrayText};
            }
          `,
        ),
      )
    ),
    appearanceBehavior(
      'stealth',
      css`
      ${StealthButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)}
      `.withBehaviors(
        forcedColorsStylesheetBehavior(
          css`
            :host([disabled]) .control {
              border-color: ${SystemColors.ButtonFace};
            }
          `,
        ),
      )
    )
  );
