import { css } from '@microsoft/fast-element';
import {
  AccentButtonStyles,
  BaseButtonStyles,
  LightweightButtonStyles,
  OutlineButtonStyles,
  StealthButtonStyles,
} from '../styles/';
import { appearanceBehavior } from '../utilities/behaviors';

export const ButtonStyles = css`
  ${BaseButtonStyles}
`.withBehaviors(
  appearanceBehavior('accent', AccentButtonStyles),
  appearanceBehavior('lightweight', LightweightButtonStyles),
  appearanceBehavior('outline', OutlineButtonStyles),
  appearanceBehavior('stealth', StealthButtonStyles),
);
