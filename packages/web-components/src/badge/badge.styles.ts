import { css } from '@microsoft/fast-element';
import { forcedColorsStylesheetBehavior } from '../utils/index.js';
import {
  badgeBaseStyles,
  badgeFilledStyles,
  badgeGhostStyles,
  badgeOutlineStyles,
  badgeSizeStyles,
  badgeTintStyles,
} from '../styles/index.js';
import { borderRadiusMedium, borderRadiusNone, borderRadiusSmall } from '../theme/design-tokens.js';
// why is the border not showing up?
/** Badge styles
 * @public
 */
export const styles = css`
  :host([shape='square']) {
    border-radius: ${borderRadiusNone};
  }

  :host([shape='rounded']) {
    border-radius: ${borderRadiusMedium};
  }

  :host([shape='rounded']:is([size='tiny'], [size='extra-small'], [size='small'])) {
    border-radius: ${borderRadiusSmall};
  }

  ${badgeTintStyles}
  ${badgeOutlineStyles}
  ${badgeGhostStyles}
  ${badgeFilledStyles}
  ${badgeSizeStyles}
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
