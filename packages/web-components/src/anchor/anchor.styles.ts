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

export const anchorStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    ${baseButtonStyles(context, definition)}
  `.withBehaviors(
    appearanceBehavior('accent', AccentButtonStyles(context, definition)),
    appearanceBehavior('hypertext', HypertextStyles(context, definition)),
    appearanceBehavior('lightweight', LightweightButtonStyles(context, definition)),
    appearanceBehavior('outline', OutlineButtonStyles(context, definition)),
    appearanceBehavior('stealth', StealthButtonStyles(context, definition)),
  );
