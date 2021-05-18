import { css } from '@microsoft/fast-element';
import {
  AccentButtonStyles,
  baseButtonStyles,
  HypertextStyles,
  LightweightButtonStyles,
  OutlineButtonStyles,
  StealthButtonStyles,
} from '../styles/';
import { appearanceBehavior } from '../utilities/behaviors';

export const anchorStyles = (context, definition) =>
  css`
    ${baseButtonStyles(context, definition)}
  `.withBehaviors(
    appearanceBehavior('accent', AccentButtonStyles),
    appearanceBehavior('hypertext', HypertextStyles),
    appearanceBehavior('lightweight', LightweightButtonStyles),
    appearanceBehavior('outline', OutlineButtonStyles),
    appearanceBehavior('stealth', StealthButtonStyles),
  );
