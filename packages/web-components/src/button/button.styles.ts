import { css, ElementStyles } from '@microsoft/fast-element';
import {
  disabledCursor,
  ElementDefinitionContext,
  forcedColorsStylesheetBehavior,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
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
      `,
    ),
    appearanceBehavior('accent', AccentButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)),
    appearanceBehavior('lightweight', LightweightButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)),
    appearanceBehavior('outline', OutlineButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)),
    appearanceBehavior('stealth', StealthButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)),
  );
