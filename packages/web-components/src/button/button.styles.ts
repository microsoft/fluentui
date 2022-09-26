import { css, ElementStyles } from '@microsoft/fast-element';
import {
  disabledCursor,
  ElementDefinitionContext,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import {
  AccentButtonStyles,
  baseButtonStyles,
  LightweightButtonStyles,
  NeutralButtonStyles,
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
    :host(${interactivitySelector}) .control {
      cursor: pointer;
    }

    :host(${nonInteractivitySelector}) .control {
      cursor: ${disabledCursor};
    }

    @media (forced-colors: none) {
      :host(${nonInteractivitySelector}) .control {
        opacity: ${disabledOpacity};
      }
    }

    ${baseButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)}
  `.withBehaviors(
    appearanceBehavior('neutral', NeutralButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)),
    appearanceBehavior('accent', AccentButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)),
    appearanceBehavior('lightweight', LightweightButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)),
    appearanceBehavior('outline', OutlineButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)),
    appearanceBehavior('stealth', StealthButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)),
  );
