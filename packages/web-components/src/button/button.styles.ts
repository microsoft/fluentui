import { css, ElementStyles } from '@microsoft/fast-element';
import {
  disabledCursor,
  ElementDefinitionContext,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import {
  _accentButtonStyles,
  _baseButtonStyles,
  _lightweightButtonStyles,
  _neutralButtonStyles,
  _outlineButtonStyles,
  _stealthButtonStyles,
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

    ${_baseButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)}
  `.withBehaviors(
    appearanceBehavior('neutral', _neutralButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)),
    appearanceBehavior('accent', _accentButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)),
    appearanceBehavior('lightweight', _lightweightButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)),
    appearanceBehavior('outline', _outlineButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)),
    appearanceBehavior('stealth', _stealthButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)),
  );
