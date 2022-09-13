import { ElementStyles } from '@microsoft/fast-element';
import { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import {
  _accentButtonStyles,
  _baseButtonStyles,
  _hypertextStyles,
  _lightweightButtonStyles,
  _neutralButtonStyles,
  _outlineButtonStyles,
  _stealthButtonStyles,
} from '../styles/';
import { appearanceBehavior } from '../utilities/behaviors';

const interactivitySelector: string = '[href]';

export const anchorStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  _baseButtonStyles(context, definition, interactivitySelector)
  .withBehaviors(
    appearanceBehavior('neutral', _neutralButtonStyles(context, definition, interactivitySelector)),
    appearanceBehavior('accent', _accentButtonStyles(context, definition, interactivitySelector)),
    appearanceBehavior('hypertext', _hypertextStyles(context, definition, interactivitySelector)),
    appearanceBehavior('lightweight', _lightweightButtonStyles(context, definition, interactivitySelector)),
    appearanceBehavior('outline', _outlineButtonStyles(context, definition, interactivitySelector)),
    appearanceBehavior('stealth', _stealthButtonStyles(context, definition, interactivitySelector)),
  );
