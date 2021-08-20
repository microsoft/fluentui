import { css, ElementStyles } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from "@microsoft/fast-foundation";
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
    appearanceBehavior('accent', AccentButtonStyles),
    appearanceBehavior('hypertext', HypertextStyles),
    appearanceBehavior('lightweight', LightweightButtonStyles),
    appearanceBehavior('outline', OutlineButtonStyles),
    appearanceBehavior('stealth', StealthButtonStyles),
  );
