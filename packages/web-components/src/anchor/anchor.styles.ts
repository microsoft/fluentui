import { css } from '@microsoft/fast-element';
import {
  AccentButtonStyles,
  BaseButtonStyles,
  HypertextStyles,
  LightweightButtonStyles,
  OutlineButtonStyles,
  StealthButtonStyles,
} from '../styles/';
import { appearanceBehavior } from '../utilities/behaviors';

export const AnchorStyles = css`
  ${BaseButtonStyles}
`.withBehaviors(
  appearanceBehavior('accent', AccentButtonStyles),
  appearanceBehavior('hypertext', HypertextStyles),
  appearanceBehavior('lightweight', LightweightButtonStyles),
  appearanceBehavior('outline', OutlineButtonStyles),
  appearanceBehavior('stealth', StealthButtonStyles),
);
