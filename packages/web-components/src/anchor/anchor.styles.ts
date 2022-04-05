import { css, ElementStyles } from '@microsoft/fast-element';
import { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import {
  AccentButtonStyles,
  baseButtonStyles,
  HypertextStyles,
  LightweightButtonStyles,
  OutlineButtonStyles,
  StealthButtonStyles,
} from '../styles/';
import { appearanceBehavior } from '../utilities/behaviors';

const interactivitySelector: string = '[href]';
const nonInteractivitySelector: string = ':not([href])';

export const anchorStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    :host .control:not([href]) {
      cursor: default;
    }

    ${baseButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)}
  `.withBehaviors(
    appearanceBehavior('accent', AccentButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)),
    appearanceBehavior('hypertext', HypertextStyles(context, definition, interactivitySelector, nonInteractivitySelector)),
    appearanceBehavior('lightweight', LightweightButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)),
    appearanceBehavior('outline', OutlineButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)),
    appearanceBehavior('stealth', StealthButtonStyles(context, definition, interactivitySelector, nonInteractivitySelector)),
  );
