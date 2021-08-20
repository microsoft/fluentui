import { css, ElementStyles } from '@microsoft/fast-element';
import {
  AccentButtonStyles,
  baseButtonStyles,
  HypertextStyles,
  LightweightButtonStyles,
  OutlineButtonStyles,
  StealthButtonStyles,
} from '../styles/';
import { appearanceBehavior } from '../utilities/behaviors';
import type { ElementDefinitionContext, FoundationElementDefinition } from "@microsoft/fast-foundation";

export const anchorStyles: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition,
) => ElementStyles = (context: ElementDefinitionContext, definition: FoundationElementDefinition) =>
  css`
    ${baseButtonStyles(context, definition)}
  `.withBehaviors(
    appearanceBehavior('accent', AccentButtonStyles),
    appearanceBehavior('hypertext', HypertextStyles),
    appearanceBehavior('lightweight', LightweightButtonStyles),
    appearanceBehavior('outline', OutlineButtonStyles),
    appearanceBehavior('stealth', StealthButtonStyles),
  );
