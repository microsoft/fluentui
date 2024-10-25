import { css } from '@microsoft/fast-element';
import {
  badgeBaseStyles,
  badgeFilledStyles,
  badgeGhostStyles,
  badgeOutlineStyles,
  badgeSizeStyles,
  badgeTintStyles,
} from '../styles/index.js';
import { borderRadiusMedium, borderRadiusNone, borderRadiusSmall } from '../theme/design-tokens.js';
import { forcedColorsStylesheetBehavior } from '../utils/behaviors/match-media-stylesheet-behavior.js';
import { state } from '../utils/states.js';

/** Badge styles
 * @public
 */
export const styles = css`
  :host(${state('square')}) {
    border-radius: ${borderRadiusNone};
  }

  :host(${state('rounded')}) {
    border-radius: ${borderRadiusMedium};
  }

  :host(${state('rounded')}${state('tiny')}),
  :host(${state('rounded')}${state('extra-small')}),
  :host(${state('rounded')}${state('small')}) {
    border-radius: ${borderRadiusSmall};
  }

  ${badgeSizeStyles}
  ${badgeFilledStyles}
  ${badgeGhostStyles}
  ${badgeOutlineStyles}
  ${badgeTintStyles}
  ${badgeBaseStyles}
`.withBehaviors(
  forcedColorsStylesheetBehavior(css`
    :host,
    :host([appearance='outline']),
    :host([appearance='tint']) {
      border-color: CanvasText;
    }
  `),
);
